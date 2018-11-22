import React, {Component, PropTypes} from 'react'
import * as tool from 'publicJs'
import GetPage from 'getPage'

class Main extends Component {
    constructor() {
        super();
        this.state = {
            searchedLength: -5,
            searchValue: ''
        };
    }

    /***@ XinD 2018/10/29 取消搜索 @***/
    searchCancel = () => {
        this.props.state.data.searchState = false;
        this.props.state.data.choiceProduct = {
            ...this.props.state.data.choiceProduct,
            searchedProduct: [],
            searchedProductState: false
        };
        this.props.setState(_this.props.state);
    };

  componentDidMount() {
    /***@ XinD 2018/10/29 重新定义全局this @***/
    window._this = this;

    this.props.state.loadAnimation = false;

    if (localStorage.searchedArr) {
        this.props.state.data.searchedArr = (JSON.parse(localStorage.searchedArr)).slice(this.state.searchedLength)
    } else {
        this.props.state.data.searchedArr = []
    }
    if(!this.props.state.data.choiceProduct){
      this.props.state.data.choiceProduct = {};
      this.props.state.data.choiceProduct = {
          ...this.props.state.data.choiceProduct,
          sureProduct: ''
      };
    }
    this.init()
  }

  //产品列表
  init = () => {
    console.log(_this.state.searchValue);
    /***@ XinD 2018/10/29 查询产品列表 @***/
    piccAjax('/plan/list_clause.json', {
      "company": "picc",
      "pname": _this.state.searchValue
    }, data => {
      if (data && data.result == 'success') {
        this.props.state.data.productList = data.content;
        this.props.state.data.TabTitleClick = {
          productTabName: '医疗保险',
          productTabCode: 'medical'
        };

        this.props.state.data.productTab = [
          {
            productTabName: '医疗保险',
            productTabCode: 'medical'
          }, {
            productTabName: '疾病保险',
            productTabCode: 'thunder'
          }, {
            productTabName: '意外保险',
            productTabCode: 'accident'
          }, {
            productTabName: '分红保险',
            productTabCode: 'common'
          }
        ];

        let oldProductList = data.content;
        let ProductList = oldProductList.filter(item => item.ptype === 'medical');

        // ProductList = ProductList.filter(item => (item.code).substr(0,2) == localStorage.insurType);
        console.log(ProductList);
        this.props.state.data.seeProductList = ProductList;
        this.props.setState(this.props.state);
      }
    },'P')

  };

  //tab切换
  TabTitleClick = (prod,index) =>{
    let oldProductList = this.props.state.data.productList;
    this.props.state.data.TabTitleClick = prod;

    let ProductList = oldProductList.filter(item => item.ptype === this.props.state.data.TabTitleClick.productTabCode );
    // ProductList = ProductList.filter(item => (item.code).substr(0,2) == localStorage.insurType);
    this.props.state.data.seeProductList = ProductList;
    this.props.setState(this.props.state);
  };
  //选择产品
  choiceProduct = (prod) =>{
    this.props.state.data.choiceProduct = prod;
    this.props.setState(this.props.state);
    window.location.href = '#/ProposalDetail'
  };
  //键盘回车
  keypress = (e) => {
    console.log(localStorage.searchProductArr);
    if (e.which == 13){
      this.init();
      let searchProductArr = localStorage.searchProductArr?JSON.parse(localStorage.searchProductArr):[];
      searchProductArr.push(e.target.value);
      localStorage.searchProductArr = JSON.stringify(searchProductArr);

      _this.props.state.data.searchState = false;
      _this.props.setState(_this.props.state);
      // this.props.state.data.productList.map(prod => {
      //   if ((prod.name).match(e.target.value)) {
      //
      //   }
      // })
    }
    this.props.setState(this.props.state)
  };
  /***@ XinD 2018/10/29 打开搜索页面 @***/
  searchProduct = () => {
    _this.props.state.data.searchState = true;
    _this.setState({
      searchValue: ''
    });
    //热门搜索
    piccAjax('/plan/getProductHots',{}, result => {
      console.log(result);
      if (result && result.status == '100') {
        _this.props.state.data.hotList = result.data;
        _this.props.setState(_this.props.state);
      }
    },'P','GET')
  };

  //产品查询返回产品列表页
  searchProductResult = (prod) => {
    _this.props.state.data.searchState = false;

  };

