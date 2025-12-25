import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export function createUser(req, res) {
	const data = req.body;

	const hashedPassword = bcrypt.hashSync(data.password, 10);

	const user = new User({
		email: data.email,
		firstName: data.firstName,
		lastName: data.lastName,
		password: hashedPassword,
		role: data.role,
	});

	user.save().then(() => {
		res.json({
			message: "User created successfully",
		});
	});
}

export async function loginUser(req, res) {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({
				message: "User not found",
			});
		}
		const isPasswordCorrect = bcrypt.compareSync(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(401).json({
				message: "Invalid password",
			});
		}

		const payload = {
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.role,
			isEmailVerified: user.isEmailVerified,
			image: user.image,
		};

		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "150h",
		});

		return res.status(200).json({
			message: "Login successful",
			token,
			role: user.role,
		});

	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Server error",
		});
	}
}

export function isAdmin(req) {
	if (req.user == null) {
		return false;
	}
	if (req.user.role != "admin") {
		return false;
	}

	return true;
}

//add try catch for async-await
