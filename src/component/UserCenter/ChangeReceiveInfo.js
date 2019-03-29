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
            checked:false,
            receiverAddress:'',
            isDefault:0,
            receiverMail:'',
            receiverName:'',
            receiverPhone:''

        }
    }
    componentDidMount(){
        let id = this.props.match.params.id;
        model.getOneReceiveInfo({id}).then(res=>{
            let {receiverAddress, isDefault, receiverMail, receiverName, receiverPhone} = res;
            this.setState({receiverAddress, isDefault, receiverMail, receiverName, receiverPhone})
        })
    }
    updateReceiveInfo = () => {
        let {receiverName,receiverPhone,receiverMail,receiverAddress,isDefault} = this.state;
        let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        let emptyList = ['',undefined,null];
        if(emptyList.includes(receiverName) || emptyList.includes(receiverPhone) || emptyList.includes(receiverMail) || emptyList.includes(receiverAddress)){
            Toast.info('您还没有填写收货信息哦~',1);
        }else if(reg.test(receiverMail)){
            model.updateReceiveInfo({id:parseInt(this.props.match.params.id),param:[{receiverName,receiverPhone,receiverMail,receiverAddress,isDefault:isDefault?1:0}]}).then(res=>{
                history.go(-1);
            },()=>{
                Toast.info('更新失败，请稍后再试哦~',1)
            })
        }else {
            Toast.info('请填写正确的邮箱哦~',1);
        }

    }
    render(){
        let {checked,receiverAddress, isDefault, receiverMail, receiverName, receiverPhone} = this.state;
        // checked = isDefault ? true : false;
        return(
            <div className='add-address-view'>
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    rightContent={[
                        <span style={{color:'#f7500d'}} onClick={this.updateReceiveInfo}>修改</span>
                    ]}
                    onLeftClick={() => history.go(-1)}
                >
                    修改收货信息
                </NavBar>
                <div className='content-body add-address-view'>
                    <InputItem
                        clear
                        className='input-12'
                        value={receiverName}
                        onChange={val=>this.setState({receiverName:val})}
                    >姓名</InputItem>
                    <InputItem
                        clear
                        className='input-12'
                        maxLength={11}
                        value={receiverPhone}
                        onChange={val=>this.setState({receiverPhone:val})}
                        // placeholder="auto focus"
                        // ref={el => this.autoFocusInst = el}
                    >手机号码</InputItem>
                    <InputItem
                        clear
                        className='input-12'
                        value={receiverMail}
                        onChange={val=>this.setState({receiverMail:val})}
                        // placeholder="auto focus"
                        // ref={el => this.autoFocusInst = el}
                    >邮箱</InputItem>
                    <InputItem
                        clear
                        className='input-12'
                        value={receiverAddress}
                        onChange={val=>this.setState({receiverAddress:val})}
                        // placeholder="auto focus"
                        // ref={el => this.autoFocusInst = el}
                    >详细地址</InputItem>
                    <div style={{    color: '#666',paddingLeft: 15}}>
                        <i className='iconfont icon-gouxuanquanx' style={{fontSize:18,marginRight:4,color:isDefault?'#23e423':'#ccc'}} onClick={()=>this.setState({isDefault:!isDefault})}/>设为默认收货地址
                    </div>
                </div>

            </div>
        )
    }
}
