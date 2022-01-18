/**
 * UserDetails.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    // id: { type: "number" },
    user_id: { type: "number" },
    profile_pic: { type: "string" },
    address: { type: "string" },
    gender: { type: "string" },
    country: { type: "string" },
    madhab: { type: "string" },
    qualification: { type: "string" },
    work_place: { type: "string" },
    dob: { type: "string" },
    zip_code: { type: "string" },
  },
};
