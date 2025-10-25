import React from "react";

type HomeModuleCardProps = {
    icon: React.JSX.Element,
    title: string,
    subTitle: string
}

const HomeModuleCard = ({icon, title, subTitle}: HomeModuleCardProps) => {

    return (
        <div className="home-module-card">
            {icon}
            <span className="home-module-card-title">{title}</span>
            <span className="home-module-card-subtitle">{subTitle}</span>
        </div>
    )
}

export default HomeModuleCard