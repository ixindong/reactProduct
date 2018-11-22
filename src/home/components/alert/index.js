import React,{Component} from 'react';//引入react
import * as tool from 'publicJs';
import Btn from 'btn';
class Alert extends Component{
	//设置默认props
	static defaultProps={
		type: '1', //默认选中
		info: {
            btn1Text:'确定',
            btn2Text:'取消'
		}
	}
	//构建函数
	constructor(props){
		super(props);
	}
	/**
	 * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用
	 */
	componentWillReceiveProps(props) {
		if(props.show){
			if(props.type == 1 || props.type == '1'){
                setTimeout(()=>{
                    props.closeAlert();
                },tool.config.alertTime);
			}
		}
	}
    componentDidMount(){
	}
    alertClose(){
        this.props.closeAlert()
	}
    handleClick(){
		this.props.handleClick()
	}
	render(){
		//处理弹窗
		let dealAlert=()=>{
			//弹窗类型
			let alertClass=`component-alert-type${this.props.type} ${this.props.show?'show active':'hide'}`;
			//覆盖层
			let coverClass=`cover ${this.props.show?'show':'hide'}`;
			let title =this.props.info.title||'温馨提示';
			if(this.props.type=='1'){
				return <div className={alertClass} key={this.props.msg}>{this.props.msg}</div>
			}else if(this.props.type=='2'){
				let coverClass=`cover ${this.props.show?'show':'hide'}`;
				return(
					<div>
						<div className={coverClass}></div>
						<div className={alertClass}>
							<p className="title">{title}</p>
							<div className="content">
								{this.props.msg}
							</div>
							<div className="btn-list">
								<div className="btn-item" onClick={this.handleClick.bind(this)}>{this.props.info.btn1Text}</div>
								<div className="btn-item" onClick={this.alertClose.bind(this)}>{this.props.info.btn2Text}</div>
							</div>
						</div>
					</div>
				)
			} else if(this.props.type=='3') {
				return(
					<div>
						<div className={coverClass}></div>
						<div className={alertClass}>
							<p className="title">{title}</p>
							<div className="content">
									{this.props.msg}
							</div>
							<Btn type="1" size="3" onClick={this.alertClose.bind(this)}>确定</Btn>
						</div>
					</div>)
			}
		}
		return(
			<div>
				{
					dealAlert()
				}
			</div>
		)
	}
}
/**
 * 组件属性校正
 * @type {Object}
 */
Alert.propTypes={
  /**
	 * type: 弹窗的类型 目前为3类
	 *			 1.即时消失的弹窗
	 *			 2.用户选择的弹窗,有2个按钮
	 *			 3.提示性弹框,只有一个按钮 默认为1
   * show: 是否显示弹窗
   * msg : 及时小时提示框的文字内容
	 * info: 弹窗按钮的配置
	 *       info.btn1Text 为按钮1文本 默认为取消
	 *       info.btn2Text 为按钮2文本 默认为确定
	 *       info.title 标题问题 默认为提示
	 *			 info.hasTitle 默认为true 是否含有标题
	 */
  type: React.PropTypes.string,
  show: React.PropTypes.bool.isRequired,
	msg: React.PropTypes.string,
	info: React.PropTypes.object,
}
module.exports = Alert
