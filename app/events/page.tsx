"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, Clock, MapPin, ChevronRight, Filter, Bell, Plus } from "lucide-react"
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
import { EventCalendar } from "./_components/EventCalendar" // Import EventCalendar
import { format, isSameDay, parseISO } from "date-fns"
import { cn } from "@/lib/utils"

// Helper to get event color
const getEventColor = (type: string) => {
  switch (type) {
    case "Prayer":
      return { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200" }
    case "Youth":
      return { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" }
    case "Service":
      return { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" }
    default:
      return { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200" }
  }
}

const events = [
  {
    id: "1",
    title: "Morning Glory Prayer",
    church: "Nakuru Main Altar",
    time: "05:00 AM - 07:00 AM",
    date: "2026-01-06", // Today
    type: "Prayer",
    region: "Rift Valley",
    isLive: true,
  },
  {
    id: "2",
    title: "Mid-Week Service",
    church: "Nairobi Headquarters",
    time: "05:00 PM - 08:00 PM",
    date: "2026-01-07", // Tomorrow
    type: "Service",
    region: "Nairobi",
    isLive: false,
  },
  {
    id: "3",
    title: "National Youth Conference",
    church: "Nakuru Menengai Ground",
    time: "08:00 AM - 05:00 PM",
    date: "2026-01-10",
    type: "Youth",
    region: "National",
    isLive: false,
  },
  {
    id: "4",
    title: "Healing & Deliverance Service",
    church: "Kisumu Central Altar",
    time: "02:00 PM - 06:00 PM",
    date: "2026-01-11",
    type: "Service",
    region: "Nyanza",
    isLive: false,
  },
  {
    id: "5",
    title: "All Night Vigil",
    church: "Mombasa Altar",
    time: "09:00 PM - 04:00 AM",
    date: "2026-01-16",
    type: "Prayer",
    region: "Coast",
    isLive: false,
  },
]

const allRegions = ["All Regions", ...Array.from(new Set(events.map((e) => e.region)))]
const allTypes = ["All Types", ...Array.from(new Set(events.map((e) => e.type)))]

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["All Regions"])
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["All Types"])

  const filteredEvents = events.filter((event) => {
    const eventDate = parseISO(event.date);
    const dateMatch = selectedDate ? isSameDay(eventDate, selectedDate) : true;
    const regionMatch = selectedRegions.includes("All Regions") || selectedRegions.includes(event.region)
    const typeMatch = selectedTypes.includes("All Types") || selectedTypes.includes(event.type)
    return dateMatch && regionMatch && typeMatch
  })

  const toggleRegion = (region: string) => {
    if (region === "All Regions") {
      setSelectedRegions(["All Regions"])
    } else {
      setSelectedRegions((prev) => {
        const filtered = prev.filter((r) => r !== "All Regions")
        if (filtered.includes(region)) {
          const newRegions = filtered.filter((r) => r !== region)
          return newRegions.length === 0 ? ["All Regions"] : newRegions
        } else {
          return [...filtered, region]
        }
      })
    }
  }

  const toggleType = (type: string) => {
    if (type === "All Types") {
      setSelectedTypes(["All Types"])
    } else {
      setSelectedTypes((prev) => {
        const filtered = prev.filter((t) => t !== "All Types")
        if (filtered.includes(type)) {
          const newTypes = filtered.filter((t) => t !== type)
          return newTypes.length === 0 ? ["All Types"] : newTypes
        } else {
          return [...filtered, type]
        }
      })
    }
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8"> {/* Increased max-width */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-balance text-3xl font-bold tracking-tight">Events & Schedule</h1>
          <p className="text-muted-foreground">Stay updated with services and programs across all regions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Calendar */}
        <aside className="lg:col-span-5">
          <EventCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            eventsCount={filteredEvents.length}
          />
        </aside>

        {/* Right Column: Filters and Event List */}
        <div className="lg:col-span-7">
          <div className="flex flex-wrap gap-2 mb-6 justify-end"> {/* Moved filters here */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-transparent">
                  <Filter className="mr-2 h-4 w-4" />
                  Region
                  {!selectedRegions.includes("All Regions") && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedRegions.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter by Region</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {allRegions.map((region) => (
                  <DropdownMenuCheckboxItem
                    key={region}
                    checked={selectedRegions.includes(region)}
                    onCheckedChange={() => toggleRegion(region)}
                  >
                    {region}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-transparent">
                  <Filter className="mr-2 h-4 w-4" />
                  Type
                  {!selectedTypes.includes("All Types") && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedTypes.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {allTypes.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={() => toggleType(type)}
                  >
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
                <Card>
                  <CardContent className="flex h-40 items-center justify-center">
                    <p className="text-muted-foreground">No events match your filters.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {filteredEvents.map((event) => {
                    const eventColors = getEventColor(event.type);
                    const isUpcoming = parseISO(event.date) > new Date(); // Simple check for upcoming
                    const isHappeningNow = event.isLive; // Placeholder for actual live status

                    return (
                      <Card key={event.id} className={cn("overflow-hidden transition-shadow hover:shadow-md", eventColors.border, "border")}>
                        <div className="flex flex-col md:flex-row">
                          <div className={cn("flex w-full flex-col items-center justify-center p-6 text-center md:w-32", eventColors.bg)}>
                            <CalendarIcon className={cn("mb-2 h-6 w-6", eventColors.text)} />
                            <span className={cn("text-sm font-bold uppercase", eventColors.text)}>{format(parseISO(event.date), "MMM")}</span>
                            <span className={cn("text-2xl font-bold", eventColors.text)}>{format(parseISO(event.date), "dd")}</span>
                          </div>
                          <CardHeader className="flex-1 p-6">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div className="space-y-1">
                                <Badge variant="secondary" className={cn("mb-2", eventColors.bg, eventColors.text)}>
                                  {event.type}
                                </Badge>
                                <CardTitle className="text-xl">{event.title}</CardTitle>
                                <CardDescription className="flex items-center gap-1.5 pt-1">
                                  <MapPin className="h-3.5 w-3.5" />
                                  {event.church} ({event.region})
                                </CardDescription>
                              </div>
                              <div className="flex flex-col items-end gap-2 text-right">
                                <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                                  <Clock className="h-3.5 w-3.5" />
                                  {event.time}
                                </div>
                                <Link href={`/events/${event.id}`}>
                                  {isHappeningNow ? (
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                      Join Live
                                    </Button>
                                  ) : isUpcoming ? (
                                    <Button size="sm" variant="outline">
                                      <Bell className="mr-2 h-4 w-4" /> Remind
                                    </Button>
                                  ) : (
                                    <Button variant="ghost" size="sm" className="group">
                                      Details
                                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                    </Button>
                                  )}
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
                <CardContent className="space-y-4">
                  {[
                    { time: "05:00 AM", title: "Morning Glory Prayer" },
                    { time: "09:00 AM", title: "The Highway of Holiness" },
                    { time: "12:00 PM", title: "Lunch Hour Service" },
                    { time: "03:00 PM", title: "Voices of the Prophets" },
                    { time: "08:00 PM", title: "Evening Word & Worship" },
                  ].map((prog, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm font-bold text-primary">{prog.time}</span>
                        <span className="font-medium">{prog.title}</span>
                      </div>
                      <Button size="sm" variant="ghost">
                        Listen
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="special">
              <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground">No upcoming global conferences scheduled this week.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
