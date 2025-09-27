import { Router } from "express";
import {
    listarRedacoes,
    obterRedacao,
    criarRedacao,
    atualizarRedacao,
    excluirRedacao,
} from "../controllers/redacaoController";
import { autenticar } from "../middleware/auth";

const router = Router();

// CRUD de reda��es
router.get("/", autenticar, listarRedacoes);
router.get("/:id", autenticar, obterRedacao);
router.post("/", autenticar, criarRedacao);
router.put("/:id", autenticar, atualizarRedacao);
router.delete("/:id", autenticar, excluirRedacao);

export default router;
