import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dailyPrograms } from "@/data/programs";
import { PlusCircle, Edit } from "lucide-react";
import Link from "next/link";

export default function AdminProgramsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Programs Management</h1>
          <p className="text-muted-foreground">Edit the daily radio schedule.</p>
        </div>
        <Button asChild>
          <Link href="/admin/programs/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Program
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Program Schedule</CardTitle>
          <CardDescription>{dailyPrograms.length} programs configured.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {dailyPrograms.map((program) => (
              <div key={program.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-semibold">{program.title} <span className="font-normal text-muted-foreground">({program.startTime} - {program.endTime})</span></p>
                  <p className="text-sm text-muted-foreground">{program.speaker}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/programs/${program.id}`}>
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
