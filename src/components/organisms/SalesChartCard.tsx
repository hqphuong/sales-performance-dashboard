'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
export interface SalesRecord {
  year: number;
  month: string;
  monthOrder: number; 
  category: string;   
  sales: number;
}

import { Button } from '../atoms/Button';
import { FilterGroup } from '../molecules/FilterGroup';

export const SalesChartCard = () => {
  const [data, setData] = useState<SalesRecord[]>([]);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [threshold, setThreshold] = useState<number>(0);

  // 1. Fetch dữ liệu từ API nội bộ (đã convert từ Kaggle)
  useEffect(() => {
    fetch('/api/sales')
      .then((res) => res.json())
      .then((jsonData: SalesRecord[]) => setData(jsonData))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  // 2. Lấy danh sách các phân loại sản phẩm duy nhất
  const categories = useMemo(() => 
    ['All', ...Array.from(new Set(data.map((item) => item.category)))], 
  [data]);

  // 3. LOGIC QUAN TRỌNG: Lọc, Cộng dồn (Aggregate) và Sắp xếp (Sort)
  const processedData = useMemo(() => {
  // BƯỚC 1: Lọc dữ liệu thô (Raw Data)
  const filteredRaw = data.filter((item) => {
    return (
      item.year === selectedYear && 
      (selectedCategory === 'All' || item.category === selectedCategory) &&
      // ✅ CHÈN NGƯỠNG TẠI ĐÂY: Chỉ lấy những đơn hàng có giá trị >= threshold
      item.sales >= threshold 
    );
  });

  // BƯỚC 2: Cộng dồn những đơn hàng "đạt tiêu chuẩn" ở trên vào từng tháng
  const monthlyMap = filteredRaw.reduce((acc: Record<string, SalesRecord>, curr) => {
    const monthKey = curr.month;
    if (!acc[monthKey]) {
      acc[monthKey] = { ...curr };
    } else {
      acc[monthKey].sales += curr.sales;
    }
    return acc;
  }, {});

  // BƯỚC 3: Chuyển về mảng và sắp xếp Jan -> Dec
  return Object.values(monthlyMap).sort((a, b) => a.monthOrder - b.monthOrder);
}, [data, selectedYear, selectedCategory, threshold]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 space-y-8">
      {/* PHẦN ĐIỀU KHIỂN (FILTERS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6 border-b border-zinc-50">
        <FilterGroup onFilter={setThreshold} />

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-zinc-400">Select Year</label>
          <div className="flex gap-2">
            {[2022, 2023, 2024].map((year) => (
              <Button key={year} isActive={selectedYear === year} onClick={() => setSelectedYear(year)}>
                {year}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-zinc-400">Chart Style</label>
          <div className="flex gap-2">
            {(['bar', 'line'] as const).map((type) => (
              <Button key={type} isActive={chartType === type} onClick={() => setChartType(type)}>
                {type.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* BỘ CHỌN PHÂN LOẠI (KAGGLE PRODUCT LINES) */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-zinc-400">Product Categories</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* HIỂN THỊ BIỂU ĐỒ */}
      <div className="h-[400px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                allowDuplicatedCategory={false} 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f8fafc' }} />
              <Legend verticalAlign="top" align="right" iconType="circle" />
              <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total Sales ($)" />
            </BarChart>
          ) : (
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                allowDuplicatedCategory={false} 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend verticalAlign="top" align="right" iconType="circle" />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ r: 3, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 6, strokeWidth: 0 }}
                connectNulls={true} 
                name="Total Sales ($)" 
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};