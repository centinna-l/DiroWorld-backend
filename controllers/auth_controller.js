const testController = async (req, res, next) => {
  try {
    return res.status(200).json({ message: "Testing API Route" });
  } catch (error) {
    return next(Error(error.message));
  }
};

module.exports = { testController };
