/**
 * Created by dell on 2019/4/19.
 */
import React from "react";
import {  NavBar, Icon,} from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import 'styles/orderListView.scss';
import model from 'models/orderListViewModel';
import {connect} from 'react-redux';

class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //订单实际渲染数组
            dataSource:[],
        };
    }
    componentDidMount(){
        let {orderList} = this.props.orderMessage;
        orderList = orderList?orderList:[];
        this.setState({dataSource:orderList})

    }
    cancelOrder = (orderId) =>{
        model.cancelOrder({
            'order_id':orderId
        }).then(()=>{
            let {orderList} = this.props.orderMessage;
            orderList.map((item,index)=>{
                if(item.id === orderId){
                    orderList.splice(index,1);
                }
            })
            this.setState({dataSource:orderList})
        })
    }
    render(){
        let {dataSource} = this.state;
        return(
            <div className='order-list-view' style={{height:window.innerHeight}}>
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec',zIndex:1}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    onLeftClick={() => history.go(-1)}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' ,color:'#666'}}
                              onClick={()=>{history.push('/searchorderlist')}}
                        />
                    ]}
                >
                    搜索结果
                </NavBar>
                <div className="order-list-content" style={{position:'relative',top:45}}>
                    {
                        dataSource.length === 0 ?
                        <div>
                            <div className="empty-order-list"></div>
                            <p style={{
                                color:'#888',
                                fontSize:16,
                                textAlign:'center'
                            }}>您还没有相关的订单~</p>
                        </div>
                        :dataSource.map(item => {
                        let totalPrice = 0;
                        return(
                            <div className='order-item'>
                                {/*<div style={{padding:'6px 0 20px'}}>{item.items[0].productBrand}</div>*/}
                                {item.items.map(order => {
                                    totalPrice += order.productPrice*order.productQuantity;
                                    console.log(order[0].productBrand)
                                    return(
                                        <div>
                                            <div style={{padding:'6px 0 20px'}}>{order[0].productBrand}</div>
                                            {
                                                order.map(orderItem=>{
                                                    return(
                                                        <div className="order-item-content">
                                                            <div className="pic"><div style={{paddingBottom:'100%',backgroundImage:`url(${orderItem.productPic})`,backgroundSize:'cover'}}></div></div>
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
                                    {
                                        item.status === 1 &&
                                        <div className='bottom-button'><span className='black-button'>提醒发货</span><span className='orange-button'>确认收货</span></div>
                                    }
                                    {
                                        item.status === 2 &&
                                        <div className='bottom-button'><span className='black-button'>查看物流</span><span className='orange-button'>确认收货</span></div>
                                    }
                                    {
                                        item.status === 3 &&<div className='bottom-button'><span className='orange-button' onClick={()=>history.push('/createaccess')}>评价</span> </div>
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
let Connected = connect(state=>state)(MainView);
export default Connected;
