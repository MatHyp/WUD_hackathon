"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bus,
  Drama as Tram,
  Clock,
  QrCode,
  Plus,
  Search,
  MapPin,
  ChevronRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Ticket from "@/components/ui/ticket-icon";
import { useToast } from "@/hooks/use-toast";

const ticketTypes = [
  { id: "20min", name: "20 minut", price: "4.60", duration: "20 min" },
  { id: "60min", name: "60 minut", price: "6.00", duration: "60 min" },
  { id: "90min", name: "90 minut", price: "8.00", duration: "90 min" },
  { id: "day", name: "Dzienny", price: "18.00", duration: "24 godz" },
  { id: "weekend", name: "Weekendowy", price: "22.00", duration: "72 godz" },
  { id: "week", name: "Tygodniowy", price: "64.00", duration: "7 dni" },
];

const stops = [
  { id: "plac-rodla", name: "Plac Rodła" },
  { id: "dworzec", name: "Dworzec Główny" },
  { id: "plac-grunwaldzki", name: "Plac Grunwaldzki" },
  { id: "pomorzany", name: "Pomorzany" },
  { id: "niebuszewo", name: "Niebuszewo" },
  { id: "glebokie", name: "Głębokie" },
  { id: "turkusowa", name: "Turkusowa" },
  { id: "krzekowo", name: "Krzekowo" },
];

