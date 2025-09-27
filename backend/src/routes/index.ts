import { Router } from "express";
import redacaoRoutes from "./redacaoRoutes";
import avaliacaoRoutes from "./avaliacaoRoutes";

const router = Router();

// Rotas de Reda��es
router.use("/redacoes", redacaoRoutes);

// Rotas de Avalia��es (aninhadas em Reda��es)
router.use("/redacoes", avaliacaoRoutes);

export default router;
