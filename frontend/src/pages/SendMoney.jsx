import { useState } from "react"
import {useSearchParams, useNavigate} from "react-router-dom"
import axios from "axios"


export function SendMoney() {
  const [searchParams] = useSearchParams()
  const toId = searchParams.get("id")
  const firstName = searchParams.get("firstName")
  const lastName = searchParams.get("lastName")
  const [amount,setAmount] = useState(0)
  const [transferMsg, setTransferMsg] = useState(null)
  const navigate = useNavigate()

	return <div className="bg-gray-100 h-screen flex justify-center">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min  max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div>
            <div className="flex flex-col space-y-1.5 p-6">
              <h2 className="text-3xl font-bold text-center">Send Money</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-2xl text-white">{firstName[0].toUpperCase()}</span>
                </div>
                <h3 className="text-2xl font-semibold">{firstName} {lastName}</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount">
                    Amount (in Rs)
                  </label>
                  <input onChange={(e)=>{
                    setAmount(e.target.value)
                  }} type="number" placeholder="Enter amount" id="amount" className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"/>
                </div>
                <button onClick={async ()=>{
                  const res = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                    to: toId,
                    amount: amount
                  }, {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token")
                    }
                  })
                  setTransferMsg(res.data.message)
                  setTimeout(()=> {
                    navigate("/dashboard")
                  }, 2000)

                }} className="justify-center rounded-md text-sm font-medium bg-green-500 hover:bg-green-600 text-white h-10 w-full py-2 px-4">Initiate Transfer</button>
              </div>
            </div>
          </div>
        </div>
        {transferMsg && (<div className="text-center mt-5 bg-green-200 rounded-md py-3 text-green-800">
          {transferMsg}!
        </div>)}
      </div>
  </div>;
}
