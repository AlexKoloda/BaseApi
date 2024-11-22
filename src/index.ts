import * as express from "express";
import { Request, Response } from "express";
import mainRouter from "./routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//     allowedHeaders: ['Authorization', 'Content-Type'],
//     exposedHeaders: ['Authorization'],
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//   })
// );

app.use("/", mainRouter);
app.get('/',(_,res:Response)=>{res.send('working')})
app.listen(PORT, () => {
  console.log(`Сервер ожидает подключения на порту ${PORT}`);
});

