import { BsBookmarkPlus } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";

interface BlogCardProps {
    id : string,
    authorName : string,
    dateOfPublication : string,
    title : string,
    content : string,
}

export function BlogCard({id,authorName,dateOfPublication,title,content}:BlogCardProps) {
    return <div className=" mx-14 my-6">
        <hr className="mb-6 bg-slate-300 h-0.5"></hr>
        <div className="flex flex-col">
            <div className="flex">
                    <img src="/assets/logo.png" className=" w-10 h-10"/>
                    <div className=" ml-3 mt-1">{authorName}</div>
                    <div className=" ml-3 mt-1">{dateOfPublication}</div>
                    <div className=" ml-3 mt-1">premium</div>
            </div>
            <div className="flex justify-between">
                
                <div className="flex-col">
                    <Link to={"http://localhost:5173/"+id}>                        
                        <div className=" text-3xl font-bold my-2">{title}</div>
                        <div className=" text-lg font-semibold mb-16 ">{content.slice(0,100)+"..."}</div>
                    </Link>    
                </div>
                <img src="/assets/logo.png" className=" w-32 h-32"></img>
            </div>
            <div className="flex justify-between">
                <div className="flex">
                <div className="bg-slate-300 rounded-xl w-auto px-2 mr-2">
                    side hustle
                </div>
                <div>
                    3min read time
                </div>
                </div>
                <div className="flex">
                <BsBookmarkPlus style={{color:'#9b9b9b',}} className=" text-xl"/>
                <CiMenuKebab className="text-xl mx-3 rotate-90"/>
                </div>
            </div>
        </div>
    </div>
}
