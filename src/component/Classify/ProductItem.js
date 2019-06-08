import React from "react";
import { WhiteSpace, NavBar, Icon, Carousel, ActionSheet, List, Stepper, Toast } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import 'styles/classify.scss';
import model from 'models/classifyModel';
import carModel from 'models/shoppingCartModel';
import productAction from "store/actions/product-action";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}
class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab:'product',
            imgHeight: 200,
            show:false,
            productCount:1,
            isBuy:0,//如果点击加入购物车就是0，点击购买就是1
            scroll:true,
            dataSource:{
                ppa:{
                    inputArrayList:[]
                },
                pmsProductAttributeList:[],
                picList:[],
                pic:''
            },
            selectAttr:{},
            accessCount:0,
        };
    }
    componentDidMount(){
        //由于路由根据url生成组件，所以每次进来都是重新生成就会进入componentDidMount
        model.getProductDetail({id:this.props.match.params.id}).then(res=>{
            model.getCommentsByProductId({productId:this.props.match.params.id}).then(res=>{
                let {saveComments} = this.props.methods;
                saveComments(res);
                this.setState({accessCount:res.commentList.length})
            });
            this.setState({
                dataSource:res
            })
        });
    }

    //点击加入购物车
    addShoppingCart = () => {
        let {show} = this.state;
        this.setState({show:!show,isBuy:0})
    }
    goToPayProduct = () => {
        let {show} = this.state;
        this.setState({show:!show,isBuy:1});

    }
    //确认加入购物车
    addToShoppingCar = () => {
        let {dataSource,productCount,isBuy,selectAttr} = this.state;
        let productAttr = '';
        dataSource.pmsProductAttributeList.forEach((item,index)=>{
            if(index !== dataSource.pmsProductAttributeList.length - 1){
                productAttr += selectAttr[item.attname]+',';
            }else {
                productAttr += selectAttr[item.attname];
            }

        })
        if(isBuy){
            model.saveOrderMessage({
                item:[
                    {
                        productId:dataSource.id,
                        productQuantity:productCount,
                        productAttr
                    }
                ]
            }).then(()=>{
                this.setState({show:false});
                history.push('/payment/0')
            })
        }else {
            carModel.addShoppingCart({
                "product_id":dataSource.id,
                "product_num":productCount,
                "product_sort":productAttr
            }).then(res=>{
                Toast.info('已加入购物车哦~',0.5);
                this.setState({show:false})
            })
        }

    }
    changeClassName = (type,value) => {
        // let selectValue = this.state[type];
        let {selectAttr} = this.state;
        if(selectAttr[type] !== value){
            return 'add-shopping-select-item'
        }else {
            return 'add-shopping-select-item selected'
        }
    }
    handleSelectToAddCar = (type,value) => {
        // console.log(value);
        // let state = this.state;
        // state[type] = value;
        // this.setState(state,()=>{
        //     console.log(this.state)
        // })
        let {selectAttr} = this.state;
        selectAttr[type] = value;
        this.setState({selectAttr})
    }
    /*
     定义锚点直接跳转
     * */
    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if (anchorElement) {
                anchorElement.scrollIntoView();
                this.setState({scroll:true})
            }
        }
    }

    // offset = (obj) => {
    //     //将top,left首字母大写,并拼接成offsetTop,offsetLeft
    //     let offsetDir = 'offset' + direction[0].toUpperCase() + direction.substring(1);
    //
    //     let realNum = obj[offsetDir];
    //     let positionParent = obj.offsetParent;  //获取上一级定位元素对象
    //
    //     while (positionParent !== null) {
    //         realNum += positionParent[offsetDir];
    //         positionParent = positionParent.offsetParent;
    //     }
    //     return realNum;
    // }
    handleSelect = (value) => {
        this.setState({
            selectedTab:value
        });
        if(value === 'detail'){
            this.setState({scroll:false},this.scrollToAnchor('productIntroduce'))

        }else if(value === 'assess'){
            this.setState({scroll:false},this.scrollToAnchor('assessPart'))
            // this.scrollToAnchor('assessPart');
        }else {
            this.scrollToAnchor('productTop');
        }
    }
    handleScroll = (e) => {
        // console.log(this.refs.scrollDiv.scrollTop)
        e.preventDefault();
        //滚动条的高度
        let scrollTop = this.refs.scrollDiv.scrollTop;
        let assessTop = this.refs.assessPart.offsetTop;
        let productIntroduceTop = this.refs.productIntroduce.offsetTop;
        let assessHeight = this.refs.assessPart.offsetHeight;

        if(scrollTop < assessTop){
            this.setState({
                selectedTab:'product'
            })
        } else if(scrollTop >= assessTop && scrollTop < productIntroduceTop){
            this.setState({
                selectedTab:'assess'
            })
        }else if(scrollTop > productIntroduceTop){
            this.setState({
                selectedTab:'detail'
            })
        }
    }
    goToAssess = ()=>{
        history.push(`/assess/${this.props.match.params.productname}/${this.props.match.params.id}`)
        // console.log(this.props.match.params.productname)
    }
    showActionSheet = (type) => {
        const serviceMessage = (
            <div>
                <div className='service-first'>
                    <div className='service-sub-title'>基础服务</div>
                    <div className='service-item'>
                        <p>订单险</p>
                        <p>保险公司全称担保赔付该商品每笔交易的售后</p>
                    </div>
                    <div className='service-item'>
                        <p>支持7天无理由</p>
                        <p>该商品支持7天无理由退货</p>
                    </div>
                    <div className='service-item'>
                        <p>48小时内发货</p>
                    </div>
                </div>
                <div className='service-second'>
                    <div className='service-sub-title'>其他</div>
                    <div className='service-item'>
                        <p>蚂蚁花呗</p>
                    </div>
                    <div className='service-item'>
                        <p>集分宝</p>
                    </div>
                    <div className='service-item'>
                        <p>支付宝支付</p>
                    </div>
                </div>
            </div>
        );
        let {dataSource} = this.state;
        let {pmsProductAttributeList} = dataSource;
        const argMessage = (
            <div>
                <List style={{ backgroundColor: 'white',}} className="picker-list">
                    {
                        pmsProductAttributeList.map(item=>{
                            return <List.Item ><div><span style={{fontSize:12,color:'#666',display:'inline-block',width:100}}>{item.attname}</span><span style={{color:'#666',fontSize:12}}>{item.inputArrayList.join(',')}</span></div></List.Item>
                        })
                    }
                </List>
            </div>
        );
        ActionSheet.showShareActionSheetWithOptions({
                options: [],
                title: type === 'service'?null:<span style={{fontWeight: 'normal'}}>商品参数</span>,
                message: type === 'service'?serviceMessage:argMessage,
                cancelButtonText:(<div style={{color:'#fff',background:'#7cb37c'}}>完成</div>)
            });
    }
    stepChange = (value) => {
        this.setState({productCount:value});
    }
    render(){
        let {selectedTab,imgHeight,show,dataSource,productCount,accessCount} = this.state;
        let {name,price,promotionPrice,sale,stock,brandName,picList,pic,description,brandId,pmsProductAttributeList,brandLogo} = dataSource;
        return(
            <div className='product-list-item' style={{height:window.innerHeight,paddingBottom:10}} >
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    rightContent={[
                        <i className='iconfont  icon-gouwuche2' style={{fontSize:22,color: '#f79066'}} onClick={()=>history.push('/shoppingCart')}/>
                    ]}
                    onLeftClick={() => history.go(-1)}
                >
                    商品信息
                </NavBar>
                <div className='select-bar'>
                    <div className={'select-bar-item '+ (selectedTab === 'product'?'select-active':'') } onClick={()=>this.handleSelect('product')}>宝贝</div>
                    <div className={'select-bar-item '+ (selectedTab === 'assess'?'select-active':'')} onClick={()=>this.handleSelect('assess')}>评价</div>
                    <div className={'select-bar-item '+ (selectedTab === 'detail'?'select-active':'')} onClick={()=>this.handleSelect('detail')}>详情</div>
                    {/*<div className={'select-bar-item '+ (selectedTab === 'selectTab'?'select-active':null)} onClick={()=>this.handleSelect('selectTab')} >筛选</div>*/}
                </div>

                <div  onScroll={this.handleScroll} style={{overflow:'auto',height:window.innerHeight-125,position:'relative',top:45}} ref='scrollDiv'>
                    <Carousel
                        autoplay={false}
                        infinite
                        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        // afterChange={index => console.log('slide to', index)}
                    >
                        {picList.map(val => (
                            <a
                                key={val}
                                // href="http://www.alipay.com"
                                style={{ display: 'inline-block', width: '100%', height: imgHeight }}
                                id='productTop'
                            >
                                <img
                                    src={val}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                    <div className='introduce-product'>
                        <div className='introduce-product-price'><span style={{textDecoration:promotionPrice?'line-through':'null'}}>￥{price}</span><span style={{color:'#f7500d',display:promotionPrice?'inline-block':'none'}}>￥{promotionPrice}</span></div>
                        <div className='introduce-product-name'>{name}</div>
                        <div className='introduce-product-other'>
                            <div>快递：包邮</div>
                            <div>月销{sale}</div>
                            <div>上海</div>
                        </div>
                    </div>
                    <WhiteSpace size="md" />
                    <List style={{ backgroundColor: 'white',marginBottom:10 }} className="picker-list">
                        <List.Item arrow="horizontal"  onClick={()=>this.showActionSheet('service')}><div><span style={{fontSize:12,color:'#666',marginRight:20}}>服务</span><span style={{color:'#000',fontSize:12}}>订单险.支持7天无理由</span></div></List.Item>
                        <List.Item arrow="horizontal" onClick={()=>this.showActionSheet('arg')}><span style={{fontSize:12,color:'#666'}}>参数</span></List.Item>
                    </List>
                    <div  ref='assessPart' id='assessPart'>
                        <List style={{ backgroundColor: 'white',marginBottom:10 }} className="picker-list"  >
                            <List.Item arrow="horizontal" onClick={this.goToAssess}><div style={{overflow:'hidden'}}><span style={{fontSize:12,color:'#666',float:'left'}}>宝贝评价({accessCount})</span><span style={{fontSize:12,color:'#f7500d',float:'right'}}>查看全部</span></div></List.Item>
                        </List>
                    </div>

                    <div className='shop-introduce'>
                        <div style={{textAlign:'center'}}>品牌信息</div>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <div className="shop-pic">
                                <div style={{backgroundImage:`url(${brandLogo})`,width:'100%',paddingBottom:'100%',backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'contain'}}/>
                            </div>
                            <div className='shop-name' style={{fontSize:12}}>{brandName}</div>
                            <div style={{flex:'2 1',textAlign:'right'}}>
                                <span onClick={()=>history.push(`/shopproductlist/${brandId}`)}>全部宝贝</span>
                                <span onClick={()=>history.push(`/shopmessage/${brandName}/${brandId}`)}>进店逛逛</span>
                            </div>
                        </div>
                    </div>
                    {/*<WhiteSpace size="md" />*/}
                    <div className='product-introduce' id='productIntroduce' ref="productIntroduce">
                        <div>—————— 宝贝详情 ——————</div>
                        <div className='content'>
                            {description}
                        </div>
                        <div>
                            {
                                picList.map(item=>{
                                    return <img src={item} style={{display:'block',margin:'0 auto',width:'100%',height:'auto'}}/>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="mask" style={{display:show?'block':'none'}} onClick={()=>{this.setState({show:false})}}></div>
                <div style={{height:350,background:'#fff',overflow:'auto',padding:'20px 10px',position:'relative',zIndex:2}} className={show?'show':'hidden'}>
                    <div style={{overflow:'hidden'}}>
                        <div style={{float:'left',width:'28%',marginBottom:20}}>
                            <div className='add-to-car-pic' style={{width:'100%',paddingBottom:'100%',border:'1px solid #ccc',borderRadius:4,    backgroundSize: 'contain',backgroundImage:`url(${pic.split(',')[0]})`}}></div>
                        </div>
                        <div style={{
                            width: '72%',
                            float: 'left',
                            paddingLeft: 10,
                            paddingTop: 10,
                        }}>
                            <p style={{
                                fontSize: 18,
                                textAlign: 'left',
                                color:'#f7500d',
                                marginBottom:10,
                                fontWeight: '500'
                            }}>￥{promotionPrice?promotionPrice:price}</p>
                            <p style={{
                                fontSize: 12,
                                textAlign: 'left',
                                color:'#999',
                                marginBottom:20
                            }}>库存{stock}件</p>
                            <p style={{
                                fontSize: 12,
                                textAlign: 'left',
                            }}>
                                选择{pmsProductAttributeList[0]?pmsProductAttributeList[0].attname:''},{pmsProductAttributeList[1]?pmsProductAttributeList[1].attname:''}分类
                            </p>
                        </div>
                    </div>
                    {
                        pmsProductAttributeList.map((item,index)=>{
                           return <div className='add-shopping'>
                                <div style={{width:'100%',color:'#333',textAlign:'left'}}>{item.attname}</div>
                                {
                                    item.inputArrayList.map(selectItem=>{
                                        return <div className={this.changeClassName(item.attname,selectItem)} onClick={()=>this.handleSelectToAddCar(item.attname,selectItem)}>{selectItem}</div>
                                    })
                                }
                            </div>
                        })
                    }
                    <div style={{textAlign:'left'}}>
                        <span style={{lineHeight:'44px'}}>购买数量：</span>
                        <Stepper
                            style={{ minWidth: '100px',position:'absolute',right:25 }}
                            showNumber
                            max={stock}
                            min={1}
                            value={productCount}
                            onChange={this.stepChange}
                        />
                    </div>

                    <div className='sure-to-add' onClick={this.addToShoppingCar}>确定</div>
                </div>
                {/*<WhiteSpace size="lg" />*/}
                <div style={{height:45,display:'flex',position:'fixed',bottom:0,width:'100%',textAlign:'center',lineHeight:'45px',zIndex:100,background:'#fff'}}>
                    <div style={{flex:'1 1'}} onClick={()=>history.push(`/shopmessage/${brandName}/${brandId}`)}><i className='iconfont icon-mall' style={{marginTop:'-7px',display:'block',color:'#f7500d'}}/><p style={{fontSize:12,marginTop:'-6px',lineHeight:0}}>店铺</p></div>
                    <div style={{flex:'1 1'}}><p style={{fontSize:12,marginTop:'-6px',lineHeight:0}}></p></div>
                    <div style={{flex:'2 1',color:'#fff',background:'#7cb37c',fontSize:14}} onClick={this.addShoppingCart}>加入购物车</div>
                    <div style={{flex:'2 1',color:'#fff',background:'#f7500d',fontSize:14}} onClick={this.goToPayProduct}>立即购买</div>
                </div>
                {/*<WhiteSpace size="lg" />*/}

            </div>
        )
    }
}
let mapDispatchToProps = (dispatch)=>{
    return {
        /*传入actionCreator和dispatch，此时无论有多少action全都映射到props.methods中，相当于语法糖*/
        methods: bindActionCreators(productAction, dispatch)
    }
}
let Connected = connect(state=>state,mapDispatchToProps)(MainView);

export default Connected;
