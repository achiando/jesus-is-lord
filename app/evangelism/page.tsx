"use client"

import { useState } from "react"
import { MapPin, Users, Video, Calendar, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EvangelismPage() {
  const [showAdminForm, setShowAdminForm] = useState(false)

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold text-primary">Evangelism & Prayer</h1>
          <p className="text-muted-foreground">Join prayer and evangelism sessions near you or online.</p>
        </div>
        <Button onClick={() => setShowAdminForm(!showAdminForm)} variant="outline" className="rounded-full">
          <Plus className="mr-2 h-4 w-4" /> {showAdminForm ? "Close Form" : "List an Event"}
        </Button>
      </div>

      {showAdminForm && (
        <Card className="mb-12 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>List New Evangelism Session</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Session Title</label>
              <input className="w-full p-2 rounded-md border" placeholder="e.g. Community Outreach" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">Physical Location</SelectItem>
                  <SelectItem value="online">Online Session</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Region/City</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nairobi">Nairobi</SelectItem>
                  <SelectItem value="lagos">Lagos</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="new-york">New York</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date & Time</label>
              <input type="datetime-local" className="w-full p-2 rounded-md border" />
            </div>
            <div className="md:col-span-2">
              <Button className="w-full md:w-auto">Submit Session</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-64">
          <Select>
            <SelectTrigger>
              <MapPin className="mr-2 h-4 w-4 text-primary" />
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="nairobi">Nairobi</SelectItem>
              <SelectItem value="lagos">Lagos</SelectItem>
              <SelectItem value="london">London</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="physical" className="w-full">
        <TabsList className="grid w-64 grid-cols-2 mb-8">
          <TabsTrigger value="physical">Physical</TabsTrigger>
          <TabsTrigger value="online">Online</TabsTrigger>
        </TabsList>

        <TabsContent value="physical">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4 text-xs font-bold text-primary uppercase tracking-wider">
                    <Users className="h-3.5 w-3.5" />
                    Community Outreach
                  </div>
                  <h3 className="text-xl font-bold mb-2">Neighborhood Prayer Walk</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Saturday, May 12 • 10:00 AM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Central Park Plaza, Nairobi</span>
                    </div>
                  </div>
                  <Button className="w-full rounded-full">View Details & Join</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="online">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map((i) => (
              <Card key={i} className="hover:shadow-md transition-shadow border-primary/10">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4 text-xs font-bold text-blue-600 uppercase tracking-wider">
                    <Video className="h-3.5 w-3.5" />
                    Global Online Prayer
                  </div>
                  <h3 className="text-xl font-bold mb-2">Midnight Intercession</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Daily • 12:00 AM (GMT+3)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      <span>Zoom / YouTube Live</span>
                    </div>
                  </div>
                  <Button className="w-full rounded-full bg-transparent" variant="outline">
                    Get Link to Join
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
