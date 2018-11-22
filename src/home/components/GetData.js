import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../actions/';
import * as tool from 'publicJs';
import { createSelector } from 'reselect';
import Loading from 'loading';//loading组件
import Alert   from 'alert';//alert组件
/**
 * 模块入口方法
 *
 * @param {Object} mySetting
 * @returns
 */
const Main = (mySetting) => {
    var setting = {
        id: '', //应用唯一id表示
        type: 'get', //请求类型
        url: '', //请求地址
        stop: false, //true 拦截请求，false不拦截请求
        data: null, //发送给服务器的数据
        component: <div></div>, //数据回调给的组件
        success: (state) => { return state; }, //请求成功后执行的方法
        error: () => { return state; } //请求失败后执行的方法
    };
    Object.assign(setting,mySetting);

    /**
     * 组件入口
     *
     * @class Index
     * @extends {Component}
     */
    class Index extends Component {
        constructor(props) {
            super(props);
            /**
             * 初始化状态
             *
             * @param {Object} props
             */
            this.initState = (props) => {
                var {state, location} = props;
                var {pathname, search} = location;
                this.path = pathname + search;
                if (typeof state.path[this.path] === 'object' && state.path[this.path].path === this.path) {
                    this.state = state.path[this.path];
                } else {
                    this.state = Object.assign(state.defaults); //数据库不存在当前的path数据，则从默认对象中复制，注意：要复制对象，而不是引用
                    this.state.path = this.path;
                }
            }
            // 关闭弹窗
            this.closeAlert = ()=>{
                this.state.alertShow = false;//提示框状态
                this.state.alertMsg = '';//提示框文字
                this.props.setState(this.state);
            }
            /**
             * DOM初始化完成后执行回调
             */
            this.redayDOM = () => {
                var {success, error} = this.props.setting;
                var {scrollX, scrollY} = this.state;
                if (this.get) return false; //已经加载过
                window.scrollTo(scrollX, scrollY); //设置滚动条位置
                if (this.testStop()) return false; //请求被拦截
                let successCall = (res,xhr) =>{
                  this.state.data = res.data;//数据
                }
                this.get = tool.dataUtil.getData(this,this.getUrl(),setting.type,this.getData(),successCall);
            }
            /**
             * 组件卸载前执行一些操作
             */
            this.unmount = () => {
                if (typeof this.get != 'undefined') {
                    this.get.end();
                    delete this.get;
                }
                this.state.scrollX = window.scrollX; //记录滚动条位置
                this.state.scrollY = window.scrollY;
                this.state.loadAnimation = true; //loading为true
                this.props.setState(this.state);
            }

            /**
             * 获取ajax 请求url
             *
             * @returns Object
             */
            this.getUrl = () => {
                var {url} = this.props.setting;
                if (typeof url === 'function') {
                    return url(this.props, this.state);
                } else if (url && typeof url === 'string') {
                    return url;
                } else {
                    return this.props.location.pathname;
                }
            }

            /**
             * 获取要发送的数据
             *
             * @returns
             */
            this.getData = () => {
                var {data} = this.props.setting;
                if (typeof data === 'function') {
                    return data(this.props, this.state);
                } else if (data && typeof data === 'string') {
                    return data;
                } else {
                    return this.props.location.query;
                }
            }

            /**
             * 是否要拦截请求
             *
             * @returns
             */
            this.testStop = () => {
                var {stop} = this.props.setting;
                if (typeof stop === 'function') {
                    return stop(this.props, this.state);
                }
                return stop;
            }
            this.initState(this.props);
        }
        render() {
            return (
              <div className='application'>
                <this.props.setting.component {...this.props} state={this.state} />
                <Alert show={this.state.alertShow} msg={this.state.alertMsg} closeAlert={this.closeAlert}></Alert>
                <Loading loadAnimation={this.state.loadAnimation}></Loading>
              </div>
            )
        }
        /**
         * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
         * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
         * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
         */
        componentDidMount() {
            tool.bussinessUtil.setTitle(this.state.title);//设置标题
            tool.bussinessUtil.configScreen();//适配屏幕
            this.redayDOM();
        }
        /**
         * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用
         */
        componentWillReceiveProps(np) {
            var {location} = np;
            var {pathname, search} = location;
            var path = pathname + search;
            if (this.path !== path) {
                this.unmount(); //地址栏已经发生改变，做一些卸载前的处理
            }
            this.initState(np);
        }
        /**
         * 在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。
         * 使用该方法可以在组件更新之后操作 DOM 元素。
         */
        componentDidUpdate() {
            this.redayDOM();
        }
        /**
         * 在组件从 DOM 中移除的时候立刻被调用。
         * 在该方法中执行任何必要的清理，比如无效的定时器，
         * 或者清除在 componentDidMount 中创建的 DOM 元素
         */
        componentWillUnmount() {
            this.unmount(); //地址栏已经发生改变，做一些卸载前的处理
        }

    }
    Index.defaultProps = { setting }
    let pageState = (state) => state[setting.id];
    /**
    * 记忆state
    */
    let stateSelector = createSelector(
      [pageState],
      (state) => {
        return {state: state}
      }
    );
    return connect(stateSelector, action(setting.id))(Index); //连接redux
}


export default Main;
