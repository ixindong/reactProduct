import React, { Component, PropTypes } from 'react'
import * as tool from 'publicJs'
import Image from 'image'
import GetPage from 'getPage'
import Alert from 'alert'
import Slider from 'rc-slider';


class ProposalPreview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 50,
    };
  }

  componentDidMount(){
    this.props.state.loadAnimation = false;
  }

  onSliderChange = (value) => {
    console.log(value);
    this.setState({
      value,
    });
  };

  sendEmail = () => {
    console.log('ddddddd',this.props.state);
    this.props.state.alertShow = true;
    this.props.state.alertType = '2';
    this.props.state.alertMsg = '发送到邮箱'+<input type='text'/>;
    this.props.setState(this.props.state);
  };

  render() {
    return (
      <div className='preview'>
        <img src ='image/home/1.jpg' className='headImg' />
        <div className='previewContent'>
          <h5>产品简介</h5>
          <p>百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行
            百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行
            百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行
            百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行
            百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行百万安行
            百万安行百万安行百万安行百万安行百万安行百万安行百</p>
        </div>
        <div className='previewContent'>
          <h5>保障计划</h5>
          <ul className="plan">
            <li>
              <p>交费期限</p>
              <span>0</span>
              元
            </li>
            <li>
              <p>期交保费</p>
              <span>0元</span>
            </li>
            <li>
              <p>保障期限</p>
              <span>0元</span>
            </li>
            <li>
              <p>保险金额</p>
              <span>0元</span>
            </li>
          </ul>
          <div className='hidePlan'>
            <img src="image/proposal/hide.png" />
          </div>
        </div>
        <div className='previewContent'>
          <h5>产品特色</h5>
          <ul className='productFeatur'>
            <li>1.dlkfjslafjlksdfj</li>
            <li>2.dlkfjslafjlksdfj</li>
          </ul>

        </div>
        <div className='previewContent'>
          <h5>保障利益</h5>
          <ul className='productFeatur'>
            <li>1.dlkfjslafjlksdfj</li>
            <li>2.dlkfjslafjlksdfj</li>
          </ul>

        </div>
        <div className='previewContent'>
          <h5>保单利益演示</h5>
          <ul className='interestPlan'>
            <li><label>被保人</label><input type='text' value={this.state.value} />岁时</li>
            <li><label>现金价值</label><span>0元</span></li>
            <li><label>现金价值</label><span>0元</span></li>
            <li><label>现金价值</label><span>0元</span></li>
            <li><label>现金价值</label><span>0元</span></li>
          </ul>
          <div className='sliderBox'>
            <img src='image/proposal/minus.png' />
            <Slider value={this.state.value}
              maximumTrackStyle={{ backgroundColor: '#EDEDED', height: 8 }}
              minimumTrackStyle={{ backgroundColor: '#E60012', height: 8 }}
              onChange={this.onSliderChange}
              handleStyle={{
                height: 20,
                width: 20,
                marginLeft: -14,
                marginTop: -7,
                backgroundColor: '#EB3341',
              }}
            />
            <img src='image/proposal/add.png' />
          </div>
          <div className='interestImg'>
            <img src='image/proposal/Interest.png'  />
            <p>拖动按钮查看不同年龄的保单利益</p>
          </div>

        </div>
        <p className='alert'>温馨提示: 免除保险公司责任条款、犹豫期、解除合同的手续及风险、费用扣除等内容，
          请您仔细阅读保险合同。本演示说明仅供参考，具体保险责任、免除保险公司责任的条款等内容以正式保险合同为准。</p>
        <div className="previewBtnGroup">
          <span>生成PDF</span>
          <span onClick={this.sendEmail.bind(this)}>发送到邮箱</span>
        </div>
        
      </div>
    )
  }
}


let mainFun = new ProposalPreview();
module.exports = GetPage({
  id:"home",
  component: ProposalPreview,
  title:'建议书预览',
  attach:{
    icon:'image/icon/Magnifier.png',
    width:'20',
    height:'20',
    attachClick:mainFun.alertClick
  }
});
