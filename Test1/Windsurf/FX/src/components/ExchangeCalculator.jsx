import { useState } from 'react';

export default function ExchangeCalculator({ currencyOptions, onResult }) {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KRW');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleExchange = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      // 실제 API 연동 전 임시 결과
      const fakeRate = fromCurrency === toCurrency ? 1 : Math.random() * (1500 - 100) + 100;
      setTimeout(() => {
        const calc = amount ? (parseFloat(amount) * fakeRate).toFixed(2) : '0.00';
        setResult(calc);
        setLoading(false);
        if (onResult) onResult({ amount, fromCurrency, toCurrency, result: calc });
      }, 700);
    } catch (e) {
      setError('환율 조회에 실패했습니다.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded shadow-sm p-4 mx-auto" style={{maxWidth: 540}}>
      <h3 className="fw-bold mb-4 text-center text-primary">환율 계산기</h3>
      <form onSubmit={e => { e.preventDefault(); handleExchange(); }}>
        <div className="row g-2 align-items-center mb-3">
          <div className="col-12 col-md-5">
            <input type="number" min="0" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} placeholder="금액 입력" />
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
              {currencyOptions.map(opt => (
                <option key={opt.code} value={opt.code}>{opt.code}</option>
              ))}
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select" value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
              {currencyOptions.map(opt => (
                <option key={opt.code} value={opt.code}>{opt.code}</option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-1 d-grid">
            <button type="submit" className="btn btn-primary w-100" disabled={loading || !amount}>
              {loading ? '...' : '변환'}
            </button>
          </div>
        </div>
      </form>
      <div className="mt-3">
        {error && <div className="alert alert-danger text-center py-2 mb-2">{error}</div>}
        {result && !error && (
          <div className="alert alert-info text-center mb-0">
            <span className="fw-semibold">{amount} {fromCurrency} → {toCurrency}</span>
            <div className="fs-4 fw-bold mt-1">{result} {toCurrency}</div>
          </div>
        )}
      </div>
    </div>
  );
}
