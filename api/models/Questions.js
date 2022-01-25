/**
 * Questions.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    // id: { type: "number" },
    user_id: { type: "number" },
    madhab: { model: "madhab" },
    category: { model: "Category" },
    sub_category: { model: "SubCategories" },
    short_question: { type: "string" },
    question: { type: "string" },
    language: { model: "Languages" },
    status: { model: "QuestionStatus" },
    mufti: { model: "User" },
    mufti_answered: { type: "number" },
    verifier: { model: "User" },
    reject_by: { model: "User" },
    reject_reason: { model: "RejectedReasons" },
    created_at: { type: "ref", columnType: "datetime" },
    updated_at: { type: "ref", columnType: "datetime" }
  },
};
