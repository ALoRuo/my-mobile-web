import React from "react";
import 'styles/userCenter.scss'
import { Icon } from 'antd-mobile';
import history from 'utils/HistoryRedirection'
export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // loginSuccess:false
        }
    }
    componentDidMount(){
        if(!test.loginSuccess){
            history.push('/login')
        }
    }
    render(){
        // let {loginSuccess} = this.state;
        return(
            <div className="user-content">
                <div className="user-header">
                    <div className='user-header-pic'></div>
                    <div className='user-header-name'>
                        {
                            test.loginSuccess?(<div><p>Winder</p><p>黄金会员</p></div>):<p>请先登录</p>
                        }
                    </div>
                </div>
                <div style={{display:"flex",padding: '8px 0',borderBottom: '1px solid #ccc',background:'#fff'}}>
                    <div style={{flex:1}} >
                        <p className="small-p">积分</p>
                        <p className="green-number">100</p>
                    </div>
                    <div style={{flex:1}}>
                        <p className="small-p">优惠券</p>
                        <p className="green-number">100</p>
                    </div>
                    <div style={{flex:1}}>
                        <p className="small-p">关注</p>
                        <p className="green-number">100</p>
                    </div>
                </div>
                <div className='user-shopping'>
                    <div className='percent-20'>我的订单</div>
                    <div className='percent-20'>待付款</div>
                    <div className='percent-20'>待收货</div>
                    <div className='percent-20'>待评价</div>
                    <div className='percent-20'>售后服务</div>
                    <div className='percent-25'>我的收藏</div>
                    <div className='percent-25'>商品</div>
                    <div className='percent-25'>专题</div>
                    <div className='percent-25'>话题</div>
                </div>
                <div className='user-message'>
                    <p>我的足迹 </p>
                    <p>我的评价 </p>
                    <p>地址管理 </p>
                </div>
                <div className='user-setting'>
                    <p>我的会员 </p>
                    <p>服务中心 </p>
                    <p>系统设置 </p>
                </div>
            </div>
        )
    }
}
