
import { type Timestamp } from "firebase/firestore";
import { z } from 'zod';

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string | Timestamp;
  time: string;
  type: "Webinar" | "Workshop" | "Summit" | "Meetup";
  category: "STEM" | "Healthcare" | "Public Health";
  imageUrl: string;
  imageHint: string;
  registeredUids?: string[];
};

export type Lecture = {
  id: string;
  title: string;
  videoEmbedCode: string;
  duration: number; // in minutes
};

export type Section = {
  id: string;
  title: string;
  lectures: Lecture[];
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  category: "Career" | "STEM" | "Healthcare" | "Public Health";
  sections: Section[];
  thumbnailUrl: string;
  imageHint: string;
  createdAt: Timestamp;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  category: "Career" | "STEM" | "Healthcare" | "Public Health";
  price: number;
  sections: Section[];
  thumbnailUrl: string;
  imageHint: string;
  createdAt: Timestamp;
};


export type Podcast = {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  imageHint: string;
  episodeUrl: string;
  duration: string;
  createdAt: Timestamp;
};

export type Blog = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: "Career Development" | "Healthcare" | "STEM" | "Public Health";
  imageUrl: string;
  imageHint: string;
  createdAt: Timestamp;
};

export const RecommendationSchema = z.object({
  type: z.enum(['Learning', 'Community', 'Event']).describe('The type of content being recommended.'),
  title: z.string().describe('The title of the recommended item.'),
  reason: z.string().describe('A brief explanation of why this is recommended for the user.'),
  link: z.string().optional().describe('A direct link to the recommended content.'),
});
