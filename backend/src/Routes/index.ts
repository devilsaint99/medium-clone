import { Hono } from "hono";
import user from "./user";
import blog from "./blog";

const apiV1 = new Hono();

apiV1.route('/user', user)
apiV1.route('/blog', blog)

export default apiV1;