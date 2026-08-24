export interface Translations {
  common: {
    baht: string;
  };
  header: {
    guestMode: string;
    userTier: string;
    logout: string;
    demoLogin: string;
  };
  guestBanner: {
    message: string;
    cta: string;
  };
  hydrationLoading: string;
  tripHeader: {
    subtitle: string;
    resetTrip: string;
    reset: string;
  };
  wizard: {
    stepMembers: string;
    stepExpenses: string;
    stepSummary: string;
    next: string;
    back: string;
    needAtLeastOneMember: string;
    membersStepHint: string;
    expensesStepHint: string;
    summaryStepHint: string;
    noExpensesYetSummary: string;
    locked: string;
  };
  addStopForm: {
    placeholder: string;
    amountPlaceholder: string;
    payerPlaceholder: string;
  };
  receipt: {
    tripStops: string;
    total: string;
    noExpenses: string;
    logStopsAbove: string;
    paidBy: string;
    choosePayer: string;
    split: (amount: string, count: number) => string;
    selectParticipants: string;
    toggle: (name: string) => string;
    all: string;
    clear: string;
    addFriendsToAssign: string;
    removeStop: string;
  };
  members: {
    groupMembers: string;
    addFriendPlaceholder: string;
    add: string;
    noParticipants: string;
    paid: string;
    share: string;
    getsBack: string;
    owesMoney: string;
    settled: string;
    removeFriend: (name: string) => string;
  };
  settle: {
    settleDebts: string;
    allSettled: string;
    pays: string;
    scanQr: string;
    copyShareDesc: string;
    copyFullSummary: string;
  };
  qrModal: {
    promptPay: string;
    scanPayTo: (name: string) => string;
    transferAmount: string;
    receiver: string;
    hint: string;
    done: string;
  };
  toast: {
    added: (name: string) => string;
    copiedTransferDetails: (name: string) => string;
    copiedSummary: string;
  };
  shareText: {
    transferDetails: (fromName: string, toName: string, amount: string) => string;
    tripSummary: (
      tripTitle: string,
      totalCost: string,
      balances: Array<{
        name: string;
        status: string;
        fronted: string;
        owed: string;
      }>,
      transactions: Array<{ from: string; to: string; amount: string }>,
      noTransactions: boolean
    ) => string;
  };
}
