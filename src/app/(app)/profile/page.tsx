import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Briefcase, Edit, FileText, Linkedin, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <div className="relative h-48 md:h-64">
          <Image
            src="https://picsum.photos/seed/cover/1200/400"
            alt="Cover image"
            layout="fill"
            objectFit="cover"
            data-ai-hint="abstract background"
          />
          <div className="absolute top-4 right-4">
            <Button variant="secondary" size="sm">
              <Edit className="mr-2 h-4 w-4" /> Edit Cover
            </Button>
          </div>
        </div>
        <div className="p-6 bg-card">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-24 sm:-mt-20">
            <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-full border-4 border-card ring-2 ring-border shrink-0">
               <Avatar className="h-full w-full">
                    <AvatarImage src="https://picsum.photos/seed/user-avatar/150/150" alt="Dr. Ada Lovelace" data-ai-hint="woman portrait"/>
                    <AvatarFallback>AL</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex-grow">
              <h1 className="text-2xl sm:text-3xl font-bold font-headline">Dr. Ada Lovelace</h1>
              <p className="text-muted-foreground">Computational Biologist | Pioneer in Algorithmic Science</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1"><MapPin className="w-4 h-4"/>Cambridge, UK</div>
                <div className="flex items-center gap-1"><Briefcase className="w-4 h-4"/>Babbage Labs</div>
              </div>
            </div>
            <div className="shrink-0 flex gap-2">
                <Button><Edit className="mr-2 h-4 w-4" />Edit Profile</Button>
                <Button variant="outline">View Public Profile</Button>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
           <Tabs defaultValue="about">
                <TabsList className="mb-4">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="publications">Publications</TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Bio</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>Dr. Ada Lovelace is a world-renowned computational biologist with over 15 years of experience in genomic sequencing and algorithmic analysis. Her work focuses on developing novel computational models to understand complex diseases.</p>
                            <p>She is a passionate advocate for interdisciplinary collaboration and believes that the future of medicine lies at the intersection of technology and biology. In her spare time, she enjoys classical music and mentoring young scientists.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="projects">
                    <Card>
                         <CardHeader>
                            <CardTitle className="font-headline">Featured Projects</CardTitle>
                        </CardHeader>
                         <CardContent>
                             <p className="text-muted-foreground">Projects will be displayed here.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="publications">
                    <Card>
                         <CardHeader>
                            <CardTitle className="font-headline">Recent Publications</CardTitle>
                        </CardHeader>
                         <CardContent>
                             <p className="text-muted-foreground">Publications will be displayed here.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Contact & Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-muted-foreground"/>ada.lovelace@example.com</div>
                    <div className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-muted-foreground"/><Link href="#" className="text-primary hover:underline">linkedin.com/in/adalovelace</Link></div>
                    <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-muted-foreground"/><Link href="#" className="text-primary hover:underline">View CV</Link></div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2"><Award className="w-4 h-4 text-muted-foreground"/> Franklin Medal in Life Science, 2023</div>
                    <div className="flex items-center gap-2"><Award className="w-4 h-4 text-muted-foreground"/> Top 50 in STEM, Innovate Magazine</div>
                    <div className="flex items-center gap-2"><Award className="w-4 h-4 text-muted-foreground"/> Community Top Voice Badge</div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
