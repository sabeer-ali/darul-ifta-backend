/**
 * Article.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    // id: { type: "number", require: true },
    title: { type: "string" },
    description: { type: "string" },
    mufti: { type: "number" },
    created_at: { type: "ref", columnType: "datetime" },
    updated_at: { type: "ref", columnType: "datetime" },
  },
};
