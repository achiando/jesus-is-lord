import { dailyPrograms } from '@/data/programs';
import { Clock } from 'lucide-react';
import React from 'react';

export const UpcomingPrograms = () => {
  const now = new Date();
  const currentDay = now.getDay();
  const todaysPrograms = dailyPrograms.filter(p => p.days.includes(currentDay));

  return (
    <section className="w-full mt-8">
      <h2 className="text-2xl font-serif font-bold mb-4 px-4 md:px-0">Upcoming Today</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4 px-4 md:px-0">
        {todaysPrograms.map((program) => (
          <div key={program.id} className="flex-shrink-0 w-64">
            <div className="bg-secondary/50 rounded-lg p-4 h-full flex flex-col justify-between">
              <div>
                <p className="text-sm font-bold text-primary">{program.displayTime}</p>
                <h3 className="font-semibold mt-1">{program.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{program.speaker}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                <Clock className="h-3 w-3" />
                <span>{program.startTime} - {program.endTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
