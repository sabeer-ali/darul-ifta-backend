/**
 * SubCategoriesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // details: (req, res) => {
  //   console.log("Reqq", req.allParams());
  //   const { category_id } = req.allParams();

  //   if (Object.keys(req.allParams()).length === 0) {
  //   }

  //   const subcat = SubCategories.find();
  //   // .exec((err, rez) => {
  //   //   console.log("subcat 2", err, rez);
  //   // });

  //   console.log("subcat", subcat);

  //   res.send("200");
  // },
  get: async (req, res) => {
    console.log("req ", req.allParams());

    const { category_id } = req.allParams();
    let result = await SubCategories.find({ category_id });
    res.ok(result);
  },
  post: async (req, res) => {
    const { category_id, title } = req.allParams();

    let subCat = [];

    if (title.length) {
      for (let i = 0; i < title.length; i++) {
        let temp = await SubCategories.find({
          where: {
            category_id,
            title: title[i],
          },
        });

        if (temp.length) {
          temp.map((item) => {
            subCat.push(item);
          });
        }
      }
    } else {
      subCat = await SubCategories.find({
        where: {
          category_id,
          title,
        },
      }).fetch();
    }

    if (!subCat.length) {
      let subcat;
      if (title.length) {
        let result = [];
        for (let i = 0; i < title.length; i++) {
          result[i] = await SubCategories.create({
            category_id,
            title: title[i],
          }).fetch();
        }
        return res.status(200).send({
          success: true,
          message: "Sub Category Created Successfully",
          data: [],
        });
      } else {
        subcat = await SubCategories.create(req.body).fetch();
        return res.ok(subcat);
      }
    } else {
      res.status(409).send({
        success: false,
        message: "Sub Category already exist",
        data: [],
      });
    }
  },
  put: async (req, res) => {
    let { category_id, data } = req.allParams();
    let result;
    for (let i = 0; i < data.length; i++) {
      result = await SubCategories.update({
        where: { category_id, id: data[i].id },
      })
        .set({
          title: data[i].title,
        })
        .fetch();
    }

    res
      .status(200)
      .send({ message: "Successfully Updated", data: [], success: true });
  },
};
