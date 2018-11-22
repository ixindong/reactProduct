import React, { Component, PropTypes } from 'react'
import * as tool from 'publicJs'
import Image from 'image'
import GetPage from 'getPage'
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';
class insruanceList extends Component {

  constructor() {
    super();
    this.state = {
      search:'',
      currentItem: '0',
    };
  }

  componentWillMount () {
    const {
      choiceProduct
    } = this.props.state.data

  }

  componentDidMount(){
    // console.log(this.props.state.data.choiceProduct)
    this.props.state.loadAnimation = false;
    this.init('0')
  }

  init = (index) => {
    localStorage.usercode = '2111010008';
    piccAjax('/insure/api/insure/getInsuranceList',{
      "login_Account": localStorage.usercode,
      "paramName": this.state.search,
      "pageNO": 1,
      "pageSize": 20,
      "groupStatus": index,
    },result=>{
      console.log(result);
      if(result && result.status == '100'){
        this.props.state.data.insuranceList = result.data;
        this.props.setState(this.props.state);
      }
    },'P')
  };

  /***@ XinD 2018/10/29 tab切换 @***/
  TabTitleClick = (index) => {
    this.setState({
      currentItem: index
    });
    this.init(index)
  };


  //只能删除一个月之后的订单提示消息
  deleteOneMonth = () => {
    this.props.state.alertShow = true;
    this.props.state.alertType = '3';
    this.props.state.alertMsg = '只能删除一个月之后的订单';
    this.props.setState(this.props.state);
  };

  //调用 IScroll refresh 后回调函数
  handleRefresh=(downOrUp, callback) =>{
    console.log(downOrUp)

  };

  onScrollStart = () =>{
    console.log('dddddddddd')
  };

  // 刷新状态，去服务端获取最新状态  ---保单状态查询
  refreshID = (insured) => {
    piccAjax('/insure/api/contract/selPolicyStatus',{
      "prtNo": insured.prtNo,
      "uuid": insured.uuid,
      "tpolicyId": insured.policyId,
    },result=>{
      console.log(result);
      if(result && result.status == '100'){

        for (let i = 0; i < this.props.state.data.insuranceList.length; i++) {
          if (this.props.state.data.insuranceList[i].policyId == insured.policyId) {
            if (result.data != null) {
              this.props.state.data.insuranceList[i].status = result.data;
              this.props.setState(this.props.state);
            }
            break
          }
        }
      }
    },'P')
  };

  // 编辑
  edit(policyId) {
    piccAjax('/insure/api/insure/echo',{
      "tpolicyId": policyId,
    },result=>{
      console.log(result);
      if(result && result.status == '100'){


      }
    },'P')
  }

  //投保单预览
  look(policyId) {
    piccAjax('/insure/policy/previewPolicy',{
      "policyID": policyId,
    },result=>{
      console.log(result);
      if(result && result.status == '100'){
        // this.props.saveInsuranceForServer(
        //   JSON.parse(result.data),
        // );

      }
    },'P')
  }

