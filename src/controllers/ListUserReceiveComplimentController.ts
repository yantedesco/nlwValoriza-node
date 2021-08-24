import { Request, Response } from "express";
import { ListUserReceiverComplimentService } from "../services/ListUserReceiverComplimentService";

class ListUserReceiveComplimentController {
	async handle(req: Request, res: Response) {
		const { user_id } = req;

		const listUserReceiverComplimentService =
			new ListUserReceiverComplimentService();

		const compliments = await listUserReceiverComplimentService.execute(
			user_id
		);

		return res.json(compliments);
	}
}

export { ListUserReceiveComplimentController };
