/**
 * QuestionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Joi = require("joi");

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

  get: async (req, res) => {
    try {
      let result = await Questions.find();
      res.ok(result);
    } catch (err) {
      res.serverError(err);
    }
  },

  update: async (req, res) => {
    try {
      console.log("Req Data ", req.allParams());
      const { status, mufti, mufti_answered } = req.query;

      const { id, answer, reference, nextStatus, verified_by } =
        req.allParams();

      const populatedList = [
        "madhab",
        "category",
        "user_id",
        "sub_category",
        "language",
        "status",
        "mufti",
        "verifier",
        "reject_by",
        "reject_reason",
      ];
      if (status == 1) {
        Questions.update({ id })
          .set({
            status: 4,
          })
          .fetch()
          .exec((err, rex) => {
            Questions.find({ id })
              .populate(populatedList)
              .then((rez) => {
                return res.ok(rez);
              });
          });
      } else if (status == 4) {
        Questions.update({ id })
          .set({
            status: 5,
            mufti,
          })
          .fetch()
          .exec((err, rex) => {
            Questions.find({ id })
              .populate(populatedList)
              .then((rez) => {
                return res.ok(rez);
              });
          });
      } else if (status == 5) {
        Questions.update({ id })
          .set({
            status: nextStatus,
            mufti,
            mufti_answered: 1,
          })
          .fetch()
          .exec(async (err, res1) => {
            console.log("Auestions res", err, res1);
            let result = await Answers.find({ id });

            console.log("result", result);
            console.log("answer", answer);
            if (!result.length) {
              await Answers.create({
                question_id: id,
                answer: answer,
                reference,
                status: nextStatus,
                answered_by: mufti,
              }).fetch();
              return res.ok("Done");
            }
          });
      } else if (status == 6) {
        Answers.update({ id })
          .set({
            answer,
            reference,
            status: nextStatus,
            verified_by,
          })
          .fetch()
          .exec((err, rez) => {
            Answers.find({ id })
              .populate("status")
              .populate("answered_by")
              .populate("verified_by")
              .then((ress) => {
                Questions.update({ id })
                  .set({
                    status: nextStatus,
                    verifier: verified_by,
                  })
                  .fetch()
                  .exec((err1, res1) => {
                    return res.ok(res1);
                  });
              });
          });
      } else if (status == 7) {
        Questions.update({
          id,
        })
          .set({ status: 8 })
          .fetch()
          .exec((err, response) => {
            Questions.find({ id })
              .populate(populatedList)
              .then((rez) => {
                return res.ok(rez);
              });
          });
      }
    } catch (err) {
      res.serverError(err);
    }
  },
};
