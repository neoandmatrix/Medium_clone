import { useEffect, useState } from "react";
import { TopBar } from "../../components/common/topBar";
import axios from "axios";
import { BlogCard } from "../../components/multipleBlogs/allBlogs";

export function RenderedBlogList(){

    interface fetchedBlogsInterface {
        id: string,
        title: string,
        content: string ,
        createdAt: string,
        updatedAt: string,
        isPublished: boolean
    }

    const [blogsList,setBlogsList] = useState<fetchedBlogsInterface[]>();
    const [loading,setLoading] = useState(true);

    useEffect(()=>{

        async function getBlogs() {
            try {
            const response = await axios.get('http://127.0.0.1:8787/api/v1/blog/get/bulk',{headers:{
                'Authorization' : `bearer ${localStorage.getItem('token')}`
            }});
            setBlogsList(response.data.posts);
            if (response) {
                setLoading(false);
            }
            } catch (error) {
                alert("can't load blogs");
                console.log(error); 
            }
        }

        getBlogs()
    },[])

    return <div>
       <TopBar></TopBar>
       {loading ? "please wait getting data..." : blogsList?.map((e)=>{return <BlogCard key={e.id} id={e.id} title={e.title}
       authorName="tushar" dateOfPublication={e.createdAt} content={e.content}></BlogCard>})}
    </div>
}

