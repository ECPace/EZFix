import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index";
import avaliacaoRoutes from './routes/avaliacaoRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/avaliacoes', avaliacaoRoutes);

export default app;