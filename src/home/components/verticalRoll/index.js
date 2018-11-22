import React, {Component} from 'react';//引入react
import {swiper} from 'swiper';
// import * as tool from 'publicJs';

export default class VerticalRoll extends Component {
    //构建函数
    constructor(props) {
        super(props);
        this.state = {
            info: {
                direction: 'vertical',
                slidesPerView: 1,
                paginationClickable: true,
                spaceBetween: 30,
                mousewheelControl: true,
                autoHeight: true
            }
        }
    }

    //接收新的prop
    componentWillReceiveProps(props) {
    }

    //组件渲染完成
    componentDidMount() {
        this.initSwiper();
    }

    /**
     * 初始化滚动
     * @return {[type]} [description]
     */
    initSwiper() {
        var swiper = new Swiper('.component-vertical-container .swiper-container', this.state.info);
    }

    render() {
        return (
            <div className='component-vertical-container'>
                <div className="swiper-container">
                    <div className='swiper-wrapper'>
                        {
                            React.Children.map(this.props.children, function (child) {
                                return <div className='swiper-slide'>{child}</div>;
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
/**
 * 组件属性校正
 * @type {Object}
 */
VerticalRoll.propTypes = {}
