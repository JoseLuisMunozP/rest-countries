import React from "react"
import './Card.css';


function Card(props) {
    

    return (
        <div className="card">

                <img className="card-flag" alt="The flag of the country" src={props.flag}/>

                    <div className="card-info-container">

                        <div className="card-country">{props.name}</div>
                        <div className="card-info-title">Population: <span className="card-info-answer">{props.population.toLocaleString()}</span></div>
                        <div className="card-info-title">Region: <span className="card-info-answer">{props.region}</span></div>
                        <div className="card-info-title">Capital: <span className="card-info-answer">{props.capital}</span></div>

                    </div>

            </div>
    )
}

export default Card;
