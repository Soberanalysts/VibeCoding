import ReactApexChart from 'react-apexcharts';

export default function UsdKrwChart() {
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
    <div className="w-100" style={{minHeight: 260}}>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={240}
      />
    </div>
  );
}
