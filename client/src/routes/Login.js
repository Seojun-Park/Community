import React, { useState } from "react";
import styled from "styled-components";
import { LOCAL_LOG_IN, LOG_IN, CONFIRM_SECRET } from "../SharedQueries";
import useInput from "../hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
`;

const Container = styled.div`
  ${props => props.theme.containerBox}
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  height: 400px;
  width: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

const LoginWrapper = styled.div`
  text-align: center;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: none;
  background-color: #dfe6e9;
  text-align: center;
  width: 200px;
`;

const Button = styled.button`
  border: 0;
  border-radius: 4px;
  color: white;
  font-weight: 600;
  background-color: #2c3e50;
  padding: 7px 0;
  font-size: 14px;
  width: 200px;
  margin-top: 20px;
  cursor: pointer;
`;

export default () => {
  const [action, setAction] = useState("login");
  const email = useInput("");
  const secret = useInput("");

  const [requestCodeMutation] = useMutation(LOG_IN, {
    variables: {
      email: email.value
    }
  });

  const [confirmCodeMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value
    }
  });
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "login") {
      if (email.value !== "") {
        try {
          const {
            data: { requestCode }
          } = await requestCodeMutation();
          if (!requestCode) {
            toast.error("you don't have account, pls sign up first");
          } else {
            toast.success("Check your email");
            setTimeout(() => setAction("confirm"), 2000);
          }
        } catch {
          toast.error("Can't request secret code, try again");
        }
      } else {
        toast.error("email address is required");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token }
          } = await confirmCodeMutation();
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch {
          toast.error("Secret code is wrong. check it again");
        }
      }
    }
  };
  return (
    <Wrapper>
      <Container>
        <LoginBox>
          <LoginWrapper>
            {action === "login" && (
              <form onSubmit={onSubmit}>
                <Input
                  placeholder={"email"}
                  setValue={email.setValue}
                  onChange={email.onChange}
                  type="email"
                />
                <Button>Send</Button>
              </form>
            )}
            {action === "confirm" && (
              <form onSubmit={onSubmit}>
                <Input
                  placeholder={"Paste your secret code here"}
                  setValue={secret.setValue}
                  onChange={secret.onChange}
                />
                <Button>Confrim</Button>
              </form>
            )}
          </LoginWrapper>
        </LoginBox>
      </Container>
    </Wrapper>
  );
};
