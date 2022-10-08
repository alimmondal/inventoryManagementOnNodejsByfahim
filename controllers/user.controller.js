const { signupService, loginService } = require("../services/user.service");

exports.signup = async (req, res) => {
  try {
    const user = await signupService(req.body);

    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

/*
 *1. check if email and password are given
 *2. Load user with email
 *3. if not user send res
 *4. compare password
 *5. if password not correct send res
 *6. check if user is active
 *7. if not active send res
 *8. generate token
 *9. send user and token
 */
exports.login = async (req, res) => {
  try {
    const user = await loginService(req.body);

    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};
