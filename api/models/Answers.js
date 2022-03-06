/**
 * Answers.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    question_id: { type: "number" },
    answer: { type: "string" },
    reference: { type: "json" },
    status: { model: "QuestionStatus" },
    answered_by: { model: "User" },
    answered_date: { type: "ref", columnType: "datetime" },
    verified_by: { model: "User" },
    verified_date: { type: "ref", columnType: "datetime" },
  },
};
