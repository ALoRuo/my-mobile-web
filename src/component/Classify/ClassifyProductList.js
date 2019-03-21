import React from "react";
import { Flex,  } from 'antd-mobile';
import history from 'utils/HistoryRedirection';


let data = [];
for(let i =0 ;i<10;i++) {
    data.push({productId: i, productName: i+'高腰复古宽松显瘦百搭水洗浅色超长开叉牛仔长裤高腰百搭老爹款',productCount:1})
}
export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource:[],
        };
    }
    componentDidMount(){
        console.log(this.props)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps !== this.props){
            this.setState({
                dataSource:nextProps.settingData
            })
        }
    }
    goToProduct = (name,id) => {
        history.push(`/productitem/${name}/${id}`)
    }
    render(){
        let {dataSource} = this.state;
        return(
            <div style={{height:window.innerHeight-80}}>
                <Flex className='product-list-flex' wrap='wrap'>
                    {
                        dataSource.map(item=>{
                            return(
                            <div className='product-list-item' onClick={()=>this.goToProduct(item.name,item.id)}>
                                <div className='item-pic' style={{backgroundImage:`url(${item.pic})`}}></div>
                                <div className='item-message'>
                                    <div >{item.name}</div>
                                    <div>￥{item.price}</div>
                                </div>

                            </div>)
                        })
                    }

                </Flex>

            </div>
        )
    }
}
