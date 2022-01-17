/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: { type: "number", require: true },
    name: { type: "string" },
    display_title: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    remember_token: { type: "string" },
    created_at: { type: "ref", columnType: "datetime" },
    updated_at: { type: "ref", columnType: "datetime" },
    user_type: { type: "number" },
    user_status: { type: "number" },
    username: { type: "string" },
    phone: { type: "string" },
    initial_token: { type: "string" },
    email_verified: { type: "number" },
    google_id: { type: "string" },
    sort_order: { type: "number" },
  },
};
