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
    book_name: { type: "json" },
    page_no: { type: "json" },
    volume: { type: "json" },
    quote: { type: "json" },
    status: { model: "QuestionStatus" },
    answered_by: { model: "User" },
    answered_date: { type: "ref", columnType: "datetime" },
    verified_by: { model: "User" },
    verified_date: { type: "ref", columnType: "datetime" },
  },
};
