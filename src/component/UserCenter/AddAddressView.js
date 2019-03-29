import React from "react";
import { NavBar, Icon, InputItem, Checkbox,Toast} from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import 'styles/addressView.scss';
import model from 'models/userCenterModel'

const AgreeItem = Checkbox.AgreeItem;
export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checked:false
        }
    }
    saveMessage = () => {
        let {ReceiverName,receiverPhone,receiverMail,receiverAddress,checked} = this.state;
        let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        let emptyList = ['',undefined,null];
        if(emptyList.includes(ReceiverName) || emptyList.includes(receiverPhone) || emptyList.includes(receiverMail) || emptyList.includes(receiverAddress)){
            Toast.info('您还没有填写收货信息哦~',1);
        }else if(reg.test(receiverMail)){
            model.updateMessage({param:[{ReceiverName,receiverPhone,receiverMail,receiverAddress,isDefault:checked?1:0}]}).then(res=>{
                if(res['state_info'] === '更新成功'){
                    history.go(-1);
                }else {
                    Toast.info('更新失败，请稍后再试哦~',1)
                }
            })
        }else {
            Toast.info('请填写正确的邮箱哦~',1);
        }

    }
    render(){
        let {checked} = this.state;
        return(
            <div className='add-address-view'>
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    rightContent={[
                        <span style={{color:'#7cb37c'}} onClick={this.saveMessage}>保存</span>
                    ]}
                    onLeftClick={() => history.go(-1)}
                >
                    新增地址
                </NavBar>
                <div className='content-body add-address-view'>
                    <InputItem
                        clear
                        className='input-12'
                        onChange={val=>this.setState({ReceiverName:val})}
                    >姓名</InputItem>
                    <InputItem
                        clear
                        className='input-12'
                        maxLength={11}
                        onChange={val=>this.setState({receiverPhone:val})}
                        // placeholder="auto focus"
                        // ref={el => this.autoFocusInst = el}
                    >手机号码</InputItem>
                    <InputItem
                        clear
                        className='input-12'
                        onChange={val=>this.setState({receiverMail:val})}
                        // placeholder="auto focus"
                        // ref={el => this.autoFocusInst = el}
                    >邮箱</InputItem>
                    <InputItem
                        clear
                        className='input-12'
                        onChange={val=>this.setState({receiverAddress:val})}
                        // placeholder="auto focus"
                        // ref={el => this.autoFocusInst = el}
                    >详细地址</InputItem>
                    <div style={{    color: '#666',paddingLeft: 15}}>
                        <i className='iconfont icon-gouxuanquanx' style={{fontSize:18,marginRight:4,color:checked?'#23e423':'#ccc'}} onClick={()=>this.setState({checked:!checked})}/>设为默认收货地址
                    </div>
                </div>

            </div>
        )
    }
}
