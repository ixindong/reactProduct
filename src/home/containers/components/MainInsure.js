import React,{Component} from 'react';//引入react
import * as tool from 'publicJs';

/**
 *@desc  首页主要功能入口列表
 *@author XD
 *@date 2018/10/16
 */

class List extends Component {
    clickLink=(list)=>{
        if(list.Link){
            localStorage.insurType = list.insurType;
            window.location.href = list.Link
        }
    };
    render() {
        return (
            <ul className='MainInsure'>
                {
                    this.props.list.map(list=>{
                        return(
                            <li onClick={this.clickLink.bind(this,list)}>
                                <img src={list.MainInsureImage} alt=""/>
                                {list.MainInsureName}
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

//创建banner组件
export default class MainInsure extends Component{
    //构建函数
    constructor(props){
        super(props);
        this.state={
            info: {
                
            }
        }
    }

    //接收新的prop
    componentWillReceiveProps(props){
    }
    //组件渲染完成
    componentDidMount(){
    }
    render(){
        var list=this.props.list||[];
        return(
            <div>
                {
                    list.length != 0 ?<List list={list}></List>:null
                }
            </div>
        )
    }
}

