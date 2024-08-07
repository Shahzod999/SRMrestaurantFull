import axios from "axios";
// import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
// axios.create: метод для создания нового экземпляра Axios с заданными настройками.
// baseURL: базовый URL для всех запросов, сделанных с использованием этого экземпляра Axios. Все запросы будут относительными к этому URL.
// timeout: максимальное время ожидания ответа (в миллисекундах). В данном случае 10 секунд.
// headers: заголовки, которые будут включены в каждый запрос по умолчанию. Здесь указано, что контент будет в формате JSON.

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log(config.headers.Authorization, "Authorization Header");
    } else {
      console.log("No access token found");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// axiosInstance.interceptors.request.use: метод для добавления интерцепторов запросов.
// (config): функция, вызываемая перед отправкой каждого запроса.
// config: объект конфигурации запроса.
// localStorage.getItem("token"): получение токена из локального хранилища браузера.
// config.headers.Authorization: добавление токена в заголовок Authorization, если токен существует. Это необходимо для аутентификации запросов.
// return config: возвращает изменённый объект конфигурации запроса.
// (error): функция, вызываемая при ошибке.
// return Promise.reject(error): отклоняет промис с ошибкой, чтобы она могла быть обработана в других местах.

export default axiosInstance;

// Подробное объяснение:
// Создание экземпляра Axios:

// Новый экземпляр Axios создается с предустановленными настройками, такими как baseURL, timeout и заголовки по умолчанию. Это позволяет не указывать эти параметры каждый раз при выполнении запроса.
// Интерцептор запросов:

// Интерцептор запросов добавляется для того, чтобы автоматически добавлять токен аутентификации к каждому запросу, если он доступен в локальном хранилище.
// Зачем это нужно: Многие API требуют аутентификации с использованием токенов. Этот токен часто передается в заголовке Authorization каждого запроса. Интерцептор позволяет автоматически добавлять этот заголовок ко всем запросам, избавляя от необходимости делать это вручную.
// Обработка ошибок:

// Если при установке конфигурации запроса происходит ошибка, она отклоняется и может быть обработана в других частях кода, где вызываются запросы.
