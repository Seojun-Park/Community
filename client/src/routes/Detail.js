import React, { useState } from "react";
import styled from "styled-components";
import {
  SEE_BOARD_DETAIL,
  SEE_MARKET_DETAIL,
  SEE_RENT_DETAIL,
  SEE_NOTICE_DETAIL,
  ADD_BOARD_COMMENT,
  ADD_MARKET_COMMENT,
  ADD_RENT_COMMENT
} from "../SharedQueries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Avatar from "../components/Avatar";
import useInput from "../hooks/useInput";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
`;

const Container = styled.div`
  ${props => props.theme.containerBox}
  border: 1px solid black;
`;

const View = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  @media screen and (min-width: 769px) {
    display: grid;
    grid-template-columns: 20% 60% 20%;
  }
`;

const ViewCol = styled.div`
  border: 1px solid green;
  @media screen and (max-width: 768px) {
    &:first-child {
      display: none;
    }
  }
`;

const MainContent = styled.div`
  margin-top: 30px;
  border: 1px solid red;
  width: 100%;
`;

const Head = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid green;
  @media screen and (min-width: 769px) {
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 20px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  padding: 10px;
`;

const Writer = styled.span`
  font-size: 16px;
  font-weight: 400;
  margin-left: 15px;
`;

const Caption = styled.div`
  height: 50vh;
  margin: 15px;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid black;
`;

const CaptionText = styled.span`
  font-size: 16px;
  font-weight: 400;
`;

const CommentContainer = styled.div`
  min-height: 10vh;
  margin-left: 15px;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
`;

const CommentBoard = styled.form`
  height: 10vh;
  display: flex;
  flex-direction: column;
`;

const Comment = styled.span`
  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const CommentInput = styled.input`
  width: 76.5%;
  padding: 8px;
  border: none;
  border-bottom: 1px solid #7f8fa6;
`;

const Button = styled.button`
  padding: 10px;
  margin-left: 15px;
  border: none;
  background-color: #30336b;
  border-radius: 4px;
  font-weight: 600;
  width: 80px;
  color: white;
`;

export default () => {
  const action = window.location.href.split("/")[5];
  const id = window.location.href.split("/")[6];
  const [selfComments, setSelfComments] = useState([]);
  const commentText = useInput("");
  const [addBoardCommentMutation] = useMutation(ADD_BOARD_COMMENT, {
    variables: {
      text: commentText.value,
      boardId: id
    }
  });
  const [addMarketCommentMutation] = useMutation(ADD_MARKET_COMMENT, {
    variables: {
      text: commentText.value,
      marketId: id
    }
  });
  const [addRentCommentMutation] = useMutation(ADD_RENT_COMMENT, {
    variables: {
      text: commentText.value,
      rentId: id
    }
  });

  let data = {};
  let loading = false;

  if (action === "board") {
    const extractData = useQuery(SEE_BOARD_DETAIL, {
      variables: {
        id: id
      }
    });
    if (extractData && extractData.data) {
      loading = false;
      data = extractData.data.seeBoardDetail;
    } else if (extractData.loading === true) {
      loading = true;
    }
  } else if (action === "market") {
    const extractData = useQuery(SEE_MARKET_DETAIL, {
      variables: {
        id
      }
    });
    if (extractData && extractData.data) {
      loading = false;
      data = extractData.data.seeMarketDetail;
    } else if (extractData.loading === true) {
      loading = true;
    }
  } else if (action === "rent") {
    const extractData = useQuery(SEE_RENT_DETAIL, {
      variables: {
        id
      }
    });
    if (extractData && extractData.data) {
      loading = false;
      data = extractData.data.seeRentDetail;
    } else if (extractData.loading === true) {
      loading = true;
    }
  } else if (action === "notice") {
    const extractData = useQuery(SEE_NOTICE_DETAIL, {
      variables: {
        id
      }
    });
    if (extractData && extractData.data) {
      loading = false;
      data = extractData.data.seeNoticeDetail;
    } else if (extractData.loading === true) {
      loading = true;
    }
  }

  // const onKeyPress = async e => {
  //   const { which } = e;
  //   if (which === 13) {
  //     e.preventDefault();
  //     try {
  //       if (action === "board") {
  //         const {
  //           data: { addBoardComment }
  //         } = await addBoardCommentMutation();
  //         setSelfComments([...selfComments, addBoardComment]);
  //         commentText.setValue("");
  //         toast.success("Comment created :D");
  //       } else if (action === "market") {
  //         const {
  //           data: { addMarketComment }
  //         } = await addMarketCommentMutation();
  //         setSelfComments([...selfComments, addMarketComment]);
  //         commentText.setValue("");
  //         toast.success("Comment Created :D");
  //       } else if (action === "rent") {
  //         const {
  //           data: { addRentComment }
  //         } = await addRentCommentMutation();
  //         setSelfComments([...selfComments], addRentComment);
  //         commentText.setValue("");
  //         toast.success("Comment Created :D");
  //       }
  //     } catch {
  //       toast.error("Can't create Comment");
  //     }
  //   }
  // };

  const handleOnClick = async e => {
    e.preventDefault();
    if (action === "board") {
      const {
        data: { addBoardComment }
      } = await addBoardCommentMutation();
      setSelfComments([...selfComments, addBoardComment]);
      commentText.setValue("");
      toast.success("Comment created :D");
    } else if (action === "market") {
      const {
        data: { addMarketComment }
      } = await addMarketCommentMutation();
      setSelfComments([...selfComments, addMarketComment]);
      commentText.setValue("");
      toast.success("Comment created :D");
    } else if (action === "rent") {
      const {
        data: { addRentComment }
      } = await addRentCommentMutation();
      setSelfComments([...selfComments, addRentComment]);
      toast.success("Comment created :D");
    }
  };

  return (
    <Wrapper>
      {loading === true ? (
        <Loader />
      ) : (
        <Container>
          <View>
            <ViewCol>col1</ViewCol>
            <ViewCol>
              <MainContent>
                <Head>
                  <Title>{data.title}</Title>
                  {action === "notice" ? (
                    <Writer>Admin</Writer>
                  ) : (
                    data.user && (
                      <Profile>
                        <Avatar url={data.user.avatar} size="sm" />
                        <Writer> {data.user.username}</Writer>
                      </Profile>
                    )
                  )}
                </Head>
                <Caption>
                  <CaptionText>{data.caption}</CaptionText>
                </Caption>
                <CommentContainer>
                  <CommentBoard type="submit">
                    {data.comments &&
                      data.comments.map(c => {
                        console.log(c);
                        return (
                          <Comment key={c.id}>
                            {c.user.username} : {c.text}
                          </Comment>
                        );
                      })}
                    {selfComments &&
                      selfComments.map(c => (
                        <Comment>
                          {c.user.username} : {c.text}
                        </Comment>
                      ))}
                  </CommentBoard>
                  <CommentInput
                    placeholder="Add comments..."
                    setValue={commentText.value}
                    onChange={commentText.onChange}
                  />
                  <Button onClick={handleOnClick}>Send</Button>
                </CommentContainer>
              </MainContent>
            </ViewCol>
            <ViewCol>col3</ViewCol>
          </View>
        </Container>
      )}
    </Wrapper>
  );
};
