
type SingleMalfunctionProps = {
    status: string,
    isEmergency: boolean,
    date: string,
    title: string,
    subTitle: string
}

const SingleMalfunction = ({status, isEmergency, date, title, subTitle}: SingleMalfunctionProps) => {

    return (
        <div className="single-malfunction">
            <div className="single-malfunction-header">
                <span className="single-malfunction-status">{status}</span>
                {isEmergency ? <span className="single-malfunction-emergency">Pilne</span> : ''}
                <span className="single-malfunction-date">{date}</span>
            </div>
            <div className="single-malfunction-body">
                <span className="single-malfunction-title">{title}</span>
                <span className="single-malfunction-subtitle">{subTitle}</span>
            </div>
        </div>
    )

}

export default SingleMalfunction;
