import React from "react";
import { WhiteSpace, NavBar, Icon, Carousel, ActionSheet, List, Picker } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import 'styles/accessView.scss';
import {connect} from 'react-redux';
import model from 'models/classifyModel'
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
        let {commentList,picscount,star1count,star2count,star3count} = this.props.productMessage;
        this.setState({commentList,dataSource:commentList,allcount:commentList.length,picscount,star1count,star2count,star3count})
    }
    handleChange = (value)=>{
        this.setState({selectTab:value});
        let {commentList} = this.state;
        if(value === 0){
            this.setState({dataSource:commentList})
        }else if(value === 4){
            model.getCommentsByPic({productId:this.props.match.params.id}).then(res=>{
                this.setState({dataSource:res.commentList})
            })
        }else{
            model.getCommentsByStar({productId:this.props.match.params.id,star:value}).then(res=>{
                this.setState({dataSource:res.commentList})
            })
        }

    }
    render(){
        let {selectTab,dataSource,picscount,star1count,star2count,star3count,allcount} = this.state;
        console.log(dataSource,this.props)
        return(<div className='assess-view'>
            <NavBar
                style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                mode="light"
                icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                onLeftClick={() => history.go(-1)}
            >
                宝贝评价
            </NavBar>
            <div className="select-bar">
                <div className={selectTab === 0?'active':''} onClick={()=>this.handleChange(0)}>全部({allcount})</div>
                <div className={selectTab === 1?'active':''} onClick={()=>this.handleChange(1)}>好评({star1count})</div>
                <div className={selectTab === 2?'active':''} onClick={()=>this.handleChange(2)}>中评({star2count})</div>
                <div className={selectTab === 3?'active':''} onClick={()=>this.handleChange(3)}>差评 ({star3count})</div>
                <div className={selectTab === 4?'active':''} onClick={()=>this.handleChange(4)}>有图({picscount})</div>
            </div>
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
                                <p className="product-info">{new Date(item.createTime).toLocaleDateString()}选择：{item.productAttribute}</p>
                            </div>
                        </div>
                        <div className="content">
                            {item.content?item.content:item.star === 1?"系统默认好评":item.star === 2?'中评':'差评'}
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
                {/*<div className="assess-item">*/}
                    {/*<div style={{overflow:'hidden'}}>*/}
                        {/*<div className="customer-pic"></div>*/}
                        {/*<div className="customer-info">*/}
                            {/*<p className="customer-name">李婷</p>*/}
                            {/*<p className="product-info">2019-03-02尺寸：S颜色分类蓝色</p>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="content">*/}
                        {/*哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈*/}
                        {/*<div className="pic-assess">*/}
                            {/*<div className="pic-item"*/}
                                {/*style={{backgroundImage:'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552217211209&di=9f76e7785db1fd0b7d72c040eb7765d3&imgtype=0&src=http%3A%2F%2Fimgcdn.kdnet.net%2FUpload%2F2015%2F08%2F30%2F14408956798029614.jpg)'}}*/}
                            {/*></div>*/}
                            {/*<div className="pic-item"*/}
                                 {/*style={{backgroundImage:'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552217211209&di=9f76e7785db1fd0b7d72c040eb7765d3&imgtype=0&src=http%3A%2F%2Fimgcdn.kdnet.net%2FUpload%2F2015%2F08%2F30%2F14408956798029614.jpg)'}}*/}
                            {/*></div>*/}
                            {/*<div className="pic-item"*/}
                                 {/*style={{backgroundImage:'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552217211209&di=9f76e7785db1fd0b7d72c040eb7765d3&imgtype=0&src=http%3A%2F%2Fimgcdn.kdnet.net%2FUpload%2F2015%2F08%2F30%2F14408956798029614.jpg)'}}*/}
                            {/*></div>*/}
                            {/*<div className="pic-item"*/}
                                 {/*style={{backgroundImage:'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552217211209&di=9f76e7785db1fd0b7d72c040eb7765d3&imgtype=0&src=http%3A%2F%2Fimgcdn.kdnet.net%2FUpload%2F2015%2F08%2F30%2F14408956798029614.jpg)'}}*/}
                            {/*></div>*/}
                            {/*<div className="pic-item"*/}
                                 {/*style={{backgroundImage:'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552217211209&di=9f76e7785db1fd0b7d72c040eb7765d3&imgtype=0&src=http%3A%2F%2Fimgcdn.kdnet.net%2FUpload%2F2015%2F08%2F30%2F14408956798029614.jpg)'}}*/}
                            {/*></div>*/}
                            {/*<div className="pic-item"*/}
                                 {/*style={{backgroundImage:'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552217211209&di=9f76e7785db1fd0b7d72c040eb7765d3&imgtype=0&src=http%3A%2F%2Fimgcdn.kdnet.net%2FUpload%2F2015%2F08%2F30%2F14408956798029614.jpg)'}}*/}
                            {/*></div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        </div>)
    }
}
let Connected = connect(state=>state)(MainView);

export default Connected;
