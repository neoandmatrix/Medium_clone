import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TopBar } from "../../components/common/topBar";
import { Content } from "../../components/singleBlog/content";
import axios from "axios";

export function SingleBlog() {

    const {id} = useParams();

    const [blog,setblog] = useState<string>();
    const [loading,setLoading] = useState<boolean>(true);

    useEffect(()=>{
        
        async function getTheBlog() {
            try {
            const response = await axios.get('http://127.0.0.1:8787/api/v1/blog/'+id,{headers:{
                'Authorization' : `bearer ${localStorage.getItem('token')}` 
            }});
            
            if (response) {
            setblog(response.data.content);
            setLoading(false);
            }

            } catch (error) {
                alert("can't get blogs");
                console.log(error);
                console.log(id);
            }            
        }

        getTheBlog();
    })

    return <>
        <TopBar></TopBar>
        {loading ? "please wait....." : <Content content={blog!}></Content>}
    </>
}