import express from "express";
import { server as serverHello } from "./configs/1_hello";
import { server as serverTypes } from "./configs/2_types";
import { server as serverApi } from "./configs/3_api";
import { server as serverAuth } from "./configs/4_auth";
import { server as serverDeprecated } from "./configs/5_deprecated";
import { server as serverAll } from "./configs/9_all";

const app = express();

app.get("/", (_, res) => {
  res.send("Please pick any available graphql path");
});

serverHello.applyMiddleware({ app, path: "/hello" });
serverTypes.applyMiddleware({ app, path: "/types" });
serverApi.applyMiddleware({ app, path: "/api" });
serverAuth.applyMiddleware({ app, path: "/auth" });
serverDeprecated.applyMiddleware({ app, path: "/deprecated" });
serverAll.applyMiddleware({ app, path: "/all" });

app.listen(4000, () => {
  console.log(`🚀 Server ready at port ${4000}`);
});
