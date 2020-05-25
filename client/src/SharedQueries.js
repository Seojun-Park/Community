import { gql } from "apollo-boost";

export const ME = gql`
  query me {
    me {
      id
      email
      avatar
      username
      firstName
      lastName
      intro
    }
  }
`;

export const BOARD_DATA = gql`
  query showBoard {
    showBoard {
      id
      title
      caption
      status
      comments {
        id
        user {
          username
        }
        text
      }
      user {
        id
        username
      }
      hit
      createdAt
    }
  }
`;

export const NOTICE_DATA = gql`
  query showNotice {
    showNotice {
      id
      title
      caption
      hit
      user {
        id
        username
      }
      createdAt
    }
  }
`;

export const MARKET_DATA = gql`
  query showMarket {
    showMarket {
      id
      title
      caption
      hit
      status
      comments {
        id
        text
        user {
          username
        }
      }
      user {
        id
        username
      }
      createdAt
    }
  }
`;

export const RENT_DATA = gql`
  query showRent {
    showRent {
      id
      title
      caption
      status
      comments {
        id
        text
        user {
          username
        }
      }
      user {
        id
        username
      }
      createdAt
    }
  }
`;

export const SEE_BOARD_DETAIL = gql`
  query seeBoardDetail($id: String!) {
    seeBoardDetail(id: $id) {
      id
      title
      caption
      createdAt
      hit
      comments {
        id
        text
        user {
          username
        }
        createdAt
      }
    }
  }
`;

export const SEE_MARKET_DETAIL = gql`
  query seeMarketDetail($id: String!) {
    seeMarketDetail(id: $id) {
      id
      title
      caption
      createdAt
      hit
      comments {
        id
        text
        user {
          username
        }
        createdAt
      }
    }
  }
`;

export const SEE_RENT_DETAIL = gql`
  query seeRentDetail($id: String!) {
    seeRentDetail(id: $id) {
      id
      title
      caption
      createdAt
      comments {
        id
        text
        user {
          username
        }
        createdAt
      }
    }
  }
`;

export const UPLOAD_BOARD = gql`
  mutation uploadBoard($title: String!, $caption: String!, $status:String, $username: String) {
    uploadBoard(title: $title, caption: $caption, status: $status, username: $username) {
      user {
        id
        username
      }
      createdAt
    }
  }
`;

export const UPLOAD_MARKET = gql`
  mutation uploadMarket($title: String!, $caption: String!, $status: String,$username: String) {
    uploadMarket(title: $title, caption: $caption, status: $status, username: $username) {
      user {
        id
        username
      }
      createdAt
    }
  }
`;

export const UPLOAD_RENT = gql`
  mutation uploadRent($title: String!, $caption: String!, $status: String, $username: String) {
    uploadRent(title: $title, caption: $caption, status: $status, username: $username) {
      user {
        id
        username
      }
      createdAt
    }
  }
`;

export const ADD_BOARD_COMMENT = gql`
  mutation addBoardComment($text: String!, $boardId: String!) {
    addBoardComment(text: $text, boardId: $boardId) {
      id
      text
      user {
        avatar
        username
      }
    }
  }
`;

export const ADD_MARKET_COMMENT = gql`
  mutation addMarketComment($text: String!, $marketId: String!) {
    addMarketComment(text: $text, marketId: $marketId) {
      id
      text
      user {
        avatar
        username
      }
    }
  }
`;

export const ADD_RENT_COMMENT = gql`
  mutation addRentComment($text: String!, $rentId: String!) {
    addRentComment(text: $text, rentId: $rentId) {
      id
      text
      user {
        avatar
        username
      }
    }
  }
`;

export const LOG_IN = gql`
  mutation requestCode($email: String!) {
    requestCode(email: $email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $firstName: String
    $lastName: String
  ) {
    createAccount(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
    )
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($secret: String!, $email: String!) {
    confirmSecret(secret: $secret, email: $email)
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;
