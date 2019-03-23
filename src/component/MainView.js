import React from "react";
import Tabviews from './TabViews'

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        console.log(window.commInfo)
    }
    render(){

        return(
            <Tabviews/>
        )
    }
}
