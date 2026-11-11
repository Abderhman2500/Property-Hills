import React from 'react';
import Header from "./component/Header"
import ScrollToTop from "./component/ScrollToTop"
import Home from './page/Home'
import About from './page/About';
import Projects from './page/Projects'
import Contact from './page/Contact'
import Egy_proj from './page/Egy_proj'
import Details from './page/Details';
import { Route, Routes } from 'react-router-dom';
function App() {

  return (
    <>
     <Header/>
     <ScrollToTop/>
     <Routes>
      <Route path='/' element={ <Home/>}/>
      <Route path="/about" element={<About/>} />
      <Route path="/projects" element={<Projects/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/egy_proj" element={<Egy_proj/>} />
      <Route path="/details" element={<Details/>} />
      <Route path="/details/:slug" element={<Details />} />
     </Routes>
  
     
    </>
  )
}

export default App
