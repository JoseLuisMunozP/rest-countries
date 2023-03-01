import './Header.css';
import {BsMoon} from "react-icons/bs"
import {BsMoonFill} from "react-icons/bs"
import { useState } from "react";

function Header() {

  const [darkMode, setDarkMode] = useState("light")

  let iconStyles = { color: "white" };


  function changeDarkMode(event) {

    if(darkMode==="light"){
      document.querySelector("body").setAttribute('data-theme', 'dark')
      setDarkMode("dark")
    }else{
      document.querySelector("body").setAttribute('data-theme', 'light')
      setDarkMode("light")

    }

  }

  return (
    <header>

      <div className='title'>Where in the world?</div>

      <div className='dark-mode' onClick={changeDarkMode}>

      {
      darkMode!=="light" ? 
      <span className='dark-icon'><BsMoonFill style={iconStyles}/></span> : 
      <span className='dark-icon'><BsMoon/></span>
      }
      
          <button className='dark-mode-btn'>Dark Mode</button>

      </div>

    </header>
  );
}

export default Header;
