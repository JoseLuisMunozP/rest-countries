import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import './Body.css';
import Card from "./Card.js"
import { SlMagnifier } from "react-icons/sl";
import ClipLoader from "react-spinners/ClipLoader";


function Body() {

    const inputRef = useRef(null);

    let iconStyles = { color: "white" };


    const [region, setRegion] = useState("")
    const [countries, setCountries] = useState(null)


        useEffect(() => {

            async function getCountries(){

                    const response = await fetch(
                        "https://restcountries.com/v2/all"
                    );
                    const data = await response.json()
                    setCountries(data);
                }


                getCountries()

        }, [])


        if (!countries){

            return (

                <div className="loading-page">


                    <h1 >LOADING</h1>
                    <ClipLoader  />


                </div>


            )


        } 


        const cardsElements = countries.map(country => (


            (region===country.region || region==="") ? 


            <Link to={{
                pathname:'/details/'+country.name, 
                }}>

                <Card 
                    flag= {country.flags.png}
                    name= {country.name}
                    population= {country.population}
                    region= {country.region}
                    capital= {country.capital}
                />
            </Link>

            : ""

            ))




            function handleChange(event) {
                
                const {name, value} = event.target

                if(name==='inputName'){

                    if(value){
                        fetch("https://restcountries.com/v2/name/"+value)
                            .then(res => res.json())
                            .then(data => data.status!==404? setCountries(data) : setCountries([]))
                            .catch((err) => {
                                console.error(err);
                              });
                        }else{
                            fetch("https://restcountries.com/v2/all")
                            .then(res => res.json())
                            .then(data => setCountries(data))
                        }

                }

                if(name==='selectName'){

                    if(value!==""){
                        setRegion(value)
                        inputRef.current.value = "";

                        fetch("https://restcountries.com/v2/region/"+value)
                            .then(res => res.json())
                            .then(data => data.status!==404? setCountries(data) : setCountries([]))
                            .catch((err) => {
                                console.error(err);
                              });
                        }else{
                            setRegion(value)
                            fetch("https://restcountries.com/v2/all")
                            .then(res => res.json())
                            .then(data => setCountries(data))
                        }

                }
                
            }
            

  return (

    <div className="container">
      

        <div className='search-container'>

            <div className='search-box'>

                <span className="icon-lens"><SlMagnifier /></span>
                <input type="text" className="input-box" placeholder="Search for a country..." ref={inputRef} name="inputName" onChange={handleChange}  />

            </div>

            <div className='continent-box'>

                <select onChange={handleChange} name="selectName" className="select-box">
                    <option value="">Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>


                </select>

            </div>


        </div>


        <div className="cards-container">

            {cardsElements}


        </div>


    </div>
  );
}

export default Body;
