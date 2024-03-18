// src/controllers/balanceController.ts
import { Request, Response } from "express";
import { Balance } from "../models/balanceModel";

export const getBalances = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const balances = await Balance.find();
    res.json(balances);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateBalance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { currency, total, available, inOrder, lock, svgImage } = req.body;
    const balance = await Balance.findOneAndUpdate(
      { currency },
      { total, available, inOrder, lock, svgImage },
      { new: true, upsert: true }
    );

    // io.emit('balanceUpdated', balance);
    res.json(balance);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const currencies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Create a new instance of the Currency model with the request body
    const newCurrency = new Balance(req.body);

    // Save the new currency data to MongoDB
    const savedCurrency = await newCurrency.save();

    // Send a success response with the saved currency data
    res.status(201).json(savedCurrency);
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
