const express = require('express');
const router = express.Router();

// 간단한 샘플 엔드포인트
router.get('/hello', (req, res) => {
  res.json({ hello: 'world!' });
});

module.exports = router;
