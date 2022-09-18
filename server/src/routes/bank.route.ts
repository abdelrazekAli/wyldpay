import { Router } from "express";
import { Request, Response } from "express";
import BankModel from "../models/bank.model";
import { validateBank } from "../utils/validation";

export const bankRouter = Router();

// Post new bank informaton
bankRouter.post("/", async (req: Request, res: Response) => {
  try {
    // Validate req body
    let validationResult = validateBank(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Create new bank
    const newBank = new BankModel(req.body);

    // Save bank
    const bank = await newBank.save();

    // Response
    res.status(200).json(bank);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
