import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { ME, EDIT_USER } from "../SharedQueries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import useInput from "../hooks/useInput";
import { storage } from "../firebase";
import { NextArrow } from "../components/Icon";
import Avatar from "../components/Avatar";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
`;

const Container = styled.div`
  ${props => props.theme.containerBox}
`;

const Content = styled.div`
  margin: 2% 12.5%;
  border: 1px solid red;
`;

const EditAvatar = styled.div`
  height: 25vh;
  margin: 0 15%;

  border: 1px solid blue;
`;

const DisplaySection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 8%;
`;

const Before = styled.div`
  border-radius: 10rem;
  border: 1px solid coral;
`;

const After = styled.div`
  border-radius: 10rem;
  border: 1px solid lime;
`;

const UploadSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  margin-top: 15px;
`;

const InfoSection = styled.div`
  width: 450px;
  margin: 0 auto;
  border: 1px solid green;
`;

const InputParts = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 300px;
`;

const Input = styled.input`
  padding: 8px;
  margin: 5px;
`;

const Textarea = styled.textarea`
  resize: none;
  margin: 5px;
`;

const Button = styled.button`
  width: 292px;
  padding: 8px;
  border: none;
  background-color: #e67e22;
  border-radius: 4px;
  margin: 0 auto;
  color: white;
`;

export default () => {
  const { data, loading } = useQuery(ME);
  const introInput = useInput("");
  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const [flag, setFlag] = useState(false);
  const [content, setContent] = useState({
    image: null,
    url: "",
    progress: 0
  });

  const [editUserMutation] = useMutation(EDIT_USER, {
    variables: {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      intro: introInput.value,
      avatar: content.url
    }
  });

  const handleChange = e => {
    if (e.target.files[0]) {
      setContent({ ...content, image: e.target.files[0] });
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

  const handleSubmit = async e => {
    try {
      const {
        data: { editUser }
      } = await editUserMutation();
      if (editUser) {
        setFlag(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <Content>
            <EditAvatar>
              <DisplaySection>
                <Before>
                  <Avatar url={data.me.avatar} size="lg" />
                </Before>
                <NextArrow />
                <After>"none"</After>
              </DisplaySection>
              <UploadSection>
                <input type="file" onChange={handleChange} />
                <button onClick={handleUpload}>image pick</button>
              </UploadSection>
            </EditAvatar>
            <InfoSection>
              <InputParts>
                <Input
                  placeholder="First Name"
                  setValue={firstNameInput.value}
                  onChange={firstNameInput.onChange}
                />
                <Input
                  placeholder="Last Name"
                  setValue={lastNameInput.value}
                  onChange={lastNameInput.onChange}
                />
                <Textarea
                  placeholder="intro"
                  setValue={introInput.value}
                  onChange={introInput.onChange}
                  rows="15"
                />
                <Button onClick={handleSubmit}>upload</Button>
              </InputParts>
            </InfoSection>
          </Content>
        )}
      </Container>
    </Wrapper>
  );
};
