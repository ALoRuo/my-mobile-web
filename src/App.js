import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import history from './utils/HistoryRedirection'
import './App.css';
import MainView from 'components/MainView'
import Payment from 'components/Payment/MainView'
import PaySuccess from 'components/Payment/PaySuccess'
import ProductList from 'components/Classify/ProductList'
import ProductItem from 'components/Classify/ProductItem'
import Login from 'components/Login'

class App extends Component {
  render() {
    return (
        //<div className="App">
        //                 <MainView/>
        //             </div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={MainView}/>
            <Route path='/payment' component={Payment}/>
            <Route path='/payresult' component={PaySuccess}/>
            <Route path='/productlist/:id' component={ProductList}/>
            <Route path='/productitem/:name/:id' component={ProductItem}/>
            <Route path='/login' component={Login}/>
          </Switch>
        </Router>

    );
  }
}

export default App;
