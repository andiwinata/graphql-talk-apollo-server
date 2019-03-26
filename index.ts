import { server as serverHello } from "./configs/1_hello";
import { server as serverTypes } from "./configs/2_types";
import { server as serverApi } from "./configs/3_api";
import { server as serverAuth } from "./configs/4_auth";
import { server as serverDeprecated } from "./configs/5_deprecated";
import { server as serverAll } from "./configs/9_all";

serverDeprecated.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
