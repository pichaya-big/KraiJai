import type { Translations } from './types';

export const th: Translations = {
  common: {
    baht: 'บาท',
  },
  header: {
    guestMode: 'โหมดแขก',
    userTier: 'ผู้ใช้ {tier}',
    logout: 'ออกจากระบบ',
    demoLogin: 'ลองใช้ฟรี',
  },
  guestBanner: {
    message: 'เข้าสู่ระบบเพื่อบันทึกประวัติ สแกนใบเสร็จด้วย OCR และปลดล็อกคุณสมบัติ Pro!',
    cta: 'ปลดล็อกบัญชีฟรี',
  },
  hydrationLoading: 'กำลังโหลด KraiJai Trip Splitter...',
  tripHeader: {
    subtitle: 'แบ่งค่าใช้จ่ายกลุ่มและชำระหนี้อย่างราบรื่น',
    resetTrip: 'รีเซ็ตทริป',
    reset: 'รีเซ็ต',
  },
  wizard: {
    stepMembers: 'สมาชิก',
    stepExpenses: 'ค่าใช้จ่าย',
    stepSummary: 'สรุป',
    next: 'ถัดไป',
    back: 'กลับ',
    needAtLeastOneMember: 'เพิ่มอย่างน้อยหนึ่งคนเพื่อดำเนินการต่อ',
    membersStepHint: 'ใครกำลังมาเที่ยวในครั้งนี้?',
    expensesStepHint: 'บันทึกว่าใครจ่ายเท่าไร',
    summaryStepHint: 'ตรวจสอบยอดสุทธิและชำระหนี้',
    noExpensesYetSummary: 'ยังไม่มีค่าใช้จ่ายที่บันทึก เพิ่มจุดหยุดเพื่อดูการคำนวณชำระหนี้',
    locked: 'ทำให้เสร็จขั้นตอนก่อนหน้าก่อน',
  },
  addStopForm: {
    placeholder: 'ชื่อจุดหยุด/ค่าใช้จ่าย (เช่น แท็กซี่ มื้อเย็น)',
    amountPlaceholder: 'จำนวนเงิน (฿)',
    payerPlaceholder: 'ผู้จ่าย...',
  },
  receipt: {
    tripStops: 'จุดหยุดของทริป',
    total: 'รวมทั้งสิ้น',
    noExpenses: 'ยังไม่มีค่าใช้จ่ายที่บันทึก',
    logStopsAbove: 'บันทึกจุดหยุดโดยใช้แถบด้านบน',
    paidBy: 'จ่ายโดย',
    choosePayer: 'เลือกผู้จ่าย...',
    split: (amount: string, count: number) => `แบ่ง: ${amount} บาท × ${count} คน`,
    selectParticipants: '⚠️ เลือกผู้ที่เข้าร่วมในจุดหยุดนี้',
    toggle: (name: string) => `สลับ ${name}`,
    all: 'ทั้งหมด',
    clear: 'ล้าง',
    addFriendsToAssign: 'เพิ่มเพื่อนเพื่อกำหนดการแบ่ง',
    removeStop: 'ลบจุดหยุด',
  },
  members: {
    groupMembers: 'สมาชิกกลุ่ม',
    addFriendPlaceholder: 'เพิ่มเพื่อน (เช่น Alice)...',
    add: 'เพิ่ม',
    noParticipants: 'ยังไม่มีผู้เข้าร่วม',
    paid: 'จ่าย',
    share: 'ส่วน',
    getsBack: 'ได้คืน',
    owesMoney: 'เป็นหนี้',
    settled: 'เจ๊า',
    removeFriend: (name: string) => `ลบ ${name}`,
  },
  settle: {
    settleDebts: '💸 ชำระหนี้',
    allSettled: '🎉 ชำระหนี้ทั้งหมดแล้ว! ทุกคนจ่ายเงินตามส่วนแบ่งของตนเท่านั้น',
    pays: 'จ่ายให้',
    scanQr: 'สแกน QR',
    copyShareDesc: 'คัดลอกรายละเอียดการแบ่งปัน',
    copyFullSummary: 'คัดลอกสรุปการชำระเงินทั้งหมด',
  },
  qrModal: {
    promptPay: 'Prompt Pay',
    scanPayTo: (name: string) => `สแกนจ่ายให้คุณ ${name}`,
    transferAmount: 'ยอดโอนเงิน',
    receiver: 'ผู้รับ',
    hint: '(คัดลอกสเตทเมนท์และยอดสแกนเพื่อจ่ายได้จากหน้าสรุป)',
    done: 'เสร็จสิ้น',
  },
  toast: {
    added: (name: string) => `เพิ่ม "${name}"`,
    copiedTransferDetails: (name: string) => `คัดลอกรายละเอียดการโอนเงินสำหรับ ${name}!`,
    copiedSummary: 'คัดลอกสรุปทริป!',
  },
  shareText: {
    transferDetails: (fromName: string, toName: string, amount: string) =>
      `🧾 *เรียกเก็บเงินจากคุณ ${fromName}*\nโอนให้คุณ: *${toName}*\nจำนวนเงิน: *${amount} บาท*\n\nแชร์ผ่าน KraiJai Trip`,
    tripSummary: (tripTitle, totalCost, balances, transactions, noTransactions) => {
      let text = `📊 *สรุปค่าใช้จ่ายทริป: ${tripTitle}*\n`;
      text += `ค่าใช้จ่ายรวมทั้งทริป: ${totalCost} บาท\n\n`;
      text += `👥 *สรุปยอดสุทธิรายคน (จ่ายล่วงหน้า - ส่วนแบ่ง):*\n`;
      balances.forEach((b) => {
        text += `- ${b.name}: ${b.status} บาท (จ่ายล่วงหน้าไป ${b.fronted}, ส่วนตัวต้องหาร ${b.owed})\n`;
      });
      text += `\n💸 *รายการโอนเงินเพื่อเจ๊าบิล:*\n`;
      if (noTransactions) {
        text += `ไม่มีรายการค้างจ่าย ทุกคนจ่ายเงินเท่ากันพอดี! 🎉\n`;
      } else {
        transactions.forEach((t) => {
          text += `- ${t.from} โอนให้ ${t.to} = ${t.amount} บาท\n`;
        });
      }
      return text;
    },
  },
};
