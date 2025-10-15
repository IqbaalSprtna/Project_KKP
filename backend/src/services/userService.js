const prisma = require("../utils/prisma");
const { hashPassword } = require("../utils/bcrypt");

// GET all user
const findAll = async (params) => {
  const user = await prisma.user.findMany();
  return user;
};

// GET user by ID
const findById = async (params) => {
  const { targetUserId, loggedUser } = params;

  const loggedUserRole = loggedUser.role;

  if (loggedUserRole === "superadmin") {
  } else if (targetUserId !== loggedUser.id) {
    throw { name: "InvalidUser" };
  }
  const user = await prisma.user.findUnique({
    where: { id: targetUserId },
  });

  if (!user) {
    throw { name: "UserNotFound" };
  }
  return user;
};

// CREATE user
const createUser = async (params) => {
  await prisma.$transaction(async (prisma) => {
    const { nama, email, password, role = "admin" } = params;
    if (password.length <= 6) {
      throw { name: "invalidPassword" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      throw { name: "EmailAlreadyRegistered" };
    }

    let deduction = 0;
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        nama,
        email,
        password: hashedPassword,
        role,
      },
    });
    return user;
  });
};

const updateUser = async (params) => {
  const { targetUserId, loggedUser, updateData } = params;

  const loggedUserRole = loggedUser.role;
  const dataToUpdate = { ...updateData };
  if (dataToUpdate.password) {
    dataToUpdate.password = await hashPassword(dataToUpdate.password, 10);
  }

  if (loggedUserRole === "superadmin") {
  } else if (targetUserId !== loggedUser.id) {
    throw { name: "InvalidUser" };
  }

  const user = await prisma.user.update({
    where: { id: targetUserId },
    data: dataToUpdate,
  });

  return user;
};

const deleteUser = async (params) => {
  const { targetUserId, loggedUser } = params;

  const loggedUserRole = loggedUser.role;

  if (loggedUserRole === "superadmin") {
  } else if (targetUserId !== loggedUser.id) {
    throw { name: "InvalidUser" };
  }

  const deletedUser = await prisma.user.update({
    where: { id: targetUserId },
    data: {
      deletedAt: new Date(),
    },
  });

  return deleteUser;
};

module.exports = { findAll, findById, createUser, updateUser, deleteUser };
