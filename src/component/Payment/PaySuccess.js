import React from "react";
import { Result, Icon, NavBar, Button } from 'antd-mobile';
import history from 'utils/HistoryRedirection'

export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render(){
        const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

        return (
            <div className='pay-result' style={{height:window.innerHeight}}>
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    onLeftClick={() => history.push('/home')}
                >支付成功</NavBar>
                <div className="result-example">
                    <Result
                        img={myImg('https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg')}
                        title="支付成功"
                    />
                    <Button inline style={{ margin: '15px' }} size="small" className='pay-result-button' onClick={()=>history.push('/orderlist')}>查看订单</Button>
                    <Button inline size="small" className='pay-result-button' onClick={()=>history.push('/')}>回到首页</Button>
                </div>
            </div>
        )
    }
}
