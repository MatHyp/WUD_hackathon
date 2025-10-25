"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

type Question = {
    id: number
    text: string
    options: string[]
}

const questions: Question[] = [
    {
        id: 1,
        text: "Jaki jest Twój główny cel korzystania z aplikacji?",
        options: ["Odkrywanie wydarzeń", "Kupowanie biletów", "Zarządzanie opłatami", "Inne"],
    },
    {
        id: 2,
        text: "Jak często planujesz korzystać z aplikacji?",
        options: ["Codziennie", "Kilka razy w tygodniu", "Sporadycznie", "Raz w miesiącu"],
    },
    {
        id: 3,
        text: "Które typy wydarzeń najbardziej Cię interesują?",
        options: ["Teatr i sztuka", "Sport", "Jedzenie", "Muzyka"],
    },
]

export default function SurveyTab() {
    const [answers, setAnswers] = useState<Record<number, string[]>>({})
    const { toast } = useToast()

    const handleSelect = (qId: number, option: string) => {
        setAnswers((prev) => {
            const current = prev[qId] || []
            return current.includes(option)
                ? { ...prev, [qId]: current.filter((o) => o !== option) }
                : { ...prev, [qId]: [...current, option] }
        })
    }

    const handleSubmit = () => {
        toast({
            title: "Dziękujemy za odpowiedzi!",
            description: "Twoje preferencje pomogą nam lepiej dopasować aplikację.",
        })
    }

    return (
        <div className="p-4 space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Ankieta preferencji</h2>
                <p className="text-muted-foreground">Odpowiedz na kilka pytań, aby spersonalizować aplikację</p>
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
                                    variant={answers[q.id]?.includes(opt) ? "default" : "outline"}
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