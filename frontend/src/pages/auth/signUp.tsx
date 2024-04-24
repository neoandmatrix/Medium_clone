import { useState } from "react";
import { Button } from "../../components/auth/button";
import { Heading } from "../../components/auth/heading";
import { InputBox } from "../../components/auth/inputFields";
import { SubHeading } from "../../components/auth/subHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignupPage() {

    const [username,setUserName] = useState(" ");
    const [lastName,setLastName] = useState(" ");
    const [email,setUserEmail] = useState(" ");
    const [password,setPassword] = useState(" ");

    const navigate = useNavigate();

 return <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
    <div className="flex justify-center">
        <div className="flex flex-col justify-center">
            <Heading lable="Create an account"></Heading>
            <SubHeading lable="Already have an account?" linkText="Login" link="/signin"></SubHeading>

            <InputBox type="text" lable="Username" placeholder="Enter your first Name" onChange={(e)=>{setUserName(e.target.value)}}></InputBox>
            <InputBox type="text" lable="Last Name" placeholder="Enter your last Name" onChange={(e)=>{setLastName(e.target.value)}}></InputBox>
            <InputBox type="text" lable="Email" placeholder="Enter your email" onChange={(e)=>{setUserEmail(e.target.value)}}></InputBox>
            <InputBox type="password" lable="Password" placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}}></InputBox>

            <Button label="Sign Up" onClick={async()=>{

                console.log({
                    firstName : username,
                        lastName : lastName,
                        email : email,
                        password : password
                })

                try {
                    const response = await axios.post('http://127.0.0.1:8787/api/v1/user/signup',{
                        firstName : username,
                        lastName : lastName,
                        email: email,
                        password: password,
                    })

                    const token = await response.data.jwt;
                    localStorage.setItem("token",token);
                   navigate('/blogs')
                } catch (error) {
                    alert("opps! error while signing in");
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