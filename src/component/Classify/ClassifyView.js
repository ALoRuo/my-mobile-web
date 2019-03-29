import React from "react";
import { Flex, WhiteSpace } from 'antd-mobile';
import NavBody from './NavBody'
import 'styles/classify.scss'
import model from 'models/classifyModel'


export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedValue:1,
            navBarData:[],
        };
    }
    componentDidMount(){
        model.getFirstLevel({
            pageNum:1,
            pageSize:5
        }).then(res=>{
            let {navBarData} = this.state;
            res.list.forEach(item=>{
                navBarData.push(item.name);
                this.setState({navBarData})
            })
        });
    }
    linkStyle = (value) => {
        let {selectedValue} = this.state;
        if(selectedValue === value+1) {
            return{
                background:'#fff'
            }
        }else {
            return{
                background:'#f1f1f1'
            }
        }
    }
    toggleHover=(value)=>{
       this.setState({
           selectedValue:value
       })

    }
    render(){
        let {selectedValue,navBarData} = this.state;
        return(
            <div className='menu-active' style={{height:window.innerHeight-95}}>
                <div className='left-nav-bar'>
                    <ul>
                        {
                            navBarData.map((item, index) => {
                                return <li className='nav-item' style={this.linkStyle(index)}
                                           onClick={() => this.toggleHover(index+1)}>{item}</li>
                            })
                        }
                    </ul>
                </div>
                <NavBody type={selectedValue}/>
            </div>
        )
    }
}
