export type TicketStatus = 'PENDING' | 'WON' | 'LOST';

export interface Ticket {
  id: string;
  lotteryName: string;
  series: string;
  number: string;
  purchaseDate: string;
  drawDate: string;
  price: number;
  prizeAmount: number;
  status: TicketStatus;
  notes?: string;
}

export interface LotteryStats {
  totalSpent: number;
  totalWon: number;
  netProfit: number;
  ticketsCount: number;
  winRate: number;
}

export enum LotteryName {
  WIN_WIN = 'Win-Win (Monday)',
  STHREE_SAKTHI = 'Sthree Sakthi (Tuesday)',
  FIFTY_FIFTY = 'Fifty-Fifty (Wednesday)',
  KARUNYA_PLUS = 'Karunya Plus (Thursday)',
  NIRMAL = 'Nirmal (Friday)',
  KARUNYA = 'Karunya (Saturday)',
  AKSHAYA = 'Akshaya (Sunday)',
  BUMPER = 'Bumper Lottery',
}

export interface AiMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}