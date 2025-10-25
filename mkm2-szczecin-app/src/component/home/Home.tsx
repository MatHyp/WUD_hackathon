import HomeCard from "./card/HomeCard";
import HomeModuleCard from "./module-card/HomeModuleCard";

const Home = () => {

    return (
        <div className="home">
            <div className="home-header">
                <h1 className="home-title">Witaj, Użytkowniku!</h1>
                <span className="home-subtile">Zarządzaj swoją kartą miejską w jednym miejscu</span>
            </div>
            <HomeCard />
            <div className="module-cards-grid">
                <HomeModuleCard icon={<></>} title="Bilety" subTitle="Kup bilet komunikacji" />
                <HomeModuleCard icon={<></>} title="Wydarzenia" subTitle="Bilety na wydarzenia" />
                <HomeModuleCard icon={<></>} title="Rozkład" subTitle="Sprawdź połącznia" />
                <HomeModuleCard icon={<></>} title="Miejsca" subTitle="Okdryj miasto" />
            </div>
        </div>
    )
}

export default Home;
