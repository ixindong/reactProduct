import React,{Component} from 'react';//引入react
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import * as tool from 'publicJs';
class Checkbox extends Component{
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
	onClick = () =>{
		this.props.onClick(!this.props.checked);
	}
	render(){
		return(
			<div className="component-checkbox">
				<div className={`check-icon ${this.props.checked ? 'selected': ''}`} onClick={this.onClick}></div>
				<span className="agree-title">我已阅读并同意</span>
				<Link to="/" className="link-url">《捷友家租房条款》</Link>
			</div>
		)
	}
}
/**
 * 组件属性校正
 * @type {Object}
 */
Checkbox.propTypes={
  /**
	 * checked: bool 是否选中
	 */
  checked: React.PropTypes.bool.isRequired,
}



export default Checkbox;
