/**
 * Created by dell on 2019/4/29.
 */
import React from "react";
import { WhiteSpace, NavBar, Icon, SegmentedControl, List, Picker } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import 'styles/myCollect.scss';
import {connect} from 'react-redux';
import model from 'models/userCenterModel'

const Item = List.Item;
const Brief = Item.Brief;
export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           productList: [] ,
            dataSource:[]
        }
    }
    componentDidMount(){
        model.getCollectShopList({}).then(res=>{
            this.setState({productList:res,dataSource:res})
        })
    }
    onValueChange = (value) => {
        let {productList} = this.state;
        if(value === '店铺'){
            this.setState({dataSource:productList})
        }else {
            this.setState({dataSource:[]})
        }
    }
    render(){
        let {productList,dataSource} = this.state;
        console.log(productList)
        return(
            <div className="collect-view">
                <NavBar
                    style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                    mode="light"
                    icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                    onLeftClick={() => history.go(-1)}
                >
                    收藏的品牌
                </NavBar>
                <div className="collect-content" style={{height:window.innerHeight-45,position:'relative',top:45}}>
                    {/*<SegmentedControl values={['店铺', '宝贝']} onValueChange={this.onValueChange}/>*/}
                    <List>
                        {
                            dataSource.map(item=>{
                                return(
                                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                                        <div className="collect-shop-pic" style={{backgroundImage:`url(${item.logo})`}}/> <Brief>{item.name}</Brief>
                                    </Item>
                                )
                            })
                        }

                    </List>
                </div>
            </div>
        )
    }
}