import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Ticket } from '../types';

interface Props {
  tickets: Ticket[];
}

export const AnalysisChart: React.FC<Props> = ({ tickets }) => {
  // Aggregate data by Lottery Type
  const data = tickets.reduce((acc, ticket) => {
    const name = ticket.lotteryName.split('(')[0].trim();
    const existing = acc.find(d => d.name === name);
    if (existing) {
      existing.spent += ticket.price;
      existing.won += ticket.prizeAmount;
    } else {
      acc.push({ name, spent: ticket.price, won: ticket.prizeAmount });
    }
    return acc;
  }, [] as { name: string; spent: number; won: number }[]);

  if (data.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Spending by Lottery Type</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip 
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="spent" name="Spent" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="won" name="Won" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
