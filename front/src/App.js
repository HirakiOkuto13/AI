import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Menu from './components/Menu';
import Footer from './components/Footer';
import Predict from './pages/Predict';
import Predict2 from './pages/Predict2';
import AddData from './pages/AddData';
import Show from './pages/Show';
import UpdateData from './pages/UpdateData';
import AdpData from './pages/AdpData';

class App extends React.Component {

  render(){
    return(
      <Router>
      <Menu />
      <Switch>
                <Route path="/edit-adp/:id" component={UpdateData} />
          <Route path="/regression">
              <Predict />
          </Route>
          <Route path="/all">
              <AdpData />
          </Route>
          <Route path="/classification">
              <Predict2 />
          </Route>
          <Route path="/adddata">
              <AddData />
          </Route>
          <Route path="/">
              <Show />
          </Route>
      </Switch>
      <Footer />
      </Router>
    );
  }
}

export default App;
