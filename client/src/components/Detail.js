import React, { useState } from "react";
import { gql } from "apollo-boost";
import styled from "styled-components";
import FatText from "./FatText";
import { Typography, Input } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import useInput from "./InputTool";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const ADD_COMMENT = gql`
  mutation addBoardComment($text: String!, $boardId: String!) {
    addBoardComment(text: $text, boardId: $boardId) {
      id
      text
      user {
        username
      }
    }
  }
`;

const Wrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  height: 20%;
`;

const Container = styled.div`
  margin-top: 30px;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
  background-color: white;
  padding: 20px;
  height: 80%;
`;

const Comment = styled.form`
  margin-top: 30px;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
  background-color: white;
  padding: 20px;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export default data => {
  const { state } = data.location;
  const text = useInput("");
  const [addBoardCommentMutation] = useMutation(ADD_COMMENT, {
    variables: {
      text: text.value,
      boardId: state.id
    }
  });
  const [selfComments, setSelfComments] = useState([]);

  const onKeyPress = async e => {
    const { which } = e;
    if (which === 13) {
      e.preventDefault();
      try {
        const {
          data: { addBoardComment }
        } = await addBoardCommentMutation();
        setSelfComments([...selfComments, addBoardComment]);
        text.setValue("");
        toast.success("Comment created :D");
      } catch {
        toast.error("Can't create Comment");
      }
    }
  };

  const handleOnClick = async e => {
    e.preventDefault();
    const {
      data: { addBoardComment }
    } = await addBoardCommentMutation();
    setSelfComments([...selfComments, addBoardComment]);
    text.setValue("");
    toast.success("Comment created :D");
  };
  console.log(state);
  return (
    <Wrapper>
      <Head>
        <FatText text="제목" />
        <Typography variant="h4" component="span">
          {state.title}
        </Typography>
      </Head>
      <Container>
        <Typography variant="body1" component="span">
          {state.caption}
        </Typography>
      </Container>
      <Comment type="submit">
        <>
          {state.comments && (
            <CommentContent>
              {state.comments.map(comment => (
                <span key={comment.id}>
                  <FatText text={comment.user.username} />
                  {comment.text}
                </span>
              ))}
              {selfComments.map(comment => (
                <span key={comment.id}>
                  <FatText text={comment.user.username} />
                  {comment.text}
                </span>
              ))}
            </CommentContent>
          )}
        </>
        <Input
          placeholder="Add Comment..."
          value={text.value}
          onChange={text.onChange}
          onKeyPress={onKeyPress}
        />
        <Button type="submit" onClick={handleOnClick}>
          Submit
        </Button>
      </Comment>
    </Wrapper>
  );
};
