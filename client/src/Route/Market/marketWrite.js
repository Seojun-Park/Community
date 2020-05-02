import React from 'react';
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';

import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify';
import Input from '../../components/Input';
import useInput from '../../components/InputTool'

const UPLOAD_Market = gql`
    mutation uploadMarket(
        $title: String!
        $caption: String!
        $username: String
    ){
        uploadBoard(
            title:$title
            caption: $caption
            username: $username
        ){
            user{
                id
                username
            }
            createdAt
        }
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;


export default () => {
    const title = useInput("");
    const caption = useInput("");
    const [ uploadMarketMutation ] = useMutation(UPLOAD_Market, {
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
                const {data : { uploadBoard }} = await uploadMarketMutation();
                if (!uploadBoard){
                    toast.error("hum....")
                } else {
                    toast.success("okay it's done");
                    window.location.href ="/#/market"
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
                    <Form.Label>Menu</Form.Label>
                    <Form.Control as="select" custom>
                        <option>선택</option>
                        <option>벼룩시장</option>
                        <option>내집 찾기</option>
                        <option>자유게시판</option>
                    </Form.Control>
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