import React from "react"
import {Link, useParams} from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from 'axios';
import './Details.css';
import { MdOutlineKeyboardBackspace } from "react-icons/md";


function Details(props) {
    

    const type = useParams().type;
    let curr="No currency"

    const [country, setCountry] = useState(null)


    useEffect(() => {

        async function getCountries(){

                const response = await fetch(
                    type.length>3?
                    "https://restcountries.com/v2/name/"+type
                    :
                    "https://restcountries.com/v2/alpha?codes="+type

                );
                const data = await response.json()
                setCountry(data[0]);
            }



            getCountries()


    }, [])

    if (!country) {return null;} 
 

    const handleClick = async() => {
        const data = await axios.get("https://restcountries.com/v2/alpha?codes="+country.borders[0])
        setCountry(data)
        window.location.reload();

    }

    if(country.currencies!==undefined)
    curr = country.currencies[0].name;


    return (
        <div className="container">



            <Link to={{
                pathname:'/rest-countries', 
                }}>
                    <div className="back-box">

                        <span className="icon"><MdOutlineKeyboardBackspace/></span>
                        <button className="back-button">Back</button>

                    </div>
            </Link>

            <div className="details-container">
                <img alt="The flag of the country" className="details-flag" src={country.flags.png}/>


                <div className="details-info">

                <h2>{country.name}</h2>

                    <div className="details-info-data">

                    <div className="details-info-left">

                        <p><span className="details-title-info">Native name:</span> {country.nativeName}</p>
                        <p><span className="details-title-info">Population:</span> {country.population.toLocaleString()}</p>
                        <p><span className="details-title-info">Region:</span> {country.region}</p>
                        <p><span className="details-title-info">Sub Region:</span> {country.subregion}</p>
                        <p><span className="details-title-info">Capital:</span> {country.capital}</p>


                    </div>

                    <div className="details-info-right">

                        <p><span className="details-title-info">Top Level Domain:</span> {country.topLevelDomain}</p>
                        <p><span className="details-title-info">Currencies:</span> {curr}</p>
                        <p><span className="details-title-info">Languages:</span> {country.languages[0].name}</p>

                    </div>

                    </div>

                    <div className="details-borders">

                    <span className="details-title-info">Border Coutries: </span>

                    {
                    
                    country.borders!==undefined ?


                        country.borders.map(border => 
                    

                            <Link to={{
                                pathname:'/details/'+border, 
                                }}>
                
                                <button className="country-btn" onClick = {handleClick}>{border}</button>
                
                
                            </Link>

                        ) : "None"
                    
                    
                    } 

                </div>
                </div>

            </div>


        

            



        </div>
    )
}

export default Details;
