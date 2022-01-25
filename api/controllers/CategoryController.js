/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async (req, res) => {
        const category = await Category.findOne({ title: req.body.title });
        if (!category) {
            /** Create category if title not exist in DB  */
            let category = await Category.create({ title: req.body.title }).fetch();
            return res.ok(category)
        } else {
            /** duplicate */
            res.status(409).send({
                error: "Category already exist "
            });
        }
    }
};

