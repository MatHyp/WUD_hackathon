"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Ticket, Calendar, TrendingUp, MapPin } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  setActiveTab: (value: string) => void;
};
{
  /*}
export function HomeComponent({ setActiveTab }: Props) {
  return (
    <div className="mt-4">
      <Button onClick={() => setActiveTab("tab2")}>
        Przejdź do zakładki 2
      </Button>
    </div>
  )
}*/
}

export default function HomeTab({ setActiveTab }: Props) {
  const { user } = useAuth();

  const [balance, setBalance] = useState(45.5);
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleTopUp = () => {
    if (topUpAmount > 0) {
      setBalance((prev) => prev + topUpAmount);
      toast({
        title: "Doładowanie zakończone",
        description: `Twoje saldo zostało zwiększone o ${topUpAmount.toFixed(
          2
        )} zł.`,
      });
      setTopUpAmount(0);
      setIsOpen(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-balance">
          Witaj, {user?.name || "Użytkowniku"}!
        </h2>
        <p className="text-muted-foreground text-pretty">
          Zarządzaj swoją kartą miejską w jednym miejscu
        </p>
      </div>

      <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Twoja Karta</CardTitle>
          <CardDescription>Aktywna do 31.12.2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Saldo</p>
              <p className="text-3xl font-bold">{balance.toFixed(2)} zł</p>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>Doładuj</Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Doładuj konto</DialogTitle>
                  <DialogDescription>
                    Wpisz kwotę, którą chcesz dodać do swojego salda
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Kwota</Label>
                    <Input
                      id="amount"
                      type="number"
                      min="1"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(Number(e.target.value))}
                    />
                  </div>
                  <Button className="w-full" onClick={handleTopUp}>
                    Potwierdź doładowanie
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card
          className="hover:bg-accent transition-colors cursor-pointer"
          onClick={() => setActiveTab("tickets")}
        >
          <CardHeader className="pb-3">
            <Ticket className="w-8 h-8 text-primary mb-2" />
            <a href=""></a>
            <CardTitle className="text-base">Bilety</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Kup bilet komunikacji
            </p>
          </CardContent>
        </Card>

        <Card
          className="hover:bg-accent transition-colors cursor-pointer"
          onClick={() => setActiveTab("events")}
        >
          <CardHeader className="pb-3">
            <Calendar className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-base">Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Bilety na wydarzenia
            </p>
          </CardContent>
        </Card>

        <Card
          className="hover:bg-accent transition-colors cursor-pointer"
          onClick={() => setActiveTab("news")}
        >
          <CardHeader className="pb-3">
            <TrendingUp className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-base">Awarie</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Sprawdź sytuacje w mieście
            </p>
          </CardContent>
        </Card>

        <Card
          className="hover:bg-accent transition-colors cursor-pointer"
          onClick={() => setActiveTab("places")}
        >
          <CardHeader className="pb-3">
            <MapPin className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-base">Miejsca</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Odkryj miasto</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ostatnie przejazdy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              line: "128",
              from: "Dworzec Główny",
              to: "Nowy Kleparz",
              time: "10:30",
              price: "4.60 zł",
            },
            {
              line: "50",
              from: "Rondo Mogilskie",
              to: "Bronowice",
              time: "09:15",
              price: "4.60 zł",
            },
            {
              line: "4",
              from: "Plac Inwalidów",
              to: "Krowodrza",
              time: "Wczoraj",
              price: "4.60 zł",
            },
          ].map((ride, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {ride.line}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {ride.from} → {ride.to}
                  </p>
                  <p className="text-xs text-muted-foreground">{ride.time}</p>
                </div>
              </div>
              <span className="text-sm font-medium">{ride.price}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
