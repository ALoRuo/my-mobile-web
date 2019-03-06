import React from "react";
import { WhiteSpace, InputItem, Button } from 'antd-mobile';
import 'styles/loginPage.scss'
export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render(){
        return(
            <div className='login-page'>
                <InputItem
                    clear
                    placeholder="用户名"
                >用户名</InputItem>
                <InputItem
                    clear
                    placeholder="登录密码"
                >密码</InputItem>
                <WhiteSpace size="lg" />
                <Button style={{background:'#7cb37c',color:'#fff'}}>登录</Button>
            </div>
        )
    }
}
