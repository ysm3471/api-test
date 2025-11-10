const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Ai:
 *       type: object
 *       required: 
 *         - time
 *         - isMale
 *       properties:
 *         time:
 *           type: string
 *           description: 출생 시간 (UnixStamp *초 단위)
 *         isMale:
 *          type: string
 *          description: 성별 (male 또는 female)
 *       example:
 *         time: "-315649800"
 *         isMale: "male"                        
 */

/**
 * @swagger
 * /api/ai:
 *   post:
 *     summary: 다음달 사주 조회
 *     tags: [Ai]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Ai"
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Ai"
 *       500:
 *         description: SERVER ERROR
 */
router.post("/", (req, res) => {
  res.json();
});