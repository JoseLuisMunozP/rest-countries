import './App.css';
import Body from './Components/Body/Body.js'
import Details from './Components/Body/Details.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from  "./Components/Header/Header.js"

function App() {
  return (
    <div className="App">
        <Header />

    <BrowserRouter>
      <Routes>
          <Route index element={<Body />} />
          <Route  path="/details/:type" element={<Details />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
