import React from "react";
import { Stepper , Checkbox,Modal, Toast, WhiteSpace, WingBlank } from 'antd-mobile';
import 'styles/shoppingcartView.scss';
import { Link } from "react-router-dom";
import model from 'models/shoppingCartModel';
import history from 'utils/HistoryRedirection'

let data = [];
for(let i =0 ;i<10;i++) {
    data.push({productId: i, productName: i+'高腰复古宽松显瘦百搭水洗浅色超长开叉牛仔长裤高腰百搭老爹款呵呵呵呵呵呵呵呵呵呵呵呵或或',productCount:1})
}

const alert = Modal.alert;
const CheckboxItem = Checkbox.CheckboxItem;
export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stepVal:1,
            dataSource:[],
            checkedList:[]
        }
    }
    componentWillMount(){
        model.getShoppingCartList({}).then({

        })
    }
    handleCheckChange = (e,val) => {
        let { checkedList,dataSource } = this.state;
        let deleteIndex = '';
        if(e.target.checked){
            checkedList.push(dataSource.find(item=>item.productId === val));
        }else {
            dataSource.forEach((item,index)=>{
                if(item.productId === val){
                    deleteIndex = index;
                }
            });
            checkedList.splice(deleteIndex,1);
        }
        this.setState({checkedList})
        // console.log(e,val);
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
            item.querySelector('span.am-checkbox input').click();

        })

    }
    paymentFn = () => {
        let { checkedList } = this.state;
        if(checkedList.length>0){
            history.push('/payment');
        }else {
            Toast.info('您还没有选择宝贝哦！', 1);
        }
    }

    render(){
        let {dataSource} = this.state;
        // console.log(dataSource)
        return (
            <div className='shopping-cart'>
                {/*<List renderHeader={() => 'CheckboxItem demo'} >*/}
                <div className='shopping-cart-body'>
                    {dataSource.map((item,index) => (
                        <CheckboxItem key={item.productId} onChange={(e) => this.handleCheckChange(e,item.productId)} className='checkbox-item'>
                            <div className='shopping-cart-item'>
                                <div style={{
                                    display:'inline-block',
                                    width:'26%',
                                    height:'83%',
                                    marginTop:'2%',
                                    border:'1px solid #ccc'
                                }}>pic</div>
                                <div className='name-price'>
                                    <div className='shoppingcart-product-name' >{item.productName}</div>
                                    <p style={{color:'#f7500d'}}>￥99.0</p>
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
                    <span onClick={this.paymentFn}>结算</span>
                </div>
            </div>
        )
    }
}
