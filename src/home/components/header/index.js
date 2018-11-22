import React,{Component,PropTypes} from 'react';//引入react
import { connect } from 'react-redux';
/**
 * banner循环列表
 *
 * @class List
 * @extends {Component}
 */
class Header extends Component{
    /***@ XinD 2018/10/29 构建函数 @***/
    constructor(){
        super();
    }


    /***@ XinD 2018/10/29 接收新的prop @***/
    componentWillReceiveProps(props){
    }

    /***@ XinD 2018/10/29 组件渲染完成 @***/
    componentDidMount(){
    }
    attachClick = () =>{
        this.props.attachClick()
    };
    render(){
        let iconWidth = this.props.iconWidth;
        let iconHeight = this.props.iconHeight;
        return(
            <header>
                <img src="./image/icon/back.png" alt="" className='back' onClick={this.props.clickBack}/>
                <span className='title'>{this.props.title}</span>
                <img src={this.props.attach.icon} alt="" className='attach' style={{width:iconWidth,height:iconHeight}} onClick={this.attachClick}/>
            </header>
        )
    }
}


module.exports = Header;