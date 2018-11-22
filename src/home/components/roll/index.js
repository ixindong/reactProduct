import React,{Component} from 'react';//引入react
import {swiper} from 'swiper';
import * as tool from 'publicJs';

export default class Roll extends Component{
	//构建函数
	constructor(props){
		super(props);
    this.state={
      info: {
        pagination: '.swiper-pagination',
        paginationType: 'bullets',//bullets  圆点（默认）fraction  分式 progress 进度条 custom 自定义
  			paginationClickable: false,//点击是否可以切换
        loop: true,//是否循环
        lazyLoading : true,//banner图片延迟加载
  			autoplay: 2000,//可选选项，自动滑动
      }
    }
	}

	//接收新的prop
	componentWillReceiveProps(props){
	}
  //组件渲染完成
	componentDidMount(){
		this.initSwiper();
	}
	/**
	 * 初始化滚动
	 * @return {[type]} [description]
	 */
	initSwiper(){
		var swiper = new Swiper('.component-roll-container', this.state.info);
	}
	render(){
		return(
      <div className='component-roll-container'>
        <div className='swiper-wrapper'>
            {
              React.Children.map(this.props.children, function (child) {
                return <div className='swiper-slide'>{child}</div>;
              })
            }
        </div>
        <div className='swiper-pagination'></div>
      </div>
		)
	}
}
/**
 * 组件属性校正
 * @type {Object}
 */
Roll.propTypes={

}
