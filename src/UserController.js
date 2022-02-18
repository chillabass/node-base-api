const userService = require('./UserService').UserService;

class UserController {
  async signUp(request, response) {
    try {
      const responseBody = await userService.signUp(request.body);
      console.log(responseBody);
      return response.json(responseBody);
    } catch(e) {
      return response.status(500).json(e.message);
    }
  }
  async auth(request, response) {
    //console.log(`${request.body.name} try to authenticate`);
  }
  async getAll(request, response) {
    try {
      const responseBody = await userService.getAll();
      return response.json(responseBody);
    } catch(e) {
      return response.status(500).json(e.message);
    }
  }
  // async getUser(request, response) {
  //   console.log(`${request.body.name} try to signup`);
  // }
  // async deleteUser(request, response) {
  //   console.log(`${request.body.name} try to signup`);
  // }
}

module.exports.UserController = new UserController();