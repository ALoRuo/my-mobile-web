import React from "react";
import { TabBar,NavBar,Icon } from 'antd-mobile';
import {  Route,Redirect } from 'react-router';
import ClassifyView from 'components/Classify/ClassifyView';
import ShoppingCart from './ShoppingCart/MainView';
import UserCenter from './UserCenter/MainView';
import Home from './Home/MainView'
import 'styles/mainView.scss';
import history from 'utils/HistoryRedirection';

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectTab:'home'
        }
    }
    componentDidMount(){
        // console.log("initial state: ", store.getState());
    }
    changeTab = (selectTab) => {
        this.setState({selectTab},()=>{
            switch (selectTab) {
                case 'home':history.push('/home');break;
                case 'classify':history.push('/classify');break;
                case 'shoppingCart':history.push('/shoppingCart');break;
                case 'userMessage':history.push('/userMessage');break;
            }
        })
    }
    render(){
        let herf = window.location.hash;
        let navTitle = '';
        switch (herf) {
            case '#/home':navTitle='Mall商城';break;
            case '#/classify':navTitle='商品分类';break;
            case '#/shoppingCart':navTitle='购物车';break;
            case '#/userMessage':navTitle='用户中心';break;
        }
        return(
            <div style={{height:window.innerHeight}} className='mainview'>
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#cee0ce'}}
                    mode="light"
                    // icon={<Icon type="left" />}
                    // onLeftClick={() => console.log('onLeftClick')}
                    // rightContent={[
                    //     <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    //     <Icon key="1" type="ellipsis" />,
                    // ]}

                >{navTitle}</NavBar>

                <Route path='/home' component={Home}/>
                <Route path='/classify' component={ClassifyView}/>
                <Route path='/shoppingCart' component={ShoppingCart}/>
                <Route path='/userMessage' component={UserCenter}/>
                <div className="bottom-tab">
                    <div className='tab-item' onClick={()=>this.changeTab('home')}><i className='iconfont icon-shouye' style={{fontSize:21,color:window.location.hash === '#/home' ? '#33A3F4':'#949494'}}/><p style={{color:window.location.hash === '#/home' ? '#33A3F4':'#666'}}>首页</p></div>
                    <div className='tab-item' onClick={()=>this.changeTab('classify')}><i className='iconfont icon-fenlei-' style={{fontSize:21,color:window.location.hash === '#/classify' ? '#33A3F4':'#949494'}}/><p style={{color:window.location.hash === '#/classify' ? '#33A3F4':'#666'}}>分类</p></div>
                    <div className='tab-item' onClick={()=>this.changeTab('shoppingCart')}><i className='iconfont icon-gouwuche2' style={{fontSize:21,color:window.location.hash === '#/shoppingCart' ? '#33A3F4':'#949494'}}/><p style={{color:window.location.hash === '#/shoppingCart' ? '#33A3F4':'#666'}}>购物车</p></div>
                    <div className='tab-item' onClick={()=>this.changeTab('userMessage')}><i className='iconfont icon-zelvgongyongyonghuzhongxinz003' style={{fontSize:21,color:window.location.hash === '#/userMessage' ? '#33A3F4':'#949494'}}/><p style={{color:window.location.hash === '#/userMessage' ? '#33A3F4':'#666'}}>用户</p></div>
                </div>
            </div>
        )
    }
}
