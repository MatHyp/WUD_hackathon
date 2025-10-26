"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Ticket } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const events = [
  {
    id: 1,
    title: "Koncert Symfoniczny",
    date: "15 Sty 2025",
    time: "19:00",
    location: "Filharmonia Szczecin",
    price: "od 45 zł",
    image: "/symphony-orchestra-concert-hall.jpg",
    category: "Muzyka",
    available: 120,
  },
  {
    id: 2,
    title: "Wystawa Sztuki Współczesnej",
    date: "18 Sty 2025",
    time: "10:00",
    location: "Galeria Miejska",
    price: "od 20 zł",
    image: "/modern-art-gallery.png",
    category: "Sztuka",
    available: 50,
  },
  {
    id: 3,
    title: "Festiwal Foodtrucków",
    date: "20 Sty 2025",
    time: "12:00",
    location: "Jasne Błonia",
    price: "Wstęp wolny",
    image: "/food-truck-festival-outdoor.jpg",
    category: "Jedzenie",
    available: null,
  },
  {
    id: 4,
    title: "Spektakl Teatralny",
    date: "22 Sty 2025",
    time: "18:30",
    location: "Teatr Narodowy",
    price: "od 60 zł",
    image: "/theater-stage-performance.jpg",
    category: "Teatr",
    available: 35,
  },
];

export default function EventsTab() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(
    null
  );
  const [ticketCount, setTicketCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("Wszystkie");

  const handlePurchaseEventTicket = () => {
    if (!selectedEvent) return;

    toast({
      title: "Bilet zakupiony!",
      description: `Zakupiono ${ticketCount} bilet(ów) na ${selectedEvent.title}. Sprawdź email po szczegóły.`,
    });

    setIsOpen(false);
    setTicketCount(1);
  };

  const filteredEvents =
    activeCategory === "Wszystkie"
      ? events
      : events.filter((event) => event.category === activeCategory);

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-balance">
          Wydarzenia w mieście
        </h2>
        <p className="text-muted-foreground text-pretty">
          Odkryj i kup bilety na najlepsze wydarzenia
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        {["Wszystkie", "Muzyka", "Sztuka", "Teatr", "Sport", "Jedzenie"].map(
          (cat) => (
            <Badge
              key={cat}
              onClick={() => setActiveCategory(cat)}
              variant={cat === activeCategory ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap"
            >
              {cat}
            </Badge>
          )
        )}
      </div>

      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            className="overflow-hidden hover:bg-accent transition-colors"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-40 h-40 sm:h-auto bg-muted flex-shrink-0">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <Badge variant="secondary" className="mb-2">
                        {event.category}
                      </Badge>
                      <CardTitle className="text-lg text-balance">
                        {event.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {event.date} • {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    {event.available && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{event.available} miejsc dostępnych</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-bold text-lg">{event.price}</span>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => {
                            setSelectedEvent(event);
                            setIsOpen(true);
                          }}
                        >
                          <Ticket className="w-4 h-4 mr-2" />
                          Kup bilet
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-balance">
                            {selectedEvent?.title}
                          </DialogTitle>
                          <DialogDescription>
                            {selectedEvent?.date} • {selectedEvent?.time}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="tickets">Liczba biletów</Label>
                            <Input
                              id="tickets"
                              type="number"
                              min="1"
                              max="10"
                              value={ticketCount}
                              onChange={(e) =>
                                setTicketCount(
                                  Number.parseInt(e.target.value) || 1
                                )
                              }
                            />
                          </div>
                          <div className="bg-muted rounded-lg p-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Cena biletu</span>
                              <span>{selectedEvent?.price}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Liczba biletów</span>
                              <span>{ticketCount}</span>
                            </div>
                            <div className="border-t border-border pt-2 flex justify-between font-bold">
                              <span>Razem</span>
                              <span>{ticketCount * 45} zł</span>
                            </div>
                          </div>
                          <Button
                            className="w-full"
                            size="lg"
                            onClick={handlePurchaseEventTicket}
                          >
                            Przejdź do płatności
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
