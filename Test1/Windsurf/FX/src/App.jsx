import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './App.css';

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KRW');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currencyOptions = [
    { code: 'USD', name: '미국 달러' },
    { code: 'KRW', name: '한국 원' },
    { code: 'JPY', name: '일본 엔' },
    { code: 'EUR', name: '유로' },
    { code: 'CNY', name: '중국 위안' },
  ];

  const handleExchange = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      // 실제 API 연동 전 임시 결과
      const fakeRate = fromCurrency === toCurrency ? 1 : Math.random() * (1500 - 100) + 100;
      setTimeout(() => {
        setResult(amount ? (parseFloat(amount) * fakeRate).toFixed(2) : '0.00');
        setLoading(false);
      }, 700);
    } catch (e) {
      setError('환율 조회에 실패했습니다.');
      setLoading(false);
    }
  };

  // mock 인기 환율 데이터
  const popularRates = [
    { pair: 'USD/KRW', value: 1320.12 },
    { pair: 'USD/JPY', value: 156.23 },
    { pair: 'EUR/USD', value: 1.09 },
    { pair: 'CNY/KRW', value: 182.55 },
    { pair: 'KRW/JPY', value: 0.12 },
  ];
  // mock 최근 1년(12개월) USD/KRW 데이터
  const usdKrwLabels = [
    '2024-08', '2024-09', '2024-10', '2024-11', '2024-12', '2025-01',
    '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07'
  ];
  const usdKrwData = [1275, 1292, 1310, 1305, 1320, 1340, 1335, 1322, 1315, 1302, 1295, 1288];

  const chartOptions = {
    chart: {
      id: 'usd-krw-line',
      toolbar: { show: false }
    },
    xaxis: {
      categories: usdKrwLabels,
      labels: { rotate: -45 }
    },
    yaxis: {
      title: { text: 'KRW' }
    },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#1976d2'],
    dataLabels: { enabled: false },
    title: { text: 'USD/KRW 1년 환율', align: 'left', style: { fontWeight: 600, fontSize: '1rem' } },
    grid: { borderColor: '#e3e3e3' },
    tooltip: { y: { formatter: val => `${val} KRW` } }
  };
  const chartSeries = [
    {
      name: 'USD/KRW',
      data: usdKrwData
    }
  ];

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* 최상단 Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">Windsurf FX</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="#">게시판</a></li>
              <li className="nav-item"><a className="nav-link" href="#">로그인</a></li>
              <li className="nav-item"><a className="nav-link" href="#">회원가입</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 상단: 환율 계산기 */}
      <section className="container py-4">
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
      </section>

      {/* 중단: 인기 환율/그래프 */}
      <section className="container flex-grow-1 mb-4">
        <div className="row g-4">
          {/* 인기 환율 순위 */}
          <div className="col-12 col-lg-5">
            <div className="bg-white rounded shadow-sm p-4 h-100">
              <h5 className="fw-bold mb-3 text-primary">인기 환율 순위</h5>
              <ol className="list-group list-group-numbered">
                {popularRates.map((item, idx) => (
                  <li key={item.pair} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{item.pair}</span>
                    <span className="badge bg-primary rounded-pill">{item.value}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          {/* 그래프 영역: ApexCharts */}
          <div className="col-12 col-lg-7">
            <div className="bg-white rounded shadow-sm p-4 h-100 d-flex flex-column align-items-center justify-content-center">
              <h5 className="fw-bold mb-3 text-primary">1년 환율 추이</h5>
              <div className="w-100" style={{minHeight: 260}}>
                <ReactApexChart
                  options={chartOptions}
                  series={chartSeries}
                  type="line"
                  height={240}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 하단 Footer */}
      <footer className="bg-primary text-white py-3 mt-auto">
        <div className="container text-center small">
          사이트 이용가이드 · Windsurf FX © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}

export default App;


