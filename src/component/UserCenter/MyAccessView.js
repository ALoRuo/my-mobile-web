/**
 * Created by dell on 2019/4/25.
 */
import React from "react";
import { WhiteSpace, NavBar, Icon, Carousel, ActionSheet, List, Picker } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import 'styles/accessView.scss';
import {connect} from 'react-redux';
import model from 'models/userCenterModel'

class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectTab :0,
            commentList:[],
            dataSource:[]
        };
    }
    componentDidMount(){
        model.getMyCommentList({}).then(res=>{
            this.setState({dataSource:res.commentList})
        })
    }
    render(){
        let {dataSource} = this.state;
        return(<div className='assess-view'>
            <NavBar
                style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                mode="light"
                icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                onLeftClick={() => history.go(-1)}
            >
                我的评价
            </NavBar>
            <div className="assess-content" style={{height:window.innerHeight - 100}}>
                {
                    dataSource.length === 0
                        ?
                        <div style={{height:'100%'}}>
                            <div className="empty-access-list"/>
                            <p style={{color:'#888',textAlign:'center'}}>竟然一条评论都没有~</p>
                        </div>
                        :
                        dataSource.map(item=> <div className="assess-item">
                            <div style={{overflow:'hidden'}}>
                                <div className="customer-info">
                                    <p className="customer-name">{item.userName}</p>
                                    <p className="product-info">{item.createTime}选择：{item.productAttribute}</p>
                                </div>
                            </div>
                            <div className="content">
                                {item.content}
                                <div className="pic-assess">
                                    {
                                        item.picsList.map(item=><div className="pic-item"
                                                                     style={{backgroundImage:`url(${item})`}}
                                        ></div>)
                                    }
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>)
    }
}
let Connected = connect(state=>state)(MainView);

export default Connected;
