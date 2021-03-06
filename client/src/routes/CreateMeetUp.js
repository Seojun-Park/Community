import React, { useState, useEffect } from "react";
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

const Head = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`;

const Caption = styled.span`
  margin-top: 10px;
  font-size: 10px;
  font-weight: 400;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin: 0 auto;
`;

const Input = styled.input`
  margin-top: 15px;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #ced6e0;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Textarea = styled.textarea`
  margin: 8px 0;
  padding: 8px;
  resize: none;
  border: none;
  border-radius: 4px;
  background-color: #ced6e0;
`;

const CreateButton = styled.button`
  width: 30%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #eccc68;
  color: white;
  font-weight: 600;
  font-size: 14px;
  margin: 0 auto;
  &:active {
    background-color: #ffa502;
  }
`;

export default () => {
  const introInput = useInput("");
  const titleInput = useInput("");
  const [creator, setCreator] = useState("");
  const { data, loading } = useQuery(ME);
  const [selected, setSelected] = useState([]);
  const [tag, setTag] = useState("");
  const [flag, setFlag] = useState(false);
  const [createMeetMutation] = useMutation(CREATE_MEET, {
    variables: {
      tag: tag,
      title: titleInput.value,
      intro: introInput.value,
      creator
    }
  });

  const options = [
    { label: "여행 ✈️ ", value: "travel" },
    { label: "공부 📚 ", value: "study" },
    { label: "운동 💪🏻 ", value: "workout" }
  ];

  const handleCreate = async e => {
    try {
      const {
        data: { createMeet }
      } = await createMeetMutation();
      if (createMeet) {
        console.log("how can you throw me to back");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setFlag(true);
    }
  };

  const handleChange = value => {
    setSelected(value);
    if (value[0]) {
      setTag(value[0].value);
    }
  };

  useEffect(() => {
    if (data && data.me) {
      setCreator(data.me.id);
      setFlag(false);
    }
  }, [data]);

  return (
    <Wrapper>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <Content>
            <Head>
              <MultiSelect
                options={options}
                value={selected}
                onChange={handleChange}
                labelledBy={"Select"}
              />
              <Caption>태그를 선택 해 주세요</Caption>
            </Head>
            <Body>
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
            </Body>
            <CreateButton onClick={handleCreate}>Create</CreateButton>
            {flag === true && <Redirect to="/" />}
          </Content>
        )}
      </Container>
    </Wrapper>
  );
};
