import React, { useState } from "react";
import styled from "styled-components";
import { storage } from "../firebase";
import { CircularProgress } from "@material-ui/core";

const Wrapper = styled.div``;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const Button = styled.button`
  display: inline-block;
  padding: 0.5em 0.75em;
  color: #999;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  background-color: #fdfdfd;
  cursor: pointer;
  border: 1px solid #ebebeb;
  border-bottom-color: #e2e2e2;
  border-radius: 0.25em;
`;

export default () => {
  const [content, setContent] = useState({
    image: null,
    url: "",
    progress: 0
  });
  const handleChange = e => {
    if (e.target.files[0]) {
      setContent({ image: e.target.files[0] });
    }
  };

  const handleUpload = () => {
    console.log(content.image);
    const uploadTask = storage
      .ref(`images/${content.image.name}`)
      .put(content.image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        //progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setContent({ progress });
      },
      error => {
        console.log(error);
      },
      () => {
        console.log(content.image.name);
        storage
          .ref("images")
          .child(content.image.name)
          .getDownloadURL()
          .then(url => {
            setContent({ url });
          });
      }
    );
  };

  console.log(content, content.image, content.url);
  return (
    <Wrapper>
      <Container>
        {content.progress !== 0 && (
          <CircularProgress value={content.progress} />
        )}
        <br />
        <Input type="file" onChange={handleChange} />
        <Button onClick={handleUpload}>upload</Button>
        <br />
      </Container>
    </Wrapper>
  );
};
