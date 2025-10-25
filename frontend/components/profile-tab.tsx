"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, CreditCard, Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

const menuItems = [
  { icon: User, label: "Dane osobowe", description: "Zarządzaj swoim profilem" },
  { icon: CreditCard, label: "Płatności", description: "Metody płatności i historia" },
  { icon: Bell, label: "Powiadomienia", description: "Ustawienia powiadomień" },
  { icon: Shield, label: "Prywatność", description: "Bezpieczeństwo i prywatność" },
  { icon: HelpCircle, label: "Pomoc", description: "Centrum pomocy i FAQ" },
]

export default function ProfileTab() {
  const { user, logout } = useAuth()

  return (
    <div className="p-4 space-y-6">
      <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-2 border-primary">
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{user?.name || "Jan Kowalski"}</h3>
              <p className="text-sm text-muted-foreground">{user?.email || "jan.kowalski@email.com"}</p>
              <Badge variant="secondary" className="mt-2 bg-primary/20 text-primary">
                Karta Premium
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Statystyki</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">127</p>
              <p className="text-xs text-muted-foreground">Przejazdy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">8</p>
              <p className="text-xs text-muted-foreground">Wydarzenia</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">342</p>
              <p className="text-xs text-muted-foreground">Punkty</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <Card key={index} className="hover:bg-accent transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="w-full bg-transparent" onClick={logout}>
        <LogOut className="w-4 h-4 mr-2" />
        Wyloguj się
      </Button>
    </div>
  )
}