const scheduleData = {
  "plac-rodla": [
    {
      line: "1",
      type: "tram",
      destination: "Pomorzany",
      times: ["10:35", "10:47", "10:59", "11:11", "11:23", "11:35"],
      route: ["Plac Rodła", "Dworzec Główny", "Plac Grunwaldzki", "Pomorzany"],
    },
    {
      line: "3",
      type: "tram",
      destination: "Głębokie",
      times: ["10:38", "10:50", "11:02", "11:14", "11:26", "11:38"],
      route: ["Plac Rodła", "Dworzec Główny", "Niebuszewo", "Głębokie"],
    },
    {
      line: "75",
      type: "bus",
      destination: "Krzekowo",
      times: ["10:40", "10:55", "11:10", "11:25", "11:40", "11:55"],
      route: ["Plac Rodła", "Plac Grunwaldzki", "Krzekowo"],
    },
    {
      line: "12",
      type: "tram",
      destination: "Turkusowa",
      times: ["10:42", "10:54", "11:06", "11:18", "11:30", "11:42"],
      route: ["Plac Rodła", "Dworzec Główny", "Turkusowa"],
    },
  ],
  dworzec: [
    {
      line: "1",
      type: "tram",
      destination: "Pomorzany",
      times: ["10:37", "10:49", "11:01", "11:13", "11:25", "11:37"],
      route: ["Dworzec Główny", "Plac Grunwaldzki", "Pomorzany"],
    },
    {
      line: "3",
      type: "tram",
      destination: "Głębokie",
      times: ["10:40", "10:52", "11:04", "11:16", "11:28", "11:40"],
      route: ["Dworzec Główny", "Niebuszewo", "Głębokie"],
    },
    {
      line: "7",
      type: "tram",
      destination: "Krzekowo",
      times: ["10:43", "10:55", "11:07", "11:19", "11:31", "11:43"],
      route: ["Dworzec Główny", "Plac Grunwaldzki", "Krzekowo"],
    },
    {
      line: "12",
      type: "tram",
      destination: "Turkusowa",
      times: ["10:44", "10:56", "11:08", "11:20", "11:32", "11:44"],
      route: ["Dworzec Główny", "Turkusowa"],
    },
    {
      line: "A",
      type: "bus",
      destination: "Pomorzany",
      times: ["10:45", "11:00", "11:15", "11:30", "11:45", "12:00"],
      route: ["Dworzec Główny", "Plac Grunwaldzki", "Pomorzany"],
    },
  ],
  "plac-grunwaldzki": [
    {
      line: "1",
      type: "tram",
      destination: "Pomorzany",
      times: ["10:39", "10:51", "11:03", "11:15", "11:27", "11:39"],
      route: ["Plac Grunwaldzki", "Pomorzany"],
    },
    {
      line: "7",
      type: "tram",
      destination: "Krzekowo",
      times: ["10:45", "10:57", "11:09", "11:21", "11:33", "11:45"],
      route: ["Plac Grunwaldzki", "Krzekowo"],
    },
    {
      line: "75",
      type: "bus",
      destination: "Krzekowo",
      times: ["10:42", "10:57", "11:12", "11:27", "11:42", "11:57"],
      route: ["Plac Grunwaldzki", "Krzekowo"],
    },
    {
      line: "A",
      type: "bus",
      destination: "Pomorzany",
      times: ["10:47", "11:02", "11:17", "11:32", "11:47", "12:02"],
      route: ["Plac Grunwaldzki", "Pomorzany"],
    },
  ],
  pomorzany: [
    {
      line: "1",
      type: "tram",
      destination: "Plac Rodła",
      times: ["10:30", "10:42", "10:54", "11:06", "11:18", "11:30"],
      route: ["Pomorzany", "Plac Grunwaldzki", "Dworzec Główny", "Plac Rodła"],
    },
    {
      line: "A",
      type: "bus",
      destination: "Dworzec Główny",
      times: ["10:35", "10:50", "11:05", "11:20", "11:35", "11:50"],
      route: ["Pomorzany", "Plac Grunwaldzki", "Dworzec Główny"],
    },
    {
      line: "6",
      type: "tram",
      destination: "Niebuszewo",
      times: ["10:38", "10:50", "11:02", "11:14", "11:26", "11:38"],
      route: ["Pomorzany", "Plac Grunwaldzki", "Niebuszewo"],
    },
  ],
  niebuszewo: [
    {
      line: "3",
      type: "tram",
      destination: "Głębokie",
      times: ["10:42", "10:54", "11:06", "11:18", "11:30", "11:42"],
      route: ["Niebuszewo", "Głębokie"],
    },
    {
      line: "3",
      type: "tram",
      destination: "Dworzec Główny",
      times: ["10:36", "10:48", "11:00", "11:12", "11:24", "11:36"],
      route: ["Niebuszewo", "Dworzec Główny", "Plac Rodła"],
    },
    {
      line: "6",
      type: "tram",
      destination: "Pomorzany",
      times: ["10:34", "10:46", "10:58", "11:10", "11:22", "11:34"],
      route: ["Niebuszewo", "Plac Grunwaldzki", "Pomorzany"],
    },
  ],
  glebokie: [
    {
      line: "3",
      type: "tram",
      destination: "Plac Rodła",
      times: ["10:28", "10:40", "10:52", "11:04", "11:16", "11:28"],
      route: ["Głębokie", "Niebuszewo", "Dworzec Główny", "Plac Rodła"],
    },
    {
      line: "9",
      type: "tram",
      destination: "Turkusowa",
      times: ["10:33", "10:48", "11:03", "11:18", "11:33", "11:48"],
      route: ["Głębokie", "Niebuszewo", "Turkusowa"],
    },
  ],
  turkusowa: [
    {
      line: "12",
      type: "tram",
      destination: "Plac Rodła",
      times: ["10:32", "10:44", "10:56", "11:08", "11:20", "11:32"],
      route: ["Turkusowa", "Dworzec Główny", "Plac Rodła"],
    },
    {
      line: "9",
      type: "tram",
      destination: "Głębokie",
      times: ["10:35", "10:50", "11:05", "11:20", "11:35", "11:50"],
      route: ["Turkusowa", "Niebuszewo", "Głębokie"],
    },
  ],
  krzekowo: [
    {
      line: "7",
      type: "tram",
      destination: "Dworzec Główny",
      times: ["10:30", "10:42", "10:54", "11:06", "11:18", "11:30"],
      route: ["Krzekowo", "Plac Grunwaldzki", "Dworzec Główny"],
    },
    {
      line: "75",
      type: "bus",
      destination: "Plac Rodła",
      times: ["10:33", "10:48", "11:03", "11:18", "11:33", "11:48"],
      route: ["Krzekowo", "Plac Grunwaldzki", "Plac Rodła"],
    },
  ],
};

