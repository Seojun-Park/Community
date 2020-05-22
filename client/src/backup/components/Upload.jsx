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
  opacity: 1;
`;

  export default data => {
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
      const uploadTask = storage
        .ref(`${data.action}/${data.title.value}`)
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

  console.log(data.title.value);
    return (
      <Wrapper>
        <Container>
          <progress value={content.progress} max="100" />
          <br />
          <Input type="file" onChange={handleChange} />
          <button onClick={handleUpload}>Upload</button>
        </Container>
      </Wrapper>
    );
  };
