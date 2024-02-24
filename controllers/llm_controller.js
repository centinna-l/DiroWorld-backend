const { ObjectId } = require("mongodb");
const { createPrompt } = require("../database");

const generateID = async (req, res, next) => {
  try {
    const id = new ObjectId();
    const { name, age, interests } = req.body;
    // let result = await createPrompt(id, name, age, interests);
    // console.log(id, result.error);
    // if (!result.status) {
    //   next(Error(result.message));
    // }
    return res.json({
      id,
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis",
      options: [name, age, interests],
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

// const generateIDTest = async (req, res, next) => {
//       try {
//         const id = new ObjectId();
//         const { name, age, interests } = req.body;
//         // let result = await createPrompt(id, name, age, interests);
//         // console.log(id, result.error);
//         // if (!result.status) {
//         //   next(Error(result.message));
//         // }
//         return res.json({
//           id,
//           message:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis",
//           options: [name, age, interests],
//         });
//       } catch (error) {
//         return res.json({ error: error.message });
//       }
// }

const generateIDTest = async (req, res, next) => {
  try {
    const id = new ObjectId();
    const { name, age, interests } = req.body;
    let result = await createPrompt(id, name, age, interests);
    console.log(id, result.error);
    if (!result.status) {
      next(Error(result.message));
    }
    return res.json({
      id,
      message: result.data.data,
      options: [name, age, interests],
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports = {
  generateID,
  generateIDTest,
};