  // 获取状态的样式是否显示，是否可点击
  getStateButton = (insured) => {
    // 1	投保成功
    // -1	投保失败
    // 53	核保中
    // 50	新单复核
    // 51	已投保
    // 58	查询失败
    // 3	已签单
    // 60	已中止
    // 61	已终止
    // 54	待签单
    // 56	拒保
    // 57	撤保
    // 52	待收费
    // 70	发送中
    // 71	已发送
    // 72	已签收
    // 73	补发中
    // 74	已补发
    // 41	收费成功
    // 42	收费失败
    // 45	收费中
    // 0	未填完
    // 4 待查询
    const i = insured.status;
    return <p className='policeStates'>
      {
        i == 1 &&
        <span onClick={() => {this.refreshID(insured)}}>投保成功</span>
      }
      {
        i == 53 &&
        <span onClick={() => {this.refreshID(insured)}}>核保中</span>
      }
      {
        i == 50 &&
        <span onClick={() => {this.refreshID(insured)}}>新单复核</span>
      }
      {
        i == 51 &&
        <span onClick={() => {this.refreshID(insured)}}>已投保</span>
      }
      {
        i == 58 &&
        <span onClick={() => {this.refreshID(insured)}}>查询失败</span>
      }
      {
        i == 3 &&
        <span onClick={() => {this.refreshID(insured)}}>已签单</span>
      }
      {
        i == 60 &&
        <span onClick={() => {this.refreshID(insured)}}>已中止</span>
      }
      {
        i == 61 &&
        <span onClick={() => {this.refreshID(insured)}}>已终止</span>
      }
      {
        i == 54 &&
        <span onClick={() => {this.refreshID(insured)}}>待签单</span>
      }
      {
        i == 56 &&
        <span onClick={() => {this.refreshID(insured)}}>拒保</span>
      }
      {
        i == 57 &&
        <span onClick={() => {this.refreshID(insured)}}>撤保</span>
      }
      {
        i == 52 &&
        <span onClick={() => {this.refreshID(insured)}}>待收费</span>
      }
      {
        i == 70 &&
        <span onClick={() => {this.refreshID(insured)}}>电子保单发送中</span>
      }
      {
        i == 71 &&
        <span onClick={() => {this.refreshID(insured)}}>电子保单已发送</span>
      }
      {
        i == 72 &&
        <span onClick={() => {this.refreshID(insured)}}>已签收</span>
      }
      {
        i == 73 &&
        <span onClick={() => {this.refreshID(insured)}}>补发中</span>
      }
      {
        i == 74 &&
        <span onClick={() => {this.refreshID(insured)}}>已补发</span>
      }
      {
        i == 41 &&
        <span onClick={() => {this.refreshID(insured)}}>收费成功</span>
      }
      {
        i == 42 &&
        <span onClick={() => {this.refreshID(insured)}}>收费失败</span>
      }
      {
        i == 45 &&
        <span onClick={() => {this.refreshID(insured)}}>核心收费中</span>
      }
      {
        i == -1 &&
        <span onClick={() => {this.refreshID(insured)}}>投保失败</span>
      }
      {
        i == 55 &&
        <span onClick={() => {this.refreshID(insured)}}>签单失败</span>
      }
      {
        i == 4 &&
        <span onClick={() => {this.refreshID(insured)}}>待查询</span>
      }
    </p>
  };

  //保单状态编辑or查看
  getLook = (item) => {
    const status = item.status;
    if (status == 0) {
      return (
        <span className='btnItem' onClick={() => {this.edit(item.policyId)}}>未填完</span>
      )
    } else if (status !== 58) {
      return (
        <span className='btnItem' onClick={() => {this.look(item.policyId)}}>预览</span>
      )
    }

  };

  getFail = (item) => {
    //投保失败
    const status = item.status;
    if (status == -1) {
      return (
        <span className='btnItem' onClick={() => {this.edit(item.policyId)}}>编辑</span>
      )
    }
  };

  // 获取发送电子保单按钮的样式是否显示，是否可点击
  getSendV = (item) => {
    const status = item.status;
    //已签单并且不是纸质保单
    if (status == 3 && item.policyType == '0') {
      return (
        <span className='btnItem' onClick={() => {
          piccAjax('/insure/api/contract/policySend',{
            "prtNo": item.prtNo,
            "tpolicyId": item.policyId,
          },result=>{
            console.log(result);
            if(result && result.status == '100'){
              this.refreshID(item);
              this.props.state.alertShow = true;
              this.props.state.alertType = '1';
              this.props.state.alertMsg = result.message;
              this.props.setState(this.props.state);
            }
          },'P')
        }}>发送</span>
      )
    }
  };

  // 获取签单的样式是否显示，是否可点击
  getSign = (item) => {
    const status = item.status;
    //签单失败\待签单状态
    if (status == 54 || status == 55 || status == 41) {
      return (
        <span
          className='btnItem'
          onClick={() => {
            piccAjax('/insure/signBill/simplePolicy',{
              tpolicyId: item.policyId,
              prtNo:item.contNo
            },result=>{
              console.log(result);
              if(result && result.status == '100'){
                if (result.data == '3') {
                  // 签单成功
                  this.init();
                }
              }
              this.props.state.alertShow = true;
              this.props.state.alertType = '1';
              this.props.state.alertMsg = result.message;
              this.props.setState(this.props.state);
            },'P')
          }}>
          签单
        </span>
      )
    }
  };
  // 签单回执
  getSignV = (item) => {
    const status = item.status;
    //已发送或者已签收单子保单
    if (status == 71) {
      return (
        <span
          className='btnItem'
          onClick={() => {

            piccAjax('/insure/api/insure/echo',{
              "tpolicyId": item.policyId,
            },result=>{
              console.log(result);
              if(result && result.status == '100'){
                const idNo=result.data.applicant[0].idNo;
                this.props.state.insuranceListData = item;
                this.props.setState(this.props.state);
                // this.props.saveInsuranceForm({
                //   preview: {
                //     policyHolderSign: {
                //       src: '',
                //       secMsg: ''
                //     }
                //   }
                // })
                // this.props.saveSearchInsuranceForm({
                //   selsecinsured: {
                //     ...item,
                //     idNo:idNo
                //   },
                // });
                // this.props.navigation.navigate('SignDetail')

              }
            },'P')
          }}>
          回执核销
        </span>
      )
    }
    return null;
  };

