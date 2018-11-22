import React, { Component, PropTypes } from 'react'
import * as tool from 'publicJs'
import Image from 'image'
import GetPage from 'getPage'
import { Document, Page } from 'react-pdf';
const clientWidth = document.body.clientWidth;
class ProposalTermDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      pafNumber:[],
      code:''
    }
  }

  componentDidMount(){
    console.log(document.body.clientWidth);
    // window.addEventListener('scroll', function () {
    //   //向下滚动
    //   let totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
    //   let documentheight = parseFloat($(document).height());
    //   if (documentheight - totalheight <= 200) {
    //     if(this.state.pageNumber<this.state.numPages)
    //     this.setState({
    //       pageNumber: this.state.pageNumber +1
    //     })
    //   }
    // }.bind(this), false);

    this.props.state.loadAnimation = false;
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    console.log(numPages);

    let pafNumber = [];
    for(let i=1;i<=numPages;i++){
      pafNumber.push(i)
    }
    this.setState({
      numPages,
      pafNumber,
    });
  };

  render() {
    const {
      proposalTermCode
    } = this.props.state.data;
    let source = {url: 'http://jkejt.picchealth.com:89/img/productpdf/'+ proposalTermCode+'.pdf'};
    return (

      <div className='proposalDetail'>
        {
          proposalTermCode &&
          <Document
            file={source}
            loading="Please wait!"
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            {/*<Page pageNumber={this.state.pageNumber}*/}
            {/*width={clientWidth}*/}
            {/*/>*/}
            {
              this.state.pafNumber.map((item,index)=>{
                return(
                  <Page pageNumber={item}
                        width={clientWidth}
                  />
                )
              })
            }
          </Document>
        }

      </div>
    )
  }
}

let mainFun = new ProposalTermDetail();
module.exports = GetPage({
  id:"home",
  component: ProposalTermDetail,
  title:'条款详情',
  attach:{
    // icon:'image/icon/Magnifier.png',
    // width:'20',
    // height:'20',
    // attachClick:mainFun.alertClick
  }
});
