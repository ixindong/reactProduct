import React,{Component} from 'react';//引入react
import * as tool from 'publicJs';
class Tab extends Component{
	//设置默认props
	static defaultProps={

	};
	//构建函数
	constructor(props){
		super(props);
    this.state={
        currentIndex :status||0
    };
	}
  check_tittle_index(index){
      return index===this.state.currentIndex ? "item selected" : "item";
  }

  check_item_index(index){
      return index===this.state.currentIndex ? "recommend selected" : "recommend";
  }
  //    tab title点击


  render(){
      let _this=this;
			let TabTitle = this.props.TabTitle||'';
      return(
          <div>
              {/*动态生成Tab导航*/}

              {/*Tab内容区域*/}

          </div>
          );
  }
}
/**
 * 组件属性校正
 * @type {Object}
 */
Tab.propTypes={
  /**
	 *itemWrapClass:tab下面li的wrap样式
	 * tabItemClass:tab下面li的样式
	 * tabListClass:tab ul的样式
	 * iconClass:tab下面icon的样式
   * tabContentClass:内容区域的样式

   */
	 info: React.PropTypes.object,
};



export default Tab;
