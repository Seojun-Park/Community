import "./env";
import { GraphQLServer } from "graphql-yoga";
import schema from "./schemas";
import logger from "morgan";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import * as firebase from "firebase/app";

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.get("search/blog", function(req, res) {
  var api_url =
    "https://openapi.naver.com/v1/search/blog?query=" +
    encodeURI(req.query.query);
  var request = require("request");
  var options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET
    }
  };
  request.get(options, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error =  " + response.statusCode);
    }
  });
});

server.express.listen(3000, function() {
  console.log(
    "http://127.0.0.1:3000/search/blog?query=검색어 app listening on port 3000!"
  );
});

server.start(() => console.log(`server running`));
