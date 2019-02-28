import React from "react";
import { TabBar,NavBar,Icon } from 'antd-mobile';
import ListViewContent from './ListViewContent'
import ClassifyView from './Classify/ClassifyView'
import UserCenter from './UserCenter/MainView'
import ShoppingCart from './ShoppingCart/MainView'
// import '../styles/tabView.scss'

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'blueTab',
        }
    }
    renderContent(pageText) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
                <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
                   onClick={(e) => {
                       e.preventDefault();
                       this.setState({
                           hidden: !this.state.hidden,
                       });
                   }}
                >
                    Click to show/hide tab-bar
                </a>
            </div>
        );
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
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
                            />
                            }
                            selected={this.state.selectedTab === 'blueTab'}
                            badge={1}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'blueTab',
                                });
                            }}
                            data-seed="logId"
                        >
                            <ListViewContent />
                        </TabBar.Item>
                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
                                />
                            }
                            title="分类"
                            key="classify"
                            badge={'new'}
                            selected={this.state.selectedTab === 'classify'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'classify',
                                });
                            }}
                            data-seed="logId1"
                        >
                            <ClassifyView/>
                        </TabBar.Item>
                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
                                 />
                            }
                            title="购物车"
                            key="shoppingCart"
                            dot
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
                            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                            title="我的"
                            key="userMessage"
                            selected={this.state.selectedTab === 'userMessage'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'userMessage',
                                });
                            }}
                        >
                            <UserCenter/>
                        </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}