  /***@ XinD 2018/10/29 删除单条历史搜索 @***/
  delSearchedArr = (prod) => {
    console.log(prod);
    let searchProductArr = JSON.parse(localStorage.searchProductArr);
    let newSearchedArr = [];
    searchProductArr.map(item => {
      if (item !== prod) {
        newSearchedArr.push(item)
      }
    });
    localStorage.searchProductArr = JSON.stringify(newSearchedArr);
    this.props.state.data.searchProductArr = newSearchedArr.slice(this.state.searchedLength);
    this.props.setState(this.props.state)
  };

  /***@ XinD 2018/10/29 产品实时模糊搜索 @***/
  searchChange = (e) => {
    // let e = window.event || arguments[0];
    this.setState({
      searchValue: e.target.value
    });
  };
  /***@ XinD 2018/10/29 搜索历史选择 @***/
  historyClick = (value) => {
    console.log(value);
    this.setState({
      searchValue: value
    }, () => {
      this.init();
      this.props.state.data.searchState = false;
      this.props.setState(this.props.state)
    });

  };
  //清空所有历史搜索记录
  cleanHistory = () => {
    localStorage.removeItem('searchProductArr');
    this.props.state.data.searchProductArr = [];
    this.props.setState(this.props.state)
  };

  render() {
    const {
      choiceProduct,
    } = this.props.state.data;
    return (
      <div className='proposal'>
        {
          this.props.state.data.searchState && <div>
            <div className='proposalSearch'>
              <div className='top'>
                <div className='input'>
                  <img src="image/icon/Magnifier.png" alt=""/>
                  <input type="text" placeholder='搜索产品' value={this.state.searchValue}
                         onKeyPress={this.keypress.bind(this)} onChange={this.searchChange.bind(this)}/>
                </div>
                <span onClick={this.searchCancel.bind(this)}>取消</span>
              </div>
              <div className='border'></div>
            </div>
            <div className='hotList'>
              <p>热门搜索</p>
              <ul>
                {
                  this.props.state.data.hotList && this.props.state.data.hotList.map((item,index)=>{
                    return(
                      <li onClick={this.historyClick.bind(this,item.pname)}>{item.pname}</li>
                    )
                  })
                }
              </ul>
            </div>
            {
              (localStorage.searchProductArr && (JSON.parse(localStorage.searchProductArr)).length != 0) &&
              <div className='history'>
                <p className='title'>搜索历史</p>
                <ul>
                  {
                    localStorage.searchProductArr && JSON.parse(localStorage.searchProductArr).map((prod,index)=>{
                      return (
                        <li>
                          <img src="image/icon/Clock.png" alt="" className='Clock'
                               onClick={this.historyClick.bind(this, prod)}/>
                          <p onClick={this.historyClick.bind(this, prod)}>{prod}</p>
                          <img src="image/icon/cha.png" alt="" className='cha'
                               onClick={this.delSearchedArr.bind(this, prod)}/>
                        </li>
                      )
                    })
                  }
                </ul>
                <div className='clean'>
                  <span onClick={this.cleanHistory.bind(this)}>清空搜索记录</span>
                </div>
              </div>
            }
          </div>
        }

        {
          !this.props.state.data.searchState &&
          <div>
            <ul className='tabTitle'>
              {
                this.props.state.data.productTab && this.props.state.data.productTab.map((prod,index)=>{
                  return(
                    <li onClick={this.TabTitleClick.bind(this,prod,index)} className={(this.props.state.data.TabTitleClick&&this.props.state.data.TabTitleClick.productTabCode == prod.productTabCode) ? 'act' :''}>
                      {prod.productTabName}
                      {
                        this.props.state.data.TabTitleClick&&this.props.state.data.TabTitleClick.productTabCode == prod.productTabCode && <span></span>
                      }
                    </li>
                  )
                })
              }
            </ul>
            <ul className='tabContent'>
              {
                this.props.state.data.seeProductList &&
                this.props.state.data.seeProductList.map((prod,index)=>{
                  return(
                    <li onClick={this.choiceProduct.bind(this,prod)}>
                      <img src={'http://jkejt.picchealth.com:89/img/product/' + '123301' + '.png'} alt=""/>
                      <div className='right'>
                        <span className='title'>{prod.abbrName}</span>
                        <p>{prod.attachment_blurb!='' && prod.attachment_blurb[0].text}</p>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        }


      </div>
    )
  }
}

let mainFun = new Main();
module.exports = GetPage({
  id:'home',
  component: Main,
  title:'选择产品',
  attach:{
    icon:'image/icon/Magnifier.png',
    width:'20',
    height:'20',
    attachClick:mainFun.searchProduct
  }
});
