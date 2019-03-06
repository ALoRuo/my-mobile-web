import React from "react";
import { InputItem, NavBar, Icon, Drawer, Flex, WhiteSpace, Button } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import ClassifyProductList from './ClassifyProductList'

export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selectInputValue:'',
            selectedTab:'allTab',
            drawerOpen: false,
        }
    }
    onChange= (value) => {
        this.setState({ selectInputValue:value });
    };
    handleSelect = (type) => {
        this.setState({selectedTab:type})
        if(type === 'selectTab'){
            this.onOpenChange();
        }else {
            this.setState({ drawerOpen: false });
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
        let {selectInputValue,selectedTab,drawerOpen} = this.state;
        return(
            <div className='product-list'>
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    onLeftClick={() => history.go(-1)}
                >
                    <InputItem
                        clear
                        placeholder="请输入商品关键词"
                        value={selectInputValue}
                        onChange={this.onChange}
                        onVirtualKeyboardConfirm={this.comfirmSelect}
                    />
                </NavBar>
                <div className='select-bar'>
                    <div className={'select-bar-item '+ (selectedTab === 'allTab'?'select-active':null) } onClick={()=>this.handleSelect('allTab')}>全部</div>
                    <div className={'select-bar-item '+ (selectedTab === 'salesTab'?'select-active':null)} onClick={()=>this.handleSelect('salesTab')}>销量</div>
                    <div className={'select-bar-item '+ (selectedTab === 'priceTab'?'select-active':null)} onClick={()=>this.handleSelect('priceTab')}>价格</div>
                    <div className={'select-bar-item '+ (selectedTab === 'selectTab'?'select-active':null)} onClick={()=>this.handleSelect('selectTab')} >筛选</div>
                </div>
                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight-80 }}
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                    sidebarStyle={{ border: '1px solid #ddd' }}
                    sidebar={this.renderSideBar()}
                    open={drawerOpen}
                    position='top'
                />
                {/*</Drawer>*/}
                <ClassifyProductList/>
            </div>
        )
    }
}
