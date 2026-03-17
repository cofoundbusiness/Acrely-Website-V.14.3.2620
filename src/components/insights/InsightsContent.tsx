"use client";

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Building2, MapPin, DollarSign } from 'lucide-react';

interface InsightsContentProps {
  avgCap: string;
  capRateData: any[];
  transactionVolumeData: any[];
}

export function InsightsContent({ avgCap, capRateData, transactionVolumeData }: InsightsContentProps) {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-4">
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>Q1 2026 Institutional Report</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary tracking-tight mb-4">
            Market Insights & Analytics
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Data-driven intelligence to empower your commercial real estate investment decisions. Track cap rates, volume, and sector performance.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><TrendingUp className="w-5 h-5" /></div>
              <h3 className="text-slate-500 font-medium">Avg Cap Rate</h3>
            </div>
            <div className="text-3xl font-bold text-secondary mb-1">{avgCap}%</div>
            <span className="text-emerald-500 text-sm font-medium flex items-center">
              +0.2% YoY
            </span>
          </div>
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><DollarSign className="w-5 h-5" /></div>
              <h3 className="text-slate-500 font-medium">Transaction Vol</h3>
            </div>
            <div className="text-3xl font-bold text-secondary mb-1">$142B</div>
            <span className="text-red-500 text-sm font-medium flex items-center">
              -4.5% YoY
            </span>
          </div>
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Building2 className="w-5 h-5" /></div>
              <h3 className="text-slate-500 font-medium">Top Sector</h3>
            </div>
            <div className="text-3xl font-bold text-secondary mb-1">Industrial</div>
            <span className="text-emerald-500 text-sm font-medium flex items-center">
              34% of volume
            </span>
          </div>
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><MapPin className="w-5 h-5" /></div>
              <h3 className="text-slate-500 font-medium">Top Market</h3>
            </div>
            <div className="text-3xl font-bold text-secondary mb-1">Dallas, TX</div>
            <span className="text-emerald-500 text-sm font-medium flex items-center">
              $12.4B YTD
            </span>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Cap Rate Trend Chart */}
          <div className="bg-white p-6 md:p-8 rounded-xl border border-border shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-secondary mb-1">Historical Cap Rate Trends</h2>
              <p className="text-sm text-slate-500">Average capitalization rates across primary regions (2020-2025)</p>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={capRateData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                  <YAxis domain={[5, 8]} axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => [`${value}%`, "Rate"]}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="National" stroke="#1e40af" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Sunbelt" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Coastal" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transaction Volume Chart */}
          <div className="bg-white p-6 md:p-8 rounded-xl border border-border shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-secondary mb-1">Transaction Volume by Sector</h2>
              <p className="text-sm text-slate-500">Quarterly investment volume in Billions USD</p>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transactionVolumeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(val) => `$${val}B`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => [`$${value}B`, "Volume"]}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="Multifamily" stackId="a" fill="#1e40af" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="Industrial" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="Retail" stackId="a" fill="#22c55e" />
                  <Bar dataKey="Office" stackId="a" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
