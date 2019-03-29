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
            checkedList:[],
            delCar:false,
            selectAll:false,
        }
    }
    componentWillMount(){
       this.initShoppingCar();
       this.setState({checkedList:[]},()=>console.log(this.state.checkedList))
    }
    initShoppingCar = () => {
        model.getShoppingCartList({}).then(res=>{
            this.setState({dataSource:res});
        })
    }
    handleCheckChange = (e,val) => {
        let { checkedList } = this.state;
        let deleteIndex = '';
        if(e.target.checked){
            checkedList.push(val);
        }else {
            checkedList.forEach((item,index)=>{
                if(item.shopCarId === val.shopCarId){
                    deleteIndex = index;
                }
            });
            checkedList.splice(deleteIndex,1);
        }
        this.setState({checkedList})
        // console.log(e,val);
    }
    // 0表示减，1表示加
    handleStepChange = (step,value,index,item) => {
        let {dataSource} = this.state;
        if(step === 0){
            if(dataSource[index].productNum !== 1){
                dataSource[index].productNum--;
            }else {
                alert('删除宝贝', '是否确定要删除宝贝', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确定', onPress: () => {
                            model.delShoppingCart({product_id:item.productId,product_sort:item['product_sort']}).then(()=>{this.initShoppingCar();})
                        } },
                ])
            }

        }else {
            dataSource[index].productNum++;
        }
        this.setState({dataSource});
    }
    handleDelete = () => {
        let { checkedList,dataSource } = this.state;
        if(checkedList.length === 0)
        {
            Toast.info('您还没有勾选商品哦~',0.5);
        }else if(checkedList.length === dataSource.length){
            model.delAllShoppingCart({}).then(()=>this.initShoppingCar())
        }else {
            checkedList.forEach(item=>{
                model.delShoppingCart({product_id:item.productId,product_sort:item['product_sort']}).then(()=>{
                    this.initShoppingCar();
                    let checkBoxs = document.querySelectorAll('.checkbox-item');
                    checkBoxs.forEach((item,index)=>{
                        // if(index !== 0)
                        // {
                        // item.querySelector('span.am-checkbox input').click();
                        item.querySelector('span.am-checkbox').classList.remove("am-checkbox-checked");
                        // }


                    })
                })
            })
        }
    }
    toggleSelectedAll = (e) => {
        let {selectAll} = this.state;
        this.setState({selectAll:!selectAll},()=>{
            if(!selectAll){
                let checkBoxs = document.querySelectorAll('.checkbox-item');
                //防止数组第一个元素没有被绑定到
                // console.log(checkBoxs[0].querySelector('span.am-checkbox input'))
                // checkBoxs[0].querySelector('span.am-checkbox input').click();
                checkBoxs.forEach((item,index)=>{
                    // if(index !== 0)
                    // {
                    // item.querySelector('span.am-checkbox input').click();
                    item.querySelector('span.am-checkbox').classList.add("am-checkbox-checked");
                    // }


                })
            }else {
                let checkBoxs = document.querySelectorAll('.checkbox-item');
                //防止数组第一个元素没有被绑定到
                // console.log(checkBoxs[0].querySelector('span.am-checkbox input'))
                // checkBoxs[0].querySelector('span.am-checkbox input').click();
                checkBoxs.forEach((item,index)=>{
                    // if(index !== 0)
                    // {
                    // item.querySelector('span.am-checkbox input').click();
                    item.querySelector('span.am-checkbox').classList.remove("am-checkbox-checked");
                    // }


                })
            }
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
        let {dataSource,delCar} = this.state;
        // console.log(dataSource)
        return (
            <div className='shopping-cart'>
                {/*<List renderHeader={() => 'CheckboxItem demo'} >*/}
                <span
                    style={{
                        position: 'fixed',
                        color: '#fff',
                        right: 10,
                        fontSize: 16,
                        top: 13
                    }}
                    onClick={()=>{this.setState({delCar:!delCar})}}
                >{delCar?'完成':'管理'}</span>
                <div className='shopping-cart-body'>
                    {dataSource.length === 0?
                        <div className='empty-shopping-car'>
                            <div className="pic" ></div>
                            <div style={{color: '#e2b672', marginTop: 10}}>您还没有宝贝加入购物车哦~</div>
                        </div>:
                        dataSource.map((item,index) =>{
                            item.shopCarId = index+item.productId;
                            return (
                                <CheckboxItem key={index} onChange={(e) => this.handleCheckChange(e,item)} className='checkbox-item'>
                                    <div className='shopping-cart-item' onClick={()=>history.push(`/productitem/${item.productName}/${item.productId}`)}>
                                        <div style={{
                                            display:'inline-block',
                                            width:'26%',
                                            height:'83%',
                                            marginTop:'2%',
                                            border:'1px solid #ccc'
                                        }}>pic</div>
                                        <i className='iconfont icon-lajitong' style={{position:'absolute',right: 10,color: '#666'}} onClick={()=>{
                                            alert('删除宝贝', '是否确定要删除宝贝', [
                                                { text: '取消', onPress: () => console.log('cancel') },
                                                { text: '确定', onPress: () => {
                                                        model.delShoppingCart({product_id:item.productId,product_sort:item['product_sort']}).then(()=>this.initShoppingCar())
                                                    } },
                                            ])
                                        }}/>
                                        <div className='name-price'>
                                            <div className='shoppingcart-product-name' >{item.productName}</div>
                                            <p style={{color:'#666',fontSize:12}}>{item.product_sort}</p>
                                            <p style={{color:'#f7500d'}}>￥{item.productPrice}</p>
                                            <div className="count-step">
                                                <span className='left' onClick={()=>this.handleStepChange(0,item.productCount,index,item)}>-</span>
                                                <span className='center'>{item.productNum}</span>
                                                <span className='right' onClick={()=>this.handleStepChange(1,item.productCount,index,item)}>+</span>
                                            </div>
                                        </div>
                                    </div>

                                </CheckboxItem>
                            )}
                        )}
                </div>

                {/*</List>*/}
                <div className='shopping-bottom'>
                    <div style={{
                        float:'left',
                        width:'30%'

                    }}>
                        <CheckboxItem onChange={this.toggleSelectedAll} disabled={dataSource.length === 0}>
                            <span>全选</span>
                        </CheckboxItem>
                    </div>
                    {delCar?<span style={{backgroundColor:'#da5819'}} onClick={this.handleDelete}>删除</span>:<span onClick={this.paymentFn}>结算</span>}
                </div>
            </div>
        )
    }
}
