import { server as serverHello } from "./configs/1_hello";
import { server as serverAll } from "./configs/9_all";

serverHello.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
