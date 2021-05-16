import express from "express";
import { queryUsers } from "./db";

export const getUsers = async (req: express.Request, res: express.Response) => {
  return res.status(200).json(await queryUsers());
};
