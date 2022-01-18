/**
 * QuestionHistory.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    // id: { type: "number", require: true },
    question_id: { type: "number" },
    status: { type: "number" },
    updated_at: { type: "ref", columnType: "datetime" },
    updated_by: { type: "ref", columnType: "datetime" },
  },
};
