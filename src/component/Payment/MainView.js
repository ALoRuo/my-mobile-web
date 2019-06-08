import React from "react";
import { NavBar, Icon, Picker, List, InputItem, Modal } from 'antd-mobile';
import 'styles/payment.scss';
import history from 'utils/HistoryRedirection';
import model from 'models/paymentModel'
import {connect} from 'react-redux';
import payAction from "store/actions/pay-action";
import orderAction from "store/actions/order-action";
import {bindActionCreators} from 'redux';

const alert = Modal.alert;

const data = {shopName:'Sudo studio',productList:[]};
for (let i = 0; i<3 ;i++)
{
    data.productList.push({
        productName:'银色星芒刺绣网纱底裤',
        count:2,
        selectMessage:'肤色/M',
        price:99
    })
}
class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            discountValue:['yes'],
            sendWayValue: ['1'],
            sendTimeValue:['1'],
            insuranceValue:['1'],
            receiveMessage:{},
            orderList:[],
            amount:0
        }
    }
    componentDidMount(){


        model.getAllReceiveInfo({}).then(res=>{
            if(res.receiverList.length === 0){
                alert(null, <div style={{padding:'0 35px'}}>您还没有收货信息，是否先填写收货信息保存</div>, [
                    { text: <span style={{fontSize:14}}>取消</span>, onPress: () => console.log('cancel') },
                    { text: <span style={{fontSize:14,color:'#f7500d'}}>去填写</span>, onPress: () => history.push('/addtoaddress') },
                ])
            }else {
                let receiverList = res.receiverList;
                let receiveMessage = receiverList.find(item=>item.isDefault === 1);
                if(receiveMessage){
                    this.setState({receiveMessage});
                    let {orderMessage} = this.props;
                    let {addressMessage} = orderMessage;
                    if(addressMessage){
                        this.setState({
                            receiveMessage:addressMessage
                        })
                    }
                }else{
                    this.setState({receiveMessage:receiverList[0]});
                    let {orderMessage} = this.props;
                    let {addressMessage} = orderMessage;
                    if(addressMessage){
                        this.setState({
                            receiveMessage:addressMessage
                        })
                    }
                }
            }
            model.getBuyItems({}).then(res=>{
                this.setState({
                    orderList:res['order_detailList'],
                    amount:res['order_amount'],
                    totalQuantities:res['order_quantities']
                })
            })
        })
    }
    onPickerChange = (val,type) => {
        let state = this.state;
        state[type] = val;
        this.setState(state);
    };
    payResult = () => {
        let {flag} = this.props.match.params;
        const { receiveMessage } = this.state;
        const {receiverName,receiverPhone,receiverAddress,receiverMail} = receiveMessage;
        model.createOrder({receiverName,receiverPhone,receiverAddress,receiverMail,flag}).then((item)=>{
            let {payAmount,getOrderId} = this.props.methods;
            const { amount} = this.state;
            payAmount(amount);
            getOrderId(item['order_id']);
            history.push('/payview')
        })

    }
    selectAddress = () => {
        history.push('/selectaddresslist');
    }

    render(){
        const { receiveMessage,orderList ,amount, totalQuantities} = this.state;
        const {receiverName,receiverPhone,receiverAddress} = receiveMessage;
        console.log(receiveMessage)
        const discountList = [
            {
                label:
                    (<div>
                        <span className='fontsize-12'>优惠促销</span>
                    </div>),
                value: 'yes',
            },
            {
                label:
                    (<div>
                        <span className='fontsize-12'>不使用优惠</span>
                    </div>),
                value: 'no',
            },
        ];
        const sendWayList = [
            {
                label:
                    (<div>
                        <span className='fontsize-12'>快递 免邮</span>
                    </div>),
                value: '1',
            }
        ];
        const sendTimeList = [
            {
                label:
                    (<div>
                        <span className='fontsize-12'>24:00前付款，预计后天送达</span>
                    </div>),
                value: '1',

            }
        ];
        const insuranceList = [
            {
                label:
                    (<div>
                        <span className='fontsize-12'>买家送，确认收货前退货可赔 </span>
                    </div>),
                value: '1',

            }
        ]
        return (
            <div className='payment-content'>
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    onLeftClick={() => history.go(-1)}
                >确认订单</NavBar>
                <div className='payment-body' style={{height:`calc(${window.innerHeight}px - 90px)`}}>
                    <div className='payment-address' onClick={this.selectAddress}>
                        <div style={{width:'100%',fontSize:14}}>
                            收货人：<span>{receiverName}</span>
                            <span style={{float:'right'}}>{receiverPhone?receiverPhone.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2'):''}</span>
                        </div>
                        <div style={{color:'#666'}}>{receiverAddress}</div>
                    </div>
                    <div className='payment-order'>
                        {
                            orderList.map(item =>{
                               return(
                                   <div>
                                       <div className='shop-message'>{item[0].productBrand}</div>
                                        {
                                            item.map(productItem=>{
                                                return (
                                                    <div className='shop-product-list-item'>
                                                        <div className='pic'>
                                                            <div style={{backgroundImage:`url(${productItem.productPic.split(',')[0]})`,width:'100%',paddingBottom:'100%',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}/>
                                                        </div>
                                                        <div className='message'>
                                                            <div>{productItem.productName} <span style={{float:'right',color:'#4ebb4e'}}>X{productItem.productQuantity}</span></div>
                                                            <div>{productItem.productAttr}</div>
                                                            <div style={{color:'#f7500d'}}>￥{productItem.productPrice}</div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                   </div>
                                )
                            })
                        }

                    </div>
                    <List style={{ backgroundColor: 'white',marginBottom:10 }} className="picker-list">
                        <Picker
                            data={discountList}
                            value={this.state.discountValue}
                            cols={1}
                            onChange={(val)=>this.onPickerChange(val,'discountValue')}
                        >
                            <List.Item arrow="horizontal"><span style={{fontSize:14,color:'#666'}}>店铺优惠</span></List.Item>
                        </Picker>
                        <Picker
                            data={sendWayList}
                            value={this.state.sendWayValue}
                            cols={1}
                            onChange={(val)=>this.onPickerChange(val,'sendWay')}
                        >
                            <List.Item arrow="horizontal"><span style={{fontSize:14,color:'#666'}}>配送方式</span></List.Item>
                        </Picker>
                        <Picker
                            data={sendTimeList}
                            value={this.state.sendTimeValue}
                            cols={1}
                            // onChange={(val)=>this.onPickerChange(val,'sendTime')}
                            extra="请选择(可选)"
                            disabled={true}
                        >
                            <List.Item arrow="horizontal"><span style={{fontSize:14,color:'#666'}}>配送时间</span></List.Item>
                        </Picker>
                        <Picker
                            data={insuranceList}
                            value={this.state.insuranceValue}
                            cols={1}
                            onChange={(val)=>this.onPickerChange(val,'insurance')}
                        >
                            <List.Item arrow="horizontal"><span style={{fontSize:14,color:'#666'}}>运险费</span></List.Item>
                        </Picker>
                        <InputItem
                            clear
                            placeholder='选填：填写内容已与商家协商确认'
                        ><span style={{fontSize:14,color:'#666'}}>买家留言</span></InputItem>
                        <List.Item >
                            <div className='fontsize-14' style={{float:'right'}}>
                                <span style={{marginRight:15}}>共{totalQuantities}件商品</span>
                                小计：<span style={{color:'#bb5126'}}>￥{Number(amount).toFixed(2)}</span>
                            </div>
                        </List.Item>
                    </List>
                </div>
                <div className='payment-bottom'>
                    <p>合计：￥<span style={{color:'#f7500d'}}>{Number(amount).toFixed(2)}</span></p>
                    <p onClick={this.payResult}>提交订单</p>
                </div>
            </div>
        )
    }
}
let mapDispatchToProps = (dispatch)=>{
    return {
        /*传入actionCreator和dispatch，此时无论有多少action全都映射到props.methods中，相当于语法糖*/
        methods: bindActionCreators(payAction, dispatch),
        orderMethods:bindActionCreators(orderAction, dispatch),
    }
}
let Connected = connect(state=>state,mapDispatchToProps)(MainView);

export default Connected;
