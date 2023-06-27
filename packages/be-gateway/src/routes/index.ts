import { Router } from "express";
import authRouter from "./auth";

const router = Router()

router.use(authRouter)

export default router
