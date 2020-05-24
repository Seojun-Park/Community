import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { CREATE_ACCOUNT } from "../SharedQueries";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/react-hooks";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
`;

const Container = styled.div`
  ${props => props.theme.containerBox}
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid black;
`;

const LoginBox = styled.div`
  height: 400px;
  width: 380px;

  border: 1px solid red;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const LoginBoxContent = styled.form`
  padding-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: none;
  background-color: #dfe6e9;
  text-align: center;
  width: 200px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const Textarea = styled.textarea`
  border-radius: 4px;
  resize: none;
  padding: 5px;
  border: none;
  background-color: #dfe6e9;
  margin-bottom: 15px;
  width: 200px;
  height: 100px;
  text-align: center;
`;

const Button = styled.div`
  padding: 8px;
  width: 200px;
  border-radius: 4px;
`;

export default () => {
  const username = useInput("");
  const email = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const intro = useInput("");

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastNAme: lastName.value,
      intro: intro.value
    }
  });

  const onSubmit = async e => {
    e.preventDefault();
    if (
      email.value !== "" &&
      username.value !== "" &&
      firstName.value !== "" &&
      lastName.value !== "" &&
      intro.value !== ""
    ) {
      try {
        const {
          data: { createAccount }
        } = await createAccountMutation();
        if (!createAccount) {
          toast.error("Can't create account");
        } else {
          toast.success("Account Created");
          window.location.href = "/";
        }
      } catch (e) {
        toast.error(e.message);
        toast.error("Can't create an account, try again");
      }
    } else {
      toast.error("All fields are required");
    }
  };

  return (
    <Wrapper>
      <Container>
        <LoginBox>
          <Header>
            <Title>회원가입</Title>
          </Header>
          <LoginBoxContent onSubmit={onSubmit}>
            <Input
              placeholder="email"
              value={email.value}
              onChange={email.onChange}
            />
            <Input
              placeholder="username"
              value={username.value}
              onChange={username.onChange}
            />
            <Input
              placeholder="First Name"
              value={firstName.value}
              onChange={firstName.onChange}
            />
            <Input
              placeholder="Last Name"
              value={lastName.value}
              onChange={lastName.onChange}
            />
            <Textarea
              placeholder="Intro"
              value={intro.value}
              onChange={intro.onChange}
            />
            <Button>Sumbit</Button>
          </LoginBoxContent>
        </LoginBox>
      </Container>
    </Wrapper>
  );
};
