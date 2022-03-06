/**
 * AnswersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  post: async (req, res) => {
    const { question_id, status, answered_by, verified_by } = req.allParams();
    console.log("req data", req.allParams());
    let qData = await Questions.find({ id: question_id });

    if (status)
      Questions.update({ id: question_id }).set({
        status,
      });

    if (answered_by)
      Questions.update({ id: question_id }).set({
        mufti: answered_by,
      });
    if (verifier)
      Questions.update({ id: question_id }).set({
        mufti: verified_by,
      });

    console.log("data", qData);
    res.ok("Done");
  },
};
