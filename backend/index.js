require("dotenv").config(); //  Загружает переменные окружения из файла .env в process.env.
const config = require("./config.json"); // Импортирует конфигурационный файл, содержащий параметры, такие как строка подключения к базе данных.
const mongoose = require("mongoose"); //  Импортирует Mongoose, который используется для взаимодействия с MongoDB.
const express = require("express"); // Импортирует Express, который является веб-фреймворком для Node.js.
const cors = require("cors"); // Импортирует middleware для обработки CORS.
const jwt = require("jsonwebtoken"); // Импортирует библиотеку для работы с JSON Web Tokens.
const { authenticateToken } = require("./utilities"); //  Импортирует функцию authenticateToken из файла utilities.
const User = require("./models/user.model");
const Food = require("./models/food.model");
// Импортирует модель пользователя для работы с MongoDB.

mongoose.connect(config.connetionString);
// Подключение к базе данных MongoDB с использованием строки подключения, указанной в конфигурационном файле.

const app = express();
// Создает экземпляр Express приложения.

app.use(express.json());
// Добавляет middleware для обработки JSON тел в запросах.
app.use(
  cors({
    origin: "*",
  })
);
//  Настраивает CORS, чтобы разрешить запросы с любого домена.

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});
// Определяет маршрут для корневого URL, который возвращает JSON с данными ".....".

//
//
//
//

//Create Accaunt
app.post("/create-accaunt", async (req, res) => {
  const { fullname, email, password, userBoss } = req.body;
  // Извлекает fullname, email и password из тела запроса.

  if (!fullname) {
    return res.status(400).json({ error: true, message: "Full name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ error: true, message: "Password required" });
  }
  // Если какое-либо из обязательных полей отсутствует, возвращает статус 400 (Bad Request) с соответствующим сообщением.

  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res.json({
      error: true,
      message: "user allready exist",
    });
  }
  // Проверяет, существует ли пользователь с указанным email. Если существует, возвращает сообщение о том, что пользователь уже зарегистрирован.

  const user = new User({
    fullname,
    email,
    password,
    userBoss,
  });
  await user.save();
  // Создает нового пользователя с указанными данными и сохраняет его в базе данных.

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });
  // Создает JSON Web Token для пользователя с секретным ключом и сроком действия.

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
    email,
    fullname,
    userBoss,
  });
  // Возвращает ответ с данными пользователя, токеном и сообщением об успешной регистрации.
});
//
//
//
//
// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  if (userInfo.password !== password) {
    return res.status(400).json({
      error: true,
      message: "Invalid email or password",
    });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    const { createdOn, fullname, _id, userBoss } = userInfo;

    return res.json({
      error: false,
      message: "login successful",
      email,
      accessToken,
      createdOn,
      fullname,
      _id,
      userBoss,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid email or password",
    });
  }
});
//
//
//
//
//Get User
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;
  console.log(user, "asd");

  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.sendStatus(401);
  }
  return res.json({
    user: {
      fullName: isUser.fullname,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
      userBoss: isUser.userBoss,
    },
    message: "",
  });
});
//
//
//
//
// Add Food
app.post("/add-food", authenticateToken, async (req, res) => {
  const { name, price, desc, type } = req.body;
  const { user } = req.user;

  if (!name) {
    return res.status(400).json({ error: true, message: "name is required" });
  }

  if (!price) {
    return res.status(400).json({ error: true, message: "price is required" });
  }
  if (!desc) {
    return res.status(400).json({ error: true, message: "desc is required" });
  }
  if (!type) {
    return res.status(400).json({ error: true, message: "type is required" });
  }

  try {
    // Проверка на наличие блюда с таким же именем и userId
    const existingFood = await Food.findOne({ name, userId: user._id });
    if (existingFood) {
      return res.status(400).json({ error: true, message: "Food with this name already exists" });
    }

    const food = new Food({
      name,
      price,
      desc,
      type,
      userId: user._id,
    });

    await food.save();

    return res.json({
      error: false,
      message: "food added successfully",
      food,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
});
//
//
//
//
// Get All Foods
app.get("/get-all-foods", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const foods = await Food.find();

    return res.json({
      error: false,
      count: foods.length,
      foods,
      message: "All foods retrived successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "internal Server Error",
    });
  }
});
//
//
//
//
// Get Food By Type
app.get("/get-all-foods/:type", authenticateToken, async (req, res) => {
  const type = req.params.type;
  const { user } = req.user;

  try {
    const foods = await Food.find({ type: type });

    if (foods.length === 0) {
      return res.status(404).json({ error: true, message: "Foods by type not found" });
    }

    return res.json({
      error: false,
      count: foods.length,
      foods,
      message: "All foods retrived successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "internal Server Error",
    });
  }
});
//
//
//
//
// Delete Food
app.delete("/delete-food/:foodId", authenticateToken, async (req, res) => {
  const foodId = req.params.foodId;
  const { user } = req.user;
  if (!user.userBoss) {
    return res.status(403).json({ error: true, message: "You do not have permission to delete this food." });
  }
  try {
    const food = await Food.findOne({ _id: foodId });

    if (!food) {
      return res.status(404).json({ error: true, message: "Food not found" });
    }
    await Food.deleteOne({ _id: foodId });

    return res.json({
      error: false,
      message: "Food deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Invalid server error" });
  }
});
//
//
//
//
//Edit Food
app.put("/edit-food/:id", authenticateToken, async (req, res) => {
  const foodId = req.params.id;
  const { name, price, desc, type } = req.body;
  const { user } = req.user;

  if (!name && !price && !desc && !type) {
    return res.status(400).json({ error: true, message: "No Changes provided" });
  }
  if (!user.userBoss) {
    return res.status(403).json({ error: true, message: "You do not have permission to delete this food." });
  }

  try {
    const food = await Food.findOne({ _id: foodId });

    if (!food) {
      return res.status(404).json({ error: true, message: "Food not found" });
    }

    if (name) {
      food.name = name;
    }
    if (price) {
      food.price = price;
    }
    if (desc) {
      food.desc = desc;
    }
    if (type) {
      food.type = type;
    }

    await food.save();

    return res.json({
      error: false,
      food,
      message: "Food updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});
//
//
//
//

app.listen(8000);
// Запускает сервер и заставляет его слушать входящие запросы на порту 8000.

module.exports = app;
// Экспортирует экземпляр приложения Express, чтобы его можно было использовать в других файлах (например, для тестирования).
