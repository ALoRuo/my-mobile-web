import React from "react";
import { WhiteSpace, NavBar, Icon, Carousel, ActionSheet, List, Picker } from 'antd-mobile';
import history from 'utils/HistoryRedirection';

export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(<div className='assess-view'>
            <NavBar
                style={{position:'fixed',top:0,width:'100%',background:'#ececec'}}
                mode="light"
                icon={<Icon type="left" color={'#7cb37c'} size={'lg'}/>}
                onLeftClick={() => history.go(-1)}
            >
                宝贝评价
            </NavBar>
        </div>)
    }
}
