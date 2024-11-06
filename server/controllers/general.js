import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const {id} = req.params;
    const users = await User.findById(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};