import * as express from 'express';
import mainRouter from './routes';
import { CustomError } from './util/custom-errors';
import './config';
import conf from './config';


const app = express();
const PORT = conf.server.port || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', mainRouter);

app.use((err: Error, _req, res, _next) => {
  if (err instanceof CustomError) {
    return res
      .status(err.status)
      .json({ message: err.message, data: err.payload });
  }

  res.status(500).json({ message: 'Server internal error' });
});

app.listen(PORT, () => {
  console.log(`Сервер ожидает подключения на порту ${PORT}`);
});
