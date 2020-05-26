import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { storage } from "../firebase";
import Avatar from "./Avatar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UploadBox = styled.div`
  
`;

const Label = styled.label`
  background-color: #e67e22;
  padding: 12px;
  border: none;
  color: white;
  position: absolute;
  border-radius: 4px;
  cursor: pointer;
  z-index: 0;
`;

const Input = styled.input`
  background-color: red;
  padding: 10px;
  width: 69px;
  border-radius: 4px;
  position: absolute;
  z-index: 1;
  opacity: 0;
  :active {
    background-color: #d35400;
  }
`;

const UploadButton = styled.button`
  padding: 12px;
  border: none;
  background-color: #e67e22;
  color: white;
  border-radius: 4px;
`;

export default ({ data }) => {
  console.log(data);
  const [content, setContent] = useState({
    image: null,
    url: "",
    progress: 0
  });
  let profileImage = data.avatar;
  const handleChange = e => {
    if (e.target.files[0]) {
      setContent({ image: e.target.files[0] });
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`avatar/${data.email}`).put(content.image);
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
        storage
          .ref(`avatar/`)
          .child(`${data.email}`)
          .getDownloadURL()
          .then(url => {
            setContent({ url });
          });
      }
    );
  };


  return (
    <Container>
      <Avatar url={profileImage} size="lg" />
      <progress value={content.progress} max="100" />
      <br />
      {content.image === null && (
        <UploadBox>
          <Label>Upload</Label>
          <Input type="file" onChange={handleChange} />
        </UploadBox>
      )}
      {/* {content.image !== null && (
        <UploadButton onClick={handleUpload}>Send</UploadButton>
      )} */}
    </Container>
  );
};
