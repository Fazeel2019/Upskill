export type Post = {
  id: string;
  author: {
    name: string;
    handle: string;
    avatarUrl: string;
  };
  content: string;
  category: "STEM" | "Healthcare" | "Public Health";
  timestamp: string;
  likes: number;
  comments: number;
};

export const mockPosts: Post[] = [
  {
    id: "post1",
    author: {
      name: "Dr. Emily Carter",
      handle: "@emilycarter",
      avatarUrl: "https://picsum.photos/seed/101/48/48",
    },
    content: "Just published a new paper on CRISPR advancements. The potential for gene editing is evolving so rapidly! What are your thoughts on the ethical implications?",
    category: "STEM",
    timestamp: "2h ago",
    likes: 128,
    comments: 23,
  },
  {
    id: "post2",
    author: {
      name: "David Chen, MPH",
      handle: "@davidchen",
      avatarUrl: "https://picsum.photos/seed/102/48/48",
    },
    content: "Our latest community health initiative just reduced local smoking rates by 15%! A small win, but it feels huge. It's all about consistent, targeted education.",
    category: "Public Health",
    timestamp: "5h ago",
    likes: 95,
    comments: 12,
  },
  {
    id: "post3",
    author: {
      name: "Aisha Khan, RN",
      handle: "@aishakhan",
      avatarUrl: "https://picsum.photos/seed/103/48/48",
    },
    content: "What are the best strategies you've found for managing nurse burnout? Looking for practical tips to share with my team. We need to support each other.",
    category: "Healthcare",
    timestamp: "1d ago",
    likes: 256,
    comments: 45,
  },
    {
    id: "post4",
    author: {
      name: "Dr. Ben Hanes",
      handle: "@benhanes",
      avatarUrl: "https://picsum.photos/seed/104/48/48",
    },
    content: "Exploring the use of quantum computing in drug discovery. The simulation power is incredible, potentially cutting down development time by years. Anyone else in this space?",
    category: "STEM",
    timestamp: "2d ago",
    likes: 180,
    comments: 33,
  },
];

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "Webinar" | "Workshop" | "Summit";
  category: "STEM" | "Healthcare" | "Public Health";
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const mockEvents: Event[] = [
  {
    id: "event1",
    title: "AI in Diagnostics Webinar",
    date: "2024-10-28",
    time: "3:00 PM EST",
    type: "Webinar",
    category: "Healthcare",
    description: "Explore how artificial intelligence is reshaping medical diagnostics and improving patient outcomes.",
    imageUrl: "https://picsum.photos/seed/event1/400/250",
    imageHint: "artificial intelligence"
  },
  {
    id: "event2",
    title: "Career Networking for STEM Grads",
    date: "2024-11-12",
    time: "6:00 PM EST",
    type: "Workshop",
    category: "STEM",
    description: "An interactive session to connect with industry leaders and get practical career advice for the tech and science sectors.",
    imageUrl: "https://picsum.photos/seed/event2/400/250",
    imageHint: "people networking"
  },
  {
    id: "event3",
    title: "Global Public Health Policy Summit",
    date: "2024-12-05",
    time: "9:00 AM EST",
    type: "Summit",
    category: "Public Health",
    description: "A two-day summit discussing the future of global health policies, pandemic preparedness, and equitable access.",
    imageUrl: "https://picsum.photos/seed/event3/400/250",
    imageHint: "world globe"
  },
];

export const mockPastEvents: Event[] = [
    {
    id: "event4",
    title: "Gene Editing Ethics Roundtable",
    date: "2024-09-20",
    time: "1:00 PM EST",
    type: "Webinar",
    category: "STEM",
    description: "A deep dive into the ethical considerations surrounding CRISPR and other gene-editing technologies.",
    imageUrl: "https://picsum.photos/seed/event4/400/250",
    imageHint: "dna strand"
  },
]
