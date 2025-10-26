"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, AlertTriangle, Zap, Car, Droplet, Construction, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const initialIncidents = [
  {
    id: 1,
    title: "Awaria zasilania - Dzielnica Północna",
    description: "Brak prądu w rejonie ulic Słonecznej i Kwiatowej. Trwają prace naprawcze.",
    category: "Prąd",
    status: "active",
    time: "30 min temu",
    severity: "high",
    area: "Centrum",
  },
  {
    id: 2,
    title: "Utrudnienia na ul. Głównej",
    description: "Remont jezdni powoduje objazdy. Przewidywany czas zakończenia: 18:00.",
    category: "Droga",
    status: "active",
    time: "1 godz. temu",
    severity: "medium",
    area: "Centrum",
  },
  {
    id: 3,
    title: "Awaria wodociągu - ul. Parkowa",
    description: "Przerwa w dostawie wody. Ekipa naprawcza na miejscu.",
    category: "Woda",
    status: "active",
    time: "2 godz. temu",
    severity: "high",
    area: "Podjuchy",
  },
  {
    id: 4,
    title: "Opóźnienia tramwajów linii 5",
    description: "Awaria techniczna na trasie. Uruchomiono autobusy zastępcze.",
    category: "Transport",
    status: "resolved",
    time: "3 godz. temu",
    severity: "medium",
    area: "Stare Miasto",
  },
]

const categories = [
  { value: "Prąd", label: "Prąd", icon: Zap, color: "text-yellow-500" },
  { value: "Droga", label: "Droga", icon: Car, color: "text-orange-500" },
  { value: "Woda", label: "Woda", icon: Droplet, color: "text-blue-500" },
  { value: "Transport", label: "Transport", icon: Construction, color: "text-purple-500" },
  { value: "Inne", label: "Inne", icon: AlertTriangle, color: "text-red-500" },
]

const areas = [
  { value: "all", label: "Wszystkie Obszary", color: "text-yellow-500" },
  { value: "Podjuchy", label: "Podjuchy", color: "text-yellow-500" },
  { value: "Centrum", label: "Centrum", color: "text-yellow-500" },
  { value: "Niebuszewo", label: "Niebuszewo", color: "text-yellow-500" },
  { value: "Prawobrzeże", label: "Prawobrzeże", color: "text-yellow-500" },
  { value: "Stare Miasto", label: "Stare Miasto", color: "text-yellow-500" }
]

export default function NewsTab() {
  const [incidents, setIncidents] = useState(initialIncidents)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedArea, setSelectedArea] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    area: "",
  })

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault()

    const newIncident = {
      id: incidents.length + 1,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      area: formData.area,
      status: "active" as const,
      time: "Teraz",
      severity: "medium" as const,
    }

    setIncidents([newIncident, ...incidents])
    setIsDialogOpen(false)
    setFormData({ title: "", description: "", category: "", location: "", area: "" })

    toast({
      title: "Zgłoszenie wysłane",
      description: "Dziękujemy za zgłoszenie problemu. Służby miejskie zostały powiadomione.",
    })
  }

  const filteredIncidents = incidents.filter((inc) => {
    const categoryMatch = selectedCategory === "all" || inc.category === selectedCategory
    const areaMatch = selectedArea === "all" || inc.area === selectedArea
    return categoryMatch && areaMatch
  })

  const getCategoryIcon = (category: string) => {
    const cat = categories.find((c) => c.value === category)
    return cat ? cat.icon : AlertTriangle
  }

  const getCategoryColor = (category: string) => {
    const cat = categories.find((c) => c.value === category)
    return cat ? cat.color : "text-gray-500"
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-balance">Zgłoszenia i Awarie</h2>
            <p className="text-muted-foreground text-pretty">Aktualne problemy w mieście</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Zgłoś
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Zgłoś problem</DialogTitle>
                <DialogDescription>Poinformuj służby miejskie o problemie w Twojej okolicy</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          <div className="flex items-center gap-2">
                            <cat.icon className={`w-4 h-4 ${cat.color}`} />
                            {cat.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Obszary</Label>
                  <Select
                    value={formData.area}
                    onValueChange={(value) => setFormData({ ...formData, area: value })}
                    required
                  >
                    <SelectTrigger id="area">
                      <SelectValue placeholder="Wybierz obszar" />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          <div className="flex items-center gap-2">
                            {/*<cat.icon className={`w-4 h-4 ${cat.color}`} />*/}
                            {cat.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Tytuł zgłoszenia</Label>
                  <Input
                    id="title"
                    placeholder="Krótki opis problemu"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Lokalizacja</Label>
                  <Input
                    id="location"
                    placeholder="Ulica, dzielnica"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Opis</Label>
                  <Textarea
                    id="description"
                    placeholder="Szczegółowy opis problemu"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Wyślij zgłoszenie
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
        >
          Wszystkie
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={selectedCategory === cat.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat.value)}
            className="gap-2 whitespace-nowrap"
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </Button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Button
          variant={selectedArea === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedArea("all")}
        >
          Wszystkie obszary
        </Button>
        {areas.filter((a) => a.value !== "all").map((area) => (
          <Button
            key={area.value}
            variant={selectedArea === area.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedArea(area.value)}
            className="whitespace-nowrap"
          >
            {area.value}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredIncidents.map((incident) => {
          const Icon = getCategoryIcon(incident.category)
          const iconColor = getCategoryColor(incident.category)

          return (
            <Card
              key={incident.id}
              className={`overflow-hidden hover:bg-accent transition-colors cursor-pointer ${
                incident.status === "resolved" ? "opacity-60" : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-background ${iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <Badge variant={incident.status === "active" ? "destructive" : "secondary"}>
                      {incident.status === "active" ? "Aktywne" : "Rozwiązane"}
                    </Badge>
                    {incident.severity === "high" && incident.status === "active" && (
                      <Badge variant="outline" className="border-red-500 text-red-500">
                        Pilne
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {incident.time}
                  </span>
                </div>
                <CardTitle className="text-lg text-balance">{incident.title}</CardTitle>
                <CardDescription className="text-pretty">{incident.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      {filteredIncidents.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Brak zgłoszeń w tej kategorii</p>
        </div>
      )}
    </div>
  )
}