export default function TicketsTab() {
  const [selectedTicket, setSelectedTicket] = useState("20min");
  const [activeTickets, setActiveTickets] = useState<
    Array<{
      id: number;
      type: string;
      validUntil: string;
      activated: string;
    }>
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStop, setSelectedStop] = useState("plac-rodla");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLine, setSelectedLine] = useState<any>(null);
  const [showRouteDialog, setShowRouteDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("activeTickets");
    if (stored) {
      setActiveTickets(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (activeTickets.length > 0) {
      localStorage.setItem("activeTickets", JSON.stringify(activeTickets));
    }
  }, [activeTickets]);

  const handlePurchaseTicket = () => {
    const ticket = ticketTypes.find((t) => t.id === selectedTicket);
    if (!ticket) return;

    const now = new Date();
    const activatedTime = now.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });

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
        : 10080;

    const validUntil = new Date(now.getTime() + durationMinutes * 60000);
    const validUntilTime = validUntil.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newTicket = {
      id: Date.now(),
      type: ticket.name,
      validUntil: validUntilTime,
      activated: activatedTime,
    };

    setActiveTickets([newTicket, ...activeTickets]);
    setIsOpen(false);

    toast({
      title: "Bilet zakupiony!",
      description: `${ticket.name} został aktywowany i jest ważny do ${validUntilTime}`,
    });
  };

  const filteredSchedule =
    scheduleData[selectedStop as keyof typeof scheduleData]?.filter(
      (item) =>
        item.line.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.destination.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

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
                <Card
                  key={ticket.id}
                  className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-primary">
                          {ticket.type}
                        </CardTitle>
                        <CardDescription>
                          Aktywowany: {ticket.activated}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-primary/20 text-primary"
                      >
                        Aktywny
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Ważny do
                        </p>
                        <p className="text-2xl font-bold">
                          {ticket.validUntil}
                        </p>
                      </div>
                      <div className="w-24 h-24 bg-background rounded-lg flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-foreground" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Pokaż ten kod QR kontrolerowi
                    </p>
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
                <DialogDescription>
                  Wybierz bilet odpowiedni do Twojej podróży
                </DialogDescription>
              </DialogHeader>
              <RadioGroup
                value={selectedTicket}
                onValueChange={setSelectedTicket}
                className="space-y-3"
              >
                {ticketTypes.map((ticket) => (
                  <div key={ticket.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={ticket.id} id={ticket.id} />
                    <Label
                      htmlFor={ticket.id}
                      className="flex-1 flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <p className="font-medium">{ticket.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {ticket.duration}
                        </p>
                      </div>
                      <span className="font-bold">{ticket.price} zł</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <Button
                className="w-full"
                size="lg"
                onClick={handlePurchaseTicket}
              >
                Kup i aktywuj bilet
              </Button>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4 mt-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <Select value={selectedStop} onValueChange={setSelectedStop}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Wybierz przystanek" />
                </SelectTrigger>
                <SelectContent>
                  {stops.map((stop) => (
                    <SelectItem key={stop.id} value={stop.id}>
                      {stop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Szukaj linii lub kierunku..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {stops.find((s) => s.id === selectedStop)?.name}
              </CardTitle>
              <CardDescription>Najbliższe odjazdy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                  >
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
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.destination}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        {item.times.slice(0, 4).map((time, j) => (
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
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => {
                          setSelectedLine(item);
                          setShowRouteDialog(true);
                        }}
                      >
                        Zobacz trasę
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Brak wyników wyszukiwania
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showRouteDialog} onOpenChange={setShowRouteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedLine?.type === "bus" ? (
                <Bus className="w-5 h-5 text-primary" />
              ) : (
                <Tram className="w-5 h-5 text-primary" />
              )}
              Linia {selectedLine?.line}
            </DialogTitle>
            <DialogDescription>
              Kierunek: {selectedLine?.destination}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3 text-sm">Trasa przejazdu:</h4>
              <div className="space-y-2">
                {selectedLine?.route.map((stop: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          index === 0 ? "bg-primary" : "bg-muted"
                        }`}
                      />
                      {index < selectedLine.route.length - 1 && (
                        <div className="w-0.5 h-6 bg-border" />
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        index === 0 ? "font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      {stop}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-sm">Wszystkie odjazdy:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedLine?.times.map((time: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {time}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
