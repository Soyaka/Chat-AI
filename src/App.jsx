import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Container from './Completion/Container'
import Home from './Home';
import store from './Completion/StateManager';
import Gallery from './ImGeneration/Gallery';



const App = () => {
  return (
 
      <Provider store={store}>
        <Router>
        <Routes>
        <Route path='/' Component={Home}></Route>
          <Route path="/completion" Component={Container} >
            <Route path="/completion/:ChosenChat" Component={Container} />
          </Route>
          <Route path='ImGGeneration' Component={Gallery}></Route>
          <Route path='VoiceAudio'></Route>
        </Routes>
      </Router>
      </Provider>
    
    
  )
}

export default App
