import { AppDataSource } from "./db/dataSource";
import * as express from "express";
/* import allRoutes from "./routes/routes"; */

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(allRoutes);

AppDataSource.initialize()

  .then(async () => {
    console.log("Connected to db");
  })

  .catch((error) => console.log(error));

app.listen(3000, function () {
  console.log("Сервер ожидает подключения...");
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