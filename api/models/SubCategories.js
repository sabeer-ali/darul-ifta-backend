/**
 * SubCategories.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    // id: { type: "number", require: true },
    category_id: { type: "number" },
    title: { type: "string" },
  },
};
