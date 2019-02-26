import React from "react";
import { List, Checkbox } from 'antd-mobile';
import 'styles/shoppingcartView.scss'

const CheckboxItem = Checkbox.CheckboxItem;
export default class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    onChange = (val) => {
        console.log(val);
    }

    render(){
        const data = [
            { value: 0, label: 'Ph.D.' },
            { value: 1, label: 'Bachelor' },
            { value: 2, label: 'College diploma' },
            { value: 0, label: 'Ph.D.' },
            { value: 1, label: 'Bachelor' },
            { value: 2, label: 'College diploma' },
            { value: 0, label: 'Ph.D.' },
            { value: 1, label: 'Bachelor' },
            { value: 2, label: 'College diploma' },
            { value: 0, label: 'Ph.D.' },
            { value: 1, label: 'Bachelor' },
            { value: 2, label: 'College diploma' },

        ];
        return (
            <div className='shopping-cart'>
                <List renderHeader={() => 'CheckboxItem demo'} >
                    {data.map(i => (
                        <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
                            {i.label}
                        </CheckboxItem>
                    ))}
                </List>
                <div className='shopping-bottom'>
                    <span>结算</span>
                </div>
            </div>
        )
    }
}
