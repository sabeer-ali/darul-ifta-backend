/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Joi = require('joi');
const clientID = "756091233237-qdi6vep1g8h25n2o6dmcp6n3vv7t41fi.apps.googleusercontent.com"
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(clientID);

module.exports = {
  authGoogle: async (req, res) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientID,
    });
    const googleData = ticket.getPayload();
    let email = googleData.email;
    let name = googleData.name;
    const user = await User.findOne({ email });
    if (!user) {
      await User.create({ email, name });
    } else {
      const token = await JWTService.issuer({ user: user.id }, '1 day');
      return res.ok({ token: token })
    }
  },

  /**
   * `UserController.signup()`
   */

  signup: async function (req, res) {
    try {
      const schema = Joi.object({
        email: Joi.string()
          .required()
          .email(),
        password: Joi.string()
          .required()
          .min(3)
          .max(7)
          .pattern(/^[a-zA-Z0-9]/)
      });
      const { email, password } = await schema.validateAsync(req.allParams());
      const encryptedPassword = await UtilService.hashPassword(password);
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
      const schema = Joi.object({
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string().required()
      });
      const { email, password } = await schema.validateAsync(req.allParams());
      const user = await User.findOne({ email });
      if (!user) {
        return res.notFound();
      }
      const matchPassword = await UtilService.comparePassword(
        password,
        user.password
      );
      if (!matchPassword) {
        return res.badRequest({ err: "Unauthorized" });
      }
      const token = await JWTService.issuer({ user: user.id }, '10 day');
      return res.ok({ token: token })
    } catch (err) {
      if (err.name == "ValidationError") {
        return res.badRequest(err);
      }
      return res.serverError(err);
    }
  },

  /**
   * `UserController.dashboardDataSets()`
   */
  dashboardDataSets: async function (req, res) {
    let response = {}
    response.mustafthies = await User.count({ user_type: 3 });
    response.questions = await Questions.count();
    response.pending = await Questions.count({ status: 1 });
    response.answered = await Questions.count({ status: 10 });
    response.rejected = await Questions.count({ status: 2 });

    return res.ok(response)
  }


};

