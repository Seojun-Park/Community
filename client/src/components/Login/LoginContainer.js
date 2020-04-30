import React, { useState } from 'react';
import useInput from '../InputTool';
import { useMutation } from '@apollo/react-hooks';
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from './LoginQueries';
import { toast } from 'react-toastify'
import LoginPresenter from './LoginPresenter';

export default () => {
    const [ action, setAction ] = useState("logIn");
    const username = useInput("");
    const email = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const intro = useInput("");
    const secret = useInput("");
    const [ requestCodeMutation ] = useMutation(LOG_IN,{
        variables: {
            email: email.value
        }
    });
    const [ createAccountMutation ] = useMutation(CREATE_ACCOUNT, {
        variables:{
            email: email.value,
            username: username.value,
            firstname: firstName.value,
            lastName: lastName.value,
            intro: intro.value
        }
    });
    const [ confirmCodeMutation ] = useMutation(CONFIRM_SECRET,{
        variables:{
            email: email.value,
            secret: secret.value
        }
    });
    const [ localLogInMutation ] = useMutation(LOCAL_LOG_IN);

    const onSubmit = async e => {
        e.preventDefault();
        if (action === "logIn"){
            if (email.value !== "") {
                try {
                    const {data: { requestCode } } = await requestCodeMutation();
                    if (!requestCode){
                        toast.error("You don't have account. Sign up First ✉️ ")
                        setTimeout(()=> setAction("signUp"), 3000);
                    } else {
                        toast.success("Check your email")
                        setAction("confirm")
                    }
                } catch {
                    toast.error("Can't request secret code")
                }
            } else {
                toast.error("email address is required");
            }
        } else if (action === "signUp"){
            if (
                email.value !== "" &&
            username.value !== "" &&
            firstName.value !== "" &&
            lastName.value !== ""&&
            intro.value !== ""
            ){
                try {
                    const { data: { createAccount } } = await createAccountMutation();
                    if (!createAccount){
                        toast.error("Can't create account")
                    } else {
                        toast.success("Account Created")
                        setTimeout(() => setAction("logIn"), 3000);
                    }
                } catch (e) {
                    toast.error(e.message);
                    toast.error("Can't create an account, try again");
                }
            } else {
                toast.error("All fields are required")
            }
        } else if (action === "confirm") {
            if (secret.value !== ""){
                try {
                    const { data: { confirmSecret: token }} = await confirmCodeMutation();
                    if (token !== "" && token !== undefined){
                        localLogInMutation({ variables: { token }})
                    }else {
                        throw Error()
                    }
                } catch {
                    toast.error("Secret code is wrong. check again");
                }
            }
        }
    };
    
    return (
        <LoginPresenter
            setAction={setAction}
            action={action}
            username={username}
            intro={intro}
            firstName={firstName}
            lastName={lastName}
            email={email}
            secret={secret}
            onSubmit={onSubmit}
            />
    )
}