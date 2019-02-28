import React from "react";
import { Flex, WhiteSpace } from 'antd-mobile';
import NavBody from './NavBody'
import 'styles/classify.scss'

const data = [
    {
        value: '1',
        label: '女装',
        children: [
            {
                label: <div>卫衣</div>,
                value: '1',
            },
            {
                label: '牛仔裤',
                value: '2',
            }, {
                label: '短外套',
                value: '3',
            }, {
                label: '休闲裤',
                value: '4',
            }, {
                label: '毛针织衫',
                value: '5',
            }, {
                label: '毛衣',
                value: '6',
            }, {
                label: '西装',
                value: '7',
            }, {
                label: '连衣裙',
                value: '8',
            }, {
                label: '半身裙',
                value: '9',
            }],
    }, {
        value: '2',
        label: '美妆洗护',
        children: [
            {
                label: '彩妆盘',
                value: '1',
            }, {
                label: '化妆刷',
                value: '2',
            }, {
                label: '彩妆套装',
                value: '3',
            }, {
                label: '面部精华',
                value: '4',
            }, {
                label: '面部护理套装',
                value: '5',
            }, {
                label: '乳液',
                value: '6',
            }, {
                label: '化妆套刷',
                value: '7',
            }, {
                label: '眼影',
                value: '8',
            }, {
                label: '唇彩/唇蜜',
                value: '9',
            }],
    },
    {
        value: '3',
        label: '母婴',
        children: [
            {
                label: '套装',
                value: '1',
            }, {
                label: '裤子',
                value: '2',
            }, {
                label: '普通外套',
                value: '3',
            }, {
                label: '连衣裙',
                value: '4',
            }, {
                label: '连身衣',
                value: '5',
            }, {
                label: '运动鞋',
                value: '6',
            }, {
                label: '卫衣/绒衫',
                value: '7',
            }, {
                label: '棉袄',
                value: '8',
            }, {
                label: '毛衣',
                value: '9',
            },
        ],
    },
];
const navBarData = ['服装','餐厨','配件','居家'];
export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedValue:0,
        };
    }
    linkStyle = (value) => {
        let {selectedValue} = this.state;
        if(selectedValue === value) {
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
        let {selectedValue} = this.state;
        return(
            <div className='menu-active'>
                <div className='left-nav-bar'>
                    <ul>
                        {
                            navBarData.map((item, index) => {
                                return <li className='nav-item' style={this.linkStyle(index)}
                                           onClick={() => this.toggleHover(index)}>{item}</li>
                            })
                        }
                    </ul>
                </div>
                <NavBody type={selectedValue}/>
            </div>
        )
    }
}
