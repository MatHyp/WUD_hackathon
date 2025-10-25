
const HomeCard = () => {
    return (
        <div className="home-card">
            <div className="home-card-header">
                <h4 className="home-card-title">Twoja Karta</h4>
                <span className="home-card-subtitle">Aktywna od 31.12.2025</span>
            </div>

            <div className="home-card-balance">
                <span className="home-card-balance-label">Saldo</span>
                <h1 className="home-card-balance-value">45.50 zł</h1>
            </div>
            <button className="home-card-button">Doładuj</button>
        </div>
    )
}

export default HomeCard;
