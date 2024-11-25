import * as express from "express";
import mainRouter from "./routes";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Сервер ожидает подключения на порту ${PORT}`);
});