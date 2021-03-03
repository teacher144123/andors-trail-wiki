import React, { Component } from 'react';
import Icon from '../Icon';

export default class Table extends React.Component {

    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
    }
    getKeys = function () {
        return [
            ["", (o)=> {return <Icon data={o.link} />;}],
            ["Name", (o)=>{return RenderHref(o.link)}, { textAlign: 'left'} ],
            ["Quantity",(o)=>{return Range(o.quantity)}],
            ["Chance",(o)=>{return o.chance+"%"}],
        ];
    }

    getHeader = function () {
        var keys = this.getKeys();
        return keys.map((key, index) => {
            var style = (key.length>=2)?key[2]:{};
            return  <th style={style} key = {key[0]} > {key[0]} </th>
        })
    }

    getRowsData = function (items) {
        if (this.props.filter && this.props.filter.length>0) {
            items = items.filter((item)=>this.props.filter.indexOf(item.category) > -1);
        }
        var keys = this.getKeys();
        return items.map((row, index)=>{
            return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        })
    }

    render() {
        var items = this.props.data;
        if (!items?.length) return "";
        return (
            <table style={{width: 400}} >
                <thead style={{display: 'none'}}><tr>{this.getHeader()}</tr></thead>
                <tbody>{this.getRowsData(items)}</tbody>
            </table>
        );
    }
}
const RenderRow = (props) => {
    return props.keys.map((key, index) => {
        var style = (key.length>=2)?key[2]:{};
        return <td style={style} key ={key[0]}>{key[1](props.data)}</td>
    })
}
const RenderHref = (o) => {
    const href = o.rootLink + o.id;
    return  <a href={href}>{o.name}</a>
}
const Range = (o) => {
    if (o.max == o.min) return o.max;
    return o.min + "-" + o.max;
}