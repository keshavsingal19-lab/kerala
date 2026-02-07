import React from 'react';
import { LotteryStats } from '../types';
import { Wallet, Trophy, TrendingUp, TrendingDown, Ticket } from 'lucide-react';

interface Props {
  stats: LotteryStats;
}

export const DashboardStats: React.FC<Props> = ({ stats }) => {
  const isProfit = stats.netProfit >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Spent */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className="p-3 bg-red-50 text-red-600 rounded-lg">
          <Wallet size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Total Spent</p>
          <p className="text-2xl font-bold text-gray-900">₹{stats.totalSpent.toLocaleString()}</p>
        </div>
      </div>

      {/* Total Won */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
          <Trophy size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Total Won</p>
          <p className="text-2xl font-bold text-gray-900">₹{stats.totalWon.toLocaleString()}</p>
        </div>
      </div>

      {/* Net Profit/Loss */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${isProfit ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
          {isProfit ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Net Profit</p>
          <p className={`text-2xl font-bold ${isProfit ? 'text-green-600' : 'text-orange-600'}`}>
            {isProfit ? '+' : ''}₹{stats.netProfit.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Tickets Count */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
          <Ticket size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Tickets Purchased</p>
          <p className="text-2xl font-bold text-gray-900">{stats.ticketsCount}</p>
          <p className="text-xs text-gray-400">Win Rate: {stats.winRate.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
};
