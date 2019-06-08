import React from "react";
import { NavBar, Icon, Modal } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import 'styles/addressView.scss';
import model from 'models/userCenterModel';
import {connect} from 'react-redux';
import orderAction from "store/actions/order-action";
import {bindActionCreators} from 'redux';

const alert = Modal.alert;
class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource:[]
        }
    }
    componentDidMount(){
        this.initList();
    }
    initList = () => {
        model.getAllReceiveInfo({}).then(res=>{
            this.setState({dataSource:res.receiverList})
        })
    }

    handleDelete = (id) => {
        alert(null, '是否删除该条收货信息', [
            { text: <span style={{fontSize:14}}>取消</span>, onPress: () => console.log('cancel') },
            { text: <span style={{fontSize:14,color:'#f7500d'}}>删除</span>, onPress: () => {
                model.deleteReceiveInfo({id}).then(()=>{
                    this.initList();
                })
            } },
        ])

    }
    setDefault = (item) => {
        let {receiverAddress,isDefault, receiverMail, receiverName, receiverPhone} = item;
        model.updateReceiveInfo({id:item.id,param:[{receiverAddress, receiverMail, receiverName, receiverPhone,isDefault:isDefault?0:1}]}).then(()=>{
            this.initList();
        })
    }
    setAddress = (item) => {
       let {setAddress} = this.props.methods;
        setAddress(item);
        history.go(-1);
    }

    render(){
        let { dataSource } = this.state;
        return(
            <div className='address-view'>
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    onLeftClick={() => history.go(-1)}
                >
                    收货地址
                </NavBar>
                <div className='address-list' style={{height:window.innerHeight-45}}>
                    {
                        dataSource.length === 0 ?
                            <div style={{textAlign:'center',marginTop:'40%'}}>
                                <i className='iconfont icon-qingkong' style={{color:'#f35c12',fontSize:60}}/>
                                <p style={{fontSize:12,color:'#ec9f5b',margin:'4px 0'}}>您还没有设置收货信息哦~</p>
                                <p style={{fontSize:12,color:'#ec9f5b'}}>请点击新增收货信息去填写~</p>
                            </div>
                            :
                            dataSource.map(item=><div className='address-list-item' onClick={()=>this.setAddress(item)}>
                                    <div className="name-phone">
                                        <span>{item.receiverName}</span>
                                        <span style={{float: 'right',
                                            marginRight: '45px'}}>{item.receiverPhone.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')}</span>
                                    </div>
                                    <div className="detail-address">
                                        收货地址：{item.receiverAddress}
                                    </div>
                                    <div className='edit-area'>
                                        <div style={{float:'left'}}>
                                            <i className='iconfont icon-gouxuanquanx' style={{marginRight:4,color:item.isDefault?'#23e423':'#ccc'}} onClick={()=>this.setDefault(item)}/>设为默认
                                        </div>
                                        <div style={{float:'right'}} onClick={()=>history.push(`/changereceiveinfo/${item.id}`)}>
                                            <i className='iconfont  icon-iconfontedit' style={{marginRight:4}}/>编辑
                                        </div>
                                        <div style={{float:'right',marginRight:10}} onClick={()=>this.handleDelete(item.id)}>
                                            <i className='iconfont icon-lajitong' style={{marginRight:4}}/>删除
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                    <div style={{position:'fixed',bottom:0,width: '100%', padding: '10px 0', borderTop: '1px solid #ccc', boxShadow: '0 -2px 6px #ccc'}}>
                        <div className='add-address-btn'  onClick={()=>history.push('/addtoaddress')}><i className='iconfont icon-jia1'/>新增收货信息</div>
                    </div>
                </div>

            </div>
        )
    }
}
let mapDispatchToProps = (dispatch)=>{
    return {
        /*传入actionCreator和dispatch，此时无论有多少action全都映射到props.methods中，相当于语法糖*/
        methods: bindActionCreators(orderAction, dispatch)
    }
}
let Connected = connect(state=>state,mapDispatchToProps)(MainView);

export default Connected;
