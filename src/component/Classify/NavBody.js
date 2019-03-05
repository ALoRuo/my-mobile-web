import React from "react";
import { Flex } from 'antd-mobile';
import {classifyTypeConfig} from './classifyTypeConfig.js'
import history from 'utils/HistoryRedirection'
export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showType:0
        }

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.type !== this.props.type){
            this.setState({
                showType:nextProps.type
            })
        }
    }
    handleChange = (showType,index) => {
        console.log(showType,index)
        history.push(`/productlist/${index}`)
    }
    render(){
        let {showType} = this.state;
        return(
            <div className='nav-bar-body'>
                <Flex wrap="wrap" align="center">
                    {
                        classifyTypeConfig[showType].map((item,index) => {
                            return  <div className="inline" onClick={()=>this.handleChange(showType,index)}>{item}</div>
                        })
                    }
                </Flex>
            </div>
        )
    }
}
