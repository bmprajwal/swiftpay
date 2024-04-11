import axios from "axios"
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export function Signup() {
	const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
	return (
		<div className="bg-slate-300 h-screen flex justify-center">
			<div className="flex flex-col justify-center">
				<div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
					<Heading label={"Sign up"} />
					<SubHeading
						label={"Enter your information to create an account"}
					/>
					<InputBox onChange={(e) => {
            setFirstName(e.target.value)
          }} label={"First name"} placeholder="John" />
					<InputBox onChange={(e) => {
            setLastName(e.target.value)
          }} label={"Last name"} placeholder="Doe" />
					<InputBox onChange={(e) => {
            setUsername(e.target.value)
          }} label={"Email"} placeholder="prajwal@gmail.com" />
					<InputBox onChange={(e) => {
            setPassword(e.target.value)
          }} label={"Password"} placeholder="123456" />
					<div className="pt-4">
						<Button onClick={ async ()=>{
              const res = await axios.post(
					"http://localhost:3000/api/v1/user/signup",
					{
						firstName,
						lastName,
						username,
						password,
					}
				);
            localStorage.setItem("token", res.data.token)
						navigate("/dashboard")
            }} label={"Sign up"} />
					</div>
					<BottomWarning
						label={"Already have an account?"}
						buttonText={"Sign in"}
						to={"/signin"}
					/>
				</div>
			</div>
		</div>
	);
}