  // 获取支付的样式是否显示，是否可点击
  getPay = (item) =>{
    const status = item.status;
    if (status == 52 || status == 42) {
      return (
        <span
          className='btnItem'
          onClick={() => {
            piccAjax('/insure/api/insure/echo',{
              "tpolicyId": item.policyId,
            },result=>{
              console.log(result);
              if(result && result.status == '100'){


              }
            },'P')
          }}>
          支付
        </span>
      )
    }
  };

  //只能删除一个月之后的订单
  getMouth =(date) =>{
    let arr = date.split('-');
    let year = arr[0]; //获取当前日期的年份
    let month = arr[1]; //获取当前日期的月份
    let day = arr[2]; //获取当前日期的日
    let days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    let nextYear = year;
    let nextMonth = parseInt(month);

    if (nextMonth == 13) {
      nextYear = parseInt(nextYear) + 1;
      nextMonth = 1;
    }
    let day2 = day.substring(0,2);
    let nextDay = new Date(nextYear, nextMonth, 0);
    nextDay = nextDay.getDate();
    if (day2 > nextDay) {
      day2 = nextDay;
    }
    if (nextMonth < 10) {
      nextMonth = '0' + nextMonth;
    }
    let t2=new Date(nextYear,nextMonth,day2);
    let currentDate = new Date();
    let isDelete = false;
    if(currentDate.getTime()>t2.getTime()){
      isDelete = true
    }
    return isDelete;
  };


  render() {
    const {
      insuranceList
    } = this.props.state.data;
    console.log(insuranceList);

    return (
      <div className='insuranceList'>
        <ul className='tabTitle'>
          <li className={(this.state.currentItem == '0') ? 'act' : ''} onClick={this.TabTitleClick.bind(this, '0',)}>提交前</li>
          <li className={(this.state.currentItem == '1') ? 'act' : ''} onClick={this.TabTitleClick.bind(this, '1',)}>提交后</li>
          <li className={(this.state.currentItem == '2') ? 'act' : ''} onClick={this.TabTitleClick.bind(this, '2',)}>核保后</li>
        </ul>

        {/*<ReactIScroll iScroll={iScroll}*/}
          {/*// options={{scrollbars: true,robeType:3}}*/}
                      {/*handleRefresh={this.handleRefresh.bind(this)}*/}
                      {/*onScrollStart = {this.onScrollStart()}*/}
        {/*>*/}
          <ul >
            {
              insuranceList && insuranceList.map((item,index)=>{
                let isDelete = this.getMouth(item.modifyTime);
                return(
                  <li className='insruanceItem' key={index}>
                    <h6>
                      <img src='image/icon/icon-user00.png' />
                      <b>{item.applicantName}</b>
                      <span className='time'>{item.modifyTime}</span>
                      {
                        this.state.currentItem == '0' && (isDelete ? <img src='image/insuranceList/delete-icon.png' />:<img src='image/insuranceList/delete-dis.png' onClick={this.deleteOneMonth.bind(this)} />)
                      }
                      {
                        this.state.currentItem !== '0' && this.getStateButton(item)
                      }

                    </h6>
                    <p className='productItem'>
                      <img src='image/home/1.jpg'/>
                      <span>{item.productName}</span>
                    </p>
                    <p className='productTotal'>首期/趸交保险费合计:<span>{item.premium}</span>元</p>
                    <div className='btnGroup'>
                      {/*保单可以编辑or查看*/}
                      {this.getLook(item)}
                      {/*提交后投保失败可编辑*/}
                      {this.getFail(item)}
                      {/*发送电子保单*/}
                      {this.getSendV(item)}
                      {/*签单按钮*/}
                      {this.getSign(item)}
                      {/*签单回执*/}
                      {this.getSignV(item)}
                      {/*支付按钮*/}
                      {this.getPay(item)}
                    </div>
                  </li>
                )
              })

            }
          </ul>
        {/*</ReactIScroll>*/}



      </div>
    )
  }
}

let mainFun = new insruanceList();
module.exports = GetPage({
  id:"home",
  component: insruanceList,
  title:'投保单',
  attach:{
    icon:'image/icon/Magnifier.png',
    width:'20',
    height:'20',
    attachClick:mainFun.alertClick
  }
});
