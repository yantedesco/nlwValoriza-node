import "reflect-metadata";
import express, { Request, Response, NextFunction, response } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";

import "./database";

const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof Error) {
		return res.status(400).json({
			error: err.message,
		});
	}

	return response.status(500).json({
		status: "error",
		message: "Internal Server Error",
	});
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
