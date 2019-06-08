import React from "react";
import { InputItem, NavBar, Icon, Drawer, Flex, WhiteSpace, Button } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import ClassifyProductList from './ClassifyProductList'
import model from 'models/classifyModel'

export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selectInputValue:'',
            selectedTab:'allTab',
            drawerOpen: false,
            settingData:[],
            totalPage:0,
            productCategoryId:''
        };
        this.param = 0;
    }
    componentDidMount(){
        let url = this.props.match.url;
        if(url.includes('/simpleproductlist')){
            model.getSimpleProductList({
                pageNum:1,
                pageSize:5,
                keyword:this.props.match.params.keyword,
                param:0
            }).then(res=>{
                this.setState({settingData:res.list,totalPage:res.totalPage,propsParam:this.props.match})
            })
        }else {
            model.getProductList({
                pageNum:1,
                pageSize:5,
                productCategoryId:this.props.match.params.id,
                param:0
            }).then(res=>{
                this.setState({settingData:res.list,totalPage:res.totalPage,propsParam:this.props.match})
            })
        }

    }
    onChange= (value) => {
        this.setState({ selectInputValue:value });
    };
    handleSelect = (modelType,type) => {
        this.setState({selectedTab:type});
        let params = {};
        if(this.props.match.url.includes('/simpleproductlist')){
            params = {
                    pageNum:1,
                    pageSize:5,
                    keyword:this.props.match.params.keyword,
                    param:this.param
                }
        }else {
            params = {
                pageNum:1,
                pageSize:5,
                productCategoryId:this.props.match.params.id,
                param:this.param
            }
        }
        if(type === 'selectTab'){
            this.onOpenChange();
        }else {
            this.setState({ drawerOpen: false });
            if(type === 'salesTab'){
                this.param = 2;
                if(this.props.match.url.includes('/simpleproductlist')){
                    model.getSimpleProductList({...params,param:this.param}).then(res=>{
                        this.setState({settingData:res.list,totalPage:res.totalPage,propsParam:this.props.match})
                    })
                }else{
                    model.getProductList({...params,param:this.param}).then(res=>{
                        this.setState({settingData:res.list,totalPage:res.totalPage,propsParam:this.props.match})
                    })
                }

            }else if(type === 'allTab'){
                this.param = 0;
                if(this.props.match.url.includes('/simpleproductlist')){
                    model.getSimpleProductList({...params,param:this.param}).then(res=>{
                        this.setState({settingData:res.list,totalPage:res.totalPage,propsParam:this.props.match})
                    })
                }else{
                    model.getProductList({...params,param:this.param}).then(res=>{
                        this.setState({settingData:res.list,totalPage:res.totalPage,propsParam:this.props.match})
                    })
                }
            }
        }
    }
    //虚拟键盘点击确认时的回调函数
    comfirmSelect = (val) =>{
        console.log(val)
    }
    onOpenChange = (...args) => {
        console.log(args);
        this.setState({ drawerOpen: !this.state.drawerOpen });
    }
    renderSideBar = () => {
        return(
            <div className='select-drawer'>
                <div className="sub-title">分类</div>
                <Flex>
                    <Flex.Item><div className='select-drawer-item'>上衣</div></Flex.Item>
                    <Flex.Item><div className='select-drawer-item'>袜子</div></Flex.Item>
                    <Flex.Item><div className='select-drawer-item'>裤子</div></Flex.Item>
                    <Flex.Item><div className='select-drawer-item'>风衣</div></Flex.Item>
                </Flex>
                <div className="sub-title">品牌</div>
                <Flex>
                    <Flex.Item><div className='select-drawer-item'>黛安芬</div></Flex.Item>
                    <Flex.Item><div className='select-drawer-item'>爱慕</div></Flex.Item>
                    <Flex.Item><div className='select-drawer-item'>古今</div></Flex.Item>
                    <Flex.Item><div className='select-drawer-item'>曼妮芬</div></Flex.Item>
                </Flex>
                <div className="sub-title">材质</div>
                <Flex>
                    <Flex.Item><div className='select-drawer-item'>丝光棉</div></Flex.Item>
                    <Flex.Item><div className='select-drawer-item'>天丝</div></Flex.Item>
                    <Flex.Item><div className='select-drawer-item'>彩棉</div></Flex.Item>
                    <Flex.Item><div className='select-drawer-item'>纯棉</div></Flex.Item>
                </Flex>
                <div className="sub-title">风格</div>
                <Flex>
                    <Flex.Item><div className='select-drawer-item'>保守</div></Flex.Item>
                    <Flex.Item><div className='select-drawer-item'>性感</div></Flex.Item>
                    <Flex.Item><div className='select-drawer-item'>可爱</div></Flex.Item>
                    <Flex.Item><div className='select-drawer-item'>普通</div></Flex.Item>
                </Flex>
                <WhiteSpace size="lg" />
                <div style={{textAlign:'right'}}>
                    <span style={{marginRight:4,border:'1px solid #7cb37c'}} className='drawer-button'>重置</span><span className='drawer-button'>确定</span>
                </div>
                <WhiteSpace size="lg" />
            </div>
        )
    }
    render(){
        let {id,keyword,selectedTab,drawerOpen,settingData,totalPage,propsParam} = this.state;
        const modelType = id || keyword;
        return(
            <div className='product-list'>
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    onLeftClick={() => history.go(-1)}
                >
                    {/*<InputItem*/}
                        {/*clear*/}
                        {/*placeholder="请输入商品关键词"*/}
                        {/*value={selectInputValue}*/}
                        {/*onChange={this.onChange}*/}
                        {/*onVirtualKeyboardConfirm={this.comfirmSelect}*/}
                    {/*/>*/}
                    商品列表
                </NavBar>
                <div className='select-bar'>
                    <div className={'select-bar-item '+ (selectedTab === 'allTab'?'select-active':null) } onClick={()=>this.handleSelect(modelType,'allTab')}>全部</div>
                    <div className={'select-bar-item '+ (selectedTab === 'salesTab'?'select-active':null)} onClick={()=>this.handleSelect(modelType,'salesTab')}>销量</div>
                    <div className={'select-bar-item '+ (selectedTab === 'priceTab'?'select-active':null)} onClick={()=>this.handleSelect(modelType,'priceTab')}>价格</div>
                    <div className={'select-bar-item '+ (selectedTab === 'selectTab'?'select-active':null)} onClick={()=>this.handleSelect(modelType,'selectTab')} >筛选</div>
                </div>

                {/*</Drawer>*/}
                <ClassifyProductList settingData={settingData} totalPage={totalPage} propsParam={propsParam} saleParam={this.param}/>
                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight-80,display:drawerOpen?'block':'none' }}
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                    sidebarStyle={{ border: '1px solid #ddd' }}
                    sidebar={this.renderSideBar()}
                    open={true}
                    position='top'
                />
            </div>
        )
    }
}
