import "./App.css";
import Movie from "./Components/Movie";
import SingleMovie from "./Components/SingleMovie";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Movie /> } />
          <Route path="/singlemovie/:id" element={< SingleMovie/> } /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
