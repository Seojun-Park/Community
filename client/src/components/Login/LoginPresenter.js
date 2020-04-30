import React from 'react';
import { Helmet } from 'react-helmet'
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button'

const Wrapper = styled.div`
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Box = styled.div`
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    background-color: white;
    border-radius: 0px;
    width: 100%;
    max-width: 350px;
`;

const StateChanger = styled(Box)`
    text-align: center;
    padding: 20px 0px;
`;

const Link = styled.span`
    color: #0095f6;
    cursor: pointer;
`;

const Form = styled(Box)`
    padding: 40px;
    padding-bottom: 30px;
    margin-bottom: 15px;
    form {
        width: 100%;
        input {
            width: 100%;
            &:not(:last-child){
                margin-bottom: 5px;
            }
        }
        button {
            margin-top: 10px;
        }
    }
`;

export default ({
    action,
    username,
    firstName,
    lastName,
    email,
    setAction,
    secret,
    onSubmit
}) => (
        <Wrapper>
            <Helmet><title>Log In | Jinstagram</title></Helmet>
            <Form>
                {action === "logIn" && (
                        <form onSubmit={onSubmit}>
                            <Input placeholder={"Email"} setValue={email.value} onChange={email.onChange} type="email" />
                            <Button text={"Log In"} />
                        </form>
                )}
                {action === "signUp" && (
                    <>
                        <Helmet><title>Sign Up | Jinstagram</title></Helmet>
                        <form onSubmit={onSubmit}>
                            <Input placeholder={"First name"} setValue={firstName.value} onChange={firstName.onChange} />
                            <Input placeholder={"Last name"} setValue={lastName.value} onChange={lastName.onChange} />
                            <Input placeholder={"Email"} setValue={email.value} onChange={email.onChange} type="email" />
                            <Input placeholder={"Username"} setValue={username.value} onChange={username.onChange} />
                            <Button text={"Sign Up"} />
                        </form>
                    </>
                )}
                {action === "confirm" && (
                    <>
                        <Helmet><title>Confirm Secret | Jinstagram</title></Helmet>
                        <form onSubmit={onSubmit}>
                            <Input placeholder={"Paste your secret code here"} required setValue={secret.value} onChange={secret.onChange}  />
                            <Button text={"Confirm"} />
                        </form>
                    </>
                        )}
            </Form>
            {action !== "confirm" && (
                <StateChanger>
                {action  === "logIn"
                    ? <>Don't have an account?{" "} <Link onClick={()=>setAction("signUp")}>Sign up</Link></>
                    : <>Have an account?{" "} <Link onClick={()=>setAction("logIn")}>Log In</Link></>}
            </StateChanger>
            )}
        </Wrapper>
)