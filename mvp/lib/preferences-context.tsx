"use client"
import { createContext, useContext, useState } from "react"

type Preferences = Record<number, string[]>

const PreferencesContext = createContext<{
    preferences: Preferences
    setPreferences: React.Dispatch<React.SetStateAction<Preferences>>
}>({
    preferences: {},
    setPreferences: () => { },
})

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
    const [preferences, setPreferences] = useState<Preferences>({
        1: ["Home", "Bilety", "Wydarzenia", "Awarie"], // 🔄 domyślne 4 opcje
    })
    return (
        <PreferencesContext.Provider value={{ preferences, setPreferences }}>
            {children}
        </PreferencesContext.Provider>
    )
}

export const usePreferences = () => useContext(PreferencesContext)