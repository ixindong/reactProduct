import React, { Component, PropTypes } from 'react'
import GetInput from 'getInput'
import InputGroup from 'inputGroup'
import Input from 'input'
import Btn from 'btn'
import * as tool from 'publicJs'
let _this;
class Main extends Component {
  componentDidMount() {
    _this = this;
    console.log(this.props)
  }
  render() {
    return (
      <div>
        <InputGroup>
          <Input type='number' dataType='telephone'  onChange={this.props.state.onChange} index='0'></Input>
        </InputGroup>
        <InputGroup>
          <Input type='password'  dataType='password'  onChange={this.props.state.onChange} index='1'></Input>
        </InputGroup>
        <InputGroup>
          <Input type='number' dataType='money'
            onChange={this.props.state.onChange} index='2' startMoney='10' endMoney='80'></Input>
        </InputGroup>
        <Btn type='1' size='1' status={this.props.state.btnStatus} onClick={this.props.state.btnClick}>提交</Btn>
      </div>
    )
  }
}

//提交事件
let btnClick = () =>{
  _this.props.state.alertShow = true;
  _this.props.state.alertMsg = '成功';
  _this.props.setState(_this.props.state);
}

module.exports=GetInput({
    id: 'demo1',  //应用关联使用的redux
    component: Main, //接收数据的组件入口
    inputs: [
      {
        'required': true
      },
      {
        'required': true
      },
      {
        'required': true
      },
    ],//多个表单集合
    btnClick: btnClick
});
