import express from "express";
import { summarize } from "../controllers/summary";

const router = express.Router();

router.post("/", summarize);

export default router;
