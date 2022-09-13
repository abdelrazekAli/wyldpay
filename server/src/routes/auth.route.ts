import bcrypt from "bcrypt";
import { Router } from "express";
import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { validateUser } from "../utils/validation";

export const authRouter = Router();

// Register
authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    // Validate req body
    let validationResult = validateUser(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Check if email unique
    let emailCheck = await UserModel.findOne({ email: req.body.email });
    if (emailCheck) return res.status(409).send("email is already used");

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new UserModel({ ...req.body, password: hashedPassword });

    // Save user
    const user = await newUser.save();

    // Response
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
