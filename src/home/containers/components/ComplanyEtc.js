import React,{Component} from 'react';//引入react
import * as tool from 'publicJs';

/**
 *@desc 公司介绍、产品介绍、培训资料、健康资讯等。
 *@author XD
 *@date 2018/10/17
 */

class List extends Component {
    render() {
        return (
            <ul className='complanyBox'>
                {
                    this.props.list.map(list=>{
                        return(
                            <li>
                                <p>{list.complanyEtcTitle}</p>
                                <img src={list.complanyEtcImage} alt=""/>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

//创建banner组件
export default class ComplanyEtc extends Component{
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

