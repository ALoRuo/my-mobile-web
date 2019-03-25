import React from "react";
import 'styles/userCenter.scss'
import { List ,WhiteSpace} from 'antd-mobile';
import history from 'utils/HistoryRedirection'
import model from 'models/userCenterModel';

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{},
        }
    }
    componentDidMount(){
        const user = JSON.parse(localStorage.getItem("user"));
        // const tokenId = user?JSON.parse(localStorage.getItem("user")).token:'';
        // const login_token = localStorage.getItem('token')||false;
        // if(!user){
        //     history.push('/login');
        // }
        this.setState({
            user,
        })
    }
    render(){
        let {user} = this.state;
        return(
            <div className="user-content" style={{height:window.innerHeight-95}}>
                <div className="user-header">
                    <div className='user-header-pic'></div>
                    <div className='user-header-name'>
                        {
                            user?(<div><p>{user.userName}</p><p>黄金会员</p></div>):<p>请先登录</p>
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

                    <div className='percent-20'><i className='iconfont icon-dingdan'/><p>我的订单</p></div>
                    <div className='percent-20'><i className='iconfont icon-dingdandaifukuan'/><p>待付款</p></div>
                    <div className='percent-20'><i className='iconfont icon-daishouhuo'/><p>待收货</p></div>
                    <div className='percent-20'><i className='iconfont icon-daipingjia'/><p>待评价</p></div>
                    <div className='percent-20'><i className='iconfont icon-shouhoufuwu'/><p>售后服务</p></div>
                    <div className='percent-25'><i className='iconfont icon-wodeshoucang' style={{color: 'red'}}/><p>我的收藏</p></div>
                    <div className='percent-25'><i className='iconfont icon-shangpin'/><p>商品</p></div>
                    <div className='percent-25'><i className='iconfont icon-zhuanti'/><p>专题</p></div>
                    <div className='percent-25'><i className='iconfont icon-huati'/><p>话题</p></div>
                </div>
                <WhiteSpace size="md" />
                <List style={{ backgroundColor: 'white',marginBottom:10 }} className="picker-list">
                    <List.Item arrow="horizontal"><i className='iconfont icon-zuji'/><span style={{fontSize:14,color:'#333',marginLeft:5}}>我的足迹</span></List.Item>
                    <List.Item arrow="horizontal"><i className='iconfont icon-wodepingjia'/><span style={{fontSize:14,color:'#333',marginLeft:5}}>我的评价</span></List.Item>
                    <List.Item arrow="horizontal"><i className='iconfont icon-dizhi'/><span style={{fontSize:14,color:'#333',marginLeft:5}}>地址管理</span></List.Item>
                </List>
                <List style={{ backgroundColor: 'white',marginBottom:10 }} className="picker-list">
                    <List.Item arrow="horizontal"><i className='iconfont icon-huiyuan'/><span style={{fontSize:14,color:'#333',marginLeft:5}}>我的会员</span></List.Item>
                    <List.Item arrow="horizontal"><i className='iconfont icon-fuwuzhongxin'/><span style={{fontSize:14,color:'#333',marginLeft:5}}>服务中心</span></List.Item>
                    <List.Item arrow="horizontal"><i className='iconfont icon-xitongshezhi'/><span style={{fontSize:14,color:'#333',marginLeft:5}}>退出账号</span></List.Item>
                </List>
            </div>
        )
    }
}
