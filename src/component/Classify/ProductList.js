import React from "react";
import { InputItem, NavBar, Icon } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import ClassifyProductList from './ClassifyProductList'

export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selectInputValue:'',
            selectedTab:'allTab'
        }
    }
    onChange= (value) => {
        this.setState({ selectInputValue:value });
    };
    handleSelect = (type) => {
        this.setState({selectedTab:type})
    }
    //虚拟键盘点击确认时的回调函数
    comfirmSelect = (val) =>{
        console.log(val)
    }
    render(){
        let {selectInputValue,selectedTab} = this.state;
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
                    <div className={'select-bar-item '+ (selectedTab === 'selectTab'?'select-active':null)} onClick={()=>this.handleSelect('selectTab')}>筛选</div>
                </div>
                <ClassifyProductList/>
            </div>
        )
    }
}
