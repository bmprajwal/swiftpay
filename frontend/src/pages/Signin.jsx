import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export function Signin() {
	return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg w-80 bg-white text-center p-2 px-4 h-max">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox label={"Email"} placeholder={"prajwal@gmail.com"} />
        <InputBox label={"Password"} placeholder={"123456"} />
        <div className="pt-4">
          <Button label={"Sign in"}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
      </div>
    </div>
  </div>;
}
