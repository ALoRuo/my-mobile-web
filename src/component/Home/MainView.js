import React from "react";
import { InputItem, NavBar, Icon, Drawer, Flex, WhiteSpace, Button } from 'antd-mobile';
import history from 'utils/HistoryRedirection';

export default class MainView extends React.Component {
    componentDidMount(){
        console.log(window.commInfo)
    }
    render(){
        return(
            <div>首页</div>
        )
    }
}
