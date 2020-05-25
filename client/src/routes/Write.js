import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
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
  const [flag, setFlag] = useState(false);
  const [status, setStatus] = useState("one");

  const options = [
    { value: "one", label: "판매중" },
    { value: "two", label: "예약중" },
    { value: "three", label: "판매완료" }
  ];

  const defaultOption = options[0];

  const [uploadBoardMutation] = useMutation(UPLOAD_BOARD, {
    variables: {
      title: title.value,
      caption: caption.value,
      status: status
    }
  });

  const [uploadMarketMutation] = useMutation(UPLOAD_MARKET, {
    variables: {
      title: title.value,
      caption: caption.value,
      status: status
    }
  });

  const [uploadRentMutation] = useMutation(UPLOAD_RENT, {
    variables: {
      title: title.value,
      caption: caption.value,
      status: status
    }
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (action === "board") {
        const {
          data: { uploadBoard }
        } = await uploadBoardMutation();
        if (uploadBoard) {
          toast.success("done");
          setTimeout(() => setFlag(true), 1000);
        }
      } else if (action === "market") {
        const {
          data: { uploadMarket }
        } = await uploadMarketMutation();
        if (uploadMarket) {
          toast.success("done");
          setTimeout(() => setFlag(true), 1000);
        }
      } else if (action === "rent") {
        const {
          data: { uploadRent }
        } = await uploadRentMutation();
        if (uploadRent) {
          toast.success("done");
          setTimeout(() => setFlag(true), 1000);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setFlag(false);
    }
  };

  const handleSelect = e => {
    if (e.value === "one") {
      setStatus("one");
    } else if (e.value === "two") {
      setStatus("two");
    } else if (e.value === "three") {
      setStatus("three");
    }
  };

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
        {flag === true && <Redirect to="/" />}
        {/* {(flag === true && action === "board" && <Redirect to="/board" />) ||
          (action === "market" && <Redirect to="/market" />) ||
          (action === "rent" && <Redirect to="/rent" />)} */}
      </Container>
    </Wrapper>
  );
};
