import React, { Component, PropTypes } from 'react'
import * as tool from 'publicJs'
import Image from 'image'
import GetPage from 'getPage'
class ProposalDetail extends Component {

  componentWillMount () {
    const {
      choiceProduct
    } = this.props.state.data;
    console.log(choiceProduct.code);
    piccAjax('/plan/queryClause',{
      "clauseId":choiceProduct.code
    },result=>{
      console.log(result);
        this.props.state.data.productTermList = result.data;
        this.props.setState(this.props.state);
    },'P')
  }

  componentDidMount(){
    console.log(this.props.state.data.choiceProduct);
    this.props.state.loadAnimation = false;
  }

  openTerm = () => {
    window.location.href = '#/ProposalTermList'
  };


  render() {
    const {
      choiceProduct,
      productTermList
    } = this.props.state.data;
    console.log(choiceProduct,productTermList);
    return (
      <div className='proposalDetail'>
        <img src ='image/home/1.jpg' className='headImg' />
        <h4 className='header'>
          <span>{choiceProduct.name}</span>
          {productTermList && <img src="image/proposal/about.png" className='term' onClick={this.openTerm.bind(this)}/>}
        </h4>
        <div className='contantBox'>
          {
            choiceProduct.attachment_blurb &&
            <div className="contant">
              <h5 className="headTitle"><span></span>产品简介</h5>
              {
                choiceProduct.attachment_blurb.map((item, index) => {
                  return (
                    <p key={index}>
                      {item.text}
                    </p>
                  )
                })
              }
            </div>
          }
          {
            choiceProduct.attachment_features !== '' &&
            <div className="contant">
              <h5 className="headTitle"><span></span>产品特色</h5>
              {
                choiceProduct.attachment_features.map((item,index)=>{
                  return(
                    <p key={index}>
                      {item.text}
                    </p>
                  )
                })
              }
            </div>
          }

        </div>
        <div className="btnGroup">
          制作建议书
        </div>
      </div>
    )
  }
}

let mainFun = new ProposalDetail();
module.exports = GetPage({
  id:"home",
  component: ProposalDetail,
  title:'产品详情',
  attach:{
    // icon:'image/icon/Magnifier.png',
    // width:'20',
    // height:'20',
    // attachClick:mainFun.alertClick
  }
});
