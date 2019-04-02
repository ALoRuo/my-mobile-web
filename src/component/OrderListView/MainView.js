import React from "react";
import { InputItem, NavBar, Icon, Drawer, Flex, WhiteSpace, Button } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import 'styles/orderListView.scss';
import model from 'models/orderListViewModel'

let data = [];
for(let i =0;i<6;i++){
    let obj = {
        shopName:'ZoObI',
        orderList:[
            {
                picUrl:'http://img2.imgtn.bdimg.com/it/u=3422642367,3859355415&fm=26&gp=0.jpg',
                productName:'zoobi破洞高腰复古休闲浅色牛仔拖地长裤',
                productSize:'蓝色预定;s',
                productPrice:'129.0',
                productCount:'1'
            },
            {
                picUrl:'http://img2.imgtn.bdimg.com/it/u=3422642367,3859355415&fm=26&gp=0.jpg',
                productName:'zoobi破洞高腰复古休闲浅色牛仔拖地长裤',
                productSize:'蓝色预定;s',
                productPrice:'129.0',
                productCount:'2'
            },
        ]

    }
    data.push(obj);
}
data[0].stateType = '3';
data[2].stateType = '1';
data[1].stateType = '2';
data[3].stateType = '4';
data[4].stateType = '4';
data[5].stateType = '4';

export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //全部：’0‘，待付款：’1‘，待发货：’2‘，待收货：’3‘，待评价：’4‘
            stateType:'0',
            stateTypeList :{
                waitToPay:[],//待付款订单
                waitToSend:[],//待发货订单
                waitToAccess:[],//待收货订单
                waitpToAssess:[],//待评价订单
            },
            //订单实际渲染数组
            dataSource:[],
        };
    }
    componentDidMount(){
        model.getOrderList({})
        let {stateTypeList} = this.state;
        data.forEach(item=>{
            if(item.stateType === '1'){
                stateTypeList.waitToPay.push(item);
            }else if(item.stateType === '2'){
                stateTypeList.waitToSend.push(item);
            }else if(item.stateType === '3'){
                stateTypeList.waitToAccess.push(item);
            }else if(item.stateType === '4'){
                stateTypeList.waitpToAssess.push(item);
            }
        })
        this.setState({stateTypeList,dataSource:data})
    }
    handleChange = (type) =>{
        let dataSource = [];
        let {stateTypeList} = this.state;
        if(type === '0'){
            dataSource = data;
        }else if(type === '1'){
            dataSource = stateTypeList.waitToPay;
        }else if(type === '2'){
            dataSource = stateTypeList.waitToSend;
        }else if(type === '3'){
            dataSource = stateTypeList.waitToAccess;
        }else if(type === '4'){
            dataSource = stateTypeList.waitpToAssess;
        }
        this.setState({
            stateType:type,
            dataSource
        })
    }
    render(){
        let {stateType,dataSource} = this.state;
        return(
            <div className='order-list-view' style={{height:window.innerHeight}}>
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    onLeftClick={() => history.go(-1)}
                >
                    我的订单
                </NavBar>
                <div className='select-nav'>
                    <p className={stateType === '0'?'active':''} onClick={()=>this.handleChange('0')}>全部</p>
                    <p className={stateType === '1'?'active':''} onClick={()=>this.handleChange('1')}>待付款</p>
                    <p className={stateType === '2'?'active':''} onClick={()=>this.handleChange('2')}>待发货</p>
                    <p className={stateType === '3'?'active':''} onClick={()=>this.handleChange('3')}>待收货</p>
                    <p className={stateType === '4'?'active':''} onClick={()=>this.handleChange('4')}>待评价</p>
                </div>
                <div className="order-list-content">
                    {dataSource.map(item => {
                        let totalPrice = 0;
                        return(
                            <div className='order-item'>
                                <div style={{padding:'6px 0 20px'}}>{item.shopName}</div>
                                {item.orderList.map(order => {
                                    totalPrice += order.productPrice*order.productCount;
                                    return(
                                        <div className="order-item-content">
                                            <div className="pic"><div style={{paddingBottom:'100%',backgroundImage:`url(${order.picUrl})`,backgroundSize:'cover'}}></div></div>
                                            <div style={{flex:'3 1',position:'relative',marginLeft:6}}>
                                                <div style={{width: '80%',}}>
                                                    <p className='text-ellipsis' style={{marginBottom:6}}>{order.productName}</p>
                                                    <p style={{color:'#eaa184',fontSize:12}}>{order.productSize}</p>
                                                </div>
                                                <div style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                }}>
                                                    <p style={{marginBottom:6}}>${order.productPrice}</p>
                                                    <p style={{color:'#eaa184',fontSize:12}}>X{order.productCount}</p>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })}
                                <div style={{padding:"15px 0",borderTop:'1px solid #ccc',position:'relative'}}>
                                    <p >应付金额：￥{totalPrice}</p>
                                    {
                                        item.stateType === '1' &&
                                        <div className='bottom-button'><span className='black-button'>取消订单</span><span className='orange-button'>立即付款</span></div>
                                    }
                                    {
                                        item.stateType === '2' &&
                                        <div className='bottom-button'><span className='black-button'>提醒发货</span><span className='orange-button'>确认收货</span></div>
                                    }
                                    {
                                        item.stateType === '3' &&
                                        <div className='bottom-button'><span className='black-button'>查看物流</span><span className='orange-button'>确认收货</span></div>
                                    }
                                    {
                                        item.stateType === '4'&&<div className='bottom-button'><span className='orange-button'>评价</span> </div>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
             </div>
        )
    }
}
