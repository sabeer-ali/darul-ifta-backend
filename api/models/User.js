/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: "string", allowNull: false },
    display_title: { type: "string", allowNull: true },
    email: { type: "string", unique: true, required: true, allowNull: false },
    password: { type: "string" },
    remember_token: { type: "string", allowNull: true },
    user_type: {
      model: "UserTypes",
    },
    user_status: {
      model: "UserStatus",
    },
    madhab: {
      model: "Madhab",
    },
    username: { type: "string", allowNull: true },
    phone: { type: "string", allowNull: true },
    initial_token: { type: "string", allowNull: true },
    email_verified: { type: "number" },
    google_id: { type: "string", allowNull: true },
    facebook_id: { type: "string", allowNull: true },
    sort_order: { type: "number" },
    address: { type: "string", allowNull: true },
    pin_code: { type: "number", allowNull: true },
    profile_pic: { type: "string", allowNull: true },
    gender: { type: "string", allowNull: true },
    country: { model: "Countries" },
    qualification: { type: "string", allowNull: true },
    work_place: { type: "string", allowNull: true },
    dob: { type: "ref", columnType: "datetime" },
  },
};
