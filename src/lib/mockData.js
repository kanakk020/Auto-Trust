export const currentUser = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  trustScore: 85,
  completedDeals: 12,
  activeContracts: 3,
  pendingAgreements: 1,
  avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=eff6ff&color=3b82f6'
};

export const mockContracts = [
  {
    id: 'c1',
    title: 'Website Redesign',
    partyA: 'Alex Johnson',
    partyB: 'Sarah Smith',
    amount: 1500,
    deadline: '2026-05-10',
    status: 'In Progress',
    createdAt: '2026-04-10',
    step: 3
  },
  {
    id: 'c2',
    title: 'Logo Animation',
    partyA: 'Alex Johnson',
    partyB: 'Mike Ross',
    amount: 300,
    deadline: '2026-04-20',
    status: 'Pending',
    createdAt: '2026-04-15',
    step: 1
  },
  {
    id: 'c3',
    title: 'SEO Setup',
    partyA: 'Jessica Pearson',
    partyB: 'Alex Johnson',
    amount: 800,
    deadline: '2026-04-05',
    status: 'Completed',
    createdAt: '2026-03-20',
    step: 4
  }
];

export const mockMessages = [
  { id: 1, sender: 'Sarah Smith', text: 'Hi Alex, I reviewed the latest design files.', timestamp: '10:30 AM', isMe: false },
  { id: 2, sender: 'Alex Johnson', text: 'Great! Do you think we are ready to move to development?', timestamp: '10:35 AM', isMe: true },
  { id: 3, sender: 'Sarah Smith', text: 'Yes, I will approve the milestone now.', timestamp: '10:40 AM', isMe: false }
];
