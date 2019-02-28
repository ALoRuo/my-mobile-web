import React from "react";
import { Stepper , Checkbox,Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import 'styles/shoppingcartView.scss'
let data = [];
for(let i =0 ;i<10;i++) {
    data.push({productId: i, productName: i+'高腰复古宽松显瘦百搭水洗浅色超长开叉牛仔长裤高腰百搭老爹款',productCount:1})
}

const alert = Modal.alert;
const CheckboxItem = Checkbox.CheckboxItem;
export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stepVal:1,
            dataSource:[],
        }
    }
    componentWillMount(){
    //    调接口获取这个用户的购物车数据传参（customerId）,获取数据格式[{productId,productName,productCount}]
        this.setState({
            dataSource:data,
        })
    }
    handleCheckChange = (val) => {
        console.log(val);
    }
    // 0表示减，1表示加
    handleStepChange = (step,value,index) => {
        let {dataSource} = this.state;
        if(step === 0){
            if(dataSource[index].productCount !== 1){
                dataSource[index].productCount--;
            }else {
                alert('Delete', '是否确定要删除宝贝', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确定', onPress: () => {
                            dataSource.splice(index,1);
                            this.setState({dataSource});
                        } },
                ])
            }

        }else {
            dataSource[index].productCount++;
        }
        this.setState({dataSource});
    }
    toggleSelectedAll = (e) => {

        let checkBoxs = document.querySelectorAll('.checkbox-item');
        //防止数组第一个元素没有被绑定到
        checkBoxs[0].querySelector('span.am-checkbox input').click();
        checkBoxs.forEach((item,index)=>{
            console.log(item)
            item.querySelector('span.am-checkbox input').click();

        })

    }

    render(){
        let {dataSource} = this.state;
        // console.log(dataSource)
        return (
            <div className='shopping-cart'>
                {/*<List renderHeader={() => 'CheckboxItem demo'} >*/}
                <div className='shopping-cart-body'>
                    {dataSource.map((item,index) => (
                        <CheckboxItem key={item.productId} onChange={() => this.handleCheckChange(item.productId)} className='checkbox-item'>
                            <div className='shopping-cart-item'>
                                <div style={{
                                    display:'inline-block',
                                    width:'26%',
                                    height:'83%',
                                    marginTop:'2%',
                                    border:'1px solid #ccc'
                                }}>pic</div>
                                <div className='name-price'>
                                    <p className='shoppingcart-product-name' >{item.productName}</p>
                                    <p>￥99.0</p>
                                    <div className="count-step">
                                        <span className='left' onClick={()=>this.handleStepChange(0,item.productCount,index)}>-</span>
                                        <span className='center'>{item.productCount}</span>
                                        <span className='right' onClick={()=>this.handleStepChange(1,item.productCount,index)}>+</span>
                                    </div>
                                </div>
                            </div>

                        </CheckboxItem>
                    ))}
                </div>

                {/*</List>*/}
                <div className='shopping-bottom'>
                    <div style={{
                        float:'left',
                        width:'30%'

                    }}>
                        <CheckboxItem onChange={this.toggleSelectedAll} >
                            <span>全选</span>
                        </CheckboxItem>
                    </div>
                    <span>结算</span>
                </div>
            </div>
        )
    }
}
