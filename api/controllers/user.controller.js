import bcryptjs from "bcryptjs"
import errorHandler from "../utils/error.js";
import User from "../models/user.model.js";

export const updateUser = async (req, res, next) => {
  if (req.verifyedUserId !== req.params.id) 
    return next(errorHandler(401, "Unauthorized"));
  
  try {
    if (req.body.password) 
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
 
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        userName: req.body.userName, 
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
      }
    }, {new: true});


    const {password: pass, ...user} = updatedUser._doc;
    res.status(200).json(user);

  } catch (error) {
    next(error);
  }
} 