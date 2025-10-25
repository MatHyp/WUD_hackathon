"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bus, Drama as Tram, Clock, QrCode, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Ticket from "@/components/ui/ticket-icon" // Declaring the Ticket variable
import { useToast } from "@/hooks/use-toast"

const ticketTypes = [
  { id: "20min", name: "20 minut", price: "4.60", duration: "20 min" },
  { id: "60min", name: "60 minut", price: "6.00", duration: "60 min" },
  { id: "90min", name: "90 minut", price: "8.00", duration: "90 min" },
  { id: "day", name: "Dzienny", price: "18.00", duration: "24 godz" },
  { id: "weekend", name: "Weekendowy", price: "22.00", duration: "72 godz" },
  { id: "week", name: "Tygodniowy", price: "64.00", duration: "7 dni" },
]

const scheduleData = [
  { line: "128", type: "bus", destination: "Nowy Kleparz", times: ["10:35", "10:50", "11:05", "11:20"] },
  { line: "4", type: "tram", destination: "Bronowice", times: ["10:38", "10:48", "10:58", "11:08"] },
  { line: "50", type: "bus", destination: "Krowodrza Górka", times: ["10:40", "10:55", "11:10", "11:25"] },
  { line: "8", type: "tram", destination: "Plac Inwalidów", times: ["10:42", "10:52", "11:02", "11:12"] },
]

export default function TicketsTab() {
  const [selectedTicket, setSelectedTicket] = useState("20min")
  const [activeTickets, setActiveTickets] = useState<
    Array<{
      id: number
      type: string
      validUntil: string
      activated: string
    }>
  >([])
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const stored = localStorage.getItem("activeTickets")
    if (stored) {
      setActiveTickets(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    if (activeTickets.length > 0) {
      localStorage.setItem("activeTickets", JSON.stringify(activeTickets))
    }
  }, [activeTickets])

  const handlePurchaseTicket = () => {
    const ticket = ticketTypes.find((t) => t.id === selectedTicket)
    if (!ticket) return

    const now = new Date()
    const activatedTime = now.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })

    // Calculate valid until time based on duration
    const durationMinutes =
      ticket.id === "20min"
        ? 20
        : ticket.id === "60min"
          ? 60
          : ticket.id === "90min"
            ? 90
            : ticket.id === "day"
              ? 1440
              : ticket.id === "weekend"
                ? 4320
                : 10080 // week

    const validUntil = new Date(now.getTime() + durationMinutes * 60000)
    const validUntilTime = validUntil.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })

    const newTicket = {
      id: Date.now(),
      type: ticket.name,
      validUntil: validUntilTime,
      activated: activatedTime,
    }

    setActiveTickets([newTicket, ...activeTickets])
    setIsOpen(false)

    toast({
      title: "Bilet zakupiony!",
      description: `${ticket.name} został aktywowany i jest ważny do ${validUntilTime}`,
    })
  }

  return (
    <div className="p-4 space-y-6">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Aktywne bilety</TabsTrigger>
          <TabsTrigger value="schedule">Rozkład jazdy</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-4">
          {activeTickets.length > 0 ? (
            <div className="space-y-4">
              {activeTickets.map((ticket) => (
                <Card key={ticket.id} className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-primary">{ticket.type}</CardTitle>
                        <CardDescription>Aktywowany: {ticket.activated}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-primary/20 text-primary">
                        Aktywny
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Ważny do</p>
                        <p className="text-2xl font-bold">{ticket.validUntil}</p>
                      </div>
                      <div className="w-24 h-24 bg-background rounded-lg flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-foreground" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">Pokaż ten kod QR kontrolerowi</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Brak aktywnych biletów</p>
              </CardContent>
            </Card>
          )}

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Kup nowy bilet
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Wybierz rodzaj biletu</DialogTitle>
                <DialogDescription>Wybierz bilet odpowiedni do Twojej podróży</DialogDescription>
              </DialogHeader>
              <RadioGroup value={selectedTicket} onValueChange={setSelectedTicket} className="space-y-3">
                {ticketTypes.map((ticket) => (
                  <div key={ticket.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={ticket.id} id={ticket.id} />
                    <Label htmlFor={ticket.id} className="flex-1 flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="font-medium">{ticket.name}</p>
                        <p className="text-sm text-muted-foreground">{ticket.duration}</p>
                      </div>
                      <span className="font-bold">{ticket.price} zł</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <Button className="w-full" size="lg" onClick={handlePurchaseTicket}>
                Kup i aktywuj bilet
              </Button>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dworzec Główny</CardTitle>
              <CardDescription>Najbliższe odjazdy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {scheduleData.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.type === "bus" ? (
                      <Bus className="w-6 h-6 text-primary" />
                    ) : (
                      <Tram className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-lg">{item.line}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.type === "bus" ? "Autobus" : "Tramwaj"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.destination}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.times.map((time, j) => (
                        <Badge
                          key={j}
                          variant={j === 0 ? "default" : "secondary"}
                          className={j === 0 ? "bg-primary" : ""}
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {time}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
