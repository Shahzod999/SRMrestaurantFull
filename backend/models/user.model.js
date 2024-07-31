const mongoose = require("mongoose");
//удобный способ взаимодействия с MongoDB базой данных. Она предоставляет инструменты для моделирования данных, проверки их целостности и выполнения CRUD
const Schema = mongoose.Schema;
//Эта строка кода извлекает конструктор Schema из mongoose. Схема в Mongoose используется для определения структуры документов в коллекции MongoDB.

const userSchema = new Schema({
  fullname: { type: String },
  email: { type: String },
  password: { type: String },
  createdOn: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("User", userSchema);
//mongoose.model("User", userSchema): Этот метод создает модель с именем "User" на основе userSchema. Модель - это конструктор, который позволяет создавать новые документы в коллекции MongoDB и выполнять с ними различные операции.
