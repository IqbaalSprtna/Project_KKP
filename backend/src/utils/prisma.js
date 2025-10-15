const { PrismaClient } = require("../../generated/prisma");

// Tentukan konfigurasi log berdasarkan lingkungan
let logConfig = [
  {
    emit: "stdout",
    level: "error",
  },
  {
    emit: "stdout",
    level: "info",
  },
  {
    emit: "stdout",
    level: "warn",
  },
];

// Hanya tambahkan log query jika environment BUKAN 'test'
if (process.env.NODE_ENV !== "test") {
  logConfig.unshift({
    emit: "event",
    level: "query",
  });
}

const prisma = new PrismaClient({
  log: logConfig,
});

// Hanya daftarkan event listener jika environment BUKAN 'test'
if (process.env.NODE_ENV !== "test") {
  prisma.$on("query", (e) => {
    console.log("Query: " + e.query);
    console.log("Params: " + e.params);
    console.log("Duration: " + e.duration + "ms");
  });
}

module.exports = prisma;
