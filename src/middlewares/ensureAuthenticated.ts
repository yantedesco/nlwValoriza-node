import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
	sub: string;
}

export function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).end();
	}

	const [, token] = authToken.split(" ");

	try {
		const { sub } = verify(
			token,
			"05984237ffb64a1fc48bbec73eff6101"
		) as IPayload;

		req.user_id = sub;
		return next();
	} catch (err) {
		return res.status(401).end();
	}
}
