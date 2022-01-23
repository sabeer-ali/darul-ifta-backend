/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 const Joi = require('joi');

module.exports = {
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
      const token = await JWTService.issuer({user:user.id},'1 day');
      return res.ok({token:token})
    } catch (err) {
      if (err.name == "ValidationError") {
        return res.badRequest(err);
      }
      return res.serverError(err);
    }
  }


};

