import React from "react";
import { Flex, ActivityIndicator } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import model from 'models/classifyModel';
import "styles/classify.scss";
import debounce from 'lodash/debounce';

export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource:[],
            startY:0,
            endY:0,
            maveY:0,
            getList:false,
        };

    }
    // componentDidMount(){
    //     console.log(this.props);
    // }
    handleScroll = (e) => {
        e.preventDefault();
        // _.debounce(()=>{
        let clientHeight = this.refs.scrollDiv.clientHeight;
        let scrollTop = this.refs.scrollDiv.scrollTop;
        let scrollHeight = this.refs.scrollDiv.scrollHeight;
        // console.log(clientHeight, scrollTop, scrollHeight, scrollHeight - (clientHeight + scrollTop));
            if (scrollHeight - (clientHeight + scrollTop) < 10) {
                let {dataSource, propsParam, totalPage,saleParam} = this.state;
                this.pageNum = this.pageNum + 1;
                console.log('防抖测试，发送请求的页数：'+this.pageNum);
                if (this.pageNum <= totalPage) {
                    this.setState({getList: true});
                    // if([1,2].includes(saleParam)){
                    if(propsParam.url.includes('/simpleproductlist')){
                        model.getSimpleProductList({
                            pageNum: this.pageNum,
                            pageSize: 5,
                            keyword:propsParam.params.keyword,
                            param:saleParam
                        }).then(res => {

                            dataSource = dataSource.concat(res.list);
                            this.setState({dataSource, getList: false})
                        })
                    }else {
                        model.getProductList({
                            pageNum: this.pageNum,
                            pageSize: 5,
                            productCategoryId:propsParam.params.id,
                            param:saleParam
                        }).then(res => {

                            dataSource = dataSource.concat(res.list);
                            this.setState({dataSource, getList: false})
                        })
                    }

                    // }else {
                    //     model.getProductList({
                    //         pageNum: this.pageNum,
                    //         pageSize: 5,
                    //         productCategoryId,
                    //         param:0
                    //     }).then(res => {
                    //
                    //         dataSource = dataSource.concat(res.list);
                    //         this.setState({dataSource, getList: false})
                    //     })
                    // }

                }

            }

    }
    componentWillReceiveProps(nextProps){
        this.pageNum = 1;
        this.refs.scrollDiv.scrollTop = 0;
        if(nextProps !== this.props){
            this.setState({
                dataSource:nextProps.settingData,
                totalPage:nextProps.totalPage,
                propsParam:nextProps.propsParam,
                saleParam:nextProps.saleParam
            })
        }
    }
    goToProduct = (name,id) => {
        history.push(`/productitem/${name}/${id}`)
    }
    render(){
        let {dataSource,getList} = this.state;
        console.log(dataSource)
        return(
            <div style={{height:window.innerHeight-80}} className="product-list-body" ref="scrollDiv"  onScroll={debounce(this.handleScroll,200)}>
                <div className='product-list-flex'>
                    {
                        dataSource.map(item=>{
                            return(
                            <div className='product-list-item' onClick={()=>this.goToProduct(item.name,item.id)}>
                                <div className='item-pic' style={{backgroundImage:`url(${item.pic.split(',')[0]})`}}></div>
                                <div className='item-message'>
                                    <div >{item.name}</div>
                                    <div style={{width:'90%'}}>
                                        <span style={{float:'left'}}>￥{item.price}</span>
                                        <span style={{float:'right',color:'#666',fontSize:12}}>月销：{item.sale}</span>
                                    </div>
                                </div>

                            </div>)
                        })
                    }

                </div>
                <div>
                    <ActivityIndicator animating={getList} text="正在加载..."/>
                </div>
            </div>
        )
    }
}
