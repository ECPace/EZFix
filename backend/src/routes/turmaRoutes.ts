import { Router } from "express";
import { autenticar } from "../middleware/auth";
import { isProfessor } from "../middleware/checkProfessor";
import {
    criarTurma,
    adicionarAluno,
    listarTurmasProfessor,
    listarRedacoesDaTurma,
    listarAlunosDaTurma,
    listarTurmasAluno
} from "../controllers/turmaController";

const router = Router();

// Todas as rotas aqui s�o privadas e exigem autentica��o
router.use(autenticar);

// --- Rotas de Professor ---
router.post("/", isProfessor, criarTurma);
router.post("/matricular", isProfessor, adicionarAluno);
router.get("/professor", isProfessor, listarTurmasProfessor);

// --- Rota do Aluno ---
// Coloque a rota espec�fica "/aluno" ANTES de rotas gen�ricas com par�metros.
router.get("/aluno", listarTurmasAluno);

// --- Rotas de Professor (com par�metros) ---
// (Estas devem vir DEPOIS de rotas espec�ficas como "/aluno")
router.get("/:turmaId/redacoes", isProfessor, listarRedacoesDaTurma);
router.get("/:turmaId/alunos", isProfessor, listarAlunosDaTurma);


export default router;