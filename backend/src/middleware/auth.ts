import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const autenticar = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ erro: "Token ausente" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto") as any;
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        return next();
    } catch {
        return res.status(401).json({ erro: "Token inválido" });
    }
};
