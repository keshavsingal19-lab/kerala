import { LotteryName } from './types';

export const LOTTERY_OPTIONS = [
  { value: LotteryName.WIN_WIN, label: 'Win-Win (Mon)', color: 'bg-blue-500' },
  { value: LotteryName.STHREE_SAKTHI, label: 'Sthree Sakthi (Tue)', color: 'bg-pink-500' },
  { value: LotteryName.FIFTY_FIFTY, label: 'Fifty-Fifty (Wed)', color: 'bg-green-500' },
  { value: LotteryName.KARUNYA_PLUS, label: 'Karunya Plus (Thu)', color: 'bg-red-500' },
  { value: LotteryName.NIRMAL, label: 'Nirmal (Fri)', color: 'bg-emerald-500' },
  { value: LotteryName.KARUNYA, label: 'Karunya (Sat)', color: 'bg-purple-500' },
  { value: LotteryName.AKSHAYA, label: 'Akshaya (Sun)', color: 'bg-orange-500' },
  { value: LotteryName.BUMPER, label: 'Bumper Lottery', color: 'bg-yellow-500' },
];

export const MOCK_TICKETS = [
  {
    id: '1',
    lotteryName: LotteryName.WIN_WIN,
    series: 'WA',
    number: '123456',
    purchaseDate: '2023-10-23',
    drawDate: '2023-10-23',
    price: 40,
    prizeAmount: 0,
    status: 'LOST',
  },
  {
    id: '2',
    lotteryName: LotteryName.STHREE_SAKTHI,
    series: 'SB',
    number: '654321',
    purchaseDate: '2023-10-24',
    drawDate: '2023-10-24',
    price: 40,
    prizeAmount: 500,
    status: 'WON',
  },
];
