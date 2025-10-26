"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Bike,
  Clover as Scooter,
  QrCode,
  MapPin,
  Battery,
  Clock,
  Zap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

import customIconUrl from "../img/marker-bike.png"; // if in /public
// import L from "leaflet";

interface Vehicle {
  id: string;
  type: "bike" | "scooter";
  battery: number;
  distance: string;
  location: string;
  pricePerMinute: number;
}

interface ActiveRental {
  vehicleId: string;
  type: "bike" | "scooter";
  startTime: Date;
  duration: number;
  cost: number;
}

export function VehiclesTab() {
  const [selectedType, setSelectedType] = useState<"all" | "bike" | "scooter">(
    "all"
  );
  const [scannerOpen, setScannerOpen] = useState(false);
  const [activeRental, setActiveRental] = useState<ActiveRental | null>(null);
  const { toast } = useToast();

  const vehicles: Vehicle[] = [
    {
      id: "B001",
      type: "bike",
      battery: 100,
      distance: "0.2 km",
      location: "ul. Narutowicza 120",
      pricePerMinute: 0.5,
    },
    {
      id: "B002",
      type: "bike",
      battery: 100,
      distance: "0.5 km",
      location: "ul. Cyfrowa 6",
      pricePerMinute: 0.5,
    },
    {
      id: "B003",
      type: "bike",
      battery: 100,
      distance: "0.6 km",
      location: "ul. Cyfrowa 6",
      pricePerMinute: 0.5,
    },
  ];

  const filteredVehicles = vehicles.filter(
    (v) => selectedType === "all" || v.type === selectedType
  );

  const handleScan = () => {
    setScannerOpen(true);
    // Simulate QR code scan after 2 seconds
    setTimeout(() => {
      const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
      setScannerOpen(false);
      startRental(vehicle);
    }, 2000);
  };

  const startRental = (vehicle: Vehicle) => {
    setActiveRental({
      vehicleId: vehicle.id,
      type: vehicle.type,
      startTime: new Date(),
      duration: 0,
      cost: 0,
    });
    toast({
      title: "Wypożyczenie rozpoczęte!",
      description: `${vehicle.type === "bike"} ${
        vehicle.id
      } został odblokowany.`,
    });
  };

  const endRental = () => {
    if (activeRental) {
      const duration = 15; // Mock duration in minutes
      const cost = duration * (activeRental.type === "bike" ? 0.5 : 0.7);
      toast({
        title: "Wypożyczenie zakończone",
        description: `Czas: ${duration} min. Koszt: ${cost.toFixed(2)} zł`,
      });
      setActiveRental(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Active Rental Banner */}
      {activeRental && (
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {activeRental.type === "bike" ? (
                <Bike className="h-6 w-6" />
              ) : (
                <Scooter className="h-6 w-6" />
              )}

              <div>
                <p className="font-semibold">Aktywne wypożyczenie</p>
                <p className="text-sm opacity-90">
                  {activeRental.type === "bike"} {activeRental.vehicleId}
                </p>
              </div>
            </div>
            <Button
              onClick={endRental}
              variant="secondary"
              size="sm"
              className="bg-white text-teal-600 hover:bg-gray-100"
            >
              Zakończ
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto pb-20">
        {/* Map Placeholder */}
        <div className="h-64 border-b border-gray-700">
          <div>
            <div className="relative h-64 border-b border-gray-700 overflow-hidden">
              <MapContainer
                center={[53.4504, 14.536]} // Łódź
                zoom={14}
                scrollWheelZoom={false}
                className="absolute inset-0 h-full w-full z-0 rounded-none"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {vehicles.map((vehicle) => (
                  <Marker
                    key={vehicle.id}
                    position={
                      vehicle.id === "B001"
                        ? [53.4504, 14.536]
                        : vehicle.id === "B002"
                        ? [53.4504, 14.536]
                        : [53.4504, 14.536]
                    }
                  >
                    <Popup>
                      <div className="text-sm">
                        <p className="font-semibold">{vehicle.id}</p>
                        <p>{vehicle.location}</p>
                        <p className="text-teal-500 font-medium">
                          {vehicle.pricePerMinute.toFixed(2)} zł/min
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Scanner Button */}
        <div className="p-4 bg-gray-900/50 border-b border-gray-800">
          {/* <Button
            onClick={handleScan}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            size="lg"
            disabled={!!activeRental}
          >
            <QrCode className="mr-2 h-5 w-5" />
            Skanuj kod QR
          </Button> */}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 p-4 bg-gray-900/30">
          <Button
            variant={selectedType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("all")}
            className={
              selectedType === "all"
                ? "bg-teal-600 hover:bg-teal-700"
                : "border-gray-700 hover:bg-gray-800"
            }
          >
            Wszystkie
          </Button>
          <Button
            variant={selectedType === "bike" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("bike")}
            className={
              selectedType === "bike"
                ? "bg-teal-600 hover:bg-teal-700"
                : "border-gray-700 hover:bg-gray-800"
            }
          >
            <Bike className="mr-1 h-4 w-4" />
            Rowery
          </Button>
        </div>

        {/* Vehicles List */}
        <div className="p-4 space-y-3">
          <h3 className="text-sm font-medium text-gray-400 mb-3">
            Dostępne pojazdy w pobliżu ({filteredVehicles.length})
          </h3>
          {filteredVehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
              className="bg-white-800/50 border-gray-700 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3 flex-1">
                  <div
                    className={`p-3 rounded  ${
                      vehicle.type === "bike"
                        ? "bg-blue-500/10"
                        : "bg-purple-500/10"
                    }`}
                  >
                    {
                      <Bike
                        className={`h-6 w-6 
                            "text-blue-100"
                             "text-purple-400"
                        }`}
                      />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-black">{vehicle.id}</h4>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{vehicle.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Battery
                          className={`h-3 w-3 ${
                            vehicle.battery > 80
                              ? "text-green-400"
                              : vehicle.battery > 50
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        />
                        <span>{vehicle.battery}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{vehicle.location}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Zap className="h-3 w-3 text-teal-400" />
                      <span className="text-sm font-medium text-teal-400">
                        {vehicle.pricePerMinute.toFixed(2)} zł/min
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => startRental(vehicle)}
                  disabled={!!activeRental}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Wypożycz
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Pricing Info */}
        <div className="p-4 mx-4 mb-4 bg-white-800/30 border border-gray-700 rounded-lg">
          <h4 className="font-semibold text-black-400 mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-black-400" />
            Cennik
          </h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-black-400">
              <span>Rower:</span>
              <span className="text-black">0.50 zł/min</span>
            </div>

            <div className="flex justify-between text-black-400 pt-2 border-t border-gray-700">
              <span>Opłata za odblokowanie:</span>
              <span className="text-black">1.00 zł</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scanner Dialog */}
      <Dialog open={scannerOpen} onOpenChange={setScannerOpen}>
        <DialogContent className="bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Skanowanie kodu QR</DialogTitle>
            <DialogDescription className="text-gray-400">
              Skieruj kamerę na kod QR na pojeździe
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-48 h-48 border-4 border-teal-500 rounded-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <QrCode className="h-20 w-20 text-teal-500 animate-pulse" />
              </div>
              {/* Scanner animation */}
              <div className="absolute inset-x-0 top-0 h-1 bg-teal-500 animate-scan" />
            </div>
            <p className="text-gray-400 text-sm mt-4">Skanowanie...</p>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(192px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
