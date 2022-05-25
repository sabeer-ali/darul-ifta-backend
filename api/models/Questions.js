/**
 * Questions.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    user_id: { model: "User" },
    madhab: { model: "madhab" },
    category: { model: "Category" },
    sub_category: { model: "SubCategories" },
    short_question: { type: "string" },
    question: { type: "string", columnType: "text" },
    language: { model: "Languages" },
    status: { model: "QuestionStatus" },
    mufti: { model: "User" },
    mufti_answered: { type: "number" },
    verifier: { model: "User" },
    reject_by: { model: "User" },
    reject_reason: { model: "RejectedReasons" },
    views: { type: "number" },
  },
};
