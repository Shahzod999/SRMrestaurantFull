const jwt = require("jsonwebtoken");

// JSON Web Token (JWT). JWT - это компактный и безопасный способ передачи информации между сторонами в виде JSON объекта.

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // Если заголовок авторизации существует, то он разбивается по пробелу, и извлекается вторая часть, которая является самим токеном. Если заголовка нет, то token будет undefined.

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // ниже обьяснения
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
    // next (NextFunction): Функция, которая вызывается для передачи управления следующему middleware в цепочке.
  });
}

module.exports = {
  authenticateToken,
};

// Функция jwt.verify проверяет подлинность токена.

// token: Токен, который необходимо проверить.
// process.env.ACCESS_TOKEN_SECRET: Секретный ключ, используемый для проверки подписи токена. Этот ключ должен быть установлен в переменных окружения.
// Колбэк функция: Получает два параметра:
// err: Ошибка, если токен недействителен или произошла другая ошибка.
// user: Декодированная информация о пользователе, если токен действителен.
