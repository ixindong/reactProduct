import React,{Component,PropTypes} from 'react';//引入react
import * as tool from 'publicJs';
import GetPage from 'getPage'
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import action from '../../actions/';
import configureStore from "../../store/configureStore";
/**
 * banner循环列表
 *
 * @class List
 * @extends {Component}
 */
class Footer extends Component{
    //构建函数
    constructor(){
        super();
    }

    //接收新的prop
    componentWillReceiveProps(props){
    }
    //组件渲染完成
    componentDidMount(){
    }
    render(){
        var list=this.props.list||[];
        var isFooterAct=this.props.isFooterAct - 1||[];
        return(
            <ul className='footer'>
                {
                    list.map((list,index)=>{
                        if(index != isFooterAct){
                            return(
                                <li>
                                    <img src={list.footerImage} alt=""/>
                                    {list.footerText}
                                </li>
                            )
                        }else{
                            return(
                                <li className='Cred'>
                                    <img src={list.actFooterImage} alt=""/>
                                    {list.footerText}
                                </li>
                            )
                        }
                    })
                }
            </ul>
        )
    }
}




module.exports = Footer