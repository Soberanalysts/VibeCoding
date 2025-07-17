import ExchangeCalculator from '../components/ExchangeCalculator';
import UsdKrwChart from '../components/UsdKrwChart';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const currencyOptions = [
    { code: 'USD', name: '미국 달러' },
    { code: 'KRW', name: '한국 원' },
    { code: 'JPY', name: '일본 엔' },
    { code: 'EUR', name: '유로' },
    { code: 'CNY', name: '중국 위안' },
  ];
  const popularRates = [
    { pair: 'USD/KRW', value: 1320.12 },
    { pair: 'USD/JPY', value: 156.23 },
    { pair: 'EUR/USD', value: 1.09 },
    { pair: 'CNY/KRW', value: 182.55 },
    { pair: 'KRW/JPY', value: 0.12 },
  ];
  const navigate = useNavigate();
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
              <li className="nav-item"><a className="nav-link" href="#" onClick={e => {e.preventDefault(); navigate('/board');}}>게시판</a></li>
              <li className="nav-item"><a className="nav-link" href="#">로그인</a></li>
              <li className="nav-item"><button className="btn btn-light btn-sm ms-2" onClick={() => navigate('/register')}>회원가입</button></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 상단: 환율 계산기 */}
      <section className="container my-4">
        <ExchangeCalculator currencyOptions={currencyOptions} />
      </section>

      {/* 중단: 인기 환율/그래프 */}
      <section className="container flex-grow-1 mb-4">
        <div className="row g-4">
          {/* 인기 환율 순위 */}
          <div className="col-12 col-lg-5">
            <div className="bg-white rounded shadow-sm p-4 h-100">
              <h5 className="fw-bold mb-3 text-primary">인기 환율 순위</h5>
              <ol className="list-group list-group-numbered">
                {popularRates.map((item) => (
                  <li key={item.pair} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{item.pair}</span>
                    <span className="badge bg-primary rounded-pill">{item.value}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          {/* 그래프 영역: 컴포넌트 분리 */}
          <div className="col-12 col-lg-7">
            <div
              className="bg-white rounded shadow-sm p-4 h-100 d-flex flex-column align-items-center justify-content-center"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/chart-detail')}
              title="상세 그래프 보기"
            >
              <h5 className="fw-bold mb-3 text-primary">1년 환율 추이</h5>
              <UsdKrwChart />
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
