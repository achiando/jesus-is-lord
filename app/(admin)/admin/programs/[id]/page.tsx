import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dailyPrograms } from "@/data/programs";
import { ProgramForm } from "../_components/ProgramForm";

export default async function ProgramEditPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const isNew = id === 'new';
  
  // This is a server-side simulation of fetching data.
  // In a real app, this might be a database call.
  // Here, we read from the file.
  const program = isNew 
    ? undefined 
    : dailyPrograms.find((p) => p.id === id);

  if (!isNew && !program) {
    return <div>Program not found.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {isNew ? "Create New Program" : "Edit Program"}
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>{isNew ? "Program Details" : program?.title}</CardTitle>
          <CardDescription>
            {isNew ? "Fill out the form to add a new program to the schedule." : `Editing details for the program.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProgramForm program={program} />
        </CardContent>
      </Card>
    </div>
  );
}
