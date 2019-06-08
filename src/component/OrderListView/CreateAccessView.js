/**
 * Created by dell on 2019/4/22.
 */
import React from "react";
import { ImagePicker, NavBar, Icon, TextareaItem, Modal, Toast, Button } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import 'styles/accessView.scss';
import model from 'models/orderListViewModel';
import {connect} from 'react-redux';
import orderAction from "store/actions/order-action";
import {bindActionCreators} from 'redux';

const alert = Modal.alert;
class MainView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pics:{},
            multiple:true,
            accessList:[],
            selectStar:{},
        };
    }
    componentDidMount(){
        let {accessList} = this.props.orderMessage;
        let {selectStar} = this.state;
        accessList.map(item=>{
            item.content = '';
            item.pics = '';
            item.star = 1;
            selectStar[item.id] = 1;
        });
        this.setState({accessList,selectStar})
    }
    onChange = (files, type, i,index,item) => {
        let {pics} = this.state;
        pics[item.id] = files;
        let picsString = '';
        files.forEach((item,index)=>{
            if(index !== files.length-1){
                // let index = item.url.indexOf(',');
                // let url = item.url.
                let theIndex = item.url.indexOf(',');
                let url = item.url.substring(theIndex+1);
                picsString+=url+','
            }else{
                let theIndex = item.url.indexOf(',');
                let url = item.url.substring(theIndex+1);
                picsString+=url+''
            }

        })
        this.setState({
            pics,
        },this.setAccess(index,'pics',picsString));
    }
    setStar = (checkIndex,starItem,starType)=>{
        let {selectStar} = this.state;
        this.setAccess(checkIndex,'star',starType);
        selectStar[starItem.id] = starType;
        let star = starItem.id+''+starType;
        this.setState({star,starId:starItem.id,selectStar})
    }
    setAccess = (setIndex,attr,setContent) => {
        let {accessList} = this.state;
        accessList.map((item,index)=>{
            if(index === setIndex){
                return item[attr] = setContent
            }
        });
        this.setState({accessList})
    }
    createAccess = () => {
        let {accessList} = this.state;
        let comments = [];
        accessList.forEach(item=>{
            let commentsItems = {};
            commentsItems.productId = item.productId;
            commentsItems.productAttribute = item.productAttr;
            commentsItems.content = item.content;
            commentsItems.star = item.star;
            commentsItems.pics = item.pics;
            comments.push(commentsItems);
        })
        model.submitAccess({comments}).then(()=>{
            Toast.info('发表成功~',1);
            history.go(-1)
        })
    }
    render(){
        let {pics,multiple,accessList,selectStar} = this.state;
        console.log(accessList);
        return(
            <div className="access-view">
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec',zIndex:100}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    onLeftClick={() => {
                        alert(null, '确认取消发布吗', [
                            { text: '确认取消', onPress: () => history.go(-1) },
                            { text: '继续发布', onPress: () => console.log('确认发布') },
                        ])
                    }}
                    rightContent={[
                       <span style={{color:'#f7500d',fontSize:18}} onClick={this.createAccess}>发布</span>
                    ]}
                >
                    发表评价
                </NavBar>
                <div style={{height:window.innerHeight-45,position:'relative',top:45,background:'#ececec'}}>
                    {
                        accessList.map((item,index)=>{
                            const picsList = pics[item.id]?pics[item.id]:[];
                            return(
                                <div style={{marginBottom:10,borderRadius:10,background:'#fff',margin:'0 10px'}}>
                                    <div style={{overflow:'hidden',padding:'10px',borderBottom:'1px solid #ccc',position:'relative'}}>
                                        <div style={{width:'15%',float:'left'}}>
                                            <div className="product-pic" style={{width:'100%',paddingBottom:'100%',border:'1px solid #ccc',backgroundSize:'contain',backgroundImage:`url(${item.productPic.split(',')[0]})`,backgroundRepeat:'no-repeat'}}/>
                                        </div>
                                        <div style={{
                                            float:'right',
                                            display:'flex',
                                            width:'85%',
                                            position: 'absolute',
                                            top: 0,
                                            right:0,
                                            height: '100%',
                                            alignItems: 'center'
                                        }}>
                                            <div style={{flex:'1 1',textAlign:'center',fontSize:16,color:selectStar[item.id] === 1?'#f7500d':'#888'}}><i className="iconfont icon-good access-icon" onClick={()=>this.setStar(index,item,1)}/>好评</div>
                                            <div style={{flex:'1 1',textAlign:'center',fontSize:16,color:selectStar[item.id] === 2?'#f7500d':'#888'}}><i className="iconfont icon-average access-icon" onClick={()=>this.setStar(index,item,2)}/>中评</div>
                                            <div style={{flex:'1 1',textAlign:'center',fontSize:16,color:selectStar[item.id] === 3?'#f7500d':'#888'}}><i className="iconfont icon-chaping access-icon" onClick={()=>this.setStar(index,item,3)}/>差评</div>
                                        </div>
                                    </div>
                                    <TextareaItem
                                        placeholder="宝贝满足你的期待吗？说说它的优点和美中不足的地方吧"
                                        rows={8}
                                        onChange={value=>this.setAccess(index,'content',value)}
                                    />
                                    <ImagePicker
                                        files={picsList}
                                        onChange={(files, type, i)=>this.onChange(files, type, i,index,item)}
                                        onImageClick={(index, fs) => console.log(index, fs)}
                                        selectable={picsList.length < 9}
                                        multiple={multiple}
                                    />
                                </div>
                            )
                        })
                    }

                </div>

            </div>
        )
    }
}
let Connected = connect(state=>state)(MainView);

export default Connected;