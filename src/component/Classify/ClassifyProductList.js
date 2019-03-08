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
        this.state = {};
    }
    componentDidMount(){

    }
    componentwillreceiveprops(nextProps){

    }
    goToProduct = (name,id) => {
        history.push(`/productitem/${name}/${id}`)
    }
    render(){
        return(
            <div style={{height:window.innerHeight-80}}>
                <Flex className='product-list-flex' wrap='wrap'>
                    {
                        data.map(item=>{
                            return(
                            <div className='product-list-item' onClick={()=>this.goToProduct(item.productName,item.productId)}>
                                <div className='item-pic'>pic</div>
                                <div className='item-message'>
                                    <div >{item.productName}</div>
                                    <div>￥99</div>
                                </div>

                            </div>)
                        })
                    }

                </Flex>

            </div>
        )
    }
}
