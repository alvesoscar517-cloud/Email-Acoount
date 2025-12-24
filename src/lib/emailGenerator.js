// Tạo email random với độ phức tạp vừa phải
const adjectives = ['swift', 'bright', 'cool', 'smart', 'quick', 'bold', 'wise', 'calm', 'pure', 'true', 'kind', 'fair', 'warm', 'soft', 'wild', 'free', 'deep', 'high', 'vast', 'keen'];
const nouns = ['fox', 'wolf', 'bear', 'lion', 'hawk', 'eagle', 'tiger', 'panda', 'koala', 'otter', 'lynx', 'raven', 'storm', 'cloud', 'river', 'ocean', 'mountain', 'forest', 'valley', 'peak'];

// Danh sách tên phổ biến (240 first names, 220 last names)
const firstNames = [
  'James', 'John', 'Robert', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Charles',
  'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
  'Kenneth', 'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Edward', 'Jason', 'Jeffrey', 'Ryan',
  'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon',
  'Benjamin', 'Samuel', 'Raymond', 'Gregory', 'Frank', 'Alexander', 'Patrick', 'Jack', 'Dennis', 'Jerry',
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
  'Lisa', 'Nancy', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle',
  'Dorothy', 'Carol', 'Amanda', 'Melissa', 'Deborah', 'Stephanie', 'Rebecca', 'Sharon', 'Laura', 'Cynthia',
  'Kathleen', 'Amy', 'Angela', 'Shirley', 'Anna', 'Brenda', 'Pamela', 'Emma', 'Nicole', 'Helen',
  'Samantha', 'Katherine', 'Christine', 'Debra', 'Rachel', 'Carolyn', 'Janet', 'Catherine', 'Maria', 'Heather',
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn', 'Avery', 'Cameron', 'Drew',
  'Logan', 'Parker', 'Hayden', 'Peyton', 'Blake', 'Charlie', 'Emery', 'Finley', 'Harper', 'Kendall',
  // Thêm 120 tên mới
  'Oliver', 'Liam', 'Noah', 'Ethan', 'Mason', 'Lucas', 'Aiden', 'Elijah', 'Sebastian', 'Henry',
  'Owen', 'Carter', 'Wyatt', 'Dylan', 'Luke', 'Gabriel', 'Isaac', 'Nathan', 'Caleb', 'Hunter',
  'Connor', 'Eli', 'Aaron', 'Landon', 'Adrian', 'Evan', 'Nolan', 'Colton', 'Dominic', 'Austin',
  'Ian', 'Cole', 'Tristan', 'Carson', 'Jaxon', 'Asher', 'Easton', 'Cooper', 'Lincoln', 'Xavier',
  'Ryder', 'Jasper', 'Miles', 'Leo', 'Sawyer', 'Declan', 'Ezra', 'Roman', 'Axel', 'Silas',
  'Sophia', 'Olivia', 'Ava', 'Isabella', 'Mia', 'Charlotte', 'Amelia', 'Abigail', 'Ella', 'Scarlett',
  'Grace', 'Chloe', 'Victoria', 'Lily', 'Zoey', 'Penelope', 'Layla', 'Nora', 'Zoe', 'Stella',
  'Hazel', 'Aurora', 'Savannah', 'Audrey', 'Brooklyn', 'Claire', 'Skylar', 'Lucy', 'Paisley', 'Evelyn',
  'Naomi', 'Ellie', 'Caroline', 'Piper', 'Ruby', 'Madelyn', 'Alice', 'Violet', 'Willow', 'Addison',
  'Eleanor', 'Natalie', 'Luna', 'Leah', 'Aubrey', 'Aria', 'Hannah', 'Maya', 'Bella', 'Aaliyah',
  'Mackenzie', 'Madeline', 'Autumn', 'Eva', 'Ariana', 'Kaylee', 'Gianna', 'Hailey', 'Gabriella', 'Allison',
  'Nevaeh', 'Sadie', 'Serenity', 'Kennedy', 'Lillian', 'Kylie', 'Alexa', 'Peyton', 'Brianna', 'Genesis'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris',
  'Clark', 'Lewis', 'Walker', 'Hall', 'Young', 'King', 'Wright', 'Scott', 'Green', 'Baker',
  'Adams', 'Nelson', 'Hill', 'Ramirez', 'Campbell', 'Mitchell', 'Roberts', 'Carter', 'Phillips', 'Evans',
  'Turner', 'Torres', 'Parker', 'Collins', 'Edwards', 'Stewart', 'Flores', 'Morris', 'Nguyen', 'Murphy',
  'Rivera', 'Cook', 'Rogers', 'Morgan', 'Peterson', 'Cooper', 'Reed', 'Bailey', 'Bell', 'Gomez',
  'Kelly', 'Howard', 'Ward', 'Cox', 'Diaz', 'Richardson', 'Wood', 'Watson', 'Brooks', 'Bennett',
  'Gray', 'James', 'Reyes', 'Cruz', 'Hughes', 'Price', 'Myers', 'Long', 'Foster', 'Sanders',
  'Ross', 'Morales', 'Powell', 'Sullivan', 'Russell', 'Ortiz', 'Jenkins', 'Gutierrez', 'Perry', 'Butler',
  'Barnes', 'Fisher', 'Henderson', 'Coleman', 'Simmons', 'Patterson', 'Jordan', 'Reynolds', 'Hamilton', 'Graham',
  'Kim', 'Gonzales', 'Alexander', 'Ramos', 'Wallace', 'Griffin', 'West', 'Cole', 'Hayes', 'Bryant',
  // Thêm 110 họ mới
  'Stone', 'Fox', 'Rose', 'Black', 'Burns', 'Gordon', 'Hunter', 'Knight', 'Webb', 'Spencer',
  'Stephens', 'Armstrong', 'Carroll', 'Duncan', 'Ferguson', 'Gibson', 'Grant', 'Harvey', 'Holmes', 'Hunt',
  'Johnston', 'Kennedy', 'Lane', 'Lawrence', 'Mason', 'Meyer', 'Mills', 'Nichols', 'Palmer', 'Payne',
  'Pierce', 'Porter', 'Quinn', 'Rice', 'Shaw', 'Snyder', 'Stevens', 'Tucker', 'Wade', 'Wagner',
  'Warren', 'Weaver', 'Wells', 'Wheeler', 'Willis', 'Arnold', 'Bishop', 'Boyd', 'Bradley', 'Carpenter',
  'Chapman', 'Crawford', 'Cunningham', 'Daniels', 'Dean', 'Douglas', 'Elliott', 'Ferguson', 'Fleming', 'Fletcher',
  'Ford', 'Franklin', 'Freeman', 'Gardner', 'Garrett', 'George', 'Gilbert', 'Gonzalez', 'Goodman', 'Graves',
  'Greene', 'Gregory', 'Hale', 'Hanson', 'Hardy', 'Harper', 'Harrison', 'Hart', 'Hawkins', 'Haynes',
  'Henry', 'Hicks', 'Hoffman', 'Holland', 'Hopkins', 'Horton', 'Howell', 'Hudson', 'Jacobs', 'Jensen',
  'Kelley', 'Keller', 'Lambert', 'Leonard', 'Little', 'Logan', 'Lynch', 'Marshall', 'Mcdonald', 'Morrison',
  'Murray', 'Newman', 'Owens', 'Pearson', 'Perkins', 'Peters', 'Phelps', 'Ramos', 'Ray', 'Reid'
];

export function generateFirstName() {
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

export function generateLastName() {
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}

export function generateEmail(firstName, lastName) {
  // Nếu có firstName và lastName, tạo email dựa trên tên
  if (firstName && lastName) {
    const num = Math.floor(Math.random() * 9999);
    const formats = [
      `${firstName.toLowerCase()}${lastName.toLowerCase()}${num}`,
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}${num}`,
      `${firstName.toLowerCase()}${num}`,
      `${lastName.toLowerCase()}${firstName.toLowerCase()}${num}`
    ];
    const format = formats[Math.floor(Math.random() * formats.length)];
    return `${format}@gmail.com`;
  }
  
  // Fallback: tạo email random
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
  const firstName = generateFirstName();
  const lastName = generateLastName();
  
  return {
    id: Date.now() + Math.random(),
    firstName,
    lastName,
    email: generateEmail(firstName, lastName),
    password: generatePassword(),
    status: 'unused',
    note: '',
    createdAt: new Date().toISOString()
  };
}
