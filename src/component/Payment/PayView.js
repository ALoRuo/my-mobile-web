import React from "react";
import { Result, Icon, NavBar, List } from 'antd-mobile';
import history from 'utils/HistoryRedirection'

export default class PayView extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    paySuccess = () => {
        history.push('/paysuccess')
    }

    render(){
        return(
            <div className='try-to-pay'>
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    onLeftClick={() => history.go(-1)}
                    rightContent={[
                        <Icon type="cross" size={'lg'} onClick={()=>console.log('用来完成未付款订单')}/>,
                    ]}
                >支付订单</NavBar>
                <div className='pay-view-top'>
                    <i className="iconfont icon-daizhifudingdan" style={{fontSize:60,color:"#7cb37c"}}/>
                    <p>订单提交成功</p>
                    <p>请在24小时内完成支付</p>
                    <p>支付金额：<span style={{color:"#f7500d"}}>￥180.0</span></p>
                </div>
                <div>
                    <List style={{ backgroundColor: 'white',marginBottom:10 }} className="picker-list">
                        <List.Item arrow="horizontal" onClick={this.paySuccess}><span style={{fontSize:14,color:'#333'}}>支付宝支付</span></List.Item>
                        <List.Item arrow="horizontal" onClick={this.paySuccess}><span style={{fontSize:14,color:'#333'}}>微信支付</span></List.Item>
                        <List.Item arrow="horizontal" onClick={this.paySuccess}><span style={{fontSize:14,color:'#333'}}>银联支付</span></List.Item>
                        <List.Item arrow="horizontal" onClick={this.paySuccess}><span style={{fontSize:14,color:'#333'}}>Apple Pay支付</span></List.Item>
                    </List>
                </div>
            </div>
        )
    }
}
