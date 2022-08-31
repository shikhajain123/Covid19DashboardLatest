import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import NotFound from './components/NotFound'
import StateWiseCases from './components/StateWiseCases'
import About from './components/About'
import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" components={About} />
      <Route exact path="/state/:state_code" components={StateWiseCases} />
      <Route exact path="/bad-path" components={NotFound} />
      <Redirect to="/bad-path" />
    </Switch>
  </>
)

export default App
