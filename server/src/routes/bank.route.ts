import { Router } from "express";
import { Request, Response } from "express";
import BankModel from "../models/bank.model";
import {
  checkUserId,
  validateBank,
  validatePaymentsMethods,
} from "../utils/validation";

export const bankRouter = Router();

// Get bank by user id
bankRouter.get("/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Check user id
    const checkResult = await checkUserId(userId);
    if (typeof checkResult === "string")
      return res.status(400).send(checkResult);

    // get bank
    const bank = await BankModel.findOne({
      userId,
    }).select("-_id -userId");

    // Response
    res.status(200).json(bank);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

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

// Update bank information by user id
bankRouter.put("/", async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    // Validate req body
    let validationResult = validateBank(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Check user id
    const checkResult = await checkUserId(userId);
    if (typeof checkResult === "string")
      return res.status(400).send(checkResult);

    // Update bank
    await BankModel.updateOne(
      { userId },
      {
        $set: req.body,
      }
    );

    // Response
    res.status(200).json("Bank updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update payments methods by user id
bankRouter.put("/methods", async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    // Validate req body
    let validationResult = validatePaymentsMethods(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Check user id
    const checkResult = await checkUserId(userId);
    if (typeof checkResult === "string")
      return res.status(400).send(checkResult);

    // Update bank
    await BankModel.updateOne(
      { userId },
      {
        $set: req.body,
      }
    );

    // Response
    res.status(200).json("Payments methods updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
