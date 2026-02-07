import React, { useState, useEffect, useMemo } from 'react';
import { Ticket, TicketStatus, LotteryStats } from './types';
import { MOCK_TICKETS } from './constants';
import { DashboardStats } from './components/DashboardStats';
import { TicketList } from './components/TicketList';
import { AddTicketModal } from './components/AddTicketModal';
import { AnalysisChart } from './components/AnalysisChart';
import { GeminiAdvisor } from './components/GeminiAdvisor';
import { PlusCircle, LayoutDashboard, ListFilter } from 'lucide-react';

const App: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem('kerala_lottery_tickets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse tickets", e);
      }
    }
    return MOCK_TICKETS as Ticket[];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'WON'>('ALL');

  useEffect(() => {
    localStorage.setItem('kerala_lottery_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const stats: LotteryStats = useMemo(() => {
    const totalSpent = tickets.reduce((acc, t) => acc + t.price, 0);
    const totalWon = tickets.reduce((acc, t) => acc + (t.status === 'WON' ? t.prizeAmount : 0), 0);
    const ticketsCount = tickets.length;
    const wins = tickets.filter(t => t.status === 'WON').length;
    
    return {
      totalSpent,
      totalWon,
      netProfit: totalWon - totalSpent,
      ticketsCount,
      winRate: ticketsCount > 0 ? (wins / ticketsCount) * 100 : 0
    };
  }, [tickets]);

  const handleAddTicket = (newTicket: Omit<Ticket, 'id'>) => {
    const ticket: Ticket = {
      ...newTicket,
      id: crypto.randomUUID(),
    };
    setTickets(prev => [ticket, ...prev]);
  };

  const handleDeleteTicket = (id: string) => {
    if (confirm('Are you sure you want to delete this ticket?')) {
      setTickets(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleUpdateStatus = (id: string, status: TicketStatus, amount = 0) => {
    setTickets(prev => prev.map(t => 
      t.id === id ? { ...t, status, prizeAmount: amount } : t
    ));
  };

  const filteredTickets = tickets.filter(t => {
    if (filter === 'ALL') return true;
    return t.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20 md:pb-10">
      
      {/* Top Navbar */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 text-white p-2 rounded-lg">
                <LayoutDashboard size={20} />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                Kerala Lottery Tracker
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="md:hidden bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors shadow-lg"
            >
              <PlusCircle size={24} />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
            >
              <PlusCircle size={20} />
              <span>Add Ticket</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-500">Track your winnings and analyze your luck.</p>
        </div>

        {/* Stats */}
        <DashboardStats stats={stats} />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
           <div className="lg:col-span-3">
               <AnalysisChart tickets={tickets} />
           </div>
        </div>

        {/* Filters and List */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <ListFilter size={20} className="text-gray-500" />
            Recent Tickets
          </h3>
          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1 text-sm rounded-md transition-all ${filter === 'ALL' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('PENDING')}
              className={`px-3 py-1 text-sm rounded-md transition-all ${filter === 'PENDING' ? 'bg-yellow-50 text-yellow-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Waiting
            </button>
            <button
              onClick={() => setFilter('WON')}
              className={`px-3 py-1 text-sm rounded-md transition-all ${filter === 'WON' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Won
            </button>
          </div>
        </div>

        <TicketList 
          tickets={filteredTickets} 
          onDelete={handleDeleteTicket} 
          onUpdateStatus={handleUpdateStatus} 
        />
      </main>

      {/* Modals & Overlays */}
      <AddTicketModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddTicket} 
      />
      
      <GeminiAdvisor />

    </div>
  );
};

export default App;