
import { type Timestamp } from "firebase/firestore";

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
};
