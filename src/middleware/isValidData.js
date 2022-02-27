'use strict'

module.exports = (request, response, next) => {
  try {
    const { fullName, email, dateOfBirth } = request.body;
    // проверка имени
    if (fullName) {
      const isValidName = fullName.match(/^[A-Za-zА-Яа-я -]+$/i);
      if (!isValidName) {
        return response.status(403).json('Name is not valid!');
      }
    }
    // проверка почты
    if (email) {
      const isValidEmail = email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
      if (!isValidEmail) {
        return response.status(403).json('Email is not valid!');
      }
    }
    // проверка даты
    if (dateOfBirth) {
      if (isNaN(Date.parse(dateOfBirth))) {
        return response.status(403).json('Date is not valid!');
      }
    }
    next();
  } catch (e) {
    console.log(e.message);
    response.status(500).json('Something went wrong!');
  }
}