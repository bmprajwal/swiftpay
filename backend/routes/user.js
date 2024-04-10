require("dotenv").config()
const express = require("express");
const { z } = require("zod");
const { User, Account } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");

const signupBody = z.object({
	username: z.string().email(),
	firstName: z.string(),
	lastName: z.string(),
	password: z.string(),
});

router.post("/signup", async (req, res) => {
	const { success } = signupBody.safeParse(req.body);
	if (!success) {
		return req.status(411).json({
			message: "Email already taken / Invalid inputs",
		});
	}

	const existingUser = await User.findOne({ username: req.body.username });
	if (existingUser) {
		return res.status(411).json({
			message: "Username already taken / Incorrect inputs",
		});
	}

	const user = await User.create({
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
	});

	const userId = user._id;
	await Account.create({
		userId,
		balance: 1 + Math.random() * 10000,
	});

	const token = jwt.sign({ userId }, process.env.JWT_SECRET);
	res.status(200).json({
		message: "User created successfully",
		token: token,
	});
});

const signinBody = z.object({
	username: z.string().email(),
	password: z.string(),
});

router.post("/signin", async (req, res) => {
	const { success } = signinBody.safeParse(req.body);
	if (!success) {
		return res.status(411).json({
			message: "Error while logging in",
		});
	}

	const user = await User.findOne({
		username: req.body.username,
		password: req.body.password,
	});

	if (user) {
		const token = jwt.sign(
			{
				userId: user._id,
			},
			process.env.JWT_SECRET
		);

		res.json({
			token: token,
		});
		return;
	}

	res.status(411).json({
		message: "Error while logging in",
	});
});

const updateBody = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	password: z.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
	const { success } = updateBody.safeParse(req.body);
	if (!success) {
		return res.status(411).json({
			message: "Error while updating information",
		});
	}

	try {
		await User.updateOne({ _id: req.userId }, req.body);

		res.status(200).json({
			message: "Updated successfully",
		});
	} catch (error) {
		res.status(411).json({
			message: "Error while updating information",
		});
	}
});

router.get("/bulk", async (req, res) => {
	const filter = req.query.filter || "";

	const users = await User.find({
		$or: [
			{
				firstName: {
					"$regex": filter,
				},
			},
			{
				lastName: {
					"$regex": filter,
				},
			},
		],
	});
	
	res.status(200).json({
		users: users.map((user) => ({
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			_id: user._id,
		})),
	});
});

module.exports = router;
