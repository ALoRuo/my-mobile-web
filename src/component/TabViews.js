import React from "react";
import { TabBar,NavBar,Icon } from 'antd-mobile';
import history from 'utils/HistoryRedirection';
import ClassifyView from './Classify/ClassifyView'
import UserCenter from './UserCenter/MainView'
import ShoppingCart from './ShoppingCart/MainView'
import home1 from '../images/home-1.png'

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'blueTab',
        }
    }
    componentDidMount(){
        console.log(1)
    }
    //传给子级用来控制父级state
    handleStateChange = (newState) => {
        this.setState(newState);
    }
    render(){
        const {selectedTab} = this.state;
        console.log(selectedTab)
        let navTitle = 'Mall商城';
        switch(selectedTab){
            case 'blueTab':navTitle='Mall商城';break;
            case 'classify':navTitle='商品分类';break;
            case 'shoppingCart' : navTitle='购物车';break;
            case 'userMessage' :navTitle='用户中心';break;
        }
        return(
            <div>
                <NavBar
                    style={{position:'fixed',top:0,width:'100%'}}
                    mode="light"
                    // icon={<Icon type="left" />}
                    // onLeftClick={() => console.log('onLeftClick')}
                    // rightContent={[
                    //     <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    //     <Icon key="1" type="ellipsis" />,
                    // ]}
                >{navTitle}</NavBar>

                <div style={{ position: 'fixed', height: 'calc(100% - 45px)', width: '100%', top: 45 }}>

                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                        tabBarPosition="bottom"
                        hidden={this.state.hidden}
                        prerenderingSiblingsNumber={0}
                    >
                        <TabBar.Item
                            title="首页"
                            key="homePage"
                            icon={<i className='iconfont icon-shouye' style={{fontSize:21}}/>}
                            selectedIcon={<i className='iconfont icon-shouye1' style={{fontSize:21}}/>}
                            selected={this.state.selectedTab === 'blueTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'blueTab',
                                });
                            }}
                        >
                            {/*<ListViewContent />*/}
                            首页
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<i className='iconfont icon-fenlei-' style={{fontSize:21}}/>}
                            selectedIcon={<i className='iconfont icon-fenlei' style={{fontSize:21}}/>}
                            title="分类"
                            key="classify"
                            selected={this.state.selectedTab === 'classify'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'classify',
                                },()=>{
                                    history.push('/classify')
                                });
                            }}
                        >
                            {/*<ClassifyView/>*/}
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<i className='iconfont icon-gouwuche2' style={{fontSize:21}}/>}
                            selectedIcon={<i className='iconfont icon-gouwuche1' style={{fontSize:21}}/>}
                            title="购物车"
                            key="shoppingCart"
                            selected={this.state.selectedTab === 'shoppingCart'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'shoppingCart',
                                });
                            }}
                        >
                            <ShoppingCart/>
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<i className='iconfont icon-zelvgongyongyonghuzhongxinz003' style={{fontSize:21}}/>}
                            selectedIcon={<i className='iconfont icon-zelvgongyongyonghuzhongxinz003' style={{fontSize:21,color:'#33a3f4'}}/>}
                            title="我的"
                            key="userMessage"
                            selected={this.state.selectedTab === 'userMessage'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'userMessage',
                                });
                            }}
                        >
                            <UserCenter handleStateChange={this.handleStateChange}/>
                        </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}
