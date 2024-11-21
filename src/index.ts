import { AppDataSource } from "./db/data-source";
import * as express from "express";
import router from "./routes/user-routes";

const app = express();
const PORT = 3000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


AppDataSource.initialize()

  .then(async () => {
    console.log("Connected to db");
    app.use('/api', router);
  })

  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Сервер ожидает подключения на порту ${PORT}`);
});






// TODO Автоматический шаблон, удалить после того, как разберусь с созданием Юзера.

/* AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Alex"
    user.lastName = "Koloda"
    user.email = "ex@mail.com"
    user.password = "password"
    user.dateBirth = "11-11-2011"

    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error)) */