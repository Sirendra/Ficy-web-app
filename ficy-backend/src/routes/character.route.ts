import { Router } from "express";
import * as controller from "../controllers/chracter.controller";

const router = Router();

router.get("/", controller.getPaginated);
router.get("/search", controller.search);
router.get("/:id", controller.getById);
router.post("/", controller.getByIds);

export default router;
