import React, { Component } from 'react'; //引入react
import * as tool from 'publicJs';
class Btn extends Component {
    //设置默认props
    static defaultProps = {
        type: '1', //实心
        size: '1', //大按钮
        status: true, //正常状态
    }
    //构建函数
    constructor(props) {
        super(props);
    }
    render() {
        //处理弹窗
        let dealBtn = () => {
            //弹窗类型
            let btnClass = `button component-btn-type${this.props.type} ${this.props.className||''} component-btn-size${this.props.size}`;
            if (this.props.status) {
                return <button className={btnClass} onClick={this.props.onClick}>{ this.props.children }</button>
            } else {
                return (
                    <button className={`disabled ${btnClass}`} disabled onClick={this.props.onClick}>
						{ this.props.children }
					</button>
                )
            }
        }
        return (
            <div className="component-btn">
				{
					dealBtn()
				}
			</div>
        )
    }
}
/**
 * 组件属性校正
 * @type {Object}
 */
Btn.propTypes = {
    /**
     * type: 弹窗的类型 目前为2类 1实心 2为空心 默认为1
     * status: 按钮的状态，true为正常状态, false 为不可点击状态 默认为true
     * size：弹框大小，1为大按钮 2为中按钮 3为小按钮 顺序从大至小 默认为1
     */
    type: React.PropTypes.string,
    status: React.PropTypes.bool,
    size: React.PropTypes.string
}



export default Btn;