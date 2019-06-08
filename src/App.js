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
import ShopView from 'components/Classify/ShopView'
import AllShopProducts from 'components/Classify/AllShopProducts'
import OrderListView from 'components/OrderListView/MainView'
import CreateAccessView from 'components/OrderListView/CreateAccessView'
import SearchOrderListView from 'components/OrderListView/SearchOrderList'
import SearchOrderListResultView from 'components/OrderListView/OrderSearchResultList'
import AddressListView from 'components/UserCenter/AddressList'
import SelectAddressList from 'components/UserCenter/SelectAddressList'
import AddAddressView from 'components/UserCenter/AddAddressView'
import ChangeAddressView from 'components/UserCenter/ChangeReceiveInfo'
import MyAccessView from 'components/UserCenter/MyAccessView'
import MyCollect from 'components/UserCenter/MyCollect'
import Login from 'components/Login'
import Register from 'components/Register'

class App extends Component {
  render() {
    return (
        <Router history={history}>
            <Switch>
                <Route path='/payment/:flag' component={Payment}/>
                <Route path='/paysuccess' component={PaySuccess}/>
                <Route path='/payview' component={PayView}/>
                <Route path='/productlist/:id' component={ProductList}/>
                <Route path='/simpleproductlist/:keyword' component={ProductList}/>
                <Route path='/shopmessage/:brandname/:brandid' component={ShopView}/>
                <Route path='/shopproductlist/:brandid' component={AllShopProducts}/>
                <Route path='/productitem/:productname/:id' component={ProductItem}/>
                <Route path='/assess/:productname/:id' component={AssessView}/>
                <Route path='/orderlist/:type' component={OrderListView}/>
                <Route path='/createaccess' component={CreateAccessView}/>
                <Route path='/ordersearchresultlist' component={SearchOrderListResultView}/>
                <Route path='/searchorderlist' component={SearchOrderListView}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/addresslist' component={AddressListView}/>
                <Route path='/selectaddresslist' component={SelectAddressList}/>
                <Route path='/addtoaddress' component={AddAddressView}/>
                <Route path='/myaccessview' component={MyAccessView}/>
                <Route path='/mycollect' component={MyCollect}/>
                <Route path='/changereceiveinfo/:id' component={ChangeAddressView}/>
                <Route path="/" component={MainView}/>
                {/*<Redirect from="/" to="/home" />*/}
            </Switch>
        </Router>

    );
  }
}

export default App;
