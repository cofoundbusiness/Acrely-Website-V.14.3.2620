"use client";

import { useState } from "react";
import { DollarSign, Percent, TrendingUp } from "lucide-react";

interface InvestmentCalculatorProps {
  price: number;
  noi: number;
}

export function InvestmentCalculator({ price, noi }: InvestmentCalculatorProps) {
  const [downPaymentPct, setDownPaymentPct] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(25); // years

  const downPayment = price * (downPaymentPct / 100);
  const loanAmount = price - downPayment;
  
  // Monthly Mortgage Calculation (Principal + Interest)
  const monthlyRate = (interestRate / 100) / 12;
  const numPayments = loanTerm * 12;
  const monthlyMortgage = 
    monthlyRate > 0 
      ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;
  
  const annualMortgage = monthlyMortgage * 12;
  const annualCashFlow = noi - annualMortgage;
  const cashOnCashReturn = downPayment > 0 ? (annualCashFlow / downPayment) * 100 : 0;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.max(0, val));
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
      <h2 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" /> Investment Calculator
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="font-medium text-slate-700">Down Payment</label>
              <span className="font-bold text-primary">{downPaymentPct}% ({formatCurrency(downPayment)})</span>
            </div>
            <input 
              type="range" min="10" max="100" step="5" 
              value={downPaymentPct} 
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="font-medium text-slate-700">Interest Rate</label>
              <span className="font-bold text-primary">{interestRate}%</span>
            </div>
            <input 
              type="range" min="3" max="12" step="0.25" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="font-medium text-slate-700">Loan Term</label>
              <span className="font-bold text-primary">{loanTerm} Years</span>
            </div>
            <input 
              type="range" min="5" max="30" step="5" 
              value={loanTerm} 
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <span className="text-slate-600 flex items-center gap-2"><DollarSign className="w-4 h-4" /> Monthly Mortgage</span>
            <span className="font-bold text-lg text-slate-800">{formatCurrency(monthlyMortgage)}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <span className="text-slate-600 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Annual Cash Flow</span>
            <span className={`font-bold text-xl ${annualCashFlow >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {formatCurrency(annualCashFlow)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 flex items-center gap-2"><Percent className="w-4 h-4" /> Cash-on-Cash Return</span>
            <span className={`font-bold text-xl ${cashOnCashReturn >= 5 ? 'text-emerald-600' : 'text-amber-500'}`}>
              {cashOnCashReturn.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
