"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Banknote, CheckCircle, XCircle } from "lucide-react"
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
import { useToast } from "@/hooks/use-toast"

type Tax = {
    id: number
    name: string
    dueDate: string
    amount: number
    category: "Lokalne" | "Państwowe"
    status: "do zapłaty" | "opłacone"
}

const taxes: Tax[] = [
    {
        id: 1,
        name: "Podatek od nieruchomości",
        dueDate: "31 Sty 2025",
        amount: 320,
        category: "Lokalne",
        status: "do zapłaty",
    },
    {
        id: 2,
        name: "Podatek dochodowy PIT",
        dueDate: "30 Kwi 2025",
        amount: 1250,
        category: "Państwowe",
        status: "do zapłaty",
    },
    {
        id: 3,
        name: "Opłata za śmieci",
        dueDate: "15 Lut 2025",
        amount: 45,
        category: "Lokalne",
        status: "opłacone",
    },
]

export default function TaxesTab() {
    const [activeCategory, setActiveCategory] = useState("Wszystkie")
    const [activeStatus, setActiveStatus] = useState("Wszystkie")
    const [selectedTax, setSelectedTax] = useState<Tax | null>(null)
    const [paymentValue, setPaymentValue] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const { toast } = useToast()

    const handlePay = () => {
        if (!selectedTax) return
        toast({
            title: "Płatność zrealizowana",
            description: `Opłacono ${paymentValue.toFixed(2)} zł za: ${selectedTax.name}.`,
        })
        setIsOpen(false)
        setPaymentValue(0)
        // w prawdziwej aplikacji tutaj zaktualizowałbyś status w backendzie
    }

    const filteredTaxes = taxes.filter((t) => {
        const categoryMatch = activeCategory === "Wszystkie" || t.category === activeCategory
        const statusMatch = activeStatus === "Wszystkie" || t.status === activeStatus
        return categoryMatch && statusMatch
    })

    return (
        <div className="p-4 space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Twoje podatki</h2>
                <p className="text-muted-foreground">Sprawdź i opłać zobowiązania</p>
            </div>

            {/* Kategorie */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
                {["Wszystkie", "Lokalne", "Państwowe"].map((cat) => (
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

            {/* Statusy */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
                {["Wszystkie", "do zapłaty", "opłacone"].map((status) => (
                    <Badge
                        key={status}
                        onClick={() => setActiveStatus(status)}
                        variant={status === activeStatus ? "default" : "outline"}
                        className="cursor-pointer whitespace-nowrap"
                    >
                        {status}
                    </Badge>
                ))}
            </div>

            {/* Lista podatków */}
            <div className="space-y-4">
                {filteredTaxes.map((tax) => (
                    <Card key={tax.id} className="hover:bg-accent transition-colors">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Badge variant="secondary" className="mb-2">{tax.category}</Badge>
                                    <CardTitle>{tax.name}</CardTitle>
                                </div>
                                {tax.status === "opłacone" ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-red-500" />
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>Termin: {tax.dueDate}</span>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <span className="font-bold text-lg">{tax.amount.toFixed(2)} zł</span>
                                {tax.status === "do zapłaty" && (
                                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                        <DialogTrigger asChild>
                                            <Button
                                                onClick={() => {
                                                    setSelectedTax(tax)
                                                    setPaymentValue(tax.amount)
                                                    setIsOpen(true)
                                                }}
                                            >
                                                <Banknote className="w-4 h-4 mr-2" />
                                                Opłać
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>{selectedTax?.name}</DialogTitle>
                                                <DialogDescription>
                                                    Termin płatności: {selectedTax?.dueDate}
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="amount">Kwota</Label>
                                                    <Input
                                                        id="amount"
                                                        type="number"
                                                        min="0"
                                                        value={paymentValue}
                                                        onChange={(e) =>
                                                            setPaymentValue(Number.parseFloat(e.target.value) || 0)
                                                        }
                                                    />
                                                </div>
                                                <div className="bg-muted rounded-lg p-4 flex justify-between font-bold">
                                                    <span>Do zapłaty</span>
                                                    <span>{paymentValue.toFixed(2)} zł</span>
                                                </div>
                                                <Button className="w-full" size="lg" onClick={handlePay}>
                                                    Przejdź do płatności
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
