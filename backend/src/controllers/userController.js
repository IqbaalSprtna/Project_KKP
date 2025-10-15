const userService = require("../services/userService");

// GET all user
const findAll = async (req, res, next) => {
  try {
    const user = await userService.findAll();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const targetUserId = parseInt(req.params.id);
    const loggedUser = req.loggedUser;

    const user = await userService.findById({
      targetUserId: targetUserId,
      loggedUser: loggedUser,
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(200).json({ message: "User Registered", data: user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const targetUserId = parseInt(req.params.id);
    const loggedUser = req.loggedUser;
    const updateData = req.body;
    const user = await userService.updateUser({
      targetUserId: targetUserId,
      loggedUser: loggedUser,
      updateData: updateData,
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const targetUserId = parseInt(req.params.id);
    const loggedUser = req.loggedUser;

    const deletedUser = await userService.deleteUser({
      targetUserId: targetUserId,
      loggedUser: loggedUser,
    });

    res.status(200).json({
      message: `Akun dengan ID ${targetUserId} berhasil dihapus (soft delete).`,
      user: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { findAll, findById, createUser, updateUser, deleteUser };
