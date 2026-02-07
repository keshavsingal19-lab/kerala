import React, { useState } from 'react';
import { LotteryName, Ticket, TicketStatus } from '../types';
import { LOTTERY_OPTIONS } from '../constants';
import { X, Calendar, Hash, IndianRupee, Tag } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (ticket: Omit<Ticket, 'id'>) => void;
}

export const AddTicketModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    lotteryName: LotteryName.WIN_WIN,
    series: '',
    number: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    drawDate: new Date().toISOString().split('T')[0],
    price: 40,
    status: 'PENDING' as TicketStatus,
    prizeAmount: 0,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      status: formData.status as TicketStatus,
    });
    onClose();
    // Reset form for next time (optional, keep dates)
    setFormData(prev => ({
      ...prev,
      series: '',
      number: '',
      prizeAmount: 0,
      status: 'PENDING',
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Add New Ticket</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Lottery Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lottery Type</label>
            <div className="relative">
              <select
                required
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white"
                value={formData.lotteryName}
                onChange={(e) => setFormData({ ...formData, lotteryName: e.target.value as LotteryName })}
              >
                {LOTTERY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                <Tag size={16} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Series */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Series (e.g. WA)</label>
              <input
                type="text"
                maxLength={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 uppercase"
                value={formData.series}
                onChange={(e) => setFormData({ ...formData, series: e.target.value.toUpperCase() })}
                placeholder="AA"
              />
            </div>
            {/* Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  maxLength={6}
                  pattern="\d*"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value.replace(/\D/g, '') })}
                  placeholder="123456"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Hash size={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {/* Draw Date */}
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Draw Date</label>
              <div className="relative">
                <input
                  type="date"
                  required
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={formData.drawDate}
                  onChange={(e) => setFormData({ ...formData, drawDate: e.target.value })}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Calendar size={16} />
                </div>
              </div>
            </div>
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="0"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <IndianRupee size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Initial Status (Optional) */}
          <div className="pt-2 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Did this ticket already win?</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="PENDING"
                  checked={formData.status === 'PENDING'}
                  onChange={() => setFormData({ ...formData, status: 'PENDING', prizeAmount: 0 })}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Waiting</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="WON"
                  checked={formData.status === 'WON'}
                  onChange={() => setFormData({ ...formData, status: 'WON' })}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Yes!</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="LOST"
                  checked={formData.status === 'LOST'}
                  onChange={() => setFormData({ ...formData, status: 'LOST', prizeAmount: 0 })}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>

          {formData.status === 'WON' && (
            <div className="animate-in fade-in slide-in-from-top-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Prize Amount (₹)</label>
              <input
                type="number"
                required
                min="0"
                className="w-full px-3 py-2 border border-emerald-300 bg-emerald-50 rounded-lg focus:ring-2 focus:ring-emerald-500 text-emerald-800 font-bold"
                value={formData.prizeAmount}
                onChange={(e) => setFormData({ ...formData, prizeAmount: Number(e.target.value) })}
                placeholder="5000"
              />
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-emerald-200"
            >
              Add Ticket
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
