import React, { useState } from "react";
import styled from "styled-components";
import { storage } from "../firebase";

const Wrapper = styled.div`
  /* height: 50vh; */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  position: absolute;
  /* width: 1px; */
  /* height: 1px; */
  /* padding: 0; */
  /* margin: -1px; */
  /* overflow: hidden; */
  /* clip: rect(0, 0, 0, 0); */
  /* border: 0; */
  /* z-index: 1; */
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
  z-index: 0;
`;

export default data => {
  console.log(data);
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
    console.log(data);
    // if (data.action === "board") {
    const uploadTask = storage
      .ref(`${data.action}/${content.image.name}`)
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
          .ref(`${data.action}`)
          .child(content.image.name)
          .getDownloadURL()
          .then(url => {
            setContent({ url });
          });
      }
    );
  };

  return (
    <Wrapper>
      <Container>
        <progress value={content.progress} max="100" />
        <br />
        <Input type="file" onChange={handleChange} />
        <Button onClick={handleUpload}>upload</Button>
        <br />
      </Container>
    </Wrapper>
  );
};
