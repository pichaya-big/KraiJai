import { calculateBalances, simplifyDebts, computeSettlement } from './settlement';
import type { TripParticipant, TripStop } from '@/types/trip';

// Test scenario: 3 people, 3 stops
// Stop 1: 300 baht, Alice pays, all 3 share
// Stop 2: 600 baht, Bob pays, all 3 share
// Stop 3: 900 baht, Carol pays, all 3 share
// Total: 1800 baht
// Fair share per person: 600 baht
// Alice paid: 300, owes: 600, net: -300 (owes 300)
// Bob paid: 600, owes: 600, net: 0 (settled)
// Carol paid: 900, owes: 600, net: +300 (owed 300)

const participants: TripParticipant[] = [
  { id: 'alice', name: 'Alice' },
  { id: 'bob', name: 'Bob' },
  { id: 'carol', name: 'Carol' },
];

const stops: TripStop[] = [
  {
    id: 'stop1',
    title: 'Coffee',
    totalAmount: 300,
    paidByParticipantId: 'alice',
    participantIds: ['alice', 'bob', 'carol'],
  },
  {
    id: 'stop2',
    title: 'Lunch',
    totalAmount: 600,
    paidByParticipantId: 'bob',
    participantIds: ['alice', 'bob', 'carol'],
  },
  {
    id: 'stop3',
    title: 'Dinner',
    totalAmount: 900,
    paidByParticipantId: 'carol',
    participantIds: ['alice', 'bob', 'carol'],
  },
];

console.log('=== Test: Equal 3-way split across 3 stops ===');
const settlement = computeSettlement(participants, stops);

console.log('\nBalances:');
settlement.balances.forEach((b) => {
  const p = participants.find((p) => p.id === b.participantId);
  console.log(`${p?.name}:`, {
    fronted: b.fronted,
    owed: b.owed,
    netBalance: b.netBalance,
  });
});

console.log('\nExpected:');
console.log('Alice: fronted=300, owed=600, net=-300');
console.log('Bob: fronted=600, owed=600, net=0');
console.log('Carol: fronted=900, owed=600, net=300');

console.log('\nTransactions:');
settlement.transactions.forEach((t) => {
  const from = participants.find((p) => p.id === t.fromParticipantId);
  const to = participants.find((p) => p.id === t.toParticipantId);
  console.log(`${from?.name} pays ${to?.name}: ${t.amount}`);
});

console.log('\nExpected: Alice pays Carol 300');

// Verify balances
const alice = settlement.balances.find((b) => b.participantId === 'alice');
const bob = settlement.balances.find((b) => b.participantId === 'bob');
const carol = settlement.balances.find((b) => b.participantId === 'carol');

const tests = [
  alice?.fronted === 300 && 'Alice fronted 300' || 'FAIL: Alice fronted',
  alice?.owed === 600 && 'Alice owed 600' || 'FAIL: Alice owed',
  alice?.netBalance === -300 && 'Alice net -300' || 'FAIL: Alice net',
  bob?.fronted === 600 && 'Bob fronted 600' || 'FAIL: Bob fronted',
  bob?.owed === 600 && 'Bob owed 600' || 'FAIL: Bob owed',
  Math.abs((bob?.netBalance || 0)) < 0.01 && 'Bob net ~0' || 'FAIL: Bob net',
  carol?.fronted === 900 && 'Carol fronted 900' || 'FAIL: Carol fronted',
  carol?.owed === 600 && 'Carol owed 600' || 'FAIL: Carol owed',
  carol?.netBalance === 300 && 'Carol net 300' || 'FAIL: Carol net',
  settlement.transactions.length === 1 && 'Single transaction' || 'FAIL: Transaction count',
  settlement.transactions[0]?.fromParticipantId === 'alice' && 'Alice is debtor' || 'FAIL: Debtor',
  settlement.transactions[0]?.toParticipantId === 'carol' && 'Carol is creditor' || 'FAIL: Creditor',
  settlement.transactions[0]?.amount === 300 && 'Amount is 300' || 'FAIL: Amount',
];

console.log('\n=== Test Results ===');
const passed = tests.filter((t) => !t.includes('FAIL')).length;
const failed = tests.filter((t) => t.includes('FAIL')).length;
tests.forEach((t) => console.log(t));
console.log(`\nPassed: ${passed}/${tests.length}`);
if (failed > 0) process.exit(1);
