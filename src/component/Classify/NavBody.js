import React from "react";
import { Flex } from 'antd-mobile';
import {classifyTypeConfig} from './classifyTypeConfig.js'
import history from 'utils/HistoryRedirection'
import model from 'models/classifyModel'

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showType:0,
            classifyTypeConfig:[]
        }

    }
    componentDidMount(){
        let {classifyTypeConfig} = this.state;
        model.getSecondLevel(1,{
            pageNum:1,
            pageSize:5
        }).then(res=>{
            res.list.forEach(item=>{
                let obj = {
                    name:item.name,
                    id:item.id
                };
                classifyTypeConfig.push(obj);
            })
            this.setState({classifyTypeConfig})
        });

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.type !== this.props.type){
            // this.setState({
            //     showType:nextProps.type
            // })
            let {classifyTypeConfig} = this.state;

            model.getSecondLevel(nextProps.type,{
                pageNum:1,
                pageSize:5
            }).then(res=>{
                classifyTypeConfig = [];
                res.list.forEach(item=>{
                    let obj = {
                        name:item.name,
                        id:item.id
                    };
                    classifyTypeConfig.push(obj);
                })
                this.setState({classifyTypeConfig})
            })

        }
    }
    handleChange = (showType,id) => {
        history.push(`/productlist/${id}`)
    }
    render(){
        let {showType,classifyTypeConfig} = this.state;
        let iconList = {
            '外套':'icon-waitao-',
            '休闲裤':'icon--',
            '冰箱':'icon-bingxiang',
            '影音娱乐':'icon-ziyuan',
            '牛仔裤':'icon-niuziku',
            '车载电器':'icon-chezaidianqi',
            '数码配件':'icon-shumapeijian',
            '厨房卫浴':'icon-chufangweiyu',
            '衬衫':'icon-chenshan',
            '洗衣机':'icon-xiyiji',
            '汽车装饰':'icon-qichezhuangshi',
            '摄影摄像':'icon-sheyingshexiang',
            '空调':'icon-xiaofang',
            '五金工具':'icon-wujingongju',
            '客厅家具':'icon-ketingjiaju',
            '卧室家具':"icon-woshijiaju",
            '电视':'icon-dianshi',
            '灯饰照明':'icon-dengshizhaoming',
            '厨卫大电':'icon-chuweidadian',
            '手机配件':'icon-shoujipeijian',
            'T恤':'icon-txu',
            '全新整车':'icon-che',
            '手机通讯':'icon-shoujitongxun',
            '维修保养':'icon-iconfontbaoyang1'
        }
        return(
            <div className='nav-bar-body'>
                <Flex wrap="wrap" align="center">
                    {
                        classifyTypeConfig.map((item,index) => {
                            return  <div className="inline" onClick={()=>this.handleChange(showType,item.id)}>
                                <div><i className={`iconfont ${iconList[item.name]}`} style={{fontSize:60,color:'#7a907a'}}/></div>
                                {item.name}
                                </div>
                        })
                    }
                </Flex>
            </div>
        )
    }
}
