
"use client";

import { useEffect, useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, MessageSquare, Users, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { listenToFriends, UserProfile } from "@/services/profile";
import { listenToMessages, sendMessage, getChatId, Message } from "@/services/chat";
import { formatDistanceToNow } from "date-fns";

export default function MessagingPage() {
  const { user } = useAuth();
  const [friends, setFriends] = useState<UserProfile[]>([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
        setLoadingFriends(true);
        const unsubscribe = listenToFriends(user.uid, (newFriends) => {
            setFriends(newFriends);
            setLoadingFriends(false);
        });

        return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (user && selectedFriend) {
        setLoadingMessages(true);
        const currentChatId = getChatId(user.uid, selectedFriend.uid);
        setChatId(currentChatId);

        const unsubscribe = listenToMessages(currentChatId, (newMessages) => {
            setMessages(newMessages);
            setLoadingMessages(false);
        });

        return () => unsubscribe();
    }
  }, [user, selectedFriend]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A slight delay may be needed for the DOM to update
        setTimeout(() => {
            const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }, 100);
    }
  }, [messages]);

  const handleSelectFriend = (friend: UserProfile) => {
    setSelectedFriend(friend);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (!user || !chatId || !newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
        await sendMessage(chatId, user.uid, newMessage);
        setNewMessage("");
    } catch (error) {
        console.error("Failed to send message:", error);
    } finally {
        setIsSending(false);
    }
  };


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
  
  const EmptyState = () => (
    <div className="flex flex-col h-full items-center justify-center p-8 text-center bg-card">
         <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
         <h3 className="font-semibold text-xl">Your Messages</h3>
         <p className="text-muted-foreground mt-2 max-w-sm">
            Select a friend to start chatting, or find new members on the community page to connect with.
         </p>
    </div>
  );

  return (
    <motion.div 
        className="h-[calc(100vh-10rem)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full border rounded-lg overflow-hidden">
            <div className="md:col-span-1 lg:col-span-1 border-r h-full flex flex-col">
                <div className="p-4 border-b">
                    <h1 className="text-2xl font-bold tracking-tight font-headline">Messages</h1>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search friends..." className="pl-9"/>
                    </div>
                </div>
                <ScrollArea className="flex-grow">
                    {loadingFriends ? (
                        <div className="p-8 text-center text-muted-foreground">Loading friends...</div>
                    ) : friends.length > 0 ? (
                        <motion.div className="divide-y" variants={listVariants} initial="hidden" animate="visible">
                        {friends.map((friend) => (
                            <motion.div key={friend.uid} variants={itemVariants} 
                            className={`p-4 flex items-center gap-4 hover:bg-muted/50 cursor-pointer ${selectedFriend?.uid === friend.uid ? 'bg-muted/50' : ''}`}
                            onClick={() => handleSelectFriend(friend)}
                            >
                                <Avatar>
                                    <AvatarImage src={friend.photoURL} alt={friend.displayName} data-ai-hint="people portrait"/>
                                    <AvatarFallback>{friend.displayName.split(" ").map((n:string)=>n[0]).join("")}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow overflow-hidden">
                                    <p className="font-semibold truncate">{friend.displayName}</p>
                                    <p className="text-sm text-muted-foreground truncate">Start a conversation</p>
                                </div>
                            </motion.div>
                        ))}
                        </motion.div>
                    ) : (
                         <div className="p-8 text-center text-muted-foreground">
                            <Users className="h-10 w-10 mx-auto mb-2"/>
                            <p className="text-sm">No friends yet.</p>
                             <p className="text-xs mt-1">Connect with others from their profile page.</p>
                         </div>
                    )}
                </ScrollArea>
            </div>
            <div className="md:col-span-2 lg:col-span-3 h-full hidden md:flex flex-col bg-card">
                {selectedFriend ? (
                    <>
                        <div className="p-4 border-b flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={selectedFriend.photoURL} alt={selectedFriend.displayName} />
                                <AvatarFallback>{selectedFriend.displayName.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{selectedFriend.displayName}</p>
                                <p className="text-sm text-muted-foreground">Online</p>
                            </div>
                        </div>
                        <ScrollArea className="flex-grow p-4 lg:p-6" ref={scrollAreaRef}>
                             {loadingMessages ? (
                                <div className="flex h-full items-center justify-center">
                                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                </div>
                             ) : (
                                <motion.div className="space-y-4" variants={listVariants} initial="hidden" animate="visible">
                                    {messages.map((msg) => (
                                        <motion.div variants={messageVariants} key={msg.id} className={`flex items-start gap-3 ${msg.senderId === user?.uid ? 'justify-end' : ''}`}>
                                            {msg.senderId !== user?.uid && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={selectedFriend.photoURL} />
                                                    <AvatarFallback>{selectedFriend.displayName.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className="flex flex-col gap-1 items-end">
                                              <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${msg.senderId === user?.uid ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                                  <p className="text-sm">{msg.text}</p>
                                              </div>
                                               <p className="text-xs text-muted-foreground">
                                                {msg.timestamp ? formatDistanceToNow(msg.timestamp.toDate(), { addSuffix: true }) : 'Just now'}
                                              </p>
                                            </div>
                                            {msg.senderId === user?.uid && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={user.photoURL || undefined} />
                                                    <AvatarFallback>{user.displayName?.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                                                </Avatar>
                                            )}
                                        </motion.div>
                                    ))}
                                </motion.div>
                             )}
                        </ScrollArea>
                        <div className="p-4 border-t bg-background">
                            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="relative">
                                <Input 
                                    placeholder="Type a message..." 
                                    className="pr-12"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    disabled={isSending}
                                />
                                <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isSending || !newMessage.trim()}>
                                    {isSending ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Send className="h-4 w-4" />
                                    )}
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    </motion.div>
  )
}
