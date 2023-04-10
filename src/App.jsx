import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'
import Resident from './components/Resident';

function App() {

  const [ location, setLocation ] = useState({});
  const [ randomNum, setRandomNum ] = useState(Math.floor(Math.random() * 126) + 1);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ inputValue, setInputValue ] = useState('');

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/location/${randomNum}`)
      .then(res => setLocation(res.data))
      .finally(() => setIsLoading(false))

      let inputId = document.getElementById('input__id');

      inputId?.addEventListener('keypress', (e) => {
        if(e.key === 'Enter'){
          document.getElementById('button__id').click()
        }
      })
  }, [])

  const dataAPI = () => {
    setIsLoading(true)
    if( inputValue < 127 && inputValue > 0 ){
      axios.get(`https://rickandmortyapi.com/api/location/${inputValue}`)
      .then(res => setLocation(res.data))
      .finally(() => setIsLoading(false))
    }else{
      alert('Escoge un numero entre el 1 y 126')
    }
  }

  const luckyButton = () => {
    axios.get(`https://rickandmortyapi.com/api/location/${(Math.floor(Math.random() * 126) + 1)}`)
    .then(res => setLocation(res.data))
    .finally(() => setIsLoading(false))
  }

  const isPoblation = () => {
    if( location.residents?.length === 0 ){
      return (
        <div className='no-residents-container'>
          <h2>{`No residents found :(`}</h2>
          <button onClick={luckyButton}>
            I'm feeling lucky!
          </button>
        </div>
      )
    }else{

    }
  }

  // console.log(location)

  return (
    <div className="App">
      <header>
        <div className="header-container">
          <div className="search-bar">
            <input type="text" placeholder='Type an ID (1 - 126)' value={inputValue} onChange={e => setInputValue(e.target.value)} id='input__id'/>
            <button onClick={dataAPI} id='button__id'>
              Search!
            </button>
          </div>
          <div className="title-container">
            <button onClick={() => alert('Created with "The Rick and Morty API"')}>
              <h1>rick-and-morty-app</h1>
            </button>
          </div>
        </div>
      </header>
      <div className="location-card">
        {isLoading ? (
          <div className="loading">
            <h2>Loading...</h2>
          </div>
          ) : (
          <>
            <div className="location-title">
              <h2>{location.name}</h2>
            </div>
            <div className="location-details">
              <p><b>Type</b>: {location.type}</p>
              <p><b>Dimension</b>: {location.dimension}</p>
              <p><b>Poblation</b>: {location.residents?.length}</p>
            </div>
          </>
        )}
      </div>
      <div className="residents-container">
        {isPoblation()}
        <ul>
          {location.residents?.map(resident => (
            <Resident
              resident={resident}
              key={resident}
            />
          ))}
        </ul>
      </div>
      <div class="app__footer">
        <ul class="footer__social-media">
          <li>
            <a href="https://www.linkedin.com/in/abisaidev" target='_blank' className='footer__link'>
              <i className='bx bxl-linkedin-square bx-md'></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/abisaidev-hub" target='_blank' className='footer__link'>
              <i className='bx bxl-github bx-md' ></i>
            </a>
          </li>
        </ul>
        <p>© Abisai Luna</p>
      </div>
    </div>
  )
}

export default App
