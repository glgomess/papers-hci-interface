import React from 'react'
import TopBar from './topbar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ProjectPage from './other-pages/ProjectPage'
import Home from './home/index'

function App() {
  return (
    <div>
      <link rel="stylesheet" href="https://unpkg.com/tachyons@4/css/tachyons.min.css"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

      <TopBar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/projeto">
            <ProjectPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
