import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineLine } from "react-icons/ai";
import { Button } from "../../components/auth/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function NewBlogInputField() {

    const [title, setTitle] = useState(" ");
    const [content,setContent] = useState(" ");

    const navigate = useNavigate();
        return <div>
        <div className="flex mt-8 ml-28">
            <div>
            <AiOutlinePlusCircle style={{color:'#9b9b9b',}} className=" text-7xl"/> 
            </div>
            <AiOutlineLine  style={{color:'#9b9b9b'}} className="rotate-90 text-8xl pb-4 -mt-3 -ml-8"/>
            <div className="flex flex-col h-screen w-screen">
            <textarea onChange={(e)=>{
                setTitle(e.target.value)
            }} className=" h-18 mb-8 mr-8 text-5xl pt-3 focus:outline-none" placeholder="Enter the title here"/>
            <textarea onChange={(e)=>{
                setContent(e.target.value)
            }} className=" h-3/4 mb-8 mr-8 text-3xl pt-3 focus:outline-none" placeholder="Enter the content here"/>
            <div className="flex">
            <Button label="publish" onClick={async()=>{

                try {
                    const resposne = await axios.post('http://127.0.0.1:8787/api/v1/blog/post',{
                    title:title,
                    content : content
                },{headers:{
                    'Authorization' : `bearer ${localStorage.getItem('token')}`
                }})

                if (resposne) {
                    navigate('/blogs')
                }

                } catch (error) {
                    alert('cannot publish blog');
                    console.log(error);
                }

            }}></Button>
            <Button label="cancle" onClick={()=>{
                navigate('/blogs')
            }}></Button>
            </div>
            </div>
        </div>
    </div>
}