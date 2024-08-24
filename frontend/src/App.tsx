import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import ErrorPage from './error-page'
import { Blog } from './pages/BlogAll'
import { Publish } from './pages/Publish'
import { BlogId } from './pages/BlogId'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} errorElement={<ErrorPage />}/>
          <Route path="/signin" element={<Signin />} errorElement={<ErrorPage />}/>
          <Route path="/blog">
            <Route path=':id'  element={<BlogId />} errorElement={<ErrorPage />}></Route>
          </Route>
          <Route path="/publish" element={<Publish />} errorElement={<ErrorPage />}/>
          <Route path="/blogs" element={<Blog />} errorElement={<ErrorPage />}/>
          <Route path="/" element={<HomePage />} errorElement={<ErrorPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App