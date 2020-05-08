import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useInput from "./InputTool";
import { useMutation } from "@apollo/react-hooks";
import { ADD_BOARD_COMMENT, ADD_MARKET_COMMENT } from "../SharedQueries";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 769px) {
  }
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #ecf0f1;
  width: 300px;
  height: 500px;
  padding: 20px 30px;
  @media screen and (min-width: 769px) {
    width: 800px;
    height: 80vh;
    padding: 30px 70px;
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  &:first-child {
    margin-bottom: 15px;
  }
  @media screen and (min-width: 769px) {
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    margin-bottom: 15px;
  }
  @media screen and (min-width: 769px) {
  }
`;

const Title = styled.span`
  margin-bottom: 20px;
  @media screen and (min-width: 769px) {
  }
`;

const TextArea = styled.textarea`
  height: 100px;
  /* border: none; */
  resize: none;
`

const Button = styled.button`
  padding: 5px;
  width: 80px;
  height: 35px;
  border: none;
  color: #ecf0f1;
  font-weight: 600;
  background-color:#27ae60;
  opacity: 0.8;
  border-radius: 3px;
  :hover {
    background-color: #16a085;
    transition: 0.2s linear;
  }
`;

export default data => {
  const path = data.location.pathname.split("/");
  const [action, setAction] = useState("");
  const [id, setId] = useState("");
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

  if (data) {
    useEffect(() => {
      setAction(path[1]);
      setId(path[2]);
    }, [path]);
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

  // const handleOnClick = async e => {
  //   e.preventDefault();
  //   const {
  //     data: { addBoardComment }
  //   } = await addBoardCommentMutation();
  //   setSelfComments([...selfComments, addBoardComment]);
  //   text.setValue("");
  //   toast.success("Comment created :D");
  // };

  console.log(action, id);
  return (
    <Wrapper>
    </Wrapper>
  );
};

//   const handleOnClick = async e => {
//     e.preventDefault();
//     const {
//       data: { addBoardComment }
//     } = await addBoardCommentMutation();
//     setSelfComments([...selfComments, addBoardComment]);
//     text.setValue("");
//     toast.success("Comment created :D");
//   };
//   console.log(state);
//   return (
//     <Wrapper>
//       <Head>
//         <FatText text="제목" />
//         <Typography variant="h4" component="span">
//           {state.title}
//         </Typography>
//       </Head>
//       <Container>
//         <Typography variant="body1" component="span">
//           {state.caption}
//         </Typography>
//       </Container>
//       <Comment type="submit">
//         <>
//           {state.comments && (
//             <CommentContent>
//               {state.comments.map(comment => (
//                 <span key={comment.id}>
//                   <FatText text={comment.user.username} />
//                   {comment.text}
//                 </span>
//               ))}
//               {selfComments.map(comment => (
//                 <span key={comment.id}>
//                   <FatText text={comment.user.username} />
//                   {comment.text}
//                 </span>
//               ))}
//             </CommentContent>
//           )}
//         </>
//         <Input
//           placeholder="Add Comment..."
//           value={text.value}
//           onChange={text.onChange}
//           onKeyPress={onKeyPress}
//         />
//         <Button type="submit" onClick={handleOnClick}>
//           Submit
//         </Button>
//       </Comment>
//     </Wrapper>
//   );
// };
