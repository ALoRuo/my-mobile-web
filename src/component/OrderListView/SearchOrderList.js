/**
 * Created by dell on 2019/4/18.
 */
import React from "react";
import { InputItem } from 'antd-mobile';
import model from 'models/orderListViewModel'
import history from 'utils/HistoryRedirection';
import 'styles/orderListView.scss';
import {connect} from 'react-redux';
import orderAction from "store/actions/order-action";
import {bindActionCreators} from 'redux';

class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchValue:''
        }
    }
    searchValue = (value) => {
        this.setState({searchValue:value})
    }
    searchOrderList = () =>{
        let {searchValue} = this.state;
        model.getOrderListByName({
            productName:searchValue
        }).then(res=>{
            let {getOrderSearchList} = this.props.methods;
            let dataSource = [];
            // if(res['order_master_list'].length !== 0){
            //     res['order_master_list'].forEach(item=> {
            //         dataSource.push(item);
            //     })
            // }
            res['order_master_list'].forEach(item=> {
                dataSource.push(item);
            })
            getOrderSearchList(dataSource);
            history.push('/ordersearchresultlist');
        });
    }
    render(){
        return(
            <div style={{position:'relative'}} className="search-order-input-view">
                <div style={{
                    width:'10%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    textAlign: 'center',
                    lineHeight: '44px',
                }}>
                    <i className="iconfont icon-xiangzuo" style={{fontSize:20,color:'#7cb37c'}} onClick={()=>history.go(-1)}/>
                </div>
                <InputItem
                    clear
                    placeholder="请输入搜索关键词"
                    onChange={this.searchValue}
                    style={{
                        height:35,
                        width:'70%',
                        borderBottom:'1px solid #f7500d'
                    }}
                />
                <div style={{
                    width:'20%',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    textAlign: 'center',
                    lineHeight: '44px',
                    background: '#e67548',
                    color: '#fff',
                    fontSize: 16
                }}
                     onClick={this.searchOrderList}
                >搜订单</div>
            </div>


        )
    }
}
let mapDispatchToProps = (dispatch)=>{
    return {
        /*传入actionCreator和dispatch，此时无论有多少action全都映射到props.methods中，相当于语法糖*/
        methods: bindActionCreators(orderAction, dispatch)
    }
}
let Connected = connect(state=>state,mapDispatchToProps)(MainView);

export default Connected;