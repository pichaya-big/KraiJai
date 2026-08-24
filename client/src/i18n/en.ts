import type { Translations } from './types';

export const en: Translations = {
  common: {
    baht: 'THB',
  },
  header: {
    guestMode: 'GUEST MODE',
    userTier: '{tier} USER',
    logout: 'Logout',
    demoLogin: 'Demo Login',
  },
  guestBanner: {
    message: 'Login to save history, scan receipts with OCR, and unlock Pro features!',
    cta: 'Unlock Free Account',
  },
  hydrationLoading: 'Loading KraiJai Trip Splitter...',
  tripHeader: {
    subtitle: 'Split group expenses and settle debts seamlessly.',
    resetTrip: 'Reset Trip',
    reset: 'Reset',
  },
  wizard: {
    stepMembers: 'Members',
    stepExpenses: 'Expenses',
    stepSummary: 'Summary',
    next: 'Next',
    back: 'Back',
    needAtLeastOneMember: 'Add at least one person to continue',
    membersStepHint: "Who's coming on this trip?",
    expensesStepHint: 'Log what was spent and who paid',
    summaryStepHint: 'Review balances and settle up',
    noExpensesYetSummary: 'No expenses logged yet. Add some stops to see settlement calculations.',
    locked: 'Complete previous step first',
  },
  addStopForm: {
    placeholder: 'Stop/Expense Name (e.g. Taxi, Dinner)',
    amountPlaceholder: 'Amount (฿)',
    payerPlaceholder: 'Payer...',
  },
  receipt: {
    tripStops: 'Trip stops',
    total: 'Total',
    noExpenses: 'No expenses logged yet.',
    logStopsAbove: 'Log stops using the bar above.',
    paidBy: 'Paid by',
    choosePayer: 'Choose payer...',
    split: (amount: string, count: number) => `Split: ${amount} THB × ${count} people`,
    selectParticipants: '⚠️ Select who participated in this stop',
    toggle: (name: string) => `Toggle ${name}`,
    all: 'All',
    clear: 'Clear',
    addFriendsToAssign: 'Add friends to assign splits.',
    removeStop: 'Remove stop',
  },
  members: {
    groupMembers: '👥 Group Members',
    addFriendPlaceholder: 'Add friend (e.g. Alice)...',
    add: 'Add',
    noParticipants: 'No participants added yet.',
    paid: 'Paid',
    share: 'Share',
    getsBack: 'Gets back',
    owesMoney: 'Owes others',
    settled: 'Settled',
    removeFriend: (name: string) => `Remove ${name}`,
  },
  settle: {
    settleDebts: '💸 Settle Debts',
    allSettled: '🎉 All debts are settled! Everyone paid exactly their share.',
    pays: 'pays',
    scanQr: 'Scan QR',
    copyShareDesc: 'Copy share description',
    copyFullSummary: 'Copy Full Settlement Summary',
  },
  qrModal: {
    promptPay: 'Prompt Pay',
    scanPayTo: (name: string) => `Scan to pay ${name}`,
    transferAmount: 'Transfer Amount',
    receiver: 'Receiver',
    hint: '(Copy the statement and scan amount to pay from the summary page)',
    done: 'Done',
  },
  toast: {
    added: (name: string) => `Added "${name}"`,
    copiedTransferDetails: (name: string) => `Copied transfer details for ${name}!`,
    copiedSummary: 'Copied trip summary!',
  },
  shareText: {
    transferDetails: (fromName: string, toName: string, amount: string) =>
      `💰 *Payment Request for ${fromName}*\nPay to: *${toName}*\nAmount: *${amount} THB*\n\nShared via KraiJai Trip`,
    tripSummary: (tripTitle, totalCost, balances, transactions, noTransactions) => {
      let text = `📊 *Trip Expense Summary: ${tripTitle}*\n`;
      text += `Total trip expenses: ${totalCost} THB\n\n`;
      text += `👥 *Net balance per person (paid - owed):*\n`;
      balances.forEach((b) => {
        text += `- ${b.name}: ${b.status} THB (paid ${b.fronted}, owes ${b.owed})\n`;
      });
      text += `\n💸 *Settlement transactions:*\n`;
      if (noTransactions) {
        text += `No pending transfers. Everyone paid exactly their share! 🎉\n`;
      } else {
        transactions.forEach((t) => {
          text += `- ${t.from} pays ${t.to} = ${t.amount} THB\n`;
        });
      }
      return text;
    },
  },
};
