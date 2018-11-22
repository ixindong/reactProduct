import React,{Component} from 'react';//引入react
import * as tool from 'publicJs';
class Image extends Component{
	//设置默认props
	static defaultProps={

	}
	//构建函数
	constructor(props){
		super(props);
	}
	/**
	 * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用
	 */
	componentWillReceiveProps(props) {

	}
	render(){
		return(
				<img data-src={this.props.src} className={`component-image lazy ${this.props.className}`}></img>
		)
	}
}

module.exports = Image
