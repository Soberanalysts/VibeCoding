import React from "react";

const sampleRates = [
  { code: "USD", name: "미국 달러", rate: 1370.25 },
  { code: "JPY", name: "일본 엔", rate: 9.85 },
  { code: "EUR", name: "유로", rate: 1480.10 },
];

const ExchangeRateList = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>통화</th>
          <th>이름</th>
          <th>환율</th>
        </tr>
      </thead>
      <tbody>
        {sampleRates.map((item) => (
          <tr key={item.code}>
            <td>{item.code}</td>
            <td>{item.name}</td>
            <td>{item.rate.toLocaleString()}원</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExchangeRateList; 