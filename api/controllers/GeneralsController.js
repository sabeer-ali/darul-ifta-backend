/**
 * GeneralsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  get: async (req, res) => {
    let result = {
      visitors: 0,
      fatwas: 0,
      regUsers: 0,
    };

    // async function getVistors() {
    //   const data = await Generals.find({});

    //   if (!data.length) {
    //     return await Generals.create({ visitors: 1 }).fetch();
    //   } else {
    //     Generals.find({})
    //       .then((responds) => {
    //         let count = responds[0].visitors;
    //         return (count += 1);
    //       })
    //       .then(async (count) => {
    //         await Generals.updateOne({ visitors: { ">=": 1 } }).set({
    //           visitors: count,
    //         });
    //       });
    //   }
    // }

    // getVistors().then(async () => {
    //   let resultData = await Generals.find();
    //   result.visitors = await resultData[0].visitors;
    //   result.fatwas = await Questions.count({ status: 8 });
    //   result.regUsers = await User.count({ user_type: 3 });
    //   res.ok(result);
    // });
    res.json([]);
  },
};
