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
  @media screen and (min-width: 769px) {
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
  margin-right: 20px;
  @media screen and (min-width: 769px) {
  }
`;

export default data => {
  const path = data.match.path.split("/")[1];
  console.log(path);
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
          <Input
            placeholder={"caption"}
            setValue={caption.value}
            onChange={caption.onChange}
          />
        </Body>
        <button type="submit">submit</button>
      </Container>
    </Wrapper>
  );
};
