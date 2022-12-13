import express from "express";
import { list } from "../controllers/categoriesController.js"; 

const router = express.Router();

router.get('/categories', list);

export default router;