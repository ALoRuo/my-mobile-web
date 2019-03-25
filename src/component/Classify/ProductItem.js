import React from "react";
import { WhiteSpace, NavBar, Icon, Carousel, ActionSheet, List, Stepper } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import 'styles/classify.scss';
import model from 'models/classifyModel'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}
export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab:'product',
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            imgHeight: 200,
            show:false,
            productCount:1,
            dataSource:{
                ppa:{}
            },
        };
    }
    componentDidMount(){
        //由于路由根据url生成组件，所以每次进来都是重新生成就会进入componentDidMount
        model.getProductDetail({id:this.props.match.params.id}).then(res=>{
            this.setState({
                dataSource:res
            })
        })
        console.log(111)
    }
    /*
    定义锚点直接跳转
    * */
    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if (anchorElement) {
                anchorElement.scrollIntoView();
            }
        }
    }
    //点击加入购物车
    addShoppingCart = () => {
        let {show} = this.state;
        this.setState({show:!show})
    }
    //确认加入购物车
    addToShoppingCar = () => {

    }
    changeClassName = (type,value) => {
        console.log(2)
        let selectValue = this.state[type];
        if(selectValue !== value){
            return 'add-shopping-select-item'
        }else {
            return 'add-shopping-select-item selected'
        }
    }
    handleSelectToAddCar = (type,value) => {
        console.log(1);
        let state = this.state;
        state[type] = value;
        this.setState(state,()=>{
            console.log(this.state)
        })
    }
    handleSelect = (value) => {
        this.setState({
            selectedTab:value
        });
        if(value === 'detail'){
            this.scrollToAnchor('productIntroduce');
        }else if(value === 'assess'){
            this.scrollToAnchor('assessPart');
        }
    }
    handleScroll = (e) => {
        // console.log(this.refs.scrollDiv.scrollTop)
        //滚动条的高度
        let scrollTop = this.refs.scrollDiv.scrollTop;
        if(scrollTop >= 490 && scrollTop <= 540){
            this.setState({
                selectedTab:'assess'
            })
        }else if(scrollTop > 520){
            this.setState({
                selectedTab:'detail'
            })
        }else{
            this.setState({
                selectedTab:'product'
            })
        }
    }
    goToAssess = ()=>{
        history.push(`/assess/${this.props.match.params.productname}`)
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
        const argMessage = (
            <div>
                <List style={{ backgroundColor: 'white',}} className="picker-list">
                    <List.Item ><div><span style={{fontSize:12,color:'#666',display:'inline-block',width:100}}>商品编号</span><span style={{color:'#666',fontSize:12}}>11100</span></div></List.Item>
                    <List.Item ><div><span style={{fontSize:12,color:'#666',display:'inline-block',width:100}}>上市年份</span><span style={{color:'#666',fontSize:12}}>2016年</span></div></List.Item>
                    <List.Item ><div><span style={{fontSize:12,color:'#666',display:'inline-block',width:100}}>颜色</span><span style={{color:'#666',fontSize:12}}>肤色/烟色/花瓣粉</span></div></List.Item>
                    <List.Item ><div><span style={{fontSize:12,color:'#666',display:'inline-block',width:100}}>尺码</span><span style={{color:'#666',fontSize:12}}>S/M/L</span></div></List.Item>
                    <List.Item ><div><span style={{fontSize:12,color:'#666',display:'inline-block',width:100}}>品牌</span><span style={{color:'#666',fontSize:12}}>victoria's screte</span></div></List.Item>
                    <List.Item ><div><span style={{fontSize:12,color:'#666',display:'inline-block',width:100}}>主材含量</span><span style={{color:'#666',fontSize:12}}>棉</span></div></List.Item>
                    <List.Item ><div><span style={{fontSize:12,color:'#666',display:'inline-block',width:100}}>适用对象</span><span style={{color:'#666',fontSize:12}}>女性</span></div></List.Item>
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
        let {selectedTab,imgHeight,show,dataSource,productCount} = this.state;
        const SY = [
            {
                title:'颜色',
                select:['红色','粉色','黑色','白色','蓝色','灰色']
            }, {
                title:'尺寸',
                select:['s','m','l','xl','xs']
            }
        ];
        let {price,detailTitle,sale,stock,brandName,ppa} = dataSource;
        let sizeList =dataSource.ppa.inputList?dataSource.ppa.inputList.split(','):[];
        console.log(sizeList)
        return(
            <div className='product-list-item' style={{height:window.innerHeight,paddingBottom:10}} >
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
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

                <div onScroll={this.handleScroll} style={{overflow:'auto',height:window.innerHeight-125,position:'relative',top:45}} ref='scrollDiv'>
                    <Carousel
                        autoplay={false}
                        infinite
                        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        // afterChange={index => console.log('slide to', index)}
                    >
                        {this.state.data.map(val => (
                            <a
                                key={val}
                                // href="http://www.alipay.com"
                                style={{ display: 'inline-block', width: '100%', height: imgHeight }}
                            >
                                <img
                                    src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
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
                        <div className='introduce-product-price'>￥{price}</div>
                        <div className='introduce-product-name'>{detailTitle}</div>
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
                    {/*<WhiteSpace size="md" />*/}
                    <List style={{ backgroundColor: 'white',marginBottom:10 }} className="picker-list" id='assessPart'>
                        <List.Item arrow="horizontal" onClick={this.goToAssess}><div><span style={{fontSize:12,color:'#666',float:'left'}}>宝贝评价（3）</span><span style={{fontSize:12,color:'#f7500d',float:'right'}}>查看全部</span></div></List.Item>
                    </List>
                    {/*<WhiteSpace size="md" />*/}
                    <div className='shop-introduce'>
                        <div style={{textAlign:'center'}}>品牌信息</div>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <div className="shop-pic"></div>
                            <div className='shop-name' style={{fontSize:12}}>{brandName}</div>
                            <div style={{flex:'2 1',textAlign:'right'}}>
                                <span style={{}}>全部宝贝</span>
                                <span>进店逛逛</span>
                            </div>
                        </div>
                    </div>
                    {/*<WhiteSpace size="md" />*/}
                    <div className='product-introduce' id='productIntroduce'>
                        <div>—————— 宝贝详情 ——————</div>
                        <div className='content'>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                            <div>呵呵呵呵呵呵呵呵呵呵呵呵或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</div>
                        </div>

                    </div>
                </div>
                <div className="mask" style={{display:show?'block':'none'}}></div>
                <div style={{height:350,background:'#fff',padding:'20px 10px',position:'relative',zIndex:2}} className={show?'show':'hidden'}>
                    <div style={{overflow:'hidden'}}>
                        <div style={{float:'left',width:'28%',marginBottom:20}}>
                            <div style={{width:'100%',paddingBottom:'100%',border:'1px solid #ccc',borderRadius:4}}></div>
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
                            }}>￥{price}</p>
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
                                选择尺寸，颜色分类
                            </p>
                        </div>
                    </div>
                    {
                        sizeList.map((item,index)=>{
                            return <div className='add-shopping'>
                                <div style={{width:'100%',color:'#333',textAlign:'left'}}>{item.title}</div>
                                {
                                    item.select.map(selectItem=>{
                                        return <div className={this.changeClassName(item.title,selectItem)} onClick={()=>this.handleSelectToAddCar(item.title,selectItem)}>{selectItem}</div>
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
                    <div style={{flex:'1 1',fontSize:12}}>客服</div>
                    <div style={{flex:'1 1',fontSize:12}}>店铺</div>
                    <div style={{flex:'2 1',color:'#fff',background:'#7cb37c',fontSize:14}} onClick={this.addShoppingCart}>加入购物车</div>
                    <div style={{flex:'2 1',color:'#fff',background:'#f7500d',fontSize:14}}>立即购买</div>
                </div>
                {/*<WhiteSpace size="lg" />*/}

            </div>
        )
    }
}
