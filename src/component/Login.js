import React from "react";
import { WhiteSpace, InputItem, Button, NavBar, Icon, Toast } from 'antd-mobile';
import 'styles/loginPage.scss'
import model from 'models/loginModel';
import history from 'utils/HistoryRedirection'

export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            passWord:'',
        };
    }
    login = () => {
        let {userName,passWord} = this.state;
        model.login({
            user_name: userName,
            pass_word: passWord
        }).then(res=>{
           console.log(res)
        },error=>{
            Toast.info(<span style={{color:"#fff"}}>{error.errMsge}</span>, 1);
            window.location.reload()
        })
    }
    render(){
        console.log(window.test1)
        return(
            <div className='login-page'>
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    onLeftClick={() => history.go(-1)}
                >
                    我的订单
                </NavBar>
                <InputItem
                    clear
                    placeholder="用户名"
                    onBlur={value=>this.setState({userName:value})}
                >用户名</InputItem>
                <InputItem
                    clear
                    placeholder="登录密码"
                    onBlur={value=>this.setState({passWord:value})}
                >密码</InputItem>
                <WhiteSpace size="lg" />
                <Button style={{background:'#7cb37c',color:'#fff'}} onClick={this.login}>登录</Button>
            </div>
        )
    }
}
