/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": {
    view: "pages/homepage"
  },

  //User
  "POST /user/login": "UserController.login",
  "POST /user/signup": "UserController.signup",
  "POST /user/authGoogle": "UserController.authGoogle",
  "GET /user/dashboardDataSets": "UserController.dashboardDataSets",
  "GET /user/checkmail": "UserController.checkMail",
  "POST /user/sendOtp": "UserController.sendOtp",
  "POST /user/verifyOtp": "UserController.verifyOtp",
  "POST /user/resetPassword": "UserController.resetPassword",

  //Question
  "GET /questions/searchquestions": "QuestionsController.searchQuestions",
  "GET /questions/counts/:id": "QuestionsController.counts",
  "GET /questions": "QuestionsController.get",
  "PUT /questions": "QuestionsController.update",

  //subcategories
  "GET /subcategories": "SubCategoriesController.get",
  "POST /subcategories": "SubCategoriesController.post",
  "PUT /subcategories": "SubCategoriesController.put",

  // Generals
  "GET /Generals": "GeneralsController.get",

  // Answers
  "POST /answers": "AnswersController.post",

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
