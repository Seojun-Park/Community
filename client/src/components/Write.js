import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { toast } from "react-toastify";
import Input from "./Input";
import useInput from "./InputTool";
import { UPLOAD_BOARD, UPLOAD_MARKET } from "../SharedQueries";
import { storage } from "../firebase";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 769px) {
  }
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #ecf0f1;
  width: 300px;
  height: 500px;
  padding: 20px 30px;
  @media screen and (min-width: 769px) {
    width: 800px;
    height: 80vh;
    padding: 30px 70px;
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  &:first-child {
    margin-bottom: 15px;
  }
  @media screen and (min-width: 769px) {
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    margin-bottom: 15px;
  }
  @media screen and (min-width: 769px) {
  }
`;

const Title = styled.span`
  margin-bottom: 10px;
  @media screen and (min-width: 769px) {
  }
`;

const InputField = styled.div`
  margin: 10px;
`;

const InputBox = styled.input`
  opacity: 1;
  width: 100%;
`;

const TextArea = styled.textarea`
  height: 100px;
  resize: none;
  border-radius: 3px;
`;

const Button = styled.button`
  padding: 5px;
  width: 80px;
  height: 35px;
  border: none;
  color: #ecf0f1;
  font-weight: 600;
  background-color: #27ae60;
  opacity: 0.8;
  border-radius: 3px;
  :hover {
    background-color: #16a085;
    transition: 0.2s linear;
  }
`;

export default data => {
  // console.log(data);
  const path = data.match.path.split("/")[1];
  const title = useInput("");
  const caption = useInput("");
  const [uploadBoardMutation] = useMutation(UPLOAD_BOARD, {
    variables: {
      title: title.value,
      caption: caption.value
    }
  });
  const [uploadMarketMutation] = useMutation(UPLOAD_MARKET, {
    variables: {
      title: title.value,
      caption: caption.value
    }
  });

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

  const handleChangeValue = async e => {
    e.preventDefault();
    if (title.value !== "" && caption.value !== "") {
      if (path === "board") {
        const {
          data: { uploadBoard }
        } = await uploadBoardMutation();
        if (!uploadBoard) {
          toast.error("hum....");
        } else {
          toast.success("okay it's done");
          window.location.href = "/#/board";
        }
      } else if (path === "market") {
        const {
          data: { uploadMarket }
        } = await uploadMarketMutation();
        if (!uploadMarket) {
          toast.error("hum....");
        } else {
          toast.success("okay it's done");
          window.location.href = "/#/market";
        }
      } else {
        toast.error("all filed are requeired");
      }
    }
  };

  const handleUpload = () => {
    if (content.image !== null) {
      const uploadTask = storage
        .ref(`${path}/${title.value}`)
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
          storage
            .ref(`${path}`)
            .child(content.image.name)
            .getDownloadURL()
            .then(url => {
              setContent({ url });
            });
        }
      );
    }
  };
  console.log(content)

  return (
    <Wrapper>
      <Container onSubmit={handleChangeValue}>
        <Head>
          <Title>Title</Title>
          <Input
            placeholder={"Title"}
            setValue={title.value}
            onChange={title.onChange}
          />
        </Head>
        <InputField>
          <InputBox type="file" onChange={handleChange} />
        </InputField>
        <Body>
          <Title>Textarea</Title>
          <TextArea setValue={caption.value} onChange={caption.onChange} />
        </Body>
        <Button type="submit" onClick={handleUpload}>
          submit
        </Button>
      </Container>
    </Wrapper>
  );
};
