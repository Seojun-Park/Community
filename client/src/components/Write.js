import React from 'react';
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';

import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify';
import Input from './Input';
import useInput from './InputTool'
import { UPLOAD_BOARD, MARKET_BOARD} from '../SharedQueries'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;


export default (data) => {
    console.log(data)
    const title = useInput("");
    const caption = useInput("");
    const [ uploadBoardMutation ] = useMutation(UPLOAD_BOARD, {
        variables: {
            title: title.value,
            caption: caption.value,
        }
    });

    const handleChangeValue = async e => {
        e.preventDefault();
        if (title.value !== "" &&
            caption.value !== "")
            {
            try {
                const {data : { uploadBoard }} = await uploadBoardMutation();
                if (!uploadBoard){
                    toast.error("hum....")
                } else {
                    toast.success("okay it's done");
                    window.location.href ="/#/board"
                }
            } catch {
                toast.error("upload fail")
            }
        } else {
            toast.error("all filed are requeired")
        }
    }

    return (
        <Wrapper>
             <Form onSubmit={handleChangeValue}>
                 <div>
                    <Form.Label>Title</Form.Label>
                    <Input placeholder={"Title"} setValue={title.value} onChange={title.onChange} />
                 </div>
                <div>
                    <Form.Label>Textarea</Form.Label>
                    <Input placeholder={"caption"} setValue={caption.value} onChange={caption.onChange} />
                </div>
                <Button type="submit">submit</Button>
            </Form>
        </Wrapper>
    )
}