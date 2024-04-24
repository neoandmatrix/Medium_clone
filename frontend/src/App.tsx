import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignupPage } from "./pages/auth/signUp";
import { SigninPage } from "./pages/auth/signIn";
import { RenderedBlogList } from "./pages/blogs/renderdBlogList";
import { SingleBlog } from "./pages/blogs/renderSingleBlog";
import { NewBlogInputField } from "./pages/blogs/renderAddBlog";


export default function App() {
  return <>
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element =  {<SignupPage></SignupPage>}></Route>
      <Route path="/" element = {<SigninPage></SigninPage>}></Route>
      <Route path="/blogs" element = {<RenderedBlogList></RenderedBlogList>}></Route>
      <Route path="/:id" element = {<SingleBlog></SingleBlog>}></Route>
      <Route path="/post" element = {<NewBlogInputField></NewBlogInputField>}></Route>
    </Routes>
  </BrowserRouter>
  </>
}