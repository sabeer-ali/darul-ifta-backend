/**
 * Countries.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: { type: "number", require: true },
    code: { type: "string" },
    name: { type: "string" },
    phonecode: { type: "string" },
    active: { type: "number" },
  },
};
