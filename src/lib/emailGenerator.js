// Tạo email random với độ phức tạp vừa phải
const adjectives = ['swift', 'bright', 'cool', 'smart', 'quick', 'bold', 'wise', 'calm', 'pure', 'true', 'kind', 'fair', 'warm', 'soft', 'wild', 'free', 'deep', 'high', 'vast', 'keen'];
const nouns = ['fox', 'wolf', 'bear', 'lion', 'hawk', 'eagle', 'tiger', 'panda', 'koala', 'otter', 'lynx', 'raven', 'storm', 'cloud', 'river', 'ocean', 'mountain', 'forest', 'valley', 'peak'];

export function generateEmail() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 9999);
  
  return `${adj}${noun}${num}@gmail.com`;
}

export function generatePassword(length = 16) {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const allChars = uppercase + lowercase + numbers + symbols;
  let password = '';
  
  // Đảm bảo có ít nhất 1 ký tự mỗi loại
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Thêm các ký tự còn lại
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Trộn ngẫu nhiên
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

export function generateAccount() {
  return {
    id: Date.now() + Math.random(),
    email: generateEmail(),
    password: generatePassword(),
    status: 'unused',
    note: '',
    createdAt: new Date().toISOString()
  };
}
