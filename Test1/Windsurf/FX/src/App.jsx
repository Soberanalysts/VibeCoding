import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import ChartDetailPage from './pages/ChartDetailPage';
import BoardPage from './pages/BoardPage';
import WritePage from './pages/WritePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chart-detail" element={<ChartDetailPage />} />
        <Route path="/board" element={<BoardPage />} />
      <Route path="/write" element={<WritePage />} />
      </Routes>
    </Router>
  );
}

export default App;


