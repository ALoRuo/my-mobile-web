/**
 * Created by dell on 2019/4/29.
 */
import React from "react";
import { WhiteSpace, NavBar, Icon, Toast, ActivityIndicator, List, Picker } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import model from 'models/shopModel';
import 'styles/shopView.scss';
import debounce from 'lodash/debounce';

export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show:false,
            collect:false,
            productList:[],
            getList:false,
        };
        this.pageNum = 1;
    }
    componentDidMount(){
        model.getBrandProducts({pageNum:1,pageSize:8,brandId:this.props.match.params.brandid}).then(res=>{
            this.setState({
                productList:res.pmsProductList,
                totalCount:res.total,
                pageSize:res.pmsProductList.length,
            })
        })
    }
    handleScroll = (e) => {
        e.preventDefault();
        // _.debounce(()=>{
        let clientHeight = this.refs.scrollDiv.clientHeight;
        let scrollTop = this.refs.scrollDiv.scrollTop;
        let scrollHeight = this.refs.scrollDiv.scrollHeight;
        console.log(clientHeight, scrollTop, scrollHeight, scrollHeight - (clientHeight + scrollTop));
        if (scrollHeight - (clientHeight + scrollTop) < 10) {
            let {productList, totalCount,pageSize} = this.state;
            this.pageNum = this.pageNum + 1;
            if (this.pageNum <= Math.ceil(totalCount/pageSize)) {
                this.setState({getList: true});
                model.getBrandProducts({pageNum:this.pageNum,pageSize:8,brandId:this.props.match.params.brandid}).then(res=>{
                    productList = productList.concat(res.pmsProductList);
                    this.setState({
                        productList,
                        getList:false
                    })
                })
            }

        }

    }
    render(){
        let {getList,productList} = this.state;
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
                    所有商品
                </NavBar>
                <div ref="scrollDiv" style={{background:'#fff',height:window.innerHeight-45,position:'relative',top:45,overflow:'auto'}} onScroll={debounce(this.handleScroll,200)}>
                    <div  className="shopproduct-list" >
                        {
                            productList.map(item=>{
                                return (
                                    <div className="shopproduct-item" onClick={()=>history.push(`/productitem/${item.name}/${item.id}`)}>
                                        <div>
                                            <div className="shopproduct-pic" style={{backgroundImage:`url(${item.pic.split(',')[0]})`}}></div>
                                            <p style={{color:'#666',overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap'}}>{item.name}</p>
                                            <p style={{color:'#f7500d'}}>￥{item.price}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <ActivityIndicator animating={getList} text="正在加载..."/>
                    </div>
                </div>

            </div>

        )
    }
}