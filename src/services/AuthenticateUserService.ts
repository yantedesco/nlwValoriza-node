import { getCustomRepository } from "typeorm";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UserRepository } from "../repositories/UserRepository";

interface IAuthenticateRequest {
	email: string;
	password: string;
}

class AuthenticateUserService {
	async execute({ email, password }: IAuthenticateRequest) {
		const userRepository = getCustomRepository(UserRepository);

		const user = await userRepository.findOne({ email });

		if (!user) {
			throw new Error("Email/Password incorrect");
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new Error("Email/Password incorrect");
		}

		const token = sign(
			{
				email: user.email,
			},
			"05984237ffb64a1fc48bbec73eff6101",
			{
				subject: user.id,
				expiresIn: "1d",
			}
		);
		return token;
	}
}

export { AuthenticateUserService };
