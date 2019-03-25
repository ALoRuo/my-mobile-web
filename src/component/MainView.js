import React from "react";
import { TabBar,NavBar,Icon } from 'antd-mobile';
import Tabviews from './TabViews'

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
    }
    render(){

        return(
            <div style={{height:window.innerHeight}} className='mainview'>
                <NavBar
                    style={{position:'fixed',top:0,width:'100%'}}
                    mode="light"
                    // icon={<Icon type="left" />}
                    // onLeftClick={() => console.log('onLeftClick')}
                    // rightContent={[
                    //     <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    //     <Icon key="1" type="ellipsis" />,
                    // ]}

                >商城</NavBar>
                <div className="bottom-tab">
                    <div className='tab-item'><i className='iconfont icon-shouye' style={{fontSize:21}}/><p>首页</p></div>
                    <div className='tab-item'><i className='iconfont icon-fenlei-' style={{fontSize:21}}/><p>分类</p></div>
                    <div className='tab-item'><i className='iconfont icon-gouwuche2' style={{fontSize:21}}/><p>购物车</p></div>
                    <div className='tab-item'><i className='iconfont icon-zelvgongyongyonghuzhongxinz003' style={{fontSize:21}}/><p>用户</p></div>
                </div>
            </div>
        )
    }
}
