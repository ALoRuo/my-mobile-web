import React from "react";
import axios from "axios";
import { WhiteSpace, InputItem, Button, NavBar, Icon, Modal } from 'antd-mobile';
import 'styles/loginPage.scss'
import model from 'models/loginModel';
import history from 'utils/HistoryRedirection';
import {connect} from 'react-redux';
import userAction from "store/actions/user-action";
import {bindActionCreators} from 'redux';

const alert = Modal.alert;
class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            passWord:'',
        };
    }
    login = () => {
        let {userName,passWord} = this.state;
        let {login} = this.props.methods;
        model.login({
            user_name: userName,
            pass_word: passWord
        }).then(res=>{
           // window.commInfo.loginSuccess = true;
           window.commInfo.userName = res.userName;
           window.commInfo.token = res.token;
           let token = res.userId+"_"+res.token;
           localStorage.setItem('token',token);
           localStorage.setItem('user',JSON.stringify(res));
           login(res);
            // axios.defaults.headers.common['token'] = `${res.userId}_${res.token}`;
           // window.commInfo.token=`${res.userId}_${res.token}`
           history.push('/home')
        },error=>{
            alert('',<span>{error.errMsge}</span>, [
                { text: '确认', onPress: () => this.setState({userName:'',passWord:''}) },
                { text: '取消', onPress: () => this.setState({userName:'',passWord:''}) },
            ])
        })
    }
    handelRegisters = () =>{
        history.push('/register')
    }
    render(){
        let {userName,passWord} = this.state;
        return(
            <div className='login-page'>
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    // rightContent={[
                    //     <i className='iconfont icon-gengduo1' style={{color:'#7cb37c',cursor:'pointer'}} onClick={this.handelRegister}/>
                    // ]}
                    onLeftClick={() => history.go(-1)}
                >
                    用户登录
                </NavBar>
                <div style={{marginTop:45}}>
                    <div style={{textAlign:'center',padding:'30px 0'}}>
                        <i className='iconfont icon-mall' style={{color:'#efb45a',fontSize:60}}/>
                    </div>

                    <InputItem
                        clear
                        placeholder="用户名"
                        value={userName}
                        onChange={value=>this.setState({userName:value})}
                    >用户名</InputItem>
                    <InputItem
                        clear
                        placeholder="登录密码"
                        value={passWord}
                        onChange={value=>this.setState({passWord:value})}
                    >密码</InputItem>
                </div>

                <WhiteSpace size="lg" />
                <Button style={{background:'#7cb37c',color:'#fff'}} onClick={this.login}>登录</Button>
                <div style={{textAlign:'center',textDecoration:'underline',color:'#8ca98c',marginTop:10}} onClick={this.handelRegisters}>立即注册</div>
            </div>
        )
    }
}
let mapDispatchToProps = (dispatch)=>{
    return {
        /*传入actionCreator和dispatch，此时无论有多少action全都映射到props.methods中，相当于语法糖*/
        methods: bindActionCreators(userAction, dispatch)
    }
}
let Connected = connect(state=>state,mapDispatchToProps)(MainView);
export default Connected
