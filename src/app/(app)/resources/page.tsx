
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, FlaskConical, Stethoscope, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const resources: any[] = [];

export default function ResourcesPage() {
    const categoryColors = {
        Career: "bg-purple-100 text-purple-800",
        STEM: "bg-blue-100 text-blue-800",
        Healthcare: "bg-green-100 text-green-800",
        "Public Health": "bg-red-100 text-red-800",
    };
    const categoryIcons = {
        Career: FileText,
        STEM: FlaskConical,
        Healthcare: Stethoscope,
        "Public Health": FileText,
    }

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.1 }
      },
    };
  
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5 }
      },
    };
    
  const EmptyState = () => (
    <motion.div variants={itemVariants} className="text-center py-16 md:col-span-3">
        <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">Resource Library Coming Soon</h3>
                <p className="text-muted-foreground mt-2">
                    We're busy curating the best guides, templates, and materials. Check back shortly!
                </p>
            </CardContent>
        </Card>
    </motion.div>
  )

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Resource Library</h1>
        <p className="text-muted-foreground">A curated collection of guides, templates, and learning materials to help you excel.</p>
      </motion.div>

       <motion.div className="flex flex-wrap gap-2" variants={itemVariants}>
        <Button variant="secondary">All Resources</Button>
        <Button variant="outline">Career</Button>
        <Button variant="outline">STEM</Button>
        <Button variant="outline">Healthcare</Button>
        <Button variant="outline">Public Health</Button>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {resources.length > 0 ? resources.map((resource, index) => {
            const Icon = resource.icon
            return (
          <motion.div key={index} variants={itemVariants}>
            <Card className="flex flex-col h-full">
              <CardHeader>
                  <div className="flex justify-between items-start">
                      <div className={`p-3 rounded-full ${categoryColors[resource.category as keyof typeof categoryColors]}`}>
                          <Icon className="w-6 h-6"/>
                      </div>
                      <Badge variant="outline">{resource.category}</Badge>
                  </div>
                <CardTitle className="font-headline pt-4">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">{resource.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </div>
            </Card>
          </motion.div>
        )}) : (
            <EmptyState />
        )}
      </motion.div>
    </motion.div>
  );
}
