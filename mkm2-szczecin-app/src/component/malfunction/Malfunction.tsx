import SingleMalfunction from "./single/SingleMalfunction";

const Malfunction = () => {

    return (
        <div className="malfunction">
            <div className="malfunction-header">
                <h1 className="malfunction-title">Zgłoszenia i awarie</h1>
                <span className="malfunction-subtitle">Aktualne problemy na mieście</span>

                <button className="malfunction-report-button">
                    <span>Zgłoś</span>
                </button>
            </div>
            <div className="malfunction-list">
                <SingleMalfunction
                    status="Aktywne"
                    isEmergency={true}
                    date="30 minut temu"
                    title="Awaria zasilania - Dzielnica Północna"
                    subTitle="Brak prądu w rejonie ulic Słonecznej i Kwiatowej. Trwają prace naprawcze."
                />
                <SingleMalfunction
                    status="Aktywne"
                    isEmergency={false}
                    date="1 godz. temu"
                    title="Utrudnienia na ul. Głównej"
                    subTitle="Remont jezdni powoduje objazdy. Przewidywany czas zakończenia: 18:00."
                />
                <SingleMalfunction
                    status="Aktywne"
                    isEmergency={true}
                    date="2 godz. temu"
                    title="Awaria wodociągu - ul. Parkowa"
                    subTitle="Przerwa w dostawie wody. Ekipa naprawcza na miejscu."
                />
                <SingleMalfunction
                    status="Rozwiązane"
                    isEmergency={false}
                    date="3 godz. temu"
                    title="Opóźnienia tramwajów linii 5"
                    subTitle="Awaria techniczna na trasie. Uruchomiono autobusy zastępcze"
                />
            </div>
        </div>
    )
}

export default Malfunction;
