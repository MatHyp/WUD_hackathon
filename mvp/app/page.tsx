"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Ticket,
  Calendar,
  Newspaper,
  MoreHorizontal,
  MapPin,
  User,
  X,
  Bike,
  Banknote,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeTab from "@/components/home-tab";
import TicketsTab from "@/components/tickets-tab";
import EventsTab from "@/components/events-tab";
import NewsTab from "@/components/news-tab";
import TaxesTab from "@/components/taxes-tab";
import PlacesTab from "@/components/places-tab";
import ProfileTab from "@/components/profile-tab";
import { VehiclesTab } from "@/components/vehicles-tab";
import Image from "next/image";
import SurveyTab from "@/components/survey-tab";
import { usePreferences } from "@/lib/preferences-context"

import logo from "../img/images.png";
import LoginModal from "@/components/LoginModal";
export default function KartaMiejskaApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [user, setUser] = useState<{ username: string, password: string } | undefined>(undefined);

  const { preferences } = usePreferences()

  const handleMoreMenuSelect = (tab: string) => {
    setActiveTab(tab);
    setIsMoreMenuOpen(false);
  };
  const [modalType, setModalType] = useState<"register" | "login" | null>("login");

  const allTabs = [
    { value: "home", label: "Home", icon: Home },
    { value: "tickets", label: "Bilety", icon: Ticket },
    { value: "events", label: "Wydarzenia", icon: Calendar },
    { value: "news", label: "Awarie", icon: Newspaper },
    { value: "taxes", label: "Podatki", icon: Banknote },
    { value: "places", label: "Miejsca", icon: MapPin },
    { value: "vehicles", label: "Pojazdy", icon: Bike },
    { value: "profile", label: "Profil", icon: User },
    { value: "survey", label: "Ankieta", icon: ClipboardList },
  ]

  // preferencje z ankiety (pytanie 1)
  const selected = preferences[1] || []

  // dolny panel = tylko wybrane
  const bottomTabs = allTabs.filter(tab => selected.includes(tab.label))

  // reszta trafia do „Więcej”
  const moreTabs = allTabs.filter(tab => !selected.includes(tab.label))

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-4">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Image src={logo} alt="Logo" width={32} height={32} />
            </div>
            <h1 className="text-xl font-bold text-balance">Karta Miejska</h1>
          </div>
          <div className="text-xs text-muted-foreground">Szczecin</div>
        </div>
      </header>

{/*
       <LoginModal
        isOpen={modalType === "login"}
        onClose={() => setModalType(null)}
        onSwitchToRegister={() => setModalType("register")}
      />
 */}

      <main className="max-w-screen-xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="home" className="mt-0">
            <HomeTab setActiveTab={setActiveTab} />
          </TabsContent>
          <TabsContent value="tickets" className="mt-0">
            <TicketsTab />
          </TabsContent>
          <TabsContent value="events" className="mt-0">
            <EventsTab />
          </TabsContent>
          <TabsContent value="news" className="mt-0">
            <NewsTab />
          </TabsContent>
          <TabsContent value="taxes" className="mt-0">
            <TaxesTab />
          </TabsContent>
          <TabsContent value="vehicles" className="mt-0">
            <VehiclesTab />
          </TabsContent>
          <TabsContent value="places" className="mt-0">
            <PlacesTab />
          </TabsContent>
          <TabsContent value="profile" className="mt-0">
            <ProfileTab />
          </TabsContent>
          <TabsContent value="survey" className="mt-0">
            <SurveyTab />
          </TabsContent>

          {isMoreMenuOpen && (
            <div
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMoreMenuOpen(false)}
            >
              <div
                className="fixed bottom-16 left-0 right-0 bg-card border-t border-border animate-in slide-in-from-bottom-5 duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="max-w-screen-xl mx-auto p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Więcej opcji</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMoreMenuOpen(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {moreTabs.map((tab) => (
                      <Button
                        key={tab.value}
                        variant={activeTab === tab.value ? "default" : "outline"}
                        className="h-20 flex-col gap-2"
                        onClick={() => handleMoreMenuSelect(tab.value)}
                      >
                        <tab.icon className="w-6 h-6" />
                        <span>{tab.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <TabsList className="fixed bottom-0 left-0 right-0 h-16 w-full rounded-none border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 grid grid-cols-5 gap-0">
            {bottomTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex-col gap-1 h-full data-[state=active]:text-primary"
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </TabsTrigger>
            ))}

            <button
              className="flex flex-col items-center justify-center gap-1 h-full text-muted-foreground hover:text-foreground transition-colors data-[active=true]:text-primary"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              data-active={
                isMoreMenuOpen ||
                activeTab === "vehicles" ||
                activeTab === "places" ||
                activeTab === "taxes" ||
                activeTab === "profile" ||
                activeTab === "survey"
              }
            >
              <MoreHorizontal className="w-5 h-5" />
              <span className="text-xs">Więcej</span>
            </button>
          </TabsList>
        </Tabs>
      </main>
    </div>


  );
}


