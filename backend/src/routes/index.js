const express = require("express");
const router = express.Router();
const { authentication } = require("../middlewares/auth");

const authRoute = require("./authRoute");
const userRoute = require("./userRoute");

const PREFIX = "/v1/api";

router.use(`${PREFIX}/auth`, authRoute);

router.use(authentication);
router.use(`${PREFIX}/user`, userRoute);

module.exports = router;
