import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function UsdKrwChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch('http://localhost:4000/api/v1/fx/history?source=USD&target=KRW')
      .then(res => {
        if (!res.ok) throw new Error('환율 히스토리 조회 실패');
        return res.json();
      })
      .then(json => {
        if (json.history) setData(json.history);
        else setError('데이터 없음');
      })
      .catch(() => setError('서버 연결 오류'))
      .finally(() => setLoading(false));
  }, []);

  const chartOptions = {
    chart: { id: 'usd-krw-line', toolbar: { show: false } },
    xaxis: {
      categories: data.map(d => d.date),
      labels: { rotate: -45 }
    },
    yaxis: { title: { text: 'KRW' } },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#1976d2'],
    dataLabels: { enabled: false },
    title: { text: 'USD/KRW 1년 추이', align: 'left', style: { fontWeight: 600, fontSize: '1.1rem' } },
    grid: { borderColor: '#e3e3e3' },
    tooltip: { y: { formatter: val => `${val.toFixed(2)} KRW` } }
  };
  const chartSeries = [
    { name: 'USD/KRW', data: data.map(d => d.rate) }
  ];

  if (loading) return <div style={{height:300,display:'flex',alignItems:'center',justifyContent:'center'}}>로딩 중...</div>;
  if (error) return <div style={{height:300,display:'flex',alignItems:'center',justifyContent:'center',color:'#d32f2f'}}>{error}</div>;

  return (
    <div className="w-100" style={{minHeight: 300}}>
      <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={300} />
    </div>
  );
}
