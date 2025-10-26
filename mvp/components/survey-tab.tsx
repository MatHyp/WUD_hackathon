"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { usePreferences } from "@/lib/preferences-context"

type Question = {
    id: number
    text: string
    options: string[]
}

const questions: Question[] = [
    {
        id: 1,
        text: "Które funkcje chcesz mieć w dolnym panelu?",
        options: ["Bilety", "Wydarzenia", "Awarie", "Podatki", "Miejsca", "Pojazdy", "Profil"],
    },
]

export default function SurveyTab() {
    const { preferences, setPreferences } = usePreferences()
    const { toast } = useToast()

    // lokalny stan (kopiujemy z kontekstu przy starcie)
    const [localAnswers, setLocalAnswers] = useState<Record<number, string[]>>({})

    useEffect(() => {
        setLocalAnswers(preferences)
    }, [preferences])

    const handleSelect = (qId: number, option: string) => {
        setLocalAnswers((prev) => {
            const current = prev[qId] || []

            // jeśli klikamy już zaznaczoną opcję
            if (current.includes(option)) {
                return { ...prev, [qId]: current.filter((o) => o !== option) }
            }

            // jeśli klikamy nową opcję, ale mamy już 4 → nie dodawaj
            if (qId === 1 && current.length >= 4) {
                return prev
            }

            return { ...prev, [qId]: [...current, option] }
        })
    }

    const handleSubmit = () => {
        const selected = localAnswers[1] || []

        if (selected.length !== 4) {
            toast({
                title: "Błąd",
                description: "Musisz wybrać dokładnie 4 opcje do dolnego panelu.",
                variant: "destructive",
            })
            return
        }

        setPreferences(localAnswers) // zapisujemy globalnie tylko jeśli są 4
        toast({
            title: "Zapisano preferencje",
            description: "Dolny panel został zaktualizowany zgodnie z Twoim wyborem.",
        })
    }

    return (
        <div className="p-4 space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Ankieta personalizacji</h2>
                <p className="text-muted-foreground">
                    Wybierz dokładnie 4 funkcje, które mają być w dolnym panelu
                </p>
            </div>

            <div className="space-y-4">
                {questions.map((q) => (
                    <Card key={q.id} className="hover:bg-accent transition-colors">
                        <CardHeader>
                            <CardTitle>{q.text}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {q.options.map((opt) => (
                                <Badge
                                    key={opt}
                                    onClick={() => handleSelect(q.id, opt)}
                                    variant={localAnswers[q.id]?.includes(opt) ? "default" : "outline"}
                                    className="cursor-pointer"
                                >
                                    {opt}
                                </Badge>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Button className="w-full" size="lg" onClick={handleSubmit}>
                Zapisz odpowiedzi
            </Button>
        </div>
    )
}