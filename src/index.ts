import { AppDataSource } from "./db/data-source";
import * as express from "express";
import mainRouter from "./routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AppDataSource.initialize()

  .then(async () => {
    console.log("Connected to db");
  })

  .catch((error) => console.log(error));

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Сервер ожидает подключения на порту ${PORT}`);
});
