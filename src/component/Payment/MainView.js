import React from "react";
import { NavBar, Icon, Picker, List, InputItem, Modal } from 'antd-mobile';
import 'styles/payment.scss';
import history from 'utils/HistoryRedirection';
import model from 'models/paymentModel';

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
export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            discountValue:['yes'],
            sendWayValue: ['1'],
            sendTimeValue:['1'],
            insuranceValue:['1']
        }
    }
    componentDidMount(){
        model.getAllReceiveInfo({}).then(res=>{
            res.receiverList = [];
            if(res.receiverList.length === 0){
                alert(null, <div style={{padding:'0 35px'}}>您还没有收货信息，是否先填写收货信息保存</div>, [
                    { text: <span style={{fontSize:14}}>取消</span>, onPress: () => console.log('cancel') },
                    { text: <span style={{fontSize:14,color:'#f7500d'}}>去填写</span>, onPress: () => history.push('/addtoaddress') },
                ])
            }else {

            }
        })
    }
    onPickerChange = (val,type) => {
        let state = this.state;
        state[type] = val;
        this.setState(state);
    };
    payResult = () => {
        history.push('/payview')
    }

    render(){
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
                        <span className='fontsize-12'>24:00前付款，预计3月6日（后天）送达</span>
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
                    <div className='payment-address'>
                        <div style={{width:'100%',fontSize:14}}>
                            收货人：<span>大丽</span>
                            <span style={{float:'right'}}>18078786862</span>
                        </div>
                        <div style={{color:'#666'}}>广东省深圳市南山区科兴科学园</div>
                    </div>
                    <div className='payment-order'>
                        <div className='shop-message'>{data.shopName}</div>
                        {data.productList.map(item =>{
                            return (
                                <div className='shop-product-list-item'>
                                    <div className='pic'>pic</div>
                                    <div className='message'>
                                        <div>{item.productName} <span style={{float:'right',color:'#4ebb4e'}}>X{item.count}</span></div>
                                        <div>{item.selectMessage}</div>
                                        <div>￥{item.price}</div>
                                    </div>
                                </div>
                            )
                        })}

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
                                <span style={{marginRight:15}}>共1件商品</span>
                                小计：<span style={{color:'#bb5126'}}>￥36.00</span>
                            </div>
                        </List.Item>
                    </List>
                </div>
                <div className='payment-bottom'>
                    <p>合计：￥36.0</p>
                    <p onClick={this.payResult}>提交订单</p>
                </div>
            </div>
        )
    }
}
