import React from "react";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { toast } from "react-toastify";
import Input from "./Input";
import useInput from "./InputTool";
import { UPLOAD_BOARD, UPLOAD_MARKET } from "../SharedQueries";

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
  margin-bottom: 20px;
  @media screen and (min-width: 769px) {
  }
`;

const TextArea = styled.textarea`
  height: 100px;
  /* border: none; */
  resize: none;
`

const Button = styled.button`
  padding: 5px;
  width: 80px;
  height: 35px;
  border: none;
  color: #ecf0f1;
  font-weight: 600;
  background-color:#27ae60;
  opacity: 0.8;
  border-radius: 3px;
  :hover {
    background-color: #16a085;
    transition: 0.2s linear;
  }
`;

export default data => {
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
        <Body>
          <Title>Textarea</Title>
          {/* <Input
            placeholder={"caption"}
            setValue={caption.value}
            onChange={caption.onChange}
          /> */}
          <TextArea setValue ={caption.value} onChange={caption.onChange} />
        </Body>
        <Button type="submit">submit</Button>
      </Container>
    </Wrapper>
  );
};
