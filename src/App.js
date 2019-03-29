import React, { Component } from 'react';
import { Router, Route, Switch,Redirect } from 'react-router';
import history from './utils/HistoryRedirection'
import './App.css';
import MainView from 'components/MainView'
import Payment from 'components/Payment/MainView'
import PaySuccess from 'components/Payment/PaySuccess'
import PayView from 'components/Payment/PayView'
import ProductList from 'components/Classify/ProductList'
import ProductItem from 'components/Classify/ProductItem'
import AssessView from 'components/Classify/AssessView'
import OrderListView from 'components/OrderListView/MainView'
import AddressListView from 'components/UserCenter/AddressList'
import AddAddressView from 'components/UserCenter/AddAddressView'
import ChangeAddressView from 'components/UserCenter/ChangeReceiveInfo'
import Login from 'components/Login'

class App extends Component {
  render() {
    return (
        <Router history={history}>
            <Switch>
                <Route path='/payment' component={Payment}/>
                <Route path='/paysuccess' component={PaySuccess}/>
                <Route path='/payview' component={PayView}/>
                <Route path='/productlist/:id' component={ProductList}/>
                <Route path='/productitem/:productname/:id' component={ProductItem}/>
                <Route path='/assess/:productname' component={AssessView}/>
                <Route path='/orderlist' component={OrderListView}/>
                <Route path='/login' component={Login}/>
                <Route path='/addresslist' component={AddressListView}/>
                <Route path='/addtoaddress' component={AddAddressView}/>
                <Route path='/changereceiveinfo/:id' component={ChangeAddressView}/>
                <Route path="/" component={MainView}/>
                {/*<Redirect from="/" to="/home" />*/}
            </Switch>
        </Router>

    );
  }
}

export default App;
