/**
 * Questions.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: { type: "number" },
    user_id: { type: "number" },
    madhab: { model: "madhab" },
    category: { type: "number" },
    short_question: { type: "string" },
    question: { type: "string" },
    language: { type: "number" },
    status: { type: "number" },
    mufti: { type: "number" },
    mufti_answered: { type: "number" },
    verifier: { type: "number" },
    verified: { type: "number" },
    reject_by: { type: "number" },
    reject_reason: { type: "number" },
    created_at: { type: "ref", columnType: "datetime" },
    updated_at: { type: "ref", columnType: "datetime" },
  },
};
