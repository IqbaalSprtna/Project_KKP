const request = require("supertest");
const app = require("../../server-test");

const SUPER_ADMIN_TOKEN = process.env.SUPER_ADMIN_TOKEN;
test("Should return all user with valid Super Admin token", async () => {
  return request(app)
    .get(`/v1/api/user/`)
    .set("Authorization", `Bearer ${SUPER_ADMIN_TOKEN}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
