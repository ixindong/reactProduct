import React, {Component, PropTypes} from 'react'
import * as tool from 'publicJs'
import GetPage from 'getPage'
import MailList from 'MailList'
import DatePicker from 'react-mobile-datepicker';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            headertitle: '投保人',
            MailListState: false,
            CustomerLenght: 10000,
            CustomerPage: 1,
            CustomerList: '',
            actCustomerImg: 'image/icon/Magnifier.png',
            CustomerImg: 'image/icon/MailList.png',
            relationList: '',
            selectBoxData: {},
            six: [
                {
                    code: '0',
                    dict_name: '男'
                }, {
                    code: '1',
                    dict_name: '女'
                }
            ],
            Payment: [
                {
                    text: '1、公费医疗',
                    code: '公费医疗'
                }, {
                    text: '2、社会医疗保险',
                    code: '社会医疗保险'
                }, {
                    text: '3、商业医疗保险',
                    code: '商业医疗保险'
                }, {
                    text: '4、自费',
                    code: '自费'
                },
            ],
            orInsurance: [
                {
                    text: '是',
                    code: '是'
                }, {
                    text: '否',
                    code: '否'
                }
            ],
            orBenefits: [
                {
                    text: '是',
                    code: '是'
                }, {
                    text: '否',
                    code: '否'
                }
            ],
            remarksInput: [
                {
                    text: '是',
                    code: '1'
                }, {
                    text: '否',
                    code: '2'
                }
            ],
            ApplicantArr: ['relation', 'name', 'six', 'NationalityList', 'birthdayTime', 'maritalList', 'idType1List', 'cardNum', 'cardInvalid', 'workUnit', 'job', 'occupatioBig', 'occupatioSmall', 'income', 'provinceList', 'cityList', 'countyList', 'Street', 'Community', 'postalCode', 'Payment', 'orInsurance', 'orBenefits', 'remarksInput']
        };
    }


    componentDidMount() {
        window._this = this;
        let relationList = [];
        let maritalList = [];
        let idType1List = [];
        let crossSellingTypeList = [];
        this.props.state.loadAnimation = false;
        this.props.setState(this.props.state);
        /***@ XinD 2018/10/31 查询已建客户 @***/
        piccAjax('/customerInfo/QueryCustomerList', {
            "loginAccount": "2111010008",
            "name": "",
            "endTime": "",
            "startTime": ""
        }, data => {
            if (data && data.status) {
                _this.setState({
                    CustomerList: data.data
                })
            } else {
                _this.props.state.alertShow = true;
                _this.props.state.alertType = '1';
                _this.props.state.alertMsg = '查询客户列表失败！';
                _this.props.setState(this.props.state);
            }
        });
        piccAjax('/insure/api/insureSet/getDropdown', {}, data => {
            if (data.status == 100) {
                data.data.map(prod => {
                    if (prod.dict_code == 'relation') {
                        relationList.push(prod)
                    } else if (prod.dict_code == 'marital') {
                        maritalList.push(prod)
                    } else if (prod.dict_code == 'idType1') {
                        idType1List.push(prod)
                    } else if (prod.dict_code == 'crossSellingType') {
                        crossSellingTypeList.push(prod)
                    }
                });
                _this.setState({
                    relationList: relationList,
                    maritalList: maritalList,
                    idType1List: idType1List,
                    crossSellingTypeList: crossSellingTypeList,
                })
            }
        });
        piccAjax('/insure/api/insureSet/getNationalityList', {}, data => {
            _this.setState({
                NationalityList: data.data.nationList1,
                regionList: data.data.nationList2,
                cardTypeList: data.data.nationList3,
            })
        });

        piccAjax('/insure/api/insureSet/getOccupList', {}, data => {
            let occupatioBig = [];
            let occupatioSmall = [];
            data.data.map(prod => {
                if (prod.type == 1) {
                    occupatioBig.push(prod)
                } else if (prod.type == 2) {
                    occupatioSmall.push(prod)
                }
            });
            _this.setState({
                occupatioBig: occupatioBig,
                occupatioSmall: occupatioSmall,
            })
        });
        piccAjax('/insure/api/insureSet/getAddressAll', {}, data => {
            let provinceList = [];
            let cityList = [];
            let countyList = [];
            data.data.map(prod => {
                if (prod.type == 1) {
                    provinceList.push(prod)
                } else if (prod.type == 2) {
                    cityList.push(prod)
                } else {
                    countyList.push(prod)
                }
            });
            _this.setState({
                provinceList: provinceList,
                cityList: cityList,
                countyList: countyList,
            })
        })
    }

    /***@ XinD 2018/10/29 通讯录 @***/
    MailList = () => {
        _this.setState({
            MailListState: true,
            CustomerImg: 'image/icon/Magnifier.png'
        }, () => {
        })
    };
    /***@ XinD 2018/10/31 已建客户选择单条客户 @***/
    sureCustomer = (data) => {
        this.setState({
            sureCustomer: data
        })
    };
    /***@ XinD 2018/10/31 已建客户确定、取消按钮 @***/
    stateClick = (data) => {
        if(data == true){
            let _this = this;
            if (this.state.sureCustomer) {
                piccAjax('/customerInfo/queryCustomerInfo', {
                    "customerId": this.state.sureCustomer.customerId
                }, Json => {
                    if (Json.status == 100) {

                        _this.props.state.data.Applicant = {
                            ..._this.props.state.data.Applicant,
                            ApplicantCustomer: Json.data
                        };
                        let ApplicantCustomer = Json.data;

                        _this.props.state.data.Applicant = {
                            ..._this.props.state.data.Applicant,
                            name: ApplicantCustomer.name,
                            six: {
                                code: ApplicantCustomer.genderCode
                            },
                            NationalityList: {
                                code: ApplicantCustomer.nationalityId
                            },
                            birthdayTime: ApplicantCustomer.birthday,
                            maritalList: {
                                code: ApplicantCustomer.marriage
                            },
                            idType1List: {
                                code: ApplicantCustomer.idType2
                            },
                            cardNum: ApplicantCustomer.idNo,
                            cardInvalid: ApplicantCustomer.idEndDate,
                            workUnit: ApplicantCustomer.enterprise,
                            job: ApplicantCustomer.office,
                            occupatioBig: {
                                code: ApplicantCustomer.occupBigcode,
                                id: ApplicantCustomer.occupBigcode
                            },
                            occupatioSmall: {
                                code: ApplicantCustomer.occupSmallcode,
                                id: ApplicantCustomer.occupSmallcode,
                                occupCode: ApplicantCustomer.occupationCode,
                                occupLevel: ApplicantCustomer.occupLevelcode
                            },
                            income: ApplicantCustomer.salary,
                            provinceList: {
                                addressCode: ApplicantCustomer.provincecode,
                                code: ApplicantCustomer.provincecode
                            },
                            cityList: {
                                addressCode: ApplicantCustomer.citycode,
                                code: ApplicantCustomer.citycode
                            },
                            countyList: {
                                code: ApplicantCustomer.areacode
                            },
                            Street: ApplicantCustomer.street,
                            Community: ApplicantCustomer.community,
                            postalCode: ApplicantCustomer.zipcode,
                            telephone: ApplicantCustomer.phone,
                            cellphone: ApplicantCustomer.mobile,
                            email: ApplicantCustomer.email,
                            Payment: {
                                index: ApplicantCustomer.paystyle
                            },
                            orInsurance: {
                                index: ApplicantCustomer.refused
                            },
                            orBenefits: {
                                index: ApplicantCustomer.haved
                            },
                            remarksInput: {
                                index: ApplicantCustomer.insuranceRemarkIf,
                                Remarks: ApplicantCustomer.insuranceRemarkIf
                            }

                        };
                        _this.props.setState(this.props.state);
                        console.log(_this.props.state.data.Applicant, 'ApplicantCustomer');

                        _this.setState({
                            MailListState: false,
                            CustomerImg: 'image/icon/Magnifier.png'
                        }, () => {
                        })
                    }
                });

            } else {
                this.props.state.alertShow = true;
                this.props.state.alertType = '1';
                this.props.state.alertMsg = '请选择一条已建客户！';
                this.props.setState(this.props.state);
            }
        }else{
            _this.setState({
                MailListState: false,
                CustomerImg: 'image/icon/Magnifier.png'
            }, () => {
            })
        }

    };
    /***@ XinD 2018/11/1 关系下拉 @***/
    relationshipList = () => {
        let e = window.event || arguments[0];
        this.state.relationList.map(prod => {
            if (prod.dict_name == e.target.value) {
                this.props.state.data.Applicant = {
                    ...this.props.state.data.Applicant,
                    relation: prod
                };
                this.props.setState(this.props.state)
            }
        })
    };
    /***@ XinD 2018/11/5 获取value值 @***/
    getValue = (prod, value) => {
        if (this.props.state.data[prod]) {
            return this.props.state.data[prod][value] ? this.props.state.data[prod][value] : null
        } else {
            return null
        }
    };
    /***@ XinD 2018/11/5 获取select框value值 @***/
    getSelectValue = (prod, value) => {
        if (this.props.state.data[prod]) {
            return this.props.state.data[prod][value] ? this.props.state.data[prod][value].code : null
        } else {
            return null
        }
    };
    /***@ XinD 2018/11/1 输入项 @***/
    inputList = (title, placeholder, value, classStyle, EmphasisStyle) => {
        if (!EmphasisStyle) {
            return (
                <li className='list'>
                    <div className={classStyle ? '' : 'border'}>
                        <label>*</label>
                        <div className='name'>{title}</div>
                        <input type="text" value={this.getValue('Applicant', value)} placeholder={placeholder}
                               onChange={this.onchangeInput.bind(this, value)}/>
                    </div>
                </li>
            )
        } else {
            return (
                <li className='list'>
                    <div className={classStyle ? '' : 'border'}>
                        <div className='name EmphasisStyle'>{title}</div>
                        <input type="text" value={this.getValue('Applicant', value)} placeholder={placeholder}
                               onChange={this.onchangeInput.bind(this, value)}/>
                    </div>
                </li>
            )
        }

    };
    /***@ XinD 2018/11/1 输入项填写信息保存 @***/
    onchangeInput = (value) => {
        let e = window.event || arguments[0];
        this.props.state.data.Applicant = {
            ...this.props.state.data.Applicant,
            [value]: e.target.value
        };
        this.props.setState(this.props.state)
    };
    /***@ XinD 2018/11/1 选择项信息保存 @***/
    onchangeSelect = (value) => {
        let e = window.event || arguments[0];
        if (value == 'six') {
            this.props.state.data.Applicant = {
                ...this.props.state.data.Applicant,
                [value]: e.target.value
            };
            this.props.setState(this.props.state)
        } else if (value == 'occupatioBig' || value == 'occupatioSmall') {
            if (value == 'occupatioBig') {
                this.props.state.data.Applicant = {
                    ...this.props.state.data.Applicant,
                    'occupatioSmall': {}
                };
                this.props.setState(this.props.state);
            }
            this.state[value].map(prod => {
                if (prod.id == e.target.value) {
                    this.props.state.data.Applicant = {
                        ...this.props.state.data.Applicant,
                        [value]: prod
                    };
                    this.props.setState(this.props.state);
                }
            })
        } else if (value == 'provinceList' || value == 'cityList' || value == 'countyList') {
            if (value == 'provinceList') {
                this.props.state.data.Applicant = {
                    ...this.props.state.data.Applicant,
                    cityList: {}
                };
                this.props.setState(this.props.state);
            }
            this.state[value].map(prod => {
                if (prod.addressCode == e.target.value) {
                    this.props.state.data.Applicant = {
                        ...this.props.state.data.Applicant,
                        [value]: prod
                    };
                    this.props.setState(this.props.state);
                }
            })
        } else {
            this.state[value].map(prod => {
                if (prod.code == e.target.value) {
                    this.props.state.data.Applicant = {
                        ...this.props.state.data.Applicant,
                        [value]: prod
                    };
                    this.props.setState(this.props.state);
                }
            })
        }

    };
    /***@ XinD 2018/11/1 选择项 @***/
    selectList = (title, placeholder, value) => {
        if (value == 'occupatioSmall') {
            let occupatioSmall = [];
            if (this.state.occupatioSmall && this.props.state.data.Applicant && this.props.state.data.Applicant.occupatioBig) {
                this.state.occupatioSmall.map(prod => {
                    if (prod.pid == this.props.state.data.Applicant.occupatioBig.id) {
                        occupatioSmall.push(prod)
                    }
                });
                return (
                    <li className='list'>
                        <div className='border'>
                            <label>*</label>
                            <div className='name'>{title}</div>
                            <select onChange={this.onchangeSelect.bind(this, value)}
                                    value={this.getSelectValue('Applicant', value)}>
                                <option>{placeholder}</option>
                                {
                                    occupatioSmall.map(prod => {
                                        return (
                                            <option
                                                value={prod.id || prod.occupCode}>{prod.dict_name}{prod.occupName}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>

                    </li>
                )
            }
        } else if (value == 'cityList') {
            let cityList = [];
            if (this.state.cityList && this.props.state.data.Applicant && this.props.state.data.Applicant.provinceList) {
                this.state.cityList.map(prod => {

                    if (prod.pid == this.props.state.data.Applicant.provinceList.addressCode) {
                        cityList.push(prod)
                    }
                });
                return (
                    <li className='list'>
                        <div className='border'>
                            <label>*</label>
                            <div className='name'>{title}</div>
                            <select onChange={this.onchangeSelect.bind(this, value)}
                                    value={this.getSelectValue('Applicant', value)}>
                                <option>{placeholder}</option>
                                {
                                    cityList.map(prod => {
                                        return (
                                            <option
                                                value={prod.code || prod.addressCode}>{prod.dict_name}{prod.addressName}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>

                    </li>
                )
            }
        } else if (value == 'countyList') {
            let countyList = [];
            if (this.state.countyList && this.props.state.data.Applicant && this.props.state.data.Applicant.cityList) {
                this.state.countyList.map(prod => {
                    if (prod.pid == this.props.state.data.Applicant.cityList.addressCode) {
                        countyList.push(prod)
                    }
                });
                return (
                    <li className='list'>
                        <div className='border'>
                            <label>*</label>
                            <div className='name'>{title}</div>
                            <select onChange={this.onchangeSelect.bind(this, value)}
                                    value={this.getSelectValue('Applicant', value)}>
                                <option>{placeholder}</option>
                                {
                                    countyList.map(prod => {
                                        return (
                                            <option
                                                value={prod.code || prod.addressCode}>{prod.dict_name}{prod.addressName}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>

                    </li>
                )
            }
        } else if (value == 'occupatioBig') {
            if (this.state[value]) {
                return (
                    <li className='list'>
                        <div className='border'>
                            <label>*</label>
                            <div className='name'>{title}</div>
                            <select onChange={this.onchangeSelect.bind(this, value)}
                                    value={this.getSelectValue('Applicant', value)}>
                                <option>{placeholder}</option>
                                {
                                    this.state[value].map(prod => {
                                        return (
                                            <option
                                                value={prod.id}>{prod.dict_name || prod.addressName || prod.occupName}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>

                    </li>
                )
            }
        } else {
            if (this.state[value]) {
                return (
                    <li className='list'>
                        <div className='border'>
                            <label>*</label>
                            <div className='name'>{title}</div>
                            <select onChange={this.onchangeSelect.bind(this, value)}
                                    value={this.getSelectValue('Applicant', value)}>
                                <option>{placeholder}</option>
                                {
                                    this.state[value].map(prod => {
                                        return (
                                            <option
                                                value={prod.code || prod.occupCode || prod.addressCode}>{prod.dict_name || prod.addressName || prod.occupName}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>

                    </li>
                )
            }
        }
    };
    /***@ XinD 2018/11/1 选择时间框取消按钮 @***/
    timeCancel = () => {
        this.setState({
            [this.state.actTimeValue]: false,
        })
    };
    /***@ XinD 2018/11/1 选择时间框完成按钮 @***/
    timeSelect = (date) => {
        let date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        this.setState({
            [this.state.actTimeValue]: false,
        });
        this.props.state.data.Applicant = {
            ...this.props.state.data.Applicant,
            [this.state.actTimeValue]: date_value
        };
        this.props.setState(this.props.state);
    };
    /***@ XinD 2018/11/1 弹出时间选择框 @***/
    timeClick = (value) => {
        this.setState({
            [value]: true,
            actTimeValue: value
        })
    };
    /***@ XinD 2018/11/1 时间选择 @***/
    selectTime = (title, placeholder, value, classState) => {
        return (
            <li className='list'>
                <div className={classState ? 'border noBorder' : 'border'}>
                    <label>*</label>
                    <div className='name'>{title}</div>
                    <div className='time'
                         onClick={this.timeClick.bind(this, value)}>{(this.props.state.data.Applicant && this.props.state.data.Applicant[value]) ? this.props.state.data.Applicant[value] : placeholder}</div>
                    <DatePicker
                        isOpen={this.state[value]}
                        onSelect={this.timeSelect}
                        onCancel={this.timeCancel}
                        min={new Date(1940, 0, 1)}/>
                </div>
            </li>
        )
    };
    /***@ XinD 2018/11/1 信息录入展开、收起 @***/
    selectBox = (value) => {
        let selectBoxData = this.state.selectBoxData;
        Object.keys(selectBoxData).map(prod => {
            selectBoxData[prod].state = false
        });
        let newSelectBoxData = {
            ...selectBoxData,
            [value]: {
                ...selectBoxData[value],
                state: true
            }
        };
        this.setState({
            selectBoxData: newSelectBoxData
        })
    };
    /***@ XinD 2018/11/2 完成按钮 @***/
    finishBtn = (value, data) => {
        return (
            <li className='finish'>
                <img src="image/icon/finish.png" alt="" onClick={this.finishClick.bind(this, value, data)}/>
            </li>
        )
    };
    /***@ XinD 2018/11/2 点击完成按钮 @***/
    finishClick = (value, data) => {

        if (this.props.state.data.Applicant) {
            if (value == 'Contact') {
                let state = true;
                state = data.every((prod) => {
                    if (this.props.state.data.Applicant[prod]) {
                        return true;
                    } else {
                        return false;
                    }
                });
                if (this.props.state.data.Applicant.telephone || this.props.state.data.Applicant.cellphone) {
                    state = true
                } else {
                    state = false
                }
                if (state) {
                    this.setState({
                        selectBoxData: {
                            ...this.state.selectBoxData,
                            [value]: {
                                state: !(this.state.selectBoxData[value].state),
                                style: true
                            }
                        }
                    })
                } else {
                    this.props.state.alertShow = true;
                    this.props.state.alertType = '1';
                    this.props.state.alertMsg = '请正确填写投保人信息！';
                    this.props.setState(this.props.state);
                }
            } else {
                let state = true;
                state = data.every((prod) => {
                    if (this.props.state.data.Applicant[prod]) {
                        return true;
                    } else {
                        return false;
                    }
                });
                if (state) {
                    this.setState({
                        selectBoxData: {
                            ...this.state.selectBoxData,
                            [value]: {
                                state: !(this.state.selectBoxData[value].state),
                                style: true
                            }
                        }
                    })
                } else {
                    this.props.state.alertShow = true;
                    this.props.state.alertType = '1';
                    this.props.state.alertMsg = '请正确填写投保人信息！';
                    this.props.setState(this.props.state);
                }
            }

        } else {
            this.props.state.alertShow = true;
            this.props.state.alertType = '1';
            this.props.state.alertMsg = '请正确填写投保人信息！';
            this.props.setState(this.props.state);
        }


    };
    /***@ XinD 2018/11/2 职业代码等不能修改的项 @***/
    fontList = (title, value) => {
        if (value) {
            return (
                <li className='list'>
                    <div className='border'>
                        <label>*</label>
                        <div className='name'>{title}</div>
                        <input type="text" value={value} disabled='disabled' readOnly={true}/>
                    </div>
                </li>
            )
        }
    };
    /***@ XinD 2018/11/2 checkList选择项模版 @***/
    checkList = (title, checkArr, value, pLong, input) => {
        return (
            <li className='CheckList'>
                <div className='borders'>
                    <label>*</label>
                    <div className={pLong ? 'pLong name' : 'name'}>{title}</div>
                </div>
                <dl>
                    {
                        checkArr.map((prod, index) => {
                            if (this.props.state.data.Applicant) {
                                if (this.props.state.data.Applicant[value]) {
                                    if (this.props.state.data.Applicant[value].index == prod.code) {
                                        return (
                                            <dd>
                                                <text>{prod.text}</text>
                                                <img src="image/icon/actOval.png" alt=""/>
                                            </dd>
                                        )
                                    } else {
                                        return (
                                            <dd>
                                                <text>{prod.text}</text>
                                                <img src="image/icon/Oval.png" alt=""
                                                     onClick={this.checkClick.bind(this, prod, index, value)}/>
                                            </dd>
                                        )
                                    }
                                } else {
                                    return (
                                        <dd>
                                            <text>{prod.text}</text>
                                            <img src="image/icon/Oval.png" alt=""
                                                 onClick={this.checkClick.bind(this, prod, index, value)}/>
                                        </dd>
                                    )
                                }
                            } else {
                                return (
                                    <dd>
                                        <text>{prod.text}</text>
                                        <img src="image/icon/Oval.png" alt=""
                                             onClick={this.checkClick.bind(this, prod, index, value)}/>
                                    </dd>
                                )

                            }

                        })
                    }
                </dl>
                {(input && this.props.state.data.Applicant && this.props.state.data.Applicant[value] && this.props.state.data.Applicant[value].index == 0) &&
                <div className='input'>
                    <font>总额</font>
                    <input type="text" value={this.getValue('Applicant', value)} placeholder='请输入总额'
                           onChange={this.checkInput.bind(this, value)}/>
                </div>}
            </li>
        )
    };
    /***@ XinD 2018/11/5 被保人备注 @***/
    remarksInput = (title, checkArr, value, pLong, input) => {
        return (
            <li className='CheckList' style={{border: 'none'}}>
                <div className='borders'>
                    <label>*</label>
                    <div className={pLong ? 'pLong name' : 'name'}>{title}</div>
                </div>
                <dl>
                    {
                        checkArr.map((prod, index) => {
                            if (this.props.state.data.Applicant) {
                                if (this.props.state.data.Applicant[value]) {
                                    if (this.props.state.data.Applicant[value].index == prod.code) {
                                        return (
                                            <dd>
                                                <text>{prod.text}</text>
                                                <img src="image/icon/actOval.png" alt=""/>
                                            </dd>
                                        )
                                    } else {
                                        return (
                                            <dd>
                                                <text>{prod.text}</text>
                                                <img src="image/icon/Oval.png" alt=""
                                                     onClick={this.checkClick.bind(this, prod, index, value)}/>
                                            </dd>
                                        )
                                    }
                                } else {
                                    return (
                                        <dd>
                                            <text>{prod.text}</text>
                                            <img src="image/icon/Oval.png" alt=""
                                                 onClick={this.checkClick.bind(this, prod, index, value)}/>
                                        </dd>
                                    )
                                }
                            } else {
                                return (
                                    <dd>
                                        <text>{prod.text}</text>
                                        <img src="image/icon/Oval.png" alt=""
                                             onClick={this.checkClick.bind(this, prod, index, value)}/>
                                    </dd>
                                )

                            }

                        })
                    }
                </dl>
                {(input && this.props.state.data.Applicant && this.props.state.data.Applicant[value] && this.props.state.data.Applicant[value].index == 0) &&
                <div className='input' style={{padding: '0', border: 'none', height: 'auto'}}>
                    <textarea cols="30" rows="10" value={this.getValue('Applicant', value)}></textarea>
                </div>}
            </li>
        )
    };
    /***@ XinD 2018/11/2 checkList选择项选择 @***/
    checkClick = (data, index, value) => {
        this.props.state.data.Applicant = {
            ...this.props.state.data.Applicant,
            [value]: {
                code: data.code,
                index: index
            }
        };
        this.props.setState(this.props.state)
    };
    /***@ XinD 2018/11/2 选择项内输入框onchange @***/
    checkInput = (value) => {
        let e = window.event || arguments[0];
        this.props.state.data.Applicant = {
            ...this.props.state.data.Applicant,
            [value]: {
                ...this.props.state.data.Applicant[value],
                Remarks: e.target.value
            }
        };
        this.props.setState(this.props.state)
    };
    nextClick = (value) => {

        if (!this.props.state.data[value]) {
            this.props.state.alertShow = true;
            this.props.state.alertType = '1';
            this.props.state.alertMsg = '请正确填写投保人信息！';
            this.props.setState(this.props.state);
        } else {
            let state = true;
            state = (this.state.ApplicantArr).map(prod => {
                if (!this.props.state.data.Applicant[prod]) {
                    return false
                }
            });
            if (!this.props.state.data.Applicant['cellphone'] && !this.props.state.data.Applicant['telephone']) {
                state = false
            }
            if (state == false) {
                this.props.state.alertShow = true;
                this.props.state.alertType = '1';
                this.props.state.alertMsg = '请正确填写投保人信息！';
                this.props.setState(this.props.state);
            } else {
                this.props.state.data.insurMap = {
                    ...this.props.state.data.insurMap,
                    "1":{
                        ...this.props.state.data.insurMap[1],
                        ...this.props.state.data.Applicant
                    }
                };
                this.props.setState(this.props.state);
                window.location.href = '#/insured';
            }
        }
    };

    render() {
        let relationList = this.state.relationList || [];
        return (
            <div className='Main'>
                {
                    (this.state.MailListState && this.state.CustomerList != '') &&
                    <MailList CustomerList={this.state.CustomerList} sureCustomer={this.sureCustomer.bind(this)}
                              stateClick={this.stateClick.bind(this)}></MailList>
                }
                <div className='relationship'>
                    <span className='title'>与被保人关系</span>
                    <div className='right'>
                        <span>{(this.props.state.data.Applicant && this.props.state.data.Applicant.relation) ? this.props.state.data.Applicant.relation.dict_name : '请选择'}</span>
                        <select className='relationshipList' value={this.getValue('Applicant', 'relation')}
                                onChange={this.relationshipList.bind(this)}>
                            <option>请选择</option>
                            {
                                relationList.length != 0 && relationList.map(prod => {
                                    return (
                                        <option>{prod.dict_name}</option>
                                    )
                                })
                            }
                        </select>
                        <img src="image/icon/rightJ.png" alt=""/>
                    </div>
                </div>
                <ul className='informationFilling'>
                    <li className={(this.state.selectBoxData.basic && this.state.selectBoxData.basic.state) ? 'box selectHeight' : 'box'}>
                        <ul>
                            <li className={(this.state.selectBoxData.basic && this.state.selectBoxData.basic.state) ? 'title borSelect' : 'title'}
                                onClick={this.selectBox.bind(this, 'basic')}>
                                <font
                                    className='add'>{(this.state.selectBoxData.basic && this.state.selectBoxData.basic.state) ? '-' : '+'}</font>
                                <font>基本信息</font>
                                {(this.state.selectBoxData.basic && this.state.selectBoxData.basic.style) &&
                                <img src="image/icon/Checkmark.png" alt=""/>}
                            </li>
                            <li className='cardScanning'>
                                <span>证件影像</span>
                                <img src="image/icon/cardscanning.png" alt=""/>
                            </li>
                            {
                                this.inputList('被保险人姓名', '请输入被保险人姓名', 'name')
                            }
                            {
                                this.selectList('性别', '请选择性别', 'six')
                            }
                            {
                                this.selectList('国籍', '请选择国籍', 'NationalityList')
                            }
                            {
                                this.selectTime('出生日期', '请选择出生日期', 'birthdayTime')
                            }
                            {
                                this.selectList('婚姻状况', '请选择婚姻状况', 'maritalList')
                            }
                            {
                                this.selectList('证件类型', '请选择证件类型', 'idType1List')
                            }
                            {
                                this.inputList('证件号码', '请输入证件号码', 'cardNum')
                            }
                            {
                                this.selectTime('证件失效日期', '请选择证件失效日期', 'cardInvalid', 'none')
                            }
                            {
                                this.finishBtn('basic', ['name', 'six', 'NationalityList', 'birthdayTime', 'maritalList', 'idType1List', 'cardNum'])
                            }
                        </ul>
                    </li>
                    <li className={(this.state.selectBoxData.Occupation && this.state.selectBoxData.Occupation.state) ? 'box selectHeight' : 'box'}>
                        <ul>
                            <li className={(this.state.selectBoxData.Occupation && this.state.selectBoxData.Occupation.state) ? 'title borSelect' : 'title'}
                                onClick={this.selectBox.bind(this, 'Occupation')} style={{margin: 0}}>
                                <font
                                    className='add'>{(this.state.selectBoxData.Occupation && this.state.selectBoxData.Occupation.state) ? '-' : '+'}</font>
                                <font>职业信息</font>
                                {(this.state.selectBoxData.Occupation && this.state.selectBoxData.Occupation.style) &&
                                <img src="image/icon/Checkmark.png" alt=""/>}
                            </li>
                            {
                                this.inputList('工作单位', '请输入工作单位', 'workUnit')
                            }
                            {
                                this.inputList('职务', '请输入职务', 'job')
                            }
                            {
                                this.selectList('职业大类', '请选择职业大类', 'occupatioBig')
                            }
                            {
                                this.selectList('职业小类', '请选择职业小类', 'occupatioSmall')
                            }
                            {
                                this.fontList('职业代码', (this.props.state.data.Applicant && this.props.state.data.Applicant.occupatioSmall && this.props.state.data.Applicant.occupatioSmall.occupCode) ? this.props.state.data.Applicant.occupatioSmall.occupCode : '')
                            }
                            {
                                this.fontList('职业类别', (this.props.state.data.Applicant && this.props.state.data.Applicant.occupatioSmall && this.props.state.data.Applicant.occupatioSmall.occupLevel) ? this.props.state.data.Applicant.occupatioSmall.occupLevel : '')
                            }
                            {
                                this.inputList('年收入', '请输入年收入', 'income', 'none')
                            }
                            {
                                this.finishBtn('Occupation', ['workUnit', 'job', 'occupatioBig', 'occupatioSmall', 'income'])
                            }
                        </ul>
                    </li>
                    <li className={(this.state.selectBoxData.Contact && this.state.selectBoxData.Contact.state) ? 'box selectHeight' : 'box'}>
                        <ul>
                            <li className={(this.state.selectBoxData.Contact && this.state.selectBoxData.Contact.state) ? 'title borSelect' : 'title'}
                                onClick={this.selectBox.bind(this, 'Contact')} style={{margin: 0}}>
                                <font
                                    className='add'>{(this.state.selectBoxData.Contact && this.state.selectBoxData.Contact.state) ? '-' : '+'}</font>
                                <font>联系方式</font>
                                {(this.state.selectBoxData.Contact && this.state.selectBoxData.Contact.style) &&
                                <img src="image/icon/Checkmark.png" alt=""/>}
                            </li>
                            {
                                this.selectList('联系地址', '先选择省', 'provinceList')
                            }
                            {
                                this.selectList('', '先选择市', 'cityList')
                            }
                            {
                                this.selectList('', '先选择区/县', 'countyList')
                            }
                            {
                                this.inputList('乡镇（街道）', '请输入乡镇（街道）', 'Street')
                            }
                            {
                                this.inputList('村（社区）', '请输入村（社区）', 'Community')
                            }
                            {
                                this.inputList('邮政编码', '请输入邮政编码', 'postalCode')
                            }
                            {
                                this.fontList('联系方式', '手机或者电话二者选其一')
                            }
                            {
                                this.inputList('电话', '请输入电话号(010-12345678)', 'telephone', '', 'nonEmphasis')
                            }
                            {
                                this.inputList('手机', '请输入手机号', 'cellphone', '', 'nonEmphasis')
                            }
                            {
                                this.inputList('电子邮箱', '请输入电子邮箱', 'email', '', 'nonEmphasis')
                            }
                            {
                                this.inputList('QQ号码', '请输入QQ号码', 'QQCode', '', 'nonEmphasis')
                            }
                            {
                                this.inputList('微信号', '请输入微信号码', 'wechatCode', 'none', 'nonEmphasis')
                            }
                            {
                                this.finishBtn('Contact', ['provinceList', 'cityList', 'countyList', 'Street', 'Community', 'postalCode', ''])
                            }
                        </ul>
                    </li>
                    <li className={(this.state.selectBoxData.Other && this.state.selectBoxData.Other.state) ? 'box selectHeight' : 'box'}>
                        <ul>
                            <li className={(this.state.selectBoxData.Other && this.state.selectBoxData.Other.state) ? 'title borSelect' : 'title'}
                                onClick={this.selectBox.bind(this, 'Other')} style={{margin: 0}}>
                                <font
                                    className='add'>{(this.state.selectBoxData.Other && this.state.selectBoxData.Other.state) ? '-' : '+'}</font>
                                <font>其他信息</font>
                                {(this.state.selectBoxData.Other && this.state.selectBoxData.Other.style) &&
                                <img src="image/icon/Checkmark.png" alt=""/>}
                            </li>
                            {
                                this.checkList('医疗费用支付', this.state.Payment, 'Payment')
                            }
                            {
                                this.checkList('是否有人身保险被商业保险公司拒赔，延期，计费， 免责的投保经历或向保险公司提出的理赔申请？', this.state.orInsurance, 'orInsurance', 'pLong')
                            }
                            {
                                this.checkList('（18周岁以下未成年回答）是否已拥有正在生效的 以死亡为给付保险金条件的人身保险？如有请告知 身故保险金额总额？', this.state.orBenefits, 'orBenefits', 'pLong', 'input')
                            }
                            {
                                this.remarksInput('是否录入投保人备注信息', this.state.remarksInput, 'remarksInput', 'none', 'input')
                            }
                            {
                                this.finishBtn('Other', ['Payment', 'orInsurance', 'orBenefits', 'remarksInput'])
                            }
                        </ul>
                    </li>
                </ul>
                <div className='next'>
                    <font onClick={this.nextClick.bind(this, 'Applicant')}>下一步</font>
                </div>
            </div>
        )
    }
}

let mainFun = new Main();
module.exports = GetPage({
    id: 'home',
    component: Main,
    title: mainFun.state.headertitle,
    attach: {
        icon: mainFun.state.CustomerImg,
        width: '18',
        height: '20',
        attachClick: mainFun.MailList
    }
});
