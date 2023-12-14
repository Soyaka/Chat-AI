import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from './Completion/Container'
const App = () => {
  return (
    <div>
        <Router>
        <Routes>
          <Route path="/completion" element={<Container/>} >
            <Route path="/completion/:userId" element={<Container/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
