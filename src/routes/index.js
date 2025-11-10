const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET_PASSWORD = 'ysm3471'

require('dotenv').config();

const openAI = require("openai");
const client = new openAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ai 답변을 위한 템플릿
const template = (userInput) => `
다음 질문에 대해 200자 내로 간결하게 답변해주세요:
${userInput}
`;

// jwt 토큰 발급
router.post('/login', (req, res) => {
  const { password } = req.body;

  if (password !== SECRET_PASSWORD) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ role: 'swagger-user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});


router.get("/test", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: 'Protected data', user: decoded });
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
});

router.post("/ai", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { time,isMale } = req.body;
    const gender = isMale === 'male' ? '남성' : '여성';
    const date = new Date(Number(time) * 1000);
    const response = await client.responses.create({
      model: "gpt-4.1-mini-2025-04-14",
      input: template(`${date}에 태어난 ${gender}의 2025년 12월 연애운을 아래 양식을 참고해서 답변해줘.
        양식:
        ~생 남성의 2025년 12월 연애운은 활기차고 긍정적입니다. 새로운 인연이 생기기 쉬우며, 기존 관계도 깊어질 가능성이 큽니다. 자신감을 갖고 열린 마음으로 소통하면 좋은 결과를 얻을 수 있습니다.
        `)
    });
    res.json({ text: response.output_text });
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
});

module.exports = router;
