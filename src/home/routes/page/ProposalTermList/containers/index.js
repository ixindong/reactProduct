import React, { Component, PropTypes } from 'react'
import * as tool from 'publicJs'
import Image from 'image'
import GetPage from 'getPage'
import { Document, Page } from 'react-pdf';

class ProposalTermList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
    }
  }

  componentWillMount() {

  }

  componentDidMount(){
    this.props.state.loadAnimation = false;
  }

  openProposalTerm = (item) => {
    this.props.state.data.proposalTermCode = item;
    this.props.setState(this.props.state);
    window.location.href = '#/ProposalTermDetail'
  };

  render() {
    const {
      productTermList
    } = this.props.state.data;
    return (
      <div className='ProposalTermList'>
        <img src ='image/home/1.jpg' className='headImg' />
        <ul>
          {
            productTermList.map((item,index)=>{
              return(
                <li className='termlist' onClick={this.openProposalTerm.bind(this,item.clauseId)}>
                  <span>{item.value}</span>
                  <img  src='image/proposal/right.png'/>
                </li>
              )
            })
          }
        </ul>


      </div>
    )
  }
}

let mainFun = new ProposalTermList();
module.exports = GetPage({
  id:"home",
  component: ProposalTermList,
  title:'条款列表',
  attach:{
    // icon:'image/icon/Magnifier.png',
    // width:'20',
    // height:'20',
    // attachClick:mainFun.alertClick
  }
});
