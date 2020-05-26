import React, { useState } from "react";
import styled from "styled-components";
import { CREATE_MEET, ME } from "../SharedQueries";
import { useMutation, useQuery } from "@apollo/react-hooks";
import useInput from "../hooks/useInput";
import Loader from "../components/Loader";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
`;

const Container = styled.div`
  ${props => props.theme.containerBox}
`;

const Input = styled.input``;

const Textarea = styled.textarea``;

const CreateButton = styled.button``;

export default () => {
  const tagInput = useInput("");
  const introInput = useInput("");
  const titleInput = useInput("");
  const { data, loading } = useQuery(ME);
  const [createMeetMutation] = useMutation(CREATE_MEET, {
    variables: {
      tag: tagInput.value,
      title: titleInput.value,
      intro: introInput.value,
    }
  });

  const handleCreate = async e => {
    const {
      data: { createMeet }
    } = await createMeetMutation();
    if (createMeet) {
      console.log("craeted");
    }
  };
  console.log(data);
  return (
    <Wrapper>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Input
              placeholder="tag"
              setValue={tagInput.value}
              onChange={tagInput.onChange}
            />
            <Input
              placeholder="Title"
              setValue={titleInput.value}
              onChange={titleInput.onChange}
            />
            <Textarea
              placeholder="intro"
              setValue={introInput.value}
              onChange={introInput.onChange}
            />
            <CreateButton onClick={handleCreate}>Create</CreateButton>
          </>
        )}
      </Container>
    </Wrapper>
  );
};
