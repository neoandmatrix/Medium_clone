import { useState } from "react";
import { Button } from "../../components/auth/button";
import { Heading } from "../../components/auth/heading";
import { InputBox } from "../../components/auth/inputFields";
import { SubHeading } from "../../components/auth/subHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function SigninPage() {

    const [email,setEmail] = useState<string>(" ");
    const [password,setPassword] = useState<string>(" ");

    const navigate = useNavigate();

 return <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
    <div className="flex justify-center">
        <div className="flex flex-col justify-center">
            <Heading lable="Login To Your Account"></Heading>
            <SubHeading lable="Don't have an account?" linkText="Create one" link="/signUp"></SubHeading>

            <InputBox type="text" lable="Email" placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}}></InputBox>
            <InputBox type="password" lable="Password" placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}}></InputBox>
            
            <Button label="Sign In" onClick={async()=>{

                try {
                    const response = await axios.post('http://127.0.0.1:8787/api/v1/user/signin',{
                    email,
                    password
                });

                const token = await response.data.token;
                localStorage.setItem("token",token);
                navigate('/blogs');
                
                } catch (error) {
                    alert("failed to send request please try again later");
                    console.log(error);
                }
            }}></Button>
        </div>
    </div>
    <div className="bg-slate-100 flex justify-center">
    <div className="flex flex-col justify-center mx-11 font-bold text-2xl">
    "The customer service I received was
    exceptional. The support team went above
    and beyond to address my concerns."

    <div className="mt-2 text-lg">
    -Jules Winnfield
    </div>
    <div className="text-sm">
    CEO, Acme lnc
    </div>
        </div>
    </div>
 </div>
}