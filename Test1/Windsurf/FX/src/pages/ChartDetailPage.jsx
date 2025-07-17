import { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import '../styles/chartDetail.css';

// mock: 1년치 + 추가 데이터 (무한 스크롤용)
function generateMockData(start, count) {
  const base = 1250 + Math.random() * 100;
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      date: `2024-${(start + i) % 12 + 1}`.padStart(7, '0'),
      value: base + Math.sin((start + i) / 3) * 30 + Math.random() * 10
    });
  }
  return arr;
}

export default function ChartDetailPage() {
  const [data, setData] = useState(() => generateMockData(1, 24));
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  // 무한스크롤: 아래 도달 시 데이터 추가
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
        setLoading(true);
        setTimeout(() => {
          setData(prev => [
            ...prev,
            ...generateMockData(prev.length + 1, 12)
          ]);
          setLoading(false);
        }, 700);
      }
    };
    const ref = containerRef.current;
    ref?.addEventListener('scroll', onScroll);
    return () => ref?.removeEventListener('scroll', onScroll);
  }, [loading]);

  const chartOptions = {
    chart: { id: 'detail-line', toolbar: { show: false } },
    xaxis: {
      categories: data.map(d => d.date),
      labels: { rotate: -45 }
    },
    yaxis: { title: { text: 'KRW' } },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#1976d2'],
    dataLabels: { enabled: false },
    title: { text: 'USD/KRW 상세 추이', align: 'left', style: { fontWeight: 600, fontSize: '1.1rem' } },
    grid: { borderColor: '#e3e3e3' },
    tooltip: { y: { formatter: val => `${val.toFixed(2)} KRW` } }
  };
  const chartSeries = [
    { name: 'USD/KRW', data: data.map(d => d.value) }
  ];

  return (
    <div className="fx-detail-page-1440" ref={containerRef}>
      <div className="fx-detail-header">USD/KRW 상세 그래프</div>
      <div className="fx-detail-chart-wrap">
        <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={380} />
      </div>
      <div className="fx-detail-list-title">월별 상세 데이터</div>
      <ol className="fx-detail-list">
        {data.map((d, i) => (
          <li key={i} className="fx-detail-list-item">
            <span>{d.date}</span>
            <span>{d.value.toFixed(2)} KRW</span>
          </li>
        ))}
      </ol>
      {loading && <div className="fx-detail-loading">로딩 중...</div>}
    </div>
  );
}
