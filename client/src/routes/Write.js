import React, { useState } from "react";
import styled from "styled-components";
import { UPLOAD_BOARD, UPLOAD_RENT, UPLOAD_MARKET } from "../SharedQueries";
import { useMutation } from "@apollo/react-hooks";
import useInput from "../hooks/useInput";
import { toast } from "react-toastify";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  ${props => props.theme.containerBox}
  display: flex;
  justify-content: center;
`;

const UploadContainer = styled.div`
  margin: 0 12.5%;
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  width: 650px;
  height: 500px;
  border: 1px solid red;
`;

const TitleContainer = styled.div`
  width: 600px;
  display: flex;
  justify-content: center;
`;

const Title = styled.input`
  width: 500px;
  padding: 10px;
`;

const CaptionContainer = styled.div`
  width: 600px;
  display: flex;
  justify-content: center;
`;

const Caption = styled.textarea`
  padding: 10px;
  width: 500px;
  resize: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-left: 16.5%;
`;

const SubmitButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: black;
  color: white;
`;

export default () => {
  const action = window.location.href.split("/")[5];
  const title = useInput("");
  const caption = useInput("");
  const [status, setStatus] = useState("");

  const options = [
    { value: "one", label: "판매중" },
    { value: "two", label: "예약중" },
    { value: "three", label: "판매완료" }
  ];

  const defaultOption = options[0];

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

  const [uploadRentMutation] = useMutation(UPLOAD_RENT, {
    variables: {
      title: title.value,
      caption: caption.value
    }
  });

  const handleSubmit = async e => {
    e.preventDefault();
    if (action === "board") {
      const {
        data: { uploadBoard }
      } = await uploadBoardMutation();
      if (uploadBoard) {
        toast.success("done");
      }
    } else if (action === "market") {
      const {
        data: { uploadMarket }
      } = await uploadMarketMutation();
      if (uploadMarket) {
        toast.success("done");
      }
    } else if (action === "rent") {
      const {
        data: { uploadRent }
      } = await uploadRentMutation();
      if (uploadRent) {
        toast.success("done");
      }
    }
  };

  const handleSelect = e => {
    e.preventDefault();
    if (e.value === "one") {
      setStatus("판매중");
    } else if (e.value === "two") {
      setStatus("예약중");
    } else if (e.value === "three") {
      setStatus("판매 완료");
    }
  };

  console.log(action);
  return (
    <Wrapper>
      <Container>
        <UploadContainer>
          <TitleContainer>
            <Title
              placeholder="title"
              setValue={title.value}
              onChange={title.onChange}
            />
          </TitleContainer>

          <Dropdown
            options={options}
            value={defaultOption}
            onChange={handleSelect}
            placeholder="Select an option"
          />

          <CaptionContainer>
            <Caption
              placeholder="caption"
              setValue={caption.value}
              onChange={caption.onChange}
              rows={25}
            />
          </CaptionContainer>
          <ButtonContainer>
            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
          </ButtonContainer>
        </UploadContainer>
      </Container>
    </Wrapper>
  );
};
