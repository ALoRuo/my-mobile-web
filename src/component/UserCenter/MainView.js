import React from "react";
import 'styles/userCenter.scss'
import { List ,WhiteSpace} from 'antd-mobile';
import history from 'utils/HistoryRedirection'
import model from 'models/userCenterModel';

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // loginSuccess:false
        }
    }
    componentDidMount(){
        if(!window.commInfo.loginSuccess){
            history.push('/login')
        }
        // console.log(test)
    }
    render(){
        // let {loginSuccess} = this.state;
        return(
            <div className="user-content">
                <div className="user-header">
                    <div className='user-header-pic'></div>
                    <div className='user-header-name'>
                        {
                            window.commInfo.loginSuccess?(<div><p>{window.commInfo.userName}</p><p>黄金会员</p></div>):<p>请先登录</p>
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
                <WhiteSpace size="md" />
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
                <WhiteSpace size="md" />
                <List style={{ backgroundColor: 'white',marginBottom:10 }} className="picker-list">
                    <List.Item arrow="horizontal"><span style={{fontSize:14,color:'#333'}}>我的足迹</span></List.Item>
                    <List.Item arrow="horizontal"><span style={{fontSize:14,color:'#333'}}>我的评价</span></List.Item>
                    <List.Item arrow="horizontal"><span style={{fontSize:14,color:'#333'}}>地址管理</span></List.Item>
                </List>
                <List style={{ backgroundColor: 'white',marginBottom:10 }} className="picker-list">
                    <List.Item arrow="horizontal"><span style={{fontSize:14,color:'#333'}}>我的会员</span></List.Item>
                    <List.Item arrow="horizontal"><span style={{fontSize:14,color:'#333'}}>服务中心</span></List.Item>
                    <List.Item arrow="horizontal"><span style={{fontSize:14,color:'#333'}}>系统设置</span></List.Item>
                </List>
            </div>
        )
    }
}
