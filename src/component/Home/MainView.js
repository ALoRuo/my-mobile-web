import React from "react";
import { InputItem, Carousel,WhiteSpace} from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import model from 'models/homeModel'
import 'styles/homePage.scss';

export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            imgHeight: 176,
            h:0,
            m:0,
            s:0,
            goodShopList:[],
            newProduct:[],
            saleFlashList:[],
            adsList:[],
            searchValue:'',
        };
        this.timer = null;
    }
    componentDidMount(){
        // console.log(window.commInfo)

        model.getGoodShop({}).then(res=>{
            this.setState({goodShopList:res.list})
        })
        model.getSaleFlash().then(res=>{
            this.setState({saleFlashList:res.list},this.handleFlashSale(res.list))
        });
        model.getNewProduct({}).then(res=>{
            let {newProduct} = this.state;
            res.list.forEach(item=>{
                newProduct=newProduct.concat(item);
            });
            this.setState({newProduct})
        });
        model.getAds({}).then(res=>{
            this.setState({adsList:res.list})
        })
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    handleSearch = () => {
        let {searchValue} = this.state;
        if(searchValue !== '' && searchValue !== undefined){
            history.push('/simpleproductlist/'+searchValue);
        }
    }
    handleFlashSale = (saleFlashList) => {
        let endTime = saleFlashList[0].promotionEndTime;
        let startTime = new Date().getTime();
        let time = Math.floor((endTime - startTime)/1000)>0?Math.floor((endTime - startTime)/1000):0;
        // let {saleFlashList} = this.state;
        // let ids = '';
        // saleFlashList.forEach(item=>{
        //     ids+=item.id+',';
        //     // ids.push(item.id)
        // });
        // // let reg=/,$/gi;
        // // ids=ids.replace(reg,"");
        // model.setSaleFlashTime({ids,millis:time*1000});
        let h=0,m=0,s=0;
        if(time>0){
            this.setState({isSaleFlash:true})
        }
        this.timer = setInterval(()=>{
            time --;
            if(time >=0){
                h = Math.floor(time/60/60);
                s = time%60;
                m = Math.floor(time/60%60);
                this.setState({
                    h,m,s
                })
            }else {
                clearInterval(this.timer);
                this.setState({
                    isSaleFlash:false,
                })
            }
        },1000)
        // return <div>{h}:{m}:{s}</div>;
    }
    render(){
        const {h,s,m,goodShopList,newProduct,saleFlashList,adsList,isSaleFlash} = this.state;
        return(
            <div className="home-view" style={{height:window.innerHeight-95,overflow:'auto'}}>
                <div className="search-input-content">
                    <div className="search-icon"/>
                    <InputItem
                        className="search-input"
                        clear
                        placeholder="请输入需要搜索的商品关键词"
                        onChange={(value)=>this.setState({searchValue:value})}
                        style={{height:35}}
                    />
                    <span style={{
                            position:'absolute',
                            color:'#f7500d',
                            right: '4%',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '16px'
                         }}
                          onClick={this.handleSearch}
                    >搜索</span>
                </div>
                <Carousel
                    autoplay
                    infinite
                    // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    // afterChange={index => console.log('slide to', index)}
                >
                    {adsList.map(item => (
                        <a
                            key={item.id}
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            onClick={()=>history.push(`/shopmessage/${item.name}/${item.id}`)}
                        >
                            <img
                                src={item.logo}
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
                {/*<WhiteSpace size="ld" />*/}
                <div className="flash-sale-content">
                    <div className="flash-sale-head">
                        <div style={{float:'left'}}>
                            <p style={{fontSize:18,fontWeight:800}}>秒杀专场</p>
                            <p style={{fontSize:12,color:'#666'}}>下一场18：00开始</p>
                        </div>
                        <div style={{float:'right'}}>
                            <p style={{fontSize:12,color:'#666'}}>本场结束剩余</p>
                            <div style={{color:'#f7500d',fontSize:18,background:'#cee0ce',padding: 2, marginTop: 2}}>
                                {
                                    (h<10?'0'+h:h)
                                }:
                                {
                                    (m<10?'0'+m:m)
                                }:
                                {
                                    (s<10?'0'+s:s)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flash-sale-body">
                        {
                            saleFlashList.map(item=>{

                                return   (
                                    <div className="flash-sale-item" onClick={()=>history.push(`/productitem/${item.name}/${item.id}`)}>
                                        <div className="sale-pic" style={{backgroundImage:`url(${item.pic.split(',')[0]})`}}></div>
                                        <p className="text-ellipsis-1">{item.name}</p>
                                        <p style={{fontWeight:800,color:'#f7500d',textDecoration:!isSaleFlash?'line-through':'none'}}>{item.promotionPrice}</p>
                                        <p><span style={{textDecoration:isSaleFlash?'line-through':'none'}}>￥ {item.price}</span></p>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="flash-sale-content">
                    <div style={{padding:'10px 35px'}}>
                        <p style={{fontSize:18,fontWeight:800}}>人气更新</p>
                    </div>
                    <div className="flash-sale-body">
                        {
                            newProduct.slice(0,4).map(item=>{

                                return   (
                                    <div className="flash-sale-item" onClick={()=>history.push(`/productitem/${item.name}/${item.id}`)}>
                                        <div className="sale-pic" style={{backgroundImage:`url(${item.pic.split(',')[0]})`}}>
                                            <div className="new-icon"/>
                                        </div>
                                        <p className="text-ellipsis-1">{item.name}</p>
                                        <p>￥ {item.price}</p>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="flash-sale-content">
                    <div style={{padding:'10px 35px'}}>
                        <p style={{fontSize:18,fontWeight:800}}>优质好店</p>
                    </div>
                    <div className="flash-sale-body">
                        {
                            goodShopList.map(item=>{

                                return   (
                                    <div className="flash-sale-item" onClick={()=>history.push(`/shopmessage/${item.name}/${item.id}`)}>
                                        <div className="sale-pic" style={{backgroundImage:`url(${item.logo})`}}></div>
                                        <p>{item.name}</p>
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
