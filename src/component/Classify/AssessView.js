import React from "react";
import { WhiteSpace, NavBar, Icon, Carousel, ActionSheet, List, Picker } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import 'styles/classify.scss'
let data = [];
for(let i =0 ;i <10;i++){
    let obj = {
        name:'李婷',
        sendTime:'2019-03-02',
        size:'S',
        color:'蓝色',
        content:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或',
        picList:[
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552217211209&di=9f76e7785db1fd0b7d72c040eb7765d3&imgtype=0&src=http%3A%2F%2Fimgcdn.kdnet.net%2FUpload%2F2015%2F08%2F30%2F14408956798029614.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552217211209&di=9f76e7785db1fd0b7d72c040eb7765d3&imgtype=0&src=http%3A%2F%2Fimgcdn.kdnet.net%2FUpload%2F2015%2F08%2F30%2F14408956798029614.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552217211209&di=9f76e7785db1fd0b7d72c040eb7765d3&imgtype=0&src=http%3A%2F%2Fimgcdn.kdnet.net%2FUpload%2F2015%2F08%2F30%2F14408956798029614.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552217211209&di=9f76e7785db1fd0b7d72c040eb7765d3&imgtype=0&src=http%3A%2F%2Fimgcdn.kdnet.net%2FUpload%2F2015%2F08%2F30%2F14408956798029614.jpg',
        ]
    };
    data.push(obj);
}
export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectTab :'all'
        };
    }
    componentDidMount(){
        console.log(this.props)
    }
    handleChange = (value)=>{
        this.setState({selectTab:value})
    }
    render(){
        console.log(this.props)
        let {selectTab} = this.state;
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
                <div className={selectTab === 'all'?'active':''} onClick={()=>this.handleChange('all')}>全部(100)</div>
                <div className={selectTab === 'good'?'active':''} onClick={()=>this.handleChange('good')}>好评(90)</div>
                <div className={selectTab === 'bad'?'active':''} onClick={()=>this.handleChange('bad')}>差评(0)</div>
                <div className={selectTab === 'well'?'active':''} onClick={()=>this.handleChange('well')}>中评 (10)</div>
                <div className={selectTab === 'hasPic'?'active':''} onClick={()=>this.handleChange('hasPic')}>有图(50)</div>
            </div>
            <div className="assess-content" style={{height:window.innerHeight - 100}}>
                {
                    data.map(item=> <div className="assess-item">
                        <div style={{overflow:'hidden'}}>
                            <div className="customer-pic"></div>
                            <div className="customer-info">
                                <p className="customer-name">{item.name}</p>
                                <p className="product-info">{item.sendTime}尺寸：{item.size}颜色分类{item.color}</p>
                            </div>
                        </div>
                        <div className="content">
                            {item.content}
                            <div className="pic-assess">
                                {
                                    item.picList.map(item=><div className="pic-item"
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
