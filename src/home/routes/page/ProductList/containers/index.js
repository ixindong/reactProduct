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

    /***@ XinD 2018/10/29 打开搜索页面 @***/
    searchProduct = () => {
        _this.props.state.data.searchState = true;
        _this.setState({
            searchValue: ''
        });
        if (localStorage.searchedArr) {
            _this.props.state.data.searchedArr = (JSON.parse(localStorage.searchedArr)).slice(_this.state.searchedLength)
        } else {
            _this.props.state.data.searchedArr = []
        }
        _this.props.setState(_this.props.state);
    };

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
        /***@ XinD 2018/11/9 新建投保计划 @***/
        piccAjax('/proposal/creates.json',{
            "applicant": {
                "birthday": "1990-01-01",
                "gender": "M",
                "name": "李莉莉"
            },
            "insurants": [
                {
                    "birthday": "2000-05-24",
                    "gender": "M",
                    "occupationCode": "00206",
                    "name": "给加班费",
                    "occup_BigCode": "8",
                    "occup_SmallCode": "14",
                    "occup_LevelCode": "1",
                    "customer_id": "844598",
                    "taxHospital": null,
                    "email": "",
                    "currInsureType": "在线投保"
                }
            ],
            "owner": '2111010008',
            "loginName":'你是谁',
            "platformId": 2,
            "proposalType":"1"
        },data=>{
            _this.setState({
                planID:data.content.detail
            });
            _this.props.state.data.planID = data.content.detail;
            _this.props.setState(this.props.state)
        });
        /***@ XinD 2018/10/29 查询产品列表 @***/
        if (!this.props.state.data.productList) {
            piccAjax('/plan/list_clause.json', {
                "company": "picc"
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

                    ProductList = ProductList.filter(item => (item.code).substr(0, 2) == localStorage.insurType);

                    this.props.state.data.seeProductList = ProductList;
                    this.props.setState(this.props.state);
                }
            }, 'P')
        }

    }

    /***@ XinD 2018/10/29 tab切换 @***/
    TabTitleClick = (prod, index) => {
        let oldProductList = this.props.state.data.productList;
        this.props.state.data.TabTitleClick = prod;

        let ProductList = oldProductList.filter(item => item.ptype === this.props.state.data.TabTitleClick.productTabCode);
        ProductList = ProductList.filter(item => (item.code).substr(0, 2) == localStorage.insurType);
        this.props.state.data.seeProductList = ProductList;
        this.props.setState(this.props.state);
    };
    /***@ XinD 2018/10/29 选择产品 @***/
    choiceProduct = (prod) => {

        let flag = false;

        let searchedArr = localStorage.searchedArr ? JSON.parse(localStorage.searchedArr) : [];
        if (searchedArr.length != 0) {
            searchedArr.map(item => {
                if (item === this.state.searchValue) {
                    flag = true
                }
            })
        }
        if (!flag) {
            searchedArr.push(this.state.searchValue);
        }
        localStorage.searchedArr = JSON.stringify(searchedArr);


        this.props.state.data.choiceProduct = {
            ...this.props.state.data.choiceProduct,
            sureProduct: prod
        };
        let productList = [];
        productList.push(prod);
        this.props.state.data.insurMap = {
            ...this.props.state.data.insurMap,
            "1":{
                productList:productList
            }
        };
        this.props.setState(this.props.state);
        piccAjax('/plan/list_clause.json',{
            "company": "picc",
            "productId": prod.code,
            "parentIndex": -1
        },Json=>{
            if(Json.content.length != 0){
                _this.setState({
                    seeAddproductList:Json.content
                })
            }
            piccAjax('/plan/view_clause.json',{
                "productId": prod.code,
                "index": -1,
                "planId": _this.state.planID[0]
            },data=>{
                let productData = _this.props.state.data.insurMap[1].productList;
                productData.map((res,index)=>{
                    if(res.abbrName == data.content.name){
                        productData[index] = {
                            ...res,
                            ...data.content
                        }
                    }
                });
                this.props.state.data.insurMap = {
                    ..._this.props.state.data.insurMap,
                    "1":{
                        ..._this.props.state.data.insurMap[1],
                        productList:productData
                    }
                };
                this.props.setState(_this.props.state);
                piccAjax('/plan/rebuild.json',{
                    "planId": _this.props.state.data.planID[0],
                    "detail": _this.detailArr(_this.props.state.data.insurMap[1].productList)
                },v=>{
                    _this.productMerge(v.content.product,_this.props.state.data.insurMap[1].productList,1)
                })
            })
        })
    };
    /***@ XinD 2018/11/9 处理rebuild返回参数 @***/
    productMerge = (data,value,index) =>{
        data.map(prod=>{
            value.map(res=>{
                if(prod.code == res.code){
                    prod = Object.assign(prod,res)
                }
            })
        });
        this.props.state.data.insurMap = {
            ...this.props.state.data.insurMap,
            [index]:{
                ...this.props.state.data.insurMap[index],
                productList:data
            }
        };
        this.props.setState(this.props.state)
    };
    /***@ XinD 2018/11/9 首次请求rebuild组成rebuild请求参数 @***/
    detailArr = (data) =>{
        let Arr = [];
        data.map(prod=>{
            Arr.push(
                {
                    "productId": prod.code,
                    "factors": this.factors(prod)
                }
            )
        });
        return Arr
    };
    /***@ XinD 2018/11/9 首次请求rebuild组成factors参数 @***/
    factors = (data) =>{
        let factors = {};
        data.factors.map(prod=>{
            if(prod.name == 'INSURE' || prod.name == 'PAY'){
                factors = {
                    ...factors,
                    [prod.name]:prod.detail[0][0]
                }
            }else{
                factors = {
                    ...factors,
                    [prod.name]:prod.value
                }
            }

        });
        return factors
    };
    /***@ XinD 2018/10/29 删除单条历史搜索 @***/
    delSearchedArr = (prod) => {
        let searchedArr = JSON.parse(localStorage.searchedArr);
        let newSearchedArr = [];
        searchedArr.map(item => {
            if (item !== prod) {
                newSearchedArr.push(item)
            }
        });
        localStorage.searchedArr = JSON.stringify(newSearchedArr);
        this.props.state.data.searchedArr = newSearchedArr.slice(this.state.searchedLength);
        this.props.setState(this.props.state)
    };
    /***@ XinD 2018/10/29 产品实时模糊搜索 @***/
    searchChange = () => {
        let e = window.event || arguments[0];
        this.setState({
            searchValue: e.target.value
        });
        this.fuzzySearch(e.target.value)
    };
    /***@ XinD 2018/10/29 模糊搜索公共Fun @***/
    fuzzySearch = (value) => {
        let searchedProduct = [];
        this.props.state.data.productList.map(prod => {
            if (value != '' && (prod.name).match(value)) {
                searchedProduct.push(prod)
            }
        });
        this.props.state.data.choiceProduct = {
            ...this.props.state.data.choiceProduct,
            searchedProduct: searchedProduct,
            searchedProductState: true
        };
        this.props.setState(this.props.state)
    };
    /***@ XinD 2018/10/29 搜索历史选择 @***/
    historyClick = (value) => {
        this.setState({
            searchValue: value
        });
        this.fuzzySearch(value)
    };

    /***@ XinD 2018/10/29 下一步 @***/
    nextPage = () => {
        if (this.props.state.data.choiceProduct.sureProduct != '') {
            window.location.href = '#/applicant'
        } else {
            this.props.state.alertShow = true;
            this.props.state.alertType = '1';
            this.props.state.alertMsg = '请选择产品！';
            this.props.setState(this.props.state);
        }
    };

    render() {
        let choiceProduct = this.props.state.data.choiceProduct || [];
        return (
            <div>
                {
                    this.props.state.data.searchState && <div className='search'>
                        <div className='top'>
                            <div className='input'>
                                <img src="image/icon/Magnifier.png" alt=""/>
                                <input type="text" placeholder='搜索产品' value={this.state.searchValue}
                                       onKeyPress={this.keypress.bind(this)} onChange={this.searchChange.bind(this)}/>

                            </div>
                            <span onClick={this.searchCancel.bind(this)}>取消</span>
                        </div>
                        <div className='border'></div>
                        {
                            (choiceProduct.searchedProductState && (choiceProduct.searchedProduct).length != 0) &&
                            <ul className='searchedList'>
                                {
                                    choiceProduct.searchedProduct.map(prod => {
                                        return (
                                            <li onClick={this.choiceProduct.bind(this, prod)}>
                                                <text>{prod.name}</text>
                                                <img src="image/icon/searchedLink.png" alt=""/>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        }
                        {
                            (this.props.state.data.searchedArr && (this.props.state.data.searchedArr).length != 0) &&
                            <div className='history'>
                                <p className='title'>搜索历史</p>
                                <ul>
                                    {
                                        this.props.state.data.searchedArr && this.props.state.data.searchedArr.map(prod => {
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

                            </div>
                        }
                    </div>
                }
                <ul className='tabTitle'>
                    {
                        this.props.state.data.productTab && this.props.state.data.productTab.map((prod, index) => {
                            return (
                                <li onClick={this.TabTitleClick.bind(this, prod, index)}
                                    className={(this.props.state.data.TabTitleClick && this.props.state.data.TabTitleClick.productTabCode == prod.productTabCode) ? 'act' : ''}>
                                    {prod.productTabName}
                                    {
                                        this.props.state.data.TabTitleClick && this.props.state.data.TabTitleClick.productTabCode == prod.productTabCode &&
                                        <span></span>
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
                <ul className='tabContent'>
                    {
                        this.props.state.data.seeProductList && this.props.state.data.seeProductList.map((prod, index) => {
                            return (
                                <li>
                                    <img src={'http://jkejt.picchealth.com:89/img/product/' + '123301' + '.png'}
                                         alt=""/>
                                    <div className='right'>
                                        <span className='title'>{prod.abbrName}</span>
                                        <div className='check'>
                                            {
                                                (this.props.state.data.choiceProduct && (this.props.state.data.choiceProduct.sureProduct.code != prod.code || !this.props.state.data.choiceProduct.sureProduct)) &&
                                                <img src="image/icon/check.png" className='no' alt=""
                                                     onClick={this.choiceProduct.bind(this, prod)}/>
                                            }
                                            {
                                                (this.props.state.data.choiceProduct && (this.props.state.data.choiceProduct.sureProduct.code == prod.code)) &&
                                                <img src="image/icon/actCheck.png" className='act' alt=""/>
                                            }
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className='next' onClick={this.nextPage.bind(this)}>
                    <span style={{float:'right'}}>下一步</span>
                </div>
            </div>
        )
    }
}

let mainFun = new Main();
module.exports = GetPage({
    id: 'home',
    component: Main,
    title: '选择产品',
    attach: {
        icon: 'image/icon/Magnifier.png',
        width: '20',
        height: '20',
        attachClick: mainFun.searchProduct
    }
});
