import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { LiaUser } from "react-icons/lia";
import { HiOutlineBell } from "react-icons/hi2";
import { BsPencilSquare } from "react-icons/bs";

export function TopBar() {

    const navigate = useNavigate();

    return <div>
        <nav className="flex justify-between sticky top-0 bg-white">
        <div className="flex">
            <div className="mx-3">
                <Link to={'/'}>
                <img src="/assets/logo.png" className=" w-14 h-14 rounded-full" alt="MEDIUM"></img>
                </Link>
            </div>
            <div>
                <div className=" flex mx-4 my-3 border border-slate-800 rounded-3xl overflow-auto">
                <BsSearch className=" mt-2 mx-2" />
                <input placeholder="Enter topic to search article" className="focus:outline-none h-9 pl-1 pr-2 pb-1 w-72"type="text">
                </input>
                </div>
            </div>
        </div>
        <div className="flex">
        <BsPencilSquare onClick={()=>{
            navigate('/post')
        }} className="mt-5 ml-2 mr-4 text-2xl"/>
        <HiOutlineBell className="mt-5 ml-2 mr-4 text-2xl"/>
        <LiaUser onClick={()=>{
            localStorage.clear();
            navigate('/')
        }} className="mt-4 ml-2 mr-4 text-4xl p-1 bg-slate-100 rounded-full" />  
        </div>
    </nav>

    </div>
}