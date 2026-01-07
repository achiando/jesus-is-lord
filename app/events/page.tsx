"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CalendarIcon, Clock, MapPin, ChevronRight, Filter, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EventCalendar } from "./_components/EventCalendar"
import { format, isSameDay, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import { events, Event } from "@/data/events"
import { dailyPrograms, DailyProgram } from "@/data/programs"

// --- Helper Functions ---

const getEventColor = (type: string) => {
  switch (type) {
    case "Prayer": return { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200" }
    case "Youth": return { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" }
    case "Service": return { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" }
    default: return { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200" }
  }
}

const convertTo24Hour = (timeStr: string): string => {
  const [time, modifier] = timeStr.split(" ")
  let [hours, minutes] = time.split(":")
  if (hours === "12") hours = "00"
  if (modifier === "PM") hours = (parseInt(hours, 10) + 12).toString()
  return `${hours.padStart(2, '0')}:${minutes}`
}

const isEventLive = (event: { date: string; time: string }): boolean => {
  try {
    const now = new Date()
    const [startTimeStr, endTimeStr] = event.time.split(" - ")
    const startDateTime = new Date(`${event.date}T${convertTo24Hour(startTimeStr)}:00`)
    const endDateTime = new Date(`${event.date}T${convertTo24Hour(endTimeStr)}:00`)
    if (endDateTime < startDateTime) endDateTime.setDate(endDateTime.getDate() + 1)
    return now >= startDateTime && now < endDateTime
  } catch (e) { return false }
}

const isProgramLive = (program: DailyProgram): boolean => {
  try {
    const now = new Date()
    if (!program.days.includes(now.getDay())) return false
    const currentTime = now.getHours() + now.getMinutes() / 60
    const [startHours, startMinutes] = program.startTime.split(":").map(Number)
    const startTime = startHours + startMinutes / 60
    const [endHours, endMinutes] = program.endTime.split(":").map(Number)
    const endTime = endHours + endMinutes / 60
    return currentTime >= startTime && currentTime < endTime
  } catch (e) { return false }
}

const formatDays = (days: number[]): string => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  if (days.length === 7) return "Daily";
  if (days.length === 5 && days.every(d => d >= 1 && d <= 5)) return "Weekdays";
  if (days.length === 2 && days.includes(0) && days.includes(6)) return "Weekends";
  return days.map(d => dayNames[d]).join(', ');
}

const allRegions = ["All Regions", ...Array.from(new Set(events.map((e) => e.region)))]
const allTypes = ["All Types", ...Array.from(new Set(events.map((e) => e.type)))]

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["All Regions"])
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["All Types"])
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const filteredEvents = events.filter((event) => {
    const dateMatch = selectedDate ? isSameDay(parseISO(event.date), selectedDate) : true;
    const regionMatch = selectedRegions.includes("All Regions") || selectedRegions.includes(event.region)
    const typeMatch = selectedTypes.includes("All Types") || selectedTypes.includes(event.type)
    return dateMatch && regionMatch && typeMatch
  })

  const toggleFilter = (value: string, collection: string[], setCollection: Function, allValue: string) => {
    if (value === allValue) {
      setCollection([allValue])
    } else {
      const newCollection = collection.filter((item) => item !== allValue)
      const finalCollection = newCollection.includes(value)
        ? newCollection.filter((item) => item !== value)
        : [...newCollection, value]
      setCollection(finalCollection.length === 0 ? [allValue] : finalCollection)
    }
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-balance text-3xl font-bold tracking-tight">Events & Schedule</h1>
        <p className="text-muted-foreground">Stay updated with services and programs across all regions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-5">
          <EventCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            eventsCount={filteredEvents.length}
          />
        </aside>

        <div className="lg:col-span-7">
          <div className="flex flex-wrap gap-2 mb-6 justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-transparent">
                  <Filter className="mr-2 h-4 w-4" /> Region
                  {!selectedRegions.includes("All Regions") && <Badge variant="secondary" className="ml-2">{selectedRegions.length}</Badge>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter by Region</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {allRegions.map((region) => (
                  <DropdownMenuCheckboxItem key={region} checked={selectedRegions.includes(region)} onCheckedChange={() => toggleFilter(region, selectedRegions, setSelectedRegions, "All Regions")}>
                    {region}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-transparent">
                  <Filter className="mr-2 h-4 w-4" /> Type
                  {!selectedTypes.includes("All Types") && <Badge variant="secondary" className="ml-2">{selectedTypes.length}</Badge>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {allTypes.map((type) => (
                  <DropdownMenuCheckboxItem key={type} checked={selectedTypes.includes(type)} onCheckedChange={() => toggleFilter(type, selectedTypes, setSelectedTypes, "All Types")}>
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="daily">Daily Programs</TabsTrigger>
              <TabsTrigger value="special">Special Events</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredEvents.length === 0 ? (
                <Card><CardContent className="flex h-40 items-center justify-center"><p className="text-muted-foreground">No events for this day.</p></CardContent></Card>
              ) : (
                <div className="grid gap-4">
                  {filteredEvents.map((event) => {
                    const eventColors = getEventColor(event.type);
                    const isHappeningNow = isEventLive(event);
                    return (
                      <Card key={event.id} className={cn("overflow-hidden transition-shadow hover:shadow-md border", eventColors.border, isHappeningNow && "shadow-lg shadow-blue-500/40 ring-2 ring-blue-500")}>
                        <div className="flex flex-col md:flex-row">
                          <div className={cn("flex w-full flex-col items-center justify-center p-6 text-center md:w-32", eventColors.bg)}>
                            <CalendarIcon className={cn("mb-2 h-6 w-6", eventColors.text)} />
                            <span className={cn("text-sm font-bold uppercase", eventColors.text)}>{format(parseISO(event.date), "MMM")}</span>
                            <span className={cn("text-2xl font-bold", eventColors.text)}>{format(parseISO(event.date), "dd")}</span>
                          </div>
                          <CardHeader className="flex-1 p-6">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className={cn(eventColors.bg, eventColors.text)}>{event.type}</Badge>
                                  {isHappeningNow && <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>}
                                </div>
                                <CardTitle className="text-xl pt-1">{event.title}</CardTitle>
                                <CardDescription className="flex items-center gap-1.5 pt-1"><MapPin className="h-3.5 w-3.5" />{event.church} ({event.region})</CardDescription>
                              </div>
                              <div className="flex flex-col items-end gap-2 text-right">
                                <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground"><Clock className="h-3.5 w-3.5" />{event.time}</div>
                                <Link href={`/events/${event.id}`}>
                                  {isHappeningNow ? <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Join Live</Button>
                                    : parseISO(event.date) > now ? <Button size="sm" variant="outline"><Bell className="mr-2 h-4 w-4" /> Remind</Button>
                                    : <Button variant="ghost" size="sm" className="group">Details<ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" /></Button>}
                                </Link>
                              </div>
                            </div>
                          </CardHeader>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="daily">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Radio Schedule</CardTitle>
                  <CardDescription>Recurring programs broadcasted live on Jesus Is Lord Radio.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {dailyPrograms.map((prog, i) => {
                    const isHappeningNow = isProgramLive(prog);
                    return (
                      <div key={i} className={cn("flex items-center justify-between border-b py-4 last:border-0 last:pb-2", isHappeningNow && "bg-blue-50/80 -mx-6 px-6 rounded-lg")}>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-sm font-bold text-primary w-16">{prog.displayTime}</span>
                          <div>
                            <p className="font-medium">{prog.title}</p>
                            <p className="text-xs text-muted-foreground">{formatDays(prog.days)}</p>
                          </div>
                        </div>
                        {isHappeningNow ? <Badge className="bg-red-500 text-white animate-pulse">LIVE NOW</Badge>
                          : <Button size="sm" variant="ghost" asChild><Link href="/listen">Listen</Link></Button>}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="special">
              <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed"><p className="text-muted-foreground">No upcoming global conferences scheduled.</p></div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
