import React, { useState } from "react";
import "./App.css";
import Home from "./component/home/Home";
import logo from "./img/images.png";

function App() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <div className="App">
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-4">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <img src={logo} alt="" />
            </div>
            <h1 className="text-xl font-bold text-balance">
              Karta Miejska Szczecin
            </h1>
          </div>
        </div>
      </header>

      <Home />

      {isMoreOpen && (
        <div className="fixed bottom-16 left-0 right-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 grid grid-cols-3 gap-3 p-4 border-t border-border animate-slide-up z-40">
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm">Profil</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <span className="text-sm">Miejsca</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7h18M3 12h18M3 17h18"
              />
            </svg>
            <span className="text-sm">Pojazdy</span>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 h-16 w-full border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 grid grid-cols-5 gap-0 text-muted-foreground z-50">
        <div className="flex flex-col items-center justify-center gap-1 h-full hover:text-foreground transition-colors cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h14a1 1 0 001-1V10"
            />
          </svg>
          <span className="text-xs">Home</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 h-full hover:text-foreground transition-colors cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 14l-2 2m0 0l-2-2m2 2V6a2 2 0 012-2h8a2 2 0 012 2v10m-2 2l2-2m-2 2l-2-2"
            />
          </svg>
          <span className="text-xs">Bilety</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 h-full hover:text-foreground transition-colors cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs">Wydarzenia</span>
        </div>

        {/* AWARIE */}
        <div className="flex flex-col items-center justify-center gap-1 h-full hover:text-foreground transition-colors cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6 2A9 9 0 113 12a9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs">Awarie</span>
        </div>

        {/* WIĘCEJ */}
        <button
          onClick={() => setIsMoreOpen((prev) => !prev)}
          className={`flex flex-col items-center justify-center gap-1 h-full hover:text-foreground transition-colors cursor-pointer ${
            isMoreOpen ? "text-primary" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
          <span className="text-xs">Więcej</span>
        </button>
      </nav>

      {/* Animacja */}
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
