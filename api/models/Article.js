/**
 * Article.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: { type: "string" },
    description: { type: "string" },
    mufti: { model: "user" },
    created_at: { type: "ref", columnType: "datetime" },
    updated_at: { type: "ref", columnType: "datetime" },
  },
};
