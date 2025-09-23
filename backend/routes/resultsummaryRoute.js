import express from "express";
import { resultSummary } from "../controllers/resultsummary";

const router = express.Router();

router.post("/", resultSummary);

export default router;
