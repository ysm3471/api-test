const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required: 
 *         - name
 *         - email
 *         - age
 *       properties:
 *         name:
 *           type: string
 *           description: 사용자 이름
 *         email:
 *           type: string
 *           description: 사용자 이메일
 *         age:
 *           type: string
 *           description: 사용자 나이
 *       example:
 *         name: "홍길동"
 *         email: "hong@test.com"
 *         age: 30
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 모든 사용자 조회
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 *       500:
 *         description: SERVER ERROR
 */
router.get("/", (req, res) => {
  res.json();
});

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: 이메일로 사용자 조회
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: 사용자 Email
 *     responses:
 *       200:
 *         description: 사용자 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: 사용자를 찾을 수 없음
 */
router.get("/email/:email", (req, res) => {
  res.json();
});

/**
 * @swagger
 * /users/name/{name}:
 *   get:
 *     summary: 특정 이름의 사용자 조회
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: 사용자 이름
 *     responses:
 *       200:
 *         description: 사용자 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: 사용자를 찾을 수 없음
 */
router.get("/name/:name", (req, res) => {
  res.json();
});

/**
 * @swagger
 * /users/update/{id}:
 *   patch:
 *     summary: 유저 정보 업데이트
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 사용자 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: 업데이트 성공
 */
router.patch("/update/:id", (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: "업데이트 완료", data: newUser });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: 새 사용자 생성
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: 사용자 생성 성공
 */
router.post("/", (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: "사용자 생성 완료", data: newUser });
});

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: 사용자 삭제
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 사용자 삭제 성공
 */
router.delete("/delete/:id", (req, res) => { 
  res.json();
});

module.exports = router;
