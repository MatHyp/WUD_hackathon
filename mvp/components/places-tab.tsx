"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const places = [
  {
    id: 2,
    name: "Muzeum Narodowe",
    description: "Największe muzeum sztuki w Szczecinie",
    details: "Muzeum Narodowe w Szczecinie to instytucja kultury o bogatej kolekcji sztuki polskiej i europejskiej. Oprócz wystaw stałych organizuje liczne wystawy czasowe, warsztaty i wydarzenia edukacyjne.",
    image: "/national-museum-art-gallery.jpg",
    category: "Muzea",
    rating: 4.6,
    distance: "2.5 km",
    discount: "Wstęp wolny z Kartą",
  },
  {
    id: 3,
    name: "Jasne Błonia",
    description: "Pierścień parków",
    details: "Jasne Błonia to rozległy teren zielony w centrum Szczecina, idealny na spacery, pikniki i wydarzenia plenerowe. Znajduje się tu słynna aleja platanów oraz pomnik Jana Pawła II.",
    image: "/city-park-green-trees.jpg",
    category: "Parki",
    rating: 4.7,
    distance: "0.8 km",
    discount: null,
  },
  {
    id: 4,
    name: "Stare miasto",
    description: "Historyczna dzielnica Szczecina",
    details: "Zabytkowa część miasta, jeszcze z przed II wojny światowej",
    image: "/historic-jewish-quarter-street.jpg",
    category: "Dzielnice",
    rating: 4.9,
    distance: "1.8 km",
    discount: "15% w restauracjach",
  },
]

export default function PlacesTab() {
  const [activeCategory, setActiveCategory] = useState("Wszystkie")
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null)

  const filteredPlaces =
    activeCategory === "Wszystkie"
      ? places
      : places.filter((p) => p.category === activeCategory)

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-balance">Odkryj miasto</h2>
        <p className="text-muted-foreground text-pretty">
          Najciekawsze miejsca w Szczecinie
        </p>
      </div>

      {/* Kategorie */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        {["Wszystkie", "Zabytki", "Muzea", "Parki", "Restauracje", "Rozrywka"].map((cat) => (
          <Badge
            key={cat}
            onClick={() => setActiveCategory(cat)}
            variant={cat === activeCategory ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap"
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* Lista miejsc */}
      <div className="space-y-4">
        {filteredPlaces.map((place) => (
          <Card
            key={place.id}
            className="overflow-hidden hover:bg-accent transition-colors"
          >
            <div className="w-full h-48 bg-muted">
              <img
                src={place.image || "/placeholder.svg"}
                alt={place.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-2">
                    {place.category}
                  </Badge>
                  <CardTitle className="text-lg text-balance">
                    {place.name}
                  </CardTitle>
                  <CardDescription className="text-pretty">
                    {place.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-medium">{place.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{place.distance}</span>
                  </div>
                </div>
              </div>
              {place.discount && (
                <Badge
                  variant="outline"
                  className="border-primary text-primary"
                >
                  {place.discount}
                </Badge>
              )}
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => setSelectedPlace(place)}
              >
                Zobacz szczegóły
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal szczegółów */}
      <Dialog open={!!selectedPlace} onOpenChange={() => setSelectedPlace(null)}>
        <DialogContent>
          {selectedPlace && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPlace.name}</DialogTitle>
                <DialogDescription>{selectedPlace.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <img
                  src={selectedPlace.image}
                  alt={selectedPlace.name}
                  className="w-full h-48 object-cover rounded"
                />
                <p><strong>Kategoria:</strong> {selectedPlace.category}</p>
                <p><strong>Ocena:</strong> {selectedPlace.rating} ⭐</p>
                <p><strong>Odległość:</strong> {selectedPlace.distance}</p>
                {selectedPlace.discount && (
                  <p className="text-primary"><strong>Oferta:</strong> {selectedPlace.discount}</p>
                )}
                {selectedPlace.details && (
                  <p className="text-muted-foreground">{selectedPlace.details}</p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}