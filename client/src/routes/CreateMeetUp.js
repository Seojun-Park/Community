import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { CREATE_MEET, ME } from "../SharedQueries";
import { useMutation, useQuery } from "@apollo/react-hooks";
import useInput from "../hooks/useInput";
import Loader from "../components/Loader";
import MultiSelect from "react-multi-select-component";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
`;

const Container = styled.div`
  ${props => props.theme.containerBox}
  margin: 5% 12.5%;
`;

const Content = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border: none;
  background-color: #bdc3c7;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Textarea = styled.textarea`
  margin: 8px 0;
  padding: 8px;
  resize: none;
  border: none;
  background-color: #bdc3c7;
`;

const CreateButton = styled.button`
  width: 30%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #e67e22;
  color: white;
  font-weight: 600;
  font-size: 14px;
  margin: 0 auto;
`;

export default () => {
  const tagInput = useInput("");
  const introInput = useInput("");
  const titleInput = useInput("");
  const { data, loading } = useQuery(ME);
  const [selected, setSelected] = useState([]);
  const [tag, setTag] = useState("");
  const [createMeetMutation] = useMutation(CREATE_MEET, {
    variables: {
      tag: tag,
      title: titleInput.value,
      intro: introInput.value
    }
  });

  const options = [
    { label: "여행 ✈️ ", value: "travel" },
    { label: "공부 📚 ", value: "study" },
    { label: "운동 💪🏻 ", value: "workout" }
  ];

  const handleCreate = async e => {
    const {
      data: { createMeet }
    } = await createMeetMutation();
    if (createMeet) {
      console.log("how can you throw me to back");
    }
  };

  const handleChange = value => {
    setSelected(value);
    if (value[0]) {
      setTag(value[0].value);
    }
  };

  console.log(selected);
  console.log(tag);
  return (
    <Wrapper>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Content>
              <MultiSelect
                options={options}
                value={selected}
                onChange={handleChange}
                labelledBy={"Select"}
              />

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
                row={10}
              />
              <CreateButton onClick={handleCreate}>Create</CreateButton>
            </Content>
          </>
        )}
      </Container>
    </Wrapper>
  );
};
