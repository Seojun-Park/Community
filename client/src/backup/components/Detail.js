import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import useInput from "./InputTool";
import Input from "./Input";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  ADD_BOARD_COMMENT,
  ADD_MARKET_COMMENT,
  SEE_BOARD_DETAIL,
  SEE_MARKET_DETAIL
} from "../../SharedQueries";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  @media screen and (min-width: 769px) {
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #ecf0f1;
  width: 300px;
  min-height: 500px;
  padding: 20px 30px;
  @media screen and (min-width: 769px) {
    width: 800px;
    min-height: 80vh;
    padding: 30px 70px;
  }
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #2c3e50;
  &:first-child {
    margin-bottom: 15px;
  }
  @media screen and (min-width: 769px) {
  }
`;

const Title = styled.span`
  margin-bottom: 10px;
  font-weight: 800;
  font-size: 14px;
  @media screen and (min-width: 769px) {
  }
`;

const CreatedAt = styled.span`
  font-weight: 400;
  font-size: 5px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  padding-left: 10px;
  margin-bottom: 20px;
  min-height: 300px;
  @media screen and (min-width: 769px) {
  }
`;

const Comments = styled.form`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  border-top: 1px solid #95a5a6;
`;

const Comment = styled.span`
  margin-top: 8px;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Tools = styled.div`
  margin-top: 15px;
  display: flex;
  @media screen and (min-width: 769px) {
    margin-top: 30px;
  }
`;

const Textarea = styled(Input)`
  margin-right: 8px;
  @media screen and (min-width: 769px) {
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 3px;
  width: 80px;
  height: 35px;
  border: none;
  color: #ecf0f1;
  font-weight: 600;
  background-color: #27ae60;
  opacity: 0.8;
  border-radius: 3px;
  :hover {
    background-color: #16a085;
    transition: 0.2s linear;
  }
`;

export default withRouter(({ match }) => {
  const id = match.params.id;
  const action = match.path.split("/")[1];
  const text = useInput("");
  const [addBoardCommentMutation] = useMutation(ADD_BOARD_COMMENT, {
    variables: {
      text: text.value,
      boardId: id
    }
  });
  const [addMarketCommentMutation] = useMutation(ADD_MARKET_COMMENT, {
    variables: {
      text: text.value,
      marketId: id
    }
  });
  const [selfComments, setSelfComments] = useState([]);
  let data = {};

  if (action === "board") {
    const seeBoardDetail = useQuery(SEE_BOARD_DETAIL, {
      variables: {
        id: id
      }
    });
    data = seeBoardDetail.data;
  } else if (action === "market") {
    const seeMarketDetail = useQuery(SEE_MARKET_DETAIL, {
      variables: {
        id
      }
    });
    data = seeMarketDetail.data;
  }

  const onKeyPress = async e => {
    const { which } = e;
    if (which === 13) {
      e.preventDefault();
      try {
        if (action === "board") {
          const {
            data: { addBoardComment }
          } = await addBoardCommentMutation();
          setSelfComments([...selfComments, addBoardComment]);
          text.setValue("");
          toast.success("Comment created :D");
        } else if (action === "market") {
          const {
            data: { addMarketComment }
          } = await addMarketCommentMutation();
          setSelfComments([...selfComments, addMarketComment]);
          text.setValue("");
          toast.success("Comment Created :D");
        }
      } catch {
        toast.error("Can't create Comment");
      }
    }
  };

  const handleOnClick = async e => {
    e.preventDefault();
    if (action === "board") {
      const {
        data: { addBoardComment }
      } = await addBoardCommentMutation();
      setSelfComments([...selfComments, addBoardComment]);
      text.setValue("");
      toast.success("Comment created :D");
    } else if (action === "market") {
      const {
        data: { addMarketComment }
      } = await addMarketCommentMutation();
      setSelfComments([...selfComments, addMarketComment]);
      text.setValue("");
      toast.success("Comment created :D");
    }
  };

  console.log(data);
  return (
    <Wrapper>
      {action === "market" && data && data.seeMarketDetail && (
        <Container>
          <Head>
            <Title>{data.seeMarketDetail.title}</Title>
            <CreatedAt>
              {`${data.seeMarketDetail.createdAt}`.substr(0, 10)}
            </CreatedAt>
          </Head>
          <Body>{data.seeMarketDetail.caption}</Body>
          <Comments type="submit">
            {data.seeMarketDetail.comments &&
              data.seeMarketDetail.comments.map(c => {
                // console.log(c);
                return (
                  <Comment key={c.id}>
                    {c.user.username} : {c.text}
                  </Comment>
                );
              })}
            {selfComments &&
              selfComments.map(c => (
                <Comment key={c.id}>
                  {c.user.username} : {c.text}
                </Comment>
              ))}
            <Tools>
              <Textarea
                placeholder="Add Comment..."
                value={text.value}
                onChange={text.onChange}
                onKeyPress={onKeyPress}
              />
              <Button type="submit" onClick={handleOnClick}>
                submit
              </Button>
            </Tools>
          </Comments>
        </Container>
      )}
      {action === "board" && data && data.seeBoardDetail && (
        <Container>
          <Head>
            <Title>{data.seeBoardDetail.title}</Title>
            <CreatedAt>
              {`${data.seeBoardDetail.createdAt}`.substr(0, 10)}
            </CreatedAt>
          </Head>
          <Body>{data.seeBoardDetail.caption}</Body>
          <Comments type="submit">
            {data.seeBoardDetail.comments &&
              data.seeBoardDetail.comments.map(c => {
                console.log(c);
                return (
                  <Comment key={c.id}>
                    {c.user.username} : {c.text}
                  </Comment>
                );
              })}
            {selfComments &&
              selfComments.map(c => (
                <Comment key={c.id}>
                  {c.user.username} : {c.text}
                </Comment>
              ))}
            <Tools>
              <Textarea
                placeholder="Add Comment..."
                value={text.value}
                onChange={text.onChange}
                onKeyPress={onKeyPress}
              />
              <Button type="submit" onClick={handleOnClick}>
                submit
              </Button>
            </Tools>
          </Comments>
        </Container>
      )}
    </Wrapper>
  );
});
