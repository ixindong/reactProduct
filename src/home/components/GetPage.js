import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../actions/';
import * as tool from 'publicJs';
import { createSelector } from 'reselect';
import Loading from 'loading';//loading组件
import Alert   from 'alert';//alert组件
import Banner from 'banner'
import Header from 'header'
/**
 * 模块入口方法
 *
 * @param {Object} mySetting
 * @returns
 */
const Main = (mySetting) => {
    var setting = {
        id: '', //应用唯一id表示
        component: <div></div>, //数据回调给的组件,
        title:''
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
                    this.state = Object.assign({},state.defaults); //数据库不存在当前的path数据，则从默认对象中复制，注意：要复制对象，而不是引用
                    this.state.path = this.path;
                }
            };
            // 关闭弹窗
            this.closeAlert = ()=>{
                this.state.alertShow = false;//提示框状态
                this.state.alertMsg = '';//提示框文字
                this.props.setState(this.state);
            };
            /**
             * DOM初始化完成后执行回调
             */
            this.redayDOM = () => {
                if(!this.state.loadAnimation){
                    this.state.loadAnimation=false;
                    this.props.setState(this.state);
                    tool.bussinessUtil.configScreen();//适配屏幕
                    var {scrollX, scrollY} = this.state;
                    window.scrollTo(scrollX, scrollY); //设置滚动条位置
                }else{
                    tool.bussinessUtil.configScreen();//适配屏幕
                    var {scrollX, scrollY} = this.state;
                    window.scrollTo(scrollX, scrollY); //设置滚动条位置
                }
            };
            /**
             * 组件卸载前执行一些操作
             */
            this.unmount = () => {
                tool.bussinessUtil.setTitle(this.state.title);//设置标题
                this.state.scrollX = window.scrollX; //记录滚动条位置
                this.state.scrollY = window.scrollY;
                this.state.loadAnimation = true; //loading为true
                this.props.setState(this.state);
            };
            this.initState(this.props);
        }
        render() {


            return (
              <div className={setting.title?'application applicationTop':'application'}>
                  {
                      setting.title && <Header title={setting.title} attachClick={setting.attach.attachClick} clickBack={this.clickBack.bind(this)} attach={setting.attach} iconWidth={(setting.attach.width/22.08) + 'rem'} iconHeight={(setting.attach.height/22.08) + 'rem'}></Header>
                  }
                <this.props.setting.component {...this.props} state={this.state} />

                <Alert handleClick={this.state.alertClick} show={this.state.alertShow} type={this.state.alertType} msg={this.state.alertMsg} closeAlert={this.closeAlert}></Alert>
                <Loading loadAnimation={this.state.loadAnimation}></Loading>
              </div>
            )
        }
        //返回上一步
        clickBack(){
            this.props.router.goBack()
        }
        /**
         * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
         * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
         * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
         */
        componentDidMount() {
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
    Index.defaultProps = { setting };
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
};


export default Main;
