import * as express from "express";
import { Request, Response } from "express";
import mainRouter from "./routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Сервер ожидает подключения на порту ${PORT}`);
});