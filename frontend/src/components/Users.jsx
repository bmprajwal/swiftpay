import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users() {
	const [users, setUsers] = useState([]);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		axios
			.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				setUsers(res.data.users);
			});
	}, [filter]);

	let id;
	function handleInputChange(e) {
		
		clearTimeout(id);
		id = setTimeout(() => {
			setFilter(e.target.value)
		}, 500);
	}
	return (
		<div className="px-4 py-2">
			<div className="font-bold text-lg mt-6">Users</div>
			<div className="my-2">
				<input
					type="text"
					placeholder="Search users..."
					className="w-full px-2 py-1 border rounded border-slate-200"
					onChange={handleInputChange}
				/>
			</div>
			<div>
				{users.map((user) => (
					<User user={user} />
				))}
			</div>
		</div>
	);
}

function User({ user }) {
	const navigate = useNavigate();
	return (
		<div className="flex justify-between py-2 my-4">
			<div className="flex">
				<div className="flex justify-center bg-slate-200 rounded-full h-12 w-12 ">
					<div className="flex flex-col justify-center">
						{user.firstName[0]}
					</div>
				</div>
				<div className="pl-4 flex flex-col justify-center h-full">
					{user.firstName} {user.lastName}
				</div>
			</div>
			<div className="flex flex-col justify-center h-full">
				<Button
					onClick={(e) => {
						navigate(
							`/send?id=${user._id}&firstName=${user.firstName}&lastName=${user.lastName}`
						);
					}}
					label={"Send money"}
				/>
			</div>
		</div>
	);
}
