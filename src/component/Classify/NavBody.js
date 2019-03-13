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
        return(
            <div className='nav-bar-body'>
                <Flex wrap="wrap" align="center">
                    {
                        classifyTypeConfig.map((item,index) => {
                            return  <div className="inline" onClick={()=>this.handleChange(showType,item.id)}>{item.name}</div>
                        })
                    }
                </Flex>
            </div>
        )
    }
}
