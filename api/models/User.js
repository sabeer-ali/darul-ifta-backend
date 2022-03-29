/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: "string", allowNull: false },
    display_title: { type: "string" },
    email: { type: "string", unique: true, required: true, allowNull: false },
    password: { type: "string" },
    remember_token: { type: "string" },
    user_type: {
      model: "UserTypes",
    },
    user_status: {
      model: "UserStatus",
    },
    madhab: {
      model: "Madhab",
    },
    username: { type: "string" },
    phone: { type: "string" },
    initial_token: { type: "string" },
    email_verified: { type: "number" },
    google_id: { type: "string" },
    sort_order: { type: "number" },
    address: { type: "string" },
    pin_code: { type: "number" },
    profile_pic: { type: "string" },
    gender: { type: "string" },
    country: { model: "Countries" },
    qualification: { type: "string" },
    work_place: { type: "string" },
    dob: { type: "ref", columnType: "datetime" },
  },
};
