import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-4">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              {/* <Ticket className="w-5 h-5 text-primary-foreground" /> */}
            </div>
            <h1 className="text-xl font-bold text-balance">Karta Miejska</h1>
          </div>
          <div className="text-xs text-muted-foreground">Kraków</div>
        </div>
      </header>
    </div>
  );
}

export default App;
