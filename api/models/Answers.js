/**
 * Answers.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: { type: "number", require: true },
    question_id: { type: "number" },
    answer: { type: "string" },
    reference: { type: "string" },
    status: { type: "number" },
    answered_by: { type: "number" },
    answered_date: { type: "ref", columnType: "datetime" },
    verified_by: { type: "number" },
    verified_date: { type: "ref", columnType: "datetime" },
  },
};
