const userService = require('./UserService').UserService;

class UserController {
  async signUp(request, response) {
    console.log(`${request.body.fullName} try to signup`);
    const responseBody = userService.signUp(request.body);
    response.send(responseBody);
  }
  async auth(request, response) {
    //console.log(`${request.body.name} try to authenticate`);
  }
  async getAll(request, response) {
    console.log(`somebody try to get all users`);
    const responseBody = userService.getAll();
    response.send(responseBody);
  }
  // async getUser(request, response) {
  //   console.log(`${request.body.name} try to signup`);
  // }
  // async deleteUser(request, response) {
  //   console.log(`${request.body.name} try to signup`);
  // }
}

module.exports.UserController = new UserController();