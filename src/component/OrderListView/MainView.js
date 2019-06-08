import React from "react";
import { InputItem, NavBar, Icon, Drawer, Flex, WhiteSpace, Button } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import 'styles/orderListView.scss';
import model from 'models/orderListViewModel';
import {connect} from 'react-redux';
import orderAction from "store/actions/order-action";
import {bindActionCreators} from 'redux';

class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //全部：’9‘，待付款：’0‘，待发货：’1‘，待收货：’2‘，待评价：’3‘
            stateType:parseInt(this.props.match.params.type),
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
        // this.initOrderList({});
        this.handleChange(this.state.stateType);
    }
    initOrderList = (option) => {
        model.getOrderList(option).then(res=>{
            let {stateTypeList} = this.state;
            let dataSource = [];
            res['order_master_list'].forEach(item=>{
                dataSource.push(item);
                // if(item.status === 0){
                //     stateTypeList.waitToPay.push(item);
                // }else if(item.status === 3){
                //     stateTypeList.waitToSend.push(item);
                // }
                // else if(item.stateType === '3'){
                //     stateTypeList.waitToAccess.push(item);
                // }else if(item.stateType === '4'){
                //     stateTypeList.waitpToAssess.push(item);
                // }
            })
            this.setState({stateTypeList,dataSource})
        })
    }
    handleChange = (type) =>{

        // let {stateTypeList,dataSource} = this.state;
        // if(type === 1){
        //     dataSource = data;
        // }else if(type === '0'){
        //     dataSource = stateTypeList.waitToPay;
        // }else if(type === '3'){
        //     dataSource = stateTypeList.waitToSend;
        // }else if(type === '4'){
        //     dataSource = stateTypeList.waitToAccess;
        // }else if(type === '5'){
        //     dataSource = stateTypeList.waitpToAssess;
        // }
        if(type === 9){
            this.initOrderList({});
        }else{
            let dataSource = [];
            model.getOrderListByStatus({status:type}).then(res=>{
                res['order_master_list'].forEach(item=> {
                    dataSource.push(item);
                });
                this.setState({
                    dataSource
                });
            })
            // this.initOrderList({status:type});
        }
        this.setState({stateType:type})

    }
    completeOrder = (orderId) => {
        model.completeOrder({
            'order_id':orderId
        })
    }
    cancelOrder = (orderId) =>{
        model.cancelOrder({
            'order_id':orderId
        }).then(()=>{
            let {stateType} = this.state;
            model.getOrderList({}).then(res=>{
                let dataSource = [];
                res['order_master_list'].forEach(item=>{
                    if(item.status === parseInt(stateType)){
                        dataSource.push(item)
                    }
                })
                this.setState({dataSource})
            })
        })
    }
    goToAccess = (list) => {
        let {setOrderList} = this.props.methods;

        let accessList = [];
        list.forEach(item=>{
            accessList = [...item,...accessList]
        })
        setOrderList(accessList);
        history.push('/createaccess')
    }
    render(){
        let {stateType,dataSource} = this.state;
        console.log(dataSource);
        return(
            <div className='order-list-view' style={{height:window.innerHeight}}>
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    onLeftClick={() => history.go(-1)}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' ,color:'#666'}}
                            onClick={()=>{history.push('/searchorderlist')}}
                        />
                    ]}
                >
                    我的订单
                </NavBar>
                <div className='select-nav'>
                    <p className={stateType === 9?'active':''} onClick={()=>this.handleChange(9)}>全部</p>
                    <p className={stateType === 0?'active':''} onClick={()=>this.handleChange(0)}>待付款</p>
                    <p className={stateType === 1?'active':''} onClick={()=>this.handleChange(1)}>待发货</p>
                    <p className={stateType === 2?'active':''} onClick={()=>this.handleChange(2)}>待收货</p>
                    <p className={stateType === 3?'active':''} onClick={()=>this.handleChange(3)}>待评价</p>
                </div>
                <div className="order-list-content">
                    {
                        dataSource.length === 0 ?
                            <div>
                                <div className="empty-order-list"></div>
                                <p style={{
                                    color:'#888',
                                    fontSize:16,
                                    textAlign:'center'
                                }}>没有该状态的订单哦~</p>
                            </div>
                        :dataSource.map(item => {
                        let totalPrice = 0;
                        return(
                            <div className='order-item'>
                                {/*<div style={{padding:'6px 0 20px'}}>{item.items[0].productBrand}</div>*/}
                                {item.items.map(order => {
                                    totalPrice += order.productPrice*order.productQuantity;
                                    return(
                                        <div>
                                            <div style={{padding:'6px 0 20px'}}>{order[0].productBrand}</div>
                                            {
                                                order.map(orderItem=>{
                                                    return(
                                                        <div className="order-item-content" onClick={()=>history.push(`/productitem/${orderItem.productName}/${orderItem.productId}`)}>
                                                            <div className="pic"><div style={{paddingBottom:'100%',backgroundImage:`url(${orderItem.productPic.split(',')[0]})`,backgroundSize:'cover'}}></div></div>
                                                            <div style={{flex:'3 1',position:'relative',marginLeft:6}}>
                                                                <div style={{width: '80%',}}>
                                                                    <p className='text-ellipsis' style={{marginBottom:6}}>{orderItem.productName}</p>
                                                                    <p style={{color:'#eaa184',fontSize:12}}>{orderItem.productAttr}</p>
                                                                </div>
                                                                <div style={{
                                                                    position: 'absolute',
                                                                    top: 0,
                                                                    right: 0,
                                                                }}>
                                                                    <p style={{marginBottom:6}}>${orderItem.productPrice}</p>
                                                                    <p style={{color:'#eaa184',fontSize:12}}>X{orderItem.productQuantity}</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>

                                    )
                                })}
                                <div style={{padding:"15px 0",borderTop:'1px solid #ccc',position:'relative'}}>
                                    <p >应付金额：￥{item.totalAmount}</p>
                                    {
                                        item.status === 0 &&
                                        <div className='bottom-button'><span className='black-button' onClick={()=>this.cancelOrder(item.id)}>取消订单</span><span className='orange-button'>立即付款</span></div>
                                    }
                                    {/*{*/}
                                        {/*item.status === 1 &&*/}
                                        {/*<div className='bottom-button'><span className='black-button'>提醒发货</span><span className='orange-button' onClick={()=>this.completeOrder(item.orderId)}>确认收货</span></div>*/}
                                    {/*}*/}
                                    {
                                        item.status === 2 &&
                                        <div className='bottom-button'><span className='black-button'>查看物流</span><span className='orange-button' onClick={()=>this.completeOrder(item.orderId)}>确认收货</span></div>
                                    }
                                    {
                                        (item.status === 3 || item.status === 1)&&<div className='bottom-button'><span className='orange-button' onClick={()=>this.goToAccess(item.items)}>评价</span> </div>
                                    }
                                    {
                                        (item.status === 5)&&<div className='bottom-button'><span style={{color:'red'}}>订单失效</span> </div>
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
let mapDispatchToProps = (dispatch)=>{
    return {
        /*传入actionCreator和dispatch，此时无论有多少action全都映射到props.methods中，相当于语法糖*/
        methods: bindActionCreators(orderAction, dispatch)
    }
}
let Connected = connect(state=>state,mapDispatchToProps)(MainView);

export default Connected;