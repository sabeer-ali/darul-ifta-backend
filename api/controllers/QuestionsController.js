/**
 * QuestionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Joi = require("joi");
// const Questions = require("../models/Questions");

module.exports = {
  searchQuestions: async (req, res) => {
    let { key } = req.allParams();
    let query =
      "SELECT * FROM questions LEFT JOIN answers ON questions.id = answers.question_id";
    if (key) {
      query += ` where questions.question LIKE "%${key}%"  OR answers.answer LIKE "%${key}%" `;
    }
    Questions.query(query, function (err, rawResult) {
      if (err) {
        return res.serverError(err);
      }
      return res.ok(rawResult.rows);
    });
  },

  counts: async (req, res) => {
    const { id } = req.allParams();
    let result = {
      answered: 0,
      pending: 0,
      rejected: 0,
      total: 0,
    };
    const total = await Questions.count({
      where: { user_id: id },
    });
    const pending = await Questions.count({
      where: { user_id: id, mufti: null, verifier: null },
    });
    const answered = await Questions.count({
      where: { user_id: id, mufti: { "!=": null }, verifier: { "!=": null } },
    });
    const rejected = await Questions.count({
      where: {
        user_id: id,
        mufti: null,
        verifier: null,
        reject_by: { "!=": null },
      },
    });

    result.total = total;
    result.pending = pending;
    result.answered = answered;
    result.rejected = rejected;
    return res.ok(result);
  },

  getQuestionStatusCounts: (req, res) => {
    // let response = {};
    // response.mustafthies = await Questions.count({ user_type: 3 });
    // response.mustafthies = await Questions.count({ user_type: 3 });
    // response.mustafthies = await Questions.count({ user_type: 3 });
  },
};
