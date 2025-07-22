import express from 'express';
const router = express.Router();

// mock 통화 목록
const currencies = [
  { currencyCode: 'USD', currency: 'U.S. dollar' },
  { currencyCode: 'KRW', currency: 'Korean won' },
  { currencyCode: 'JPY', currency: 'Japanese yen' },
  { currencyCode: 'EUR', currency: 'Euro' },
  { currencyCode: 'CNY', currency: 'Chinese yuan' },
];

// mock 환율 히스토리 (USD→KRW)
const usdKrwHistory = Array.from({ length: 12 }).map((_, i) => ({
  date: `2024-${(i + 1).toString().padStart(2, '0')}`,
  rate: 1300 + Math.sin(i / 2) * 40 + Math.random() * 10
}));

// 통화 목록 조회
router.get('/currencies', (req, res) => {
  if (!currencies.length) {
    return res.status(404).json({ message: '통화 목록이 없습니다.' });
  }
  res.status(200).json(currencies);
});

// 환전 계산
router.get('/convert', (req, res) => {
  const { from, to, amount } = req.query;
  if (!from || !to || !amount) {
    return res.status(400).json({ message: '필수 파라미터 누락' });
  }
  // mock: USD→KRW 1:1500, 나머지 1:1000
  let convertedAmount = 0;
  if (from === to) convertedAmount = amount;
  else if (from === 'USD' && to === 'KRW') convertedAmount = Number(amount) * 1500;
  else convertedAmount = Number(amount) * 1000;
  if (!convertedAmount) {
    return res.status(404).json({ message: '환전 정보 존재하지 않습니다.' });
  }
  res.status(200).json({ to, convertedAmount });
});

// 환율 히스토리
router.get('/history', (req, res) => {
  const { source, target } = req.query;
  if (!source || !target) {
    return res.status(400).json({ message: '필수 파라미터 누락' });
  }
  // mock: USD→KRW만 지원
  if (source === 'USD' && target === 'KRW') {
    return res.status(200).json({ message: '환율 히스토리 조회가 완료되었습니다.', history: usdKrwHistory });
  }
  return res.status(404).json({ message: '환율 히스토리가 저장된 게 없습니다.' });
});

export default router;
