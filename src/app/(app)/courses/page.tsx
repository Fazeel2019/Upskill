
"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function CoursesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">Courses</h1>
      <p className="text-muted-foreground mt-2">
        Browse our catalog of expert-led courses.
      </p>
      <Card className="mt-6">
        <CardContent className="p-8 text-center text-muted-foreground">
            <p>The course catalog will be displayed here. Content coming soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
