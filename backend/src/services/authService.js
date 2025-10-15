const prisma = require("../utils/prisma");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

const register = async (params) => {
  await prisma.$transaction(async (prisma) => {
    // tambah $transaction
    const { nama, email, password, role = "admin" } = params;
    // Validasi password
    if (password.length <= 6) {
      throw { name: "invalidPassword" };
    }

    // Validasi Ketersediaan Email (Cek Duplikasi)
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      throw { name: "EmailAlreadyRegistered" };
    }
    let deduction = 0;
    // Hash password
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

const login = async (params) => {
  const { email, password, deleteAt } = params;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { name: "InvalidCredentials" };

  if (user.deletedAt !== null) {
    throw { name: "AccountDeleted" };
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) throw { name: "InvalidCredentials" };
  const token = generateToken({ id: user.id, role: user.role });
  return { user, token };
};

module.exports = { login, register };
