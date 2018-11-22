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
        component: <div></div>, //数据回调给的组件
        inputs: [],//inputs 表单集合
        btnClick: function(){}
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
            //表单change方法
            this.onChange = (value,index,isEmpty,isTrue,errorText) =>{
              let obj={
                value: value,
                isEmpty: isEmpty,
                isTrue: isTrue,
                errorText: errorText
              }
              this.state.inputs[index]=Object.assign({},this.state.inputs[index],obj)
              this.updateBtn();//初始化按钮状态
              this.props.setState(this.state);
            }
            // checkbox 方法
            this.checkChange = (checked) =>{
              this.state.checked= checked;
              this.updateBtn();//初始化按钮状态
              this.props.setState(this.state);
            }
            // 关闭弹窗
            this.closeAlert = ()=>{
                this.state.alertShow = false;//提示框状态
                this.state.alertMsg = '';//提示框文字
                this.props.setState(this.state);
            }

            //初始化按钮状态
            this.updateBtn = () =>{
              let arr=this.filterArray();//返回过滤过的input集合
              let status;
              //input 验证
              for(let i=0;i<arr.length;i++){
                if(arr[i].isEmpty){
                  status=false;
                  break;
                }else{
                  status=true;
                }
              }
              //checkbox 验证
              if(!this.state.checked){
                status=false;
              }
              this.state.btnStatus=status;
            }
            //过滤需要验证的input集合
            this.filterArray = () =>{
              let arr=[];
              let inputs=this.state.inputs;
              for(let i=0;i<inputs.length;i++){
                if(inputs[i].required){
                  arr.push(inputs[i]);
                }
              }
              return arr;
            }
            //初始化inputs集合
            this.initInputs = () =>{
              let arr=setting.inputs;
              let obj={
                value: '',
                isEmpty: true,
                isTrue: false,
                errorText: ''
              }
              for(var i=0;i<arr.length;i++){
                obj=Object.assign(obj,arr[i]);
                arr[i]=obj;
              }
              return arr;
            }
            //初始化按钮点击事件
            this.btnClick = () =>{
              let status;
              let index;
              let arr=this.state.inputs;
              for(let i=0;i<arr.length;i++){
                if(arr[i].isTrue){
                  status=true;
                  index=i;
                }else{
                  status=false;
                  index=i;
                  break;
                }
              }
              //规则验证符合
              if(status){
                setting.btnClick();//调用按钮点击方法
              }else{
                this.state.alertShow=true;
                this.state.alertMsg=arr[index].errorText;
                this.props.setState(this.state);
              }
            }
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
                    this.state.onChange=this.onChange;//input onchange
                    this.state.checkChange=this.checkChange;//checkChange
                    this.state.inputs=this.initInputs();// init inputs
                    this.state.btnClick=this.btnClick;// btnClick
                }
            }

            /**
             * DOM初始化完成后执行回调
             */
            this.redayDOM = () => {
              tool.bussinessUtil.configScreen();//适配屏幕
              tool.bussinessUtil.setTitle(this.state.title);//设置标题
              this.state.loadAnimation=false;
              this.props.setState(this.state);
            }
            this.initState(this.props);
        }
        render() {
            return (
              <div className='application' >
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
            this.redayDOM();
        }
        /**
         * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用
         */
        componentWillReceiveProps(np) {
            var {location} = np;
            var {pathname, search} = location;
            var path = pathname + search;
            this.initState(np);
        }
        /**
         * 在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。
         * 使用该方法可以在组件更新之后操作 DOM 元素。
         */
        componentDidUpdate() {
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
