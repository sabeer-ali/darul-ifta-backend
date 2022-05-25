/**
 * AnswersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  post: async (req, res) => {
    const { answer, reference, question_id, status, answered_by, verified_by } =
      req.allParams();

    if (status)
      await Questions.update({ id: question_id }).set({
        status: status,
      });

    if (answered_by)
      await Questions.update({ id: question_id }).set({
        mufti: answered_by,
      });
    if (verified_by)
      await Questions.update({ id: question_id }).set({
        verifier: verified_by,
      });

    await Answers.find({ where: { question_id } }).exec(async (err, data) => {
      console.log("ERR, DAta", err, data, !data.length);
      if (!data.length) {
        await Answers.create({
          question_id,
          answer,
          reference,
          status,
          answered_by,
          verified_by,
        }).fetch();
      }
    });

    let resultData = await Answers.find({ where: { question_id } });
    res.ok(resultData);
  },
};
