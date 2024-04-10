import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useState, useEffect } from "react";
import axios from "axios"
export function Dashboard() {

  const [value, setValue] = useState(0);
  useEffect(() => {
		fetchBalance()
    setInterval(fetchBalance, 5000);
  }, []); 

  function fetchBalance(){
    axios
		.get("http://localhost:3000/api/v1/account/balance", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		})
		.then((res) => {
			setValue(res.data.balance);
		});
  }
	return <>
  <Appbar/>
  <Balance value={value}/>
  <Users/>
  </>;
}
