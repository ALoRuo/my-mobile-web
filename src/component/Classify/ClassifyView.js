import React from "react";
import { Menu, ActivityIndicator } from 'antd-mobile';
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
export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            initData: data,
        };
    }
    onChange = (value) => {
        // console.log(value)
        let label = '';
        data.forEach((dataItem) => {
            if (dataItem.value === value[0]) {
                label = dataItem.label;
                if (dataItem.children && value[1]) {
                    dataItem.children.forEach((cItem) => {
                        if (cItem.value === value[1]) {
                            label += ` ${cItem.label}`;
                        }
                    });
                }
            }
        });
        // console.log(label);
    }
    render(){
        const { initData } = this.state;
        const menuEl = (
            <Menu
                className="foo-menu"
                data={initData}
                value={['1', '3']}
                onChange={this.onChange}
                height={document.documentElement.clientHeight * 0.6}
            />
        );
        const loadingEl = (
            <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </div>
        );
        return(
            <div className='menu-active'>
                {/*<div>*/}
                {/*<NavBar*/}
                {/*leftContent="Menu"*/}
                {/*mode="light"*/}
                {/*icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" />}*/}
                {/*onLeftClick={this.handleClick}*/}
                {/*className="top-nav-bar"*/}
                {/*>*/}
                {/*Here is title*/}
                {/*</NavBar>*/}
                {/*</div>*/}
                {initData ? menuEl : loadingEl}
                {/*{show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}*/}
            </div>
        )
    }
}
