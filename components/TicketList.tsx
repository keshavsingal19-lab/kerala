import React from 'react';
import { Ticket, TicketStatus, LotteryName } from '../types';
import { Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { LOTTERY_OPTIONS } from '../constants';

interface Props {
  tickets: Ticket[];
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: TicketStatus, amount?: number) => void;
}

export const TicketList: React.FC<Props> = ({ tickets, onDelete, onUpdateStatus }) => {
  const getLotteryColor = (name: string) => {
    return LOTTERY_OPTIONS.find(opt => opt.value === name)?.color || 'bg-gray-500';
  };

  const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case 'WON':
        return <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full"><CheckCircle size={12} className="mr-1" /> WON</span>;
      case 'LOST':
        return <span className="flex items-center text-xs font-bold text-red-700 bg-red-100 px-2 py-1 rounded-full"><XCircle size={12} className="mr-1" /> LOST</span>;
      default:
        return <span className="flex items-center text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full"><Clock size={12} className="mr-1" /> WAITING</span>;
    }
  };

  const handleWinClick = (id: string) => {
    const amountStr = prompt("Congratulations! How much did you win?");
    if (amountStr) {
        const amount = parseFloat(amountStr);
        if (!isNaN(amount) && amount >= 0) {
            onUpdateStatus(id, 'WON', amount);
        }
    }
  };

  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center text-gray-500 shadow-sm">
        <p>No tickets added yet. Click "Add Ticket" to start tracking!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="font-semibold text-gray-700">My Tickets</h3>
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs text-gray-500 uppercase bg-gray-50">
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Lottery</th>
              <th className="px-6 py-3">Number</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Prize</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600">{ticket.drawDate}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${getLotteryColor(ticket.lotteryName)}`}></span>
                    <span className="text-sm font-medium text-gray-900">{ticket.lotteryName.split('(')[0]}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-gray-600">
                  {ticket.series} {ticket.number}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">₹{ticket.price}</td>
                <td className="px-6 py-4">{getStatusBadge(ticket.status)}</td>
                <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                  {ticket.status === 'WON' ? `₹${ticket.prizeAmount}` : '-'}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    {ticket.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleWinClick(ticket.id)}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"
                          title="Mark as Won"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          onClick={() => onUpdateStatus(ticket.id, 'LOST')}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                          title="Mark as Lost"
                        >
                          <XCircle size={18} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onDelete(ticket.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                      title="Delete Ticket"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-100">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="p-4 space-y-3">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${getLotteryColor(ticket.lotteryName)}`}></span>
                        <span className="font-semibold text-gray-900">{ticket.lotteryName.split('(')[0]}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{ticket.drawDate}</p>
                </div>
                {getStatusBadge(ticket.status)}
            </div>
            
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <div className="font-mono text-lg font-bold text-gray-700">
                    <span className="text-gray-400 text-sm mr-1">{ticket.series}</span>
                    {ticket.number}
                </div>
                <div className="text-sm font-medium text-gray-600">
                    Cost: ₹{ticket.price}
                </div>
            </div>

            {ticket.status === 'WON' && (
                <div className="text-center bg-emerald-50 text-emerald-700 font-bold py-1 rounded">
                    Won: ₹{ticket.prizeAmount}
                </div>
            )}

            <div className="flex justify-between items-center pt-1">
                <div className="flex space-x-2">
                    {ticket.status === 'PENDING' && (
                        <>
                            <button
                                onClick={() => handleWinClick(ticket.id)}
                                className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-lg"
                            >
                                Won
                            </button>
                            <button
                                onClick={() => onUpdateStatus(ticket.id, 'LOST')}
                                className="px-3 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded-lg"
                            >
                                Lost
                            </button>
                        </>
                    )}
                </div>
                <button
                    onClick={() => onDelete(ticket.id)}
                    className="text-gray-400 hover:text-red-500"
                >
                    <Trash2 size={20} />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
