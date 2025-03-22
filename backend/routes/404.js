import { Router } from "express";
const router = Router();

router.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Api endpoint does not exist",
    });
});

export default router;