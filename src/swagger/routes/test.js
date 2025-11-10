const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Test:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Test용 토큰 확인
 *       example:
 *         message: 'Protected data'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         token:
 *           password: string
 *           description: Test용 토큰 발급
 *       example:
 *         password: 'my_secret'
 */

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: 테스트
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 테스트 api
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Test"
 *       401:
 *         description: 인증 실패(Unauthorized)
 *       500:
 *         description: SERVER ERROR
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: 테스트용 jwt 토큰 발급
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Login"
 *     responses:
 *       200:
 *         description: 토큰 발급 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 example:
 *                  token: '...'
 */
router.post("/", (req, res) => {
  res.json();
});

module.exports = router;
