/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Joi = require("joi");
const clientID =
  "756091233237-qdi6vep1g8h25n2o6dmcp6n3vv7t41fi.apps.googleusercontent.com";
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(clientID);

module.exports = {
  authGoogle: async (req, res) => {
    const { token, email, name, id, photoUrl } = req.body;
    console.log("Req Body", req.body);
    // const ticket = await client.verifyIdToken({
    //   idToken: token,
    //   audience: clientID,
    // });
    // const googleData = ticket.getPayload();
    // let email = googleData.email;
    // let name = googleData.name;
    try {
      const user = await User.findOne({ email });
      console.log("Userrr", user);
      if (!user) {
        await User.create({
          email,
          name,
          google_id: id,
          profile_pic: photoUrl,
          user_type: 3,
        });
        const user = await User.findOne({ email });
        res.ok(user);
      } else {
        // const token = await JWTService.issuer({ user: user.id }, "1 day");
        // return res.ok({ token: token });
        return res.ok(user);
      }
    } catch (error) {
      console.log("Error", error.details);
      return res.serverError({
        data: [],
        message: error.details,
        status: false,
      });
    }
  },

  /**
   * `UserController.signup()`
   */

  signup: async function (req, res) {
    try {
      const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string()
          .required()
          .min(3)
          .max(7)
          .pattern(/^[a-zA-Z0-9]/),
      });
      const { email, password } = await schema.validateAsync(req.allParams());
      const encryptedPassword = await UtilService.hashPassword(password);
      const userExist = await User.find({ email: email });
      if (userExist.length) {
        res.status(400);
        return res.json("User already exists!");
      }
      const user = await User.create({ email, password: encryptedPassword });
      return res.ok(user);
    } catch (err) {
      console.log("err.name = ", err.name);
      if (err.name == "ValidationError") {
        return res.badRequest(err);
      }
      return res.serverError(err);
    }
  },

  /**
   * `UserController.login()`
   */
  login: async function (req, res) {
    try {
      console.log("req.allParams()", req.allParams());
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });
      const { email, password } = await schema.validateAsync(req.allParams());
      const user = await User.findOne({ email });

      if (!user) {
        return res.json({
          data: [],
          message: "No User Found",
          status: false,
        });
      }
      const matchPassword = password === user.password;
      if (!matchPassword) {
        return res.json({
          data: [],
          message: "Password didn't matched",
          status: false,
        });
      }
      // const token = await JWTService.issuer({ user: user.id }, "10 day");
      // return res.ok({ token: token });
      return res.ok({ data: user, message: "success", status: true });
    } catch (err) {
      if (err.name == "ValidationError") {
        return res.json({
          data: [],
          message: err.details[0].message,
          status: false,
        });
      }
      return res.serverError(err);
    }
  },
  // Check Mail for User
  checkMail: async function (req, res) {
    try {
      console.log("req.allParams()", req.allParams());
      const schema = Joi.object({
        email: Joi.string().email().required(),
      });
      const { email } = await schema.validateAsync(req.allParams());
      const user = await User.findOne({
        where: { email },
        select: ["email", "profile_pic"],
      });

      console.log("user", user);

      if (!user) {
        return res.json({
          data: [],
          message: "No User Found",
          status: false,
        });
      }
      return res.json({
        data: user,
        message: "Success",
        status: true,
      });
    } catch (err) {
      if (err.name == "ValidationError") {
        return res.json({
          data: [],
          message: err.details[0].message,
          status: false,
        });
      }
      return res.serverError(err);
    }
  },

  /**
   * `UserController.dashboardDataSets()`
   */
  dashboardDataSets: async function (req, res) {
    let response = {};
    response.mustafthies = await User.count({ user_type: 3 });
    response.questions = await Questions.count();
    response.pending = await Questions.count({ status: 1 });
    response.answered = await Questions.count({ status: 10 });
    response.rejected = await Questions.count({ status: 2 });
    return res.ok(response);
  },
};
