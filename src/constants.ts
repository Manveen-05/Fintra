import { DashboardData } from './types';

export const MOCK_DATA: DashboardData = {
  totalBalance: 124500.85,
  monthlyIncome: 15200.00,
  monthlyExpenses: 8450.32,
  balanceHistory: [
    { date: '2026-03-27', balance: 118000 },
    { date: '2026-03-28', balance: 119500 },
    { date: '2026-03-29', balance: 121000 },
    { date: '2026-03-30', balance: 120200 },
    { date: '2026-03-31', balance: 123000 },
    { date: '2026-04-01', balance: 124500 },
    { date: '2026-04-02', balance: 124500.85 },
  ],
  transactions: [
    { id: '1', date: '2026-04-03', amount: 65.00, category: 'Food', type: 'expense', description: 'Coffee Shop' },
    { id: '2', date: '2026-04-02', amount: 120.50, category: 'Food', type: 'expense', description: 'Lunch at Bistro' },
    { id: '3', date: '2026-04-01', amount: 5000.00, category: 'Salary', type: 'income', description: 'Monthly Salary' },
    { id: '4', date: '2026-04-01', amount: 200.00, category: 'Grocery', type: 'expense', description: 'Supermarket' },
    { id: '31', date: '2026-03-31', amount: 15.99, category: 'Entertainment', type: 'expense', description: 'Netflix OTT' },
    { id: '32', date: '2026-03-30', amount: 2500.00, category: 'Investment', type: 'income', description: 'Stock Dividend' },
    { id: '33', date: '2026-03-29', amount: 45.00, category: 'Utility', type: 'expense', description: 'Internet Bill' },
    { id: '34', date: '2026-03-28', amount: 1200.00, category: 'House', type: 'expense', description: 'Rent Payment' },
    { id: '35', date: '2026-03-27', amount: 300.00, category: 'Shopping', type: 'expense', description: 'Amazon Order' },
    { id: '36', date: '2026-03-26', amount: 120.00, category: 'Transport', type: 'expense', description: 'Uber Ride' },
    { id: '37', date: '2026-03-25', amount: 550.00, category: 'Salary', type: 'income', description: 'Freelance Payout' },
    { id: '38', date: '2026-03-24', amount: 85.00, category: 'Food', type: 'expense', description: 'Dinner with Team' },
    { id: '39', date: '2026-03-23', amount: 10.99, category: 'Entertainment', type: 'expense', description: 'Spotify' },
    { id: '40', date: '2026-03-22', amount: 25.00, category: 'Utility', type: 'expense', description: 'Water Bill' },
    { id: '41', date: '2026-03-21', amount: 1500.00, category: 'Investment', type: 'expense', description: 'Crypto Purchase' },
    { id: '42', date: '2026-03-20', amount: 75.00, category: 'Transport', type: 'expense', description: 'Gas Refill' },
    { id: '43', date: '2026-03-19', amount: 450.00, category: 'Grocery', type: 'expense', description: 'Whole Foods' },
    { id: '44', date: '2026-03-18', amount: 20.00, category: 'Entertainment', type: 'expense', description: 'Cinema Tickets' },
    { id: '45', date: '2026-03-17', amount: 50.00, category: 'Food', type: 'expense', description: 'McD Order' },
    { id: '46', date: '2026-03-16', amount: 2000.00, category: 'Salary', type: 'income', description: 'Stripe Payout' },
    { id: '47', date: '2026-03-15', amount: 48.00, category: 'Shopping', type: 'expense', description: 'H&M Sale' },
    { id: '48', date: '2026-03-14', amount: 12.00, category: 'Transport', type: 'expense', description: 'Parking Fee' },
    { id: '49', date: '2026-03-13', amount: 35.00, category: 'Utility', type: 'expense', description: 'Steam Games' },
    { id: '50', date: '2026-03-12', amount: 95.00, category: 'Transport', type: 'expense', description: 'Tesla Charging' },
    { id: '51', date: '2026-03-11', amount: 500.00, category: 'Gift', type: 'income', description: 'Birthday Cash' },
    { id: '52', date: '2026-03-10', amount: 4.50, category: 'Food', type: 'expense', description: 'Starbucks Coffee' },
    { id: '5', date: '2026-03-28', amount: 1200.00, category: 'House', type: 'expense', description: 'Rent' },
    { id: '6', date: '2026-03-25', amount: 350.00, category: 'Grocery', type: 'expense', description: 'Whole Foods' },
    { id: '7', date: '2026-03-15', amount: 50.00, category: 'Food', type: 'expense', description: 'Pizza Delivery' },
    { id: '8', date: '2026-03-10', amount: 80.00, category: 'Car', type: 'expense', description: 'Gas Station' },
    { id: '9', date: '2026-03-05', amount: 400.00, category: 'Holiday', type: 'expense', description: 'Weekend Getaway' },
    { id: '10', date: '2026-03-01', amount: 5000.00, category: 'Salary', type: 'income', description: 'Monthly Salary' },

    // 2 Months Ago (February 2026)
    { id: '11', date: '2026-02-28', amount: 1200.00, category: 'House', type: 'expense', description: 'Rent' },
    { id: '12', date: '2026-02-20', amount: 220.00, category: 'Grocery', type: 'expense', description: 'Trader Joes' },
    { id: '13', date: '2026-02-14', amount: 150.00, category: 'Food', type: 'expense', description: 'Valentines Dinner' },
    { id: '14', date: '2026-02-10', amount: 120.00, category: 'Car', type: 'expense', description: 'Car Wash & Detail' },
    { id: '15', date: '2026-02-01', amount: 5000.00, category: 'Salary', type: 'income', description: 'Monthly Salary' },

    // 3 Months Ago (January 2026)
    { id: '16', date: '2026-01-31', amount: 1200.00, category: 'House', type: 'expense', description: 'Rent' },
    { id: '17', date: '2026-01-25', amount: 450.00, category: 'Grocery', type: 'expense', description: 'Bulk groceries' },
    { id: '18', date: '2026-01-15', amount: 90.00, category: 'Car', type: 'expense', description: 'Gas Station' },
    { id: '19', date: '2026-01-08', amount: 110.00, category: 'Food', type: 'expense', description: 'Sushi Night' },
    { id: '20', date: '2026-01-01', amount: 5000.00, category: 'Salary', type: 'income', description: 'Monthly Salary' },

    // 4 Months Ago (December 2025)
    { id: '21', date: '2025-12-31', amount: 1200.00, category: 'House', type: 'expense', description: 'Rent' },
    { id: '22', date: '2025-12-24', amount: 600.00, category: 'Holiday', type: 'expense', description: 'Christmas Gifts' },
    { id: '23', date: '2025-12-15', amount: 300.00, category: 'Grocery', type: 'expense', description: 'Holiday Feast' },
    { id: '24', date: '2025-12-10', amount: 95.00, category: 'Car', type: 'expense', description: 'Gas Station' },
    { id: '25', date: '2025-12-01', amount: 5500.00, category: 'Salary', type: 'income', description: 'Year End Salary' },

    // 5 Months Ago (November 2025)
    { id: '26', date: '2025-11-30', amount: 1200.00, category: 'House', type: 'expense', description: 'Rent' },
    { id: '27', date: '2025-11-20', amount: 140.00, category: 'Food', type: 'expense', description: 'Thanksgiving Dinner' },
    { id: '28', date: '2025-11-15', amount: 280.00, category: 'Grocery', type: 'expense', description: 'Weekly groceries' },
    { id: '29', date: '2025-11-05', amount: 75.00, category: 'Car', type: 'expense', description: 'Gas Station' },
    { id: '30', date: '2025-11-01', amount: 5000.00, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  ],
  news: [
    { id: '1', title: 'Market hits all-time high as tech stocks surge', time: '2h ago', source: 'Finance Daily' },
    { id: '2', title: 'New regulations proposed for digital assets', time: '5h ago', source: 'Crypto Watch' },
    { id: '3', title: 'Interest rates expected to remain stable this quarter', time: '1d ago', source: 'Economic Times' },
  ]
};
