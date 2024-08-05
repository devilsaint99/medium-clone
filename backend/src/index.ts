import { Hono } from 'hono'
import apiV1 from './Routes'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1', apiV1)
export default app
