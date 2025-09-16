
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

export const mockPosts: Post[] = [];

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

export const mockEvents: Event[] = [];

export const mockPastEvents: Event[] = [];
