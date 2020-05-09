import "./env";
import { GraphQLServer } from "graphql-yoga";
import schema from "./schemas";
import logger from "morgan";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
const option = {
  query: "꽃", //이미지 검색 텍스트
  start: 1, //검색 시작 위치
  display: 3, //가져올 이미지 갯수
  sort: "sim", //정렬 유형 (sim:유사도)
  filter: "small" //이미지 사이즈
};

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.get(
  ({
    uri: "https://openapi.naver.com/v1/search/image", //xml 요청 주소는 https://openapi.naver.com/v1/search/image.xml
    qs: option,
    headers: {
      "X-Naver-Client-Id": NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
    }
  },
  function(err, res, body) {
    let json = JSON.parse(body); //json으로 파싱
    console.log(json);
  })
);

server.start(() => console.log(`server running`));
