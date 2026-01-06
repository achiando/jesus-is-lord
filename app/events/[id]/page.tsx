import { notFound } from "next/navigation"
import Link from "next/link"
import { CalendarIcon, Clock, MapPin, Phone, Mail, ArrowLeft, Users, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Mock event data - In production, this would come from a database
const eventsData = [
  {
    id: "1",
    title: "Morning Glory Prayer",
    church: "Nakuru Main Altar",
    time: "05:00 AM - 07:00 AM",
    date: "Daily",
    type: "Prayer",
    region: "Rift Valley",
    description:
      "Start your day with powerful intercessory prayer and worship. Join us every morning as we seek God's face and lay our burdens before Him. Experience the refreshing presence of the Holy Spirit.",
    location: "Jesus Is Lord Radio Main Altar, Nakuru Town, Rift Valley Region",
    contactPerson: "Pastor James Mwangi",
    phone: "+254 712 345 678",
    email: "nakuru@jiradio.org",
    expectedAttendance: "50-100 people",
    requirements: "Come with an open heart and spirit of prayer",
  },
  {
    id: "2",
    title: "Mid-Week Service",
    church: "Nairobi Headquarters",
    time: "05:00 PM - 08:00 PM",
    date: "Wed, Jan 7",
    type: "Service",
    region: "Nairobi",
    description:
      "Join us for a powerful mid-week service featuring worship, testimonies, and the preached Word of God. This is a time to refresh your spirit and be strengthened for the rest of the week.",
    location: "Jesus Is Lord Radio HQ, Ngong Road, Nairobi",
    contactPerson: "Pastor Ruth Wanjiru",
    phone: "+254 720 123 456",
    email: "nairobi@jiradio.org",
    expectedAttendance: "200-300 people",
    requirements: "No special requirements, all are welcome",
  },
  {
    id: "3",
    title: "National Youth Conference",
    church: "Nakuru Menengai Ground",
    time: "08:00 AM - 05:00 PM",
    date: "Jan 10 - Jan 12",
    type: "Conference",
    region: "National",
    description:
      "A three-day national youth conference featuring renowned speakers, worship sessions, workshops, and fellowship. Theme: 'Arise and Shine - The Youth of This Generation.' Registration is required.",
    location: "Menengai Grounds, Nakuru, Rift Valley",
    contactPerson: "Rev. David Kimani",
    phone: "+254 735 987 654",
    email: "youth@jiradio.org",
    expectedAttendance: "1000+ youth",
    requirements: "Registration fee: KSH 500, valid ID required",
  },
  {
    id: "4",
    title: "Healing & Deliverance Service",
    church: "Kisumu Central Altar",
    time: "02:00 PM - 06:00 PM",
    date: "Sun, Jan 11",
    type: "Service",
    region: "Nyanza",
    description:
      "A special service dedicated to healing, deliverance, and restoration. Come with your faith and expect miracles as we pray for the sick and minister deliverance to the oppressed.",
    location: "Kisumu Central Altar, Kondele Area, Kisumu",
    contactPerson: "Pastor Grace Atieno",
    phone: "+254 745 678 901",
    email: "kisumu@jiradio.org",
    expectedAttendance: "150-200 people",
    requirements: "Bring your faith and prayer requests",
  },
  {
    id: "5",
    title: "All Night Vigil",
    church: "Mombasa Altar",
    time: "09:00 PM - 04:00 AM",
    date: "Fri, Jan 16",
    type: "Vigil",
    region: "Coast",
    description:
      "An all-night prayer vigil with worship, intercession, and spiritual warfare. We will pray for our nation, families, and personal breakthroughs. Refreshments will be provided.",
    location: "Jesus Is Lord Radio Mombasa Altar, Nyali Area, Mombasa",
    contactPerson: "Pastor John Omondi",
    phone: "+254 758 234 567",
    email: "mombasa@jiradio.org",
    expectedAttendance: "80-120 people",
    requirements: "Bring warm clothing and Bible",
  },
]

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = eventsData.find((e) => e.id === id)

  if (!event) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Back button */}
      <Link href="/events">
        <Button variant="ghost" className="mb-6 -ml-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
      </Link>

      {/* Event header */}
      <div className="mb-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="secondary" className="mb-2">
              {event.type}
            </Badge>
            <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{event.title}</h1>
            <p className="text-lg text-muted-foreground">{event.church}</p>
          </div>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Quick info cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <CalendarIcon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-semibold">{event.date}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-semibold">{event.time}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Expected</p>
              <p className="font-semibold">{event.expectedAttendance}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left column - Description and details */}
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>About This Event</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-foreground">{event.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium">{event.location}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Region: {event.region}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-foreground">{event.requirements}</p>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Contact info */}
        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Get in touch for more details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">Organizer</p>
                <p className="font-semibold text-foreground">{event.contactPerson}</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <a
                  href={`tel:${event.phone}`}
                  className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-primary/10"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{event.phone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${event.email}`}
                  className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-primary/10"
                >
                  <Mail className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{event.email}</p>
                  </div>
                </a>
              </div>

              <Separator />

              <Button className="w-full" size="lg">
                Register for Event
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Need Directions?</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                <MapPin className="mr-2 h-4 w-4" />
                Open in Maps
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
