import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductChart = ({ products }) => {
  // Siapkan data untuk grafik
  const productNames = products.map((product) => product.name);
  const productStocks = products.map((product) => product.stock);

  const data = {
    labels: productNames,
    datasets: [
      {
        label: "Jumlah Stok",
        data: productStocks,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Jumlah Stok per Barang" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Grafik Stok Barang</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProductChart;
