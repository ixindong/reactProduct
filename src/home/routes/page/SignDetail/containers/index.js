import React, { Component, PropTypes } from 'react'
import * as tool from 'publicJs'
import GetPage from 'getPage'
class SignDetail extends Component {

  constructor() {
    super();
    this.state = {
      id:'',
      date:''
    };
  }

  componentWillMount () {
    const {
      insuranceListData
    } = this.props.state.data
    //获取合同号
   // this.getContractNo(insuranceListData.prtNo)
  }

  componentDidMount(){
    this.props.state.loadAnimation = false;
  }

  //获取合同号
  getContractNo = (prtNo) => {
    piccAjax('/insure/api/insure/getSingSucc',{
      "prtNo": prtNo,
    },result=>{
      console.log(result);
      if(result && result.status == '100'){
        this.setState({
          id: result.data
        })
      }
    },'P')
  };

  // 10.回执核销状态查询接口 吕艳朋
  send() {
    const {
      insuranceListData
    } = this.props.state.data;
    // if (this.state.date == '') {
    //   Toast.info("请选择签收日期", 2);
    // } else if (tthis.state.date > this.CurentData()) {
    //   Toast.info("签收日期不能晚于当前日期", 2);
    // }
    // else if (this.state.date < this.CurentData()) {
    //   Toast.info("签收日期不能早于提交日期", 2);
    // }
    // else {
      //检查投保人是否签字
      if(!Validator.checkEmpty(insurance.preview.policyHolderSign.src, '投保人未签字')){
        return false;
      }
      piccAjax('/insure/api/insure/Receipt',{
        "contNo": insuranceListData.prtNo,
        "getpolDate":  this.getNewDtat(this.state.date) ,
        "getpolTime": this.CurentTime(),
        "getpolMan": this.props.user.agentName,
        "sendPolMan": this.props.user.groupAgentCode,
        "getPolOperator": this.props.user.groupAgentCode,
        "manageCom": this.props.user.branchId,
        "agentCode": this.props.user.groupAgentCode,
      },result=>{
        console.log(result);
        this.props.state.alertShow = true;
        this.props.state.alertType = '1';
        this.props.state.alertMsg = result.message;
        this.props.setState(this.props.state);
      },'P')
  }

  // 时间转换成为年月日
  getNewDtat =(data) => {
    let arr = data.split('-');
    return (arr[0] + "年" + arr[1] + "月" + arr[2] + "日");
  };

  CurentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    if(hours<10){
      hours = '0'+hours
    }
    if(minutes<10){
      minutes = '0'+minutes
    }
    if(seconds<10){
      seconds = '0'+seconds
    }
    var r = hours + ":" + minutes + ":" + seconds;
    return (r);
  };
  // CurentData = () => {
  //   var now = new Date();
  //   var year = now.getFullYear();       //年
  //   var month = now.getMonth() + 1;     //月
  //   var day = now.getDate();            //日
  //   var clock = year + "-";
  //   if (month < 10){
  //     clock += "0";
  //   }
  //   clock += month + "-";
  //   if (day < 10){
  //     clock += "0";
  //   }
  //   clock += day + "";
  //   return (clock);
  // }

  render() {
    const {
      insuranceList
    } = this.props.state.data;
    console.log(insuranceList);

    return (
      <div className='SignDetail'>
        <p>本人已收到贵公司发送的家庭保险单电子保险合同文件（保险合同号： {this.state.id}），包括保险单、保险条款、投保资料影印件、理赔服务和客户服务相关资料等，知悉并认可本保险单的全部内容。</p>
        <p>同时，本人再次向贵公司郑重声明：投保书上有关被保险人和投保人情况均属真实，如有虚假，本人愿承担相应的法律责任。</p>
        <p>提示：自您签收保险单之日起有15天的犹豫期。如您在犹豫期内撤销本合同，本公司将无息退您所交的全部保险费（但需扣除10元工本费）。</p>
        <div className='sign'>
          <label>投保人签名：</label><span>点击签名</span>
        </div>
        <div className='sign'>
          <label>合同签收日期：</label><span>选择日期</span>
        </div>
        <p>客户服务热线：95591或4006695518</p>
        <p>公司网址：http://www.picchealth.com</p>
        <p>重要提醒：为确保您的保单权益，请及时拨打本公司服务电话，登录网站或到柜台进行查询，核实保单信息。</p>
        <div className="btnGroup">
          提交
        </div>
      </div>
    )
  }
}

let mainFun = new SignDetail();
module.exports = GetPage({
  id:"home",
  component: SignDetail,
  title:'电子回执',
  attach:{
    // icon:'image/icon/Magnifier.png',
    // width:'20',
    // height:'20',
    // attachClick:mainFun.alertClick
  }
});
