import { Router } from "express";
import { Request, Response } from "express";
import BankModel, { BankProps } from "../models/bank.model";
import { verifyAuth } from "../middlewares/token.auth.middleware";
import {
  checkUserId,
  validateBank,
  validatePaymentkeys,
} from "../utils/validation";

export const bankRouter = Router();

// Get bank by user id
bankRouter.get("/", verifyAuth, async (req: Request, res: Response) => {
  const userId = req.user._id;

  try {
    // Check user id
    const checkResult = (await checkUserId(userId)) as string | null;
    if (typeof checkResult === "string")
      return res.status(400).send(checkResult);

    // get bank
    const bank = (await BankModel.findOne({
      userId,
    }).select("-_id -userId")) as BankProps;

    // Response
    res.status(200).json(bank);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Post new bank informaton
bankRouter.post("/", async (req: Request, res: Response) => {
  // Validate req body
  let validationResult = validateBank(req.body);
  if (validationResult)
    return res.status(400).send(validationResult.details[0].message);

  try {
    // Create new bank
    const newBank = new BankModel(req.body);

    // Save bank
    const bank = (await newBank.save()) as BankProps;

    // Response
    res.status(200).json(bank);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update bank information by user id
bankRouter.put("/", verifyAuth, async (req: Request, res: Response) => {
  const userId = req.user._id;

  // Validate req body
  let validationResult = validateBank(req.body);
  if (validationResult)
    return res.status(400).send(validationResult.details[0].message);

  try {
    // Check user id
    const checkResult = (await checkUserId(userId)) as string | null;
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
bankRouter.put("/methods", verifyAuth, async (req: Request, res: Response) => {
  const userId = req.user._id;

  // Validate req body
  let validationResult = validatePaymentkeys(req.body);
  if (validationResult)
    return res.status(400).send(validationResult.details[0].message);

  try {
    // Check user id
    const checkResult = (await checkUserId(userId)) as string | null;
    if (typeof checkResult === "string")
      return res.status(400).send(checkResult);

    // Update bank
    await BankModel.updateOne(
      { userId },
      {
        $set: {
          "paymentsMethods.$[elem].publicKey": req.body.publicKey,
          "paymentsMethods.$[elem].secretKey": req.body.secretKey,
        },
      },
      { arrayFilters: [{ "elem.name": req.body.name }] }
    );

    // Response
    res.status(200).json("Payments methods updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
