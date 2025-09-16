import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, FlaskConical, Stethoscope } from "lucide-react";

const resources = [
  {
    title: "Career Planning Template",
    category: "Career",
    description: "A comprehensive template to map out your 5-year career goals and milestones.",
    icon: FileText,
  },
  {
    title: "Grant Writing Guide for STEM",
    category: "STEM",
    description: "An essential guide to crafting winning grant proposals for research funding.",
    icon: FlaskConical,
  },
  {
    title: "Clinical Trial Best Practices",
    category: "Healthcare",
    description: "A checklist and guide for ensuring ethical and efficient clinical trial management.",
    icon: Stethoscope,
  },
  {
    title: "Guide to Community Health Needs Assessments",
    category: "Public Health",
    description: "Step-by-step instructions for conducting an effective CHNA in your community.",
    icon: FileText,
  },
  {
    title: "Resume & CV Keyword Optimization",
    category: "Career",
    description: "Learn how to tailor your resume to pass through automated screening systems.",
    icon: FileText,
  },
  {
    title: "Presenting Scientific Data",
    category: "STEM",
    description: "Tips and tricks for creating clear and impactful presentations of complex data.",
    icon: FlaskConical,
  },
];

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Resource Library</h1>
        <p className="text-muted-foreground">A curated collection of guides, templates, and learning materials to help you excel.</p>
      </div>

       <div className="flex flex-wrap gap-2">
        <Button variant="secondary">All Resources</Button>
        <Button variant="outline">Career</Button>
        <Button variant="outline">STEM</Button>
        <Button variant="outline">Healthcare</Button>
        <Button variant="outline">Public Health</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
          <Card key={index} className="flex flex-col">
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
        )})}
      </div>
    </div>
  );
}
