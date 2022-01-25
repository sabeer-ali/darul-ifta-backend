/**
 * QuestionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Joi = require('joi');
// const Questions = require('../models/Questions');

module.exports = {
    searchQuestions: async (req, res) => {
        let { key } = req.allParams();
        console.log('key = ', key);
        let query = 'SELECT * FROM questions LEFT JOIN answers ON questions.id = answers.question_id';
        if (key) {
            query += ` where questions.question LIKE "%${key}%"  OR answers.answer LIKE "%${key}%" `;
        }
        Questions.query(query, function (err, rawResult) {
            if (err) { return res.serverError(err); }
            return res.ok(rawResult.rows);
        });
    }

};

