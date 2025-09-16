
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send } from "lucide-react";
import { motion } from "framer-motion";

const conversations = [
  {
    name: "Dr. Emily Carter",
    lastMessage: "Sounds great, I'll review the draft tonight.",
    time: "5m",
    avatarUrl: "https://picsum.photos/seed/101/40/40",
    unread: 2,
  },
  {
    name: "Aisha Khan, RN",
    lastMessage: "Can you send over that resource link?",
    time: "1h",
    avatarUrl: "https://picsum.photos/seed/103/40/40",
    unread: 0,
  },
  {
    name: "David Chen, MPH",
    lastMessage: "Let's sync up about the new initiative tomorrow.",
    time: "3h",
    avatarUrl: "https://picsum.photos/seed/102/40/40",
    unread: 0,
  },
    {
    name: "Dr. Ben Hanes",
    lastMessage: "The quantum computing article was fascinating.",
    time: "1d",
    avatarUrl: "https://picsum.photos/seed/104/40/40",
    unread: 0,
  },
];

const messages = [
    { from: "me", text: "Hi Emily, did you get a chance to look at the data I sent over?" },
    { from: "them", text: "I did! It looks promising. I have a few questions about the methodology in section 3." },
    { from: "me", text: "Of course, happy to clarify. Is now a good time for a quick call?" },
    { from: "them", text: "I'm about to step into a meeting. Can we sync up in an hour?" },
    { from: "me", text: "Perfect. Talk to you then." },
    { from: "them", text: "Sounds great, I'll review the draft tonight." },
]

export default function MessagingPage() {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };
  
  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
        className="h-[calc(100vh-10rem)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full">
            <div className="md:col-span-1 lg:col-span-1 border-r h-full flex flex-col">
                <div className="p-4 border-b">
                    <h1 className="text-2xl font-bold tracking-tight font-headline">Messages</h1>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search messages..." className="pl-9"/>
                    </div>
                </div>
                <ScrollArea className="flex-grow">
                    <motion.div className="divide-y" variants={listVariants} initial="hidden" animate="visible">
                    {conversations.map((convo) => (
                        <motion.div key={convo.name} variants={itemVariants} className="p-4 flex items-center gap-4 hover:bg-muted/50 cursor-pointer">
                            <Avatar>
                                <AvatarImage src={convo.avatarUrl} alt={convo.name} data-ai-hint="people portrait"/>
                                <AvatarFallback>{convo.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow overflow-hidden">
                                <p className="font-semibold truncate">{convo.name}</p>
                                <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                            </div>
                            <div className="text-xs text-muted-foreground shrink-0 text-right">
                                <p>{convo.time}</p>
                                {convo.unread > 0 && <div className="mt-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center ml-auto">{convo.unread}</div>}
                            </div>
                        </motion.div>
                    ))}
                    </motion.div>
                </ScrollArea>
            </div>
            <div className="md:col-span-2 lg:col-span-3 h-full hidden md:flex flex-col bg-card">
                <div className="p-4 border-b flex items-center gap-4">
                     <Avatar>
                        <AvatarImage src={conversations[0].avatarUrl} alt={conversations[0].name} />
                        <AvatarFallback>{conversations[0].name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{conversations[0].name}</p>
                        <p className="text-sm text-muted-foreground">Online</p>
                    </div>
                </div>
                <ScrollArea className="flex-grow p-4 lg:p-6">
                    <motion.div className="space-y-4" variants={listVariants} initial="hidden" animate="visible">
                        {messages.map((msg, index) => (
                             <motion.div variants={messageVariants} key={index} className={`flex items-end gap-2 ${msg.from === 'me' ? 'justify-end' : ''}`}>
                                {msg.from === 'them' && <Avatar className="h-8 w-8"><AvatarImage src={conversations[0].avatarUrl} /></Avatar>}
                                <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${msg.from === 'me' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                             </motion.div>
                        ))}
                    </motion.div>
                </ScrollArea>
                 <div className="p-4 border-t bg-background">
                    <div className="relative">
                        <Input placeholder="Type a message..." className="pr-12" />
                        <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
  )
}
