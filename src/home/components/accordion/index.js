import React,{Component} from 'react';//引入react
import * as tool from 'publicJs';
class Accordion extends Component{
	//设置默认props
	static defaultProps={
		show: false,
	}
	//构建函数
	constructor(props){
		super(props);
		this.state = {
			show: this.props.show
		}
	}
	/**
	 * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用
	 */
	componentWillReceiveProps(props) {

	}
	changeSelect = () =>{
		this.setState({show: !this.state.show})
	}
	render(){

		return(
			<div className={`component-accordion wrap ${this.state.show?'selected':''}`} onClick={this.changeSelect}>
				<h2 className="fs28 lh relative">
					{this.props.title}
					<span className="open-icon"></span>
				</h2>
				<div className="info-detail">
					{this.props.children}
				</div>
			</div>
		)
	}
}
/**
 * 组件属性校正
 * @type {Object}
 */
Accordion.propTypes={
  title: React.PropTypes.string,//标题
  show: React.PropTypes.bool,//默认是否显示
}
module.exports = Accordion
