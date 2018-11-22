import React,{Component} from 'react';//引入react
import * as tool from 'publicJs';

export default class InputGroup extends Component{
	render(){
		return(
			<div className={`component-input-group ${this.props.className||''}`}>
				{this.props.children}
			</div>
		)
	}
}
/**
 * 组件属性校正
 * @type {Object}
 */
InputGroup.propTypes={

}
