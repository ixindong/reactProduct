import React,{Component} from 'react';//引入react
import { swiper } from 'swiper';
import * as tool from 'publicJs';
import GetPage from 'getPage'
/**
 * banner循环列表
 *
 * @class List
 * @extends {Component}
 */
class List extends Component {
    render() {
        return (
          <div className='swiper-wrapper'>
                {
                    this.props.list.map((item, index) => {
                          return <div className='swiper-slide' key={index}>
                            <a href={tool.strUtil.formatData(item,'linkUrl')}>
                              <img className='swiper-lazy' data-src={tool.strUtil.formatData(item,'bannerUrl')} />
                              <div className="swiper-lazy-preloader"></div>
                            </a>

                          </div>
                    })
                }
          </div>
        );
    }
}

//创建banner组件
class Banner extends Component{
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
        lazyLoadingOnTransitionStart : true,
  			autoplay: 2000,//可选选项，自动滑动
      }
    }
	}

	//接收新的prop
	componentWillReceiveProps(props){
	}
	//组件渲染完成
	componentDidMount(){
    window.onload = () => {
      this.initSwiper();
    }
	}
	/**
	 * 初始化滚动
	 * @return {[type]} [description]
	 */
	initSwiper(){
		var swiper = new Swiper('.component-swiper-container', this.state.info);
	}
	render(){
    var list=this.props.list||[];
		return(
      <div className='component-swiper-container'>
          {
            list.length>0 ? <List list={list}></List> : null
          }
        <div className='swiper-pagination'></div>
      </div>
		)
	}
}
/**
 * 组件属性校正
 * @type {Object}
 */
Banner.propTypes={
  	list: React.PropTypes.array.isRequired,//banner显示的图片列表
    info: React.PropTypes.object //banner相关的配置 非必传入 如info.autoplay
};
module.exports = Banner;