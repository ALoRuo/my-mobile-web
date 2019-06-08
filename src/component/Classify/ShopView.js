/**
 * Created by dell on 2019/4/26.
 */
import React from "react";
import { WhiteSpace, NavBar, Icon, Toast, ActionSheet, List, Picker } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import model from 'models/shopModel';
import 'styles/shopView.scss';

export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show:false,
            collect:false,
            productList:[]
        };
    }
    componentDidMount(){
        this.init();
        model.getBrandProducts({pageNum:1,pageSize:6,brandId:this.props.match.params.brandid}).then(res=>{
            this.setState({
                productList:res.pmsProductList
            })
        })
    }
    init = () =>{
        model.getShopMessage(this.props.match.params.brandid).then(res=>{
            model.getCollectShopList({}).then(shopList=>{
                let isCollect = shopList.some(item=>item.id+'' === this.props.match.params.brandid)
                this.setState({collect:isCollect,...res})
            })
            // this.setState({...res})
        })
    }
    createCollect = () => {
        let {collect} = this.state;
        if(!collect){
            model.collectShop({brandId:this.props.match.params.brandid}).then(()=>{
                Toast.info('关注成功',1);
                this.init();
            })
        }else {
            model.cancelCollectShop({brandId:this.props.match.params.brandid}).then(()=>{
                Toast.info('已取消关注',1);
                this.init();
            })
        }


    }
    render(){
        let {show,address,brandStory,logo,name,productCount,sort,collect,productList} = this.state;
        console.log(collect)
        // brandId: "1"
        // id: 4
        // userId: 1552220218311926000
        return(
            <div className="shop-view">
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec',zIndex:2}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    rightContent={[
                        <i className='iconfont  icon-gouwuche2' style={{fontSize:22,color: '#f79066'}} onClick={()=>history.push('/shoppingCart')}/>
                    ]}
                    onLeftClick={() => history.go(-1)}
                >
                    店铺信息
                </NavBar>
                <div className="shop-content" style={{height:window.innerHeight-45,position:'relative',top:45}}>
                    <div className="shop-header">
                        <div className="shop-pic">
                            <div style={{width:'80%',paddingBottom:'80%',backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundImage:`url(${logo})`,borderRadius:'50%',margin:'0 auto',boxShadow: '1px 1px 2px 3px #d2cdcd'}}/>
                        </div>
                        <div className="shop-name">
                            <p>{name}</p>
                            <p><i className="iconfont icon-tubiao-" style={{fontSize:19}}/><span style={{marginRight:10}}>{address}</span><i className="iconfont icon-shoucang-copy" style={{color:collect?'red':'#666'}}/><span>{sort}</span></p>
                        </div>
                        <div className="shop-collect"  >
                            <p onClick={this.createCollect}>{collect?'已关注':'关注'}</p>
                        </div>
                    </div>
                    <div className="shop-introduction">
                        <div className={show?'introduction-content':'introduction-content text-ellipsis-3'}>
                            {brandStory}
                        </div>
                        <i className="iconfont icon-down-trangle" style={{fontSize:30}} onClick={()=>this.setState({show:!show})}/>
                    </div>
                    <WhiteSpace size="sm" />
                    <div onClick={()=>history.push(`/shopproductlist/${this.props.match.params.brandid}`)} style={{background: '#fff',padding:'14px 7px',color:'#666'}}>相关商品 {productCount}</div>
                    <WhiteSpace size="sm" />
                    <div className="shop-product-list">
                        {
                            productList.map(item=>{
                                return (
                                    <div className="shop-product-item" onClick={()=>history.push(`/productitem/${item.name}/${item.id}`)}>
                                        <div>
                                            <div className="product-pic" style={{backgroundImage:`url(${item.pic.split(',')[0]})`}}></div>
                                            <p style={{color:'#666',overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap'}}>{item.name}</p>
                                            <p style={{color:'#f7500d'}}>￥{item.price}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}