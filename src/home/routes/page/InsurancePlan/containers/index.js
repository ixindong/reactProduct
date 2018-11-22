import React, {Component, PropTypes} from 'react'
import * as tool from 'publicJs'
import GetPage from 'getPage'
import MailList from 'MailList'
import DatePicker from 'react-mobile-datepicker';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            headertitle: '险种计划',
            insurMap: {
                '1': {
                    productList: [
                        {
                            parent: null,
                            auto: false,
                            other: null,
                            code: '00333502',
                            abbrName: '百万安行',
                            pay_code: 'single',
                            pay_value: 1,
                            isbind: false,
                            rule: [
                                '投保保额只能为5万/10万，保额不符合规则要求'
                            ],
                            insure: '30年期',
                            type: 'clause',
                            premium: 530,
                            vendor: 'nci',
                            ismain: true,
                            insure_mode: 0,
                            currency: 'cny',
                            inputType: 'AMOUNT',
                            id: '00333502',
                            value: {
                                AMOUNT: 10000,
                                PAY: 'single',
                                INSURE: 'term_30'
                            },
                            productType: 'common',
                            insure_code: 'term_30',
                            amount: 10000,
                            productId: '00333502',
                            insure_period: 30,
                            insure_value: 30,
                            purchase: '10000元',
                            pay: '一次交清',
                            pay_period: 1,
                            parentProId: null,
                            descr: [
                                [
                                    '保额',
                                    '1万'
                                ],
                                [
                                    '保障期间',
                                    '30年期'
                                ],
                                [
                                    '缴费期间',
                                    '一次交清'
                                ],
                                [
                                    '保费',
                                    '530.00'
                                ]
                            ],
                            pay_mode: 0,
                            name: '百万安行',
                            age: 18,
                            attachment_features: [
                                {
                                    style: null,
                                    text: '七重保障 · 全面   保障全，安行无忧！',
                                    bold: false
                                },
                                {
                                    style: null,
                                    text: '◆保障全，安行无忧！',
                                    bold: false
                                },
                                {
                                    style: null,
                                    text: '◆自驾车意外  航空意外  水陆公共交通意外  一般意外   疾病身故 护理保障 满期生存金',
                                    bold: false
                                },
                                {
                                    style: null,
                                    text: '长期呵护 · 无忧   保障久，安行无忧！',
                                    bold: false
                                },
                                {
                                    style: null,
                                    text: '◆人保健康首款长期意外个人综合保障计划。',
                                    bold: false
                                },
                                {
                                    style: null,
                                    text: '◆ 长达30年的保险期间，在您最有战斗力的黄金岁月无间断的保驾护航，让您出行无忧。',
                                    bold: false
                                },
                                {
                                    style: null,
                                    text: '◆ 变的是世界，不变的是始终如一的呵护。',
                                    bold: false
                                },
                                {
                                    style: null,
                                    text: '百万护驾 · 尊贵  保障高，安行无忧！',
                                    bold: false
                                },
                                {
                                    style: null,
                                    text: '◆ 百万安行，百万级的出行保障，是您身份的象征。',
                                    bold: false
                                },
                                {
                                    style: null,
                                    text: '◆ 拥有百万安行，体验酣畅淋漓的驾驶快感，来一场说走就走的旅行。',
                                    bold: false
                                },
                                {
                                    style: null,
                                    text: '◆ 拥有百万安行，畅游天下，随心随行。',
                                    bold: false
                                }
                            ],
                            attachment_blurb: [
                                {
                                    style: null,
                                    text: '百万安行个人综合保障计划,是一款具有保费返还功能的长期意外伤害综合保障计划,保险期间30年,集自驾车意外、航空意外、水陆公共交通工具意外、一般意外、护理、疾病身故、满期返还七大功能于一身,自驾车、航空保障百万起步。',
                                    bold: false
                                }
                            ],
                            logo: null,
                            remark: null,
                            ptype: 'common',
                            tag: null,
                            factors: [
                                {
                                    widget: 'switch',
                                    name: 'PAY',
                                    label: '交费期间',
                                    detail: [
                                        [
                                            'single',
                                            '一次交清'
                                        ],
                                        [
                                            'term_5',
                                            '5年期'
                                        ],
                                        [
                                            'term_10',
                                            '10年期'
                                        ]
                                    ],
                                    req: true
                                },
                                {
                                    widget: 'switch',
                                    name: 'INSURE',
                                    label: '保障期间',
                                    detail: [
                                        [
                                            'term_30',
                                            '30年期'
                                        ]
                                    ],
                                    req: true
                                },
                                {
                                    widget: 'number',
                                    name: 'AMOUNT',
                                    label: '保额',
                                    value: 10000,
                                    req: true
                                }
                            ]
                        },
                        {
                            parent: 0,
                            auto: true,
                            other: null,
                            code: '00532502',
                            abbrName: '附加交通意外',
                            pay_code: 'parent',
                            pay_value: 1,
                            isbind: true,
                            insure: '30年期',
                            type: 1,
                            premium: 355,
                            vendor: 'picc',
                            ismain: false,
                            insure_mode: 0,
                            currency: 'cny',
                            inputType: 'AMOUNT',
                            id: '1541749489577_1626_R1',
                            value: {
                                PAY: 'parent',
                                INSURE: 'parent'
                            },
                            productType: 'common',
                            insure_code: 'parent',
                            amount: 10000,
                            productId: '00532502',
                            insure_period: 30,
                            insure_value: 30,
                            purchase: '10000元',
                            pay: '一次交清',
                            pay_period: 1,
                            parentProId: '00333502',
                            descr: [
                                [
                                    '保额',
                                    '1万'
                                ],
                                [
                                    '保障期间',
                                    '30年期'
                                ],
                                [
                                    '缴费期间',
                                    '一次交清'
                                ],
                                [
                                    '保费',
                                    '355.00'
                                ]
                            ],
                            pay_mode: 0,
                            name: '附加百万安行个人交通意外伤害保险',
                            age: 18
                        },
                        {
                            parent: 0,
                            auto: true,
                            other: null,
                            code: '00532402',
                            abbrName: '附加个人意外',
                            pay_code: 'parent',
                            pay_value: 1,
                            isbind: true,
                            insure: '30年期',
                            type: 1,
                            premium: 320,
                            vendor: 'picc',
                            ismain: false,
                            insure_mode: 0,
                            currency: 'cny',
                            inputType: 'AMOUNT',
                            id: '1541749489577_1626_R2',
                            value: {
                                PAY: 'parent',
                                INSURE: 'parent'
                            },
                            productType: 'common',
                            insure_code: 'parent',
                            amount: 10000,
                            productId: '00532402',
                            insure_period: 30,
                            insure_value: 30,
                            purchase: '10000元',
                            pay: '一次交清',
                            pay_period: 1,
                            parentProId: '00333502',
                            descr: [
                                [
                                    '保额',
                                    '1万'
                                ],
                                [
                                    '保障期间',
                                    '30年期'
                                ],
                                [
                                    '缴费期间',
                                    '一次交清'
                                ],
                                [
                                    '保费',
                                    '320.00'
                                ]
                            ],
                            pay_mode: 0,
                            name: '附加百万安行个人意外伤害保险',
                            age: 18
                        }
                    ],
                    relation: {
                        dict_code: 'relation',
                        dict_name: '本人',
                        parent_id: null,
                        remark: null,
                        dict_id: '243',
                        code: '00'
                    },
                    ApplicantCustomer: {
                        customerId: '180815115044916',
                        name: '丁曙光',
                        genderCode: '0',
                        birthday: '1982-10-14',
                        idType: '',
                        idNo: '12345',
                        idValidDate: '',
                        marriage: '1',
                        degree: '',
                        nativePlace: '',
                        occupationCode: '00101',
                        modifyTime: '2018-10-25 09:28:03',
                        socialInsuFlag: '',
                        englishName: '',
                        chinSpellName: '',
                        smokeFlag: 0,
                        createId: '0',
                        createDate: '2018-08-15 11:50:44',
                        cresteId: '',
                        childStatus: '',
                        occupationType: '',
                        occupationName: '',
                        nativeCity: '',
                        salary: '10',
                        idEffstartDate: '',
                        idEffendDate: '',
                        office: '员工',
                        groupAgentCode: '',
                        marriageInput: '',
                        cardtypeInput: '',
                        country: '',
                        occupCode: '',
                        occupName: '',
                        taxmethod: '',
                        taxregistration: '',
                        socialcredit: '',
                        occupation2: '',
                        smoke: '',
                        enterprise: '人保健康',
                        provincecode: '150000',
                        citycode: '152200',
                        areacode: '152224',
                        street: '西城区丰汇大街',
                        community: '丰汇园小区',
                        email: 'dingshuguang@picchealth.com',
                        zipcode: '100032',
                        mobile: '18910886919',
                        age: '',
                        phone: '',
                        deathrisk: '',
                        deathriskmonry: '',
                        medlcal: '',
                        under: '',
                        underDetail: '',
                        levelcode: '',
                        loginAccount: '2111010008',
                        occupBigcode: '1',
                        occupSmallcode: '2',
                        occupLevelcode: '1',
                        nationalityId: 'ML',
                        nationalityId2: 'CHN',
                        idType2: '2',
                        idTypeCode: '',
                        idStartDate: '2017-08-16',
                        idEndDate: '2023-08-16',
                        longDate: '',
                        paystyle: '社会医疗保险',
                        refused: '否',
                        haved: '否',
                        havedMoney: '',
                        firstRelationOne: '12',
                        firstRelationTwo: '',
                        secondRelationOne: '',
                        secondFirstRelationOne: '',
                        secondFirstRelationTwo: '',
                        thirdRelationOne: '',
                        thirdRelationTwo: '',
                        thirdFirstRelationOne: '',
                        thirdFirstRelationTwo: '',
                        taxhospital: '',
                        taxdutymoney: '',
                        taxdutyscale: '',
                        taxdutyamount: '',
                        taxdutyrange: '',
                        secondRelationTwo: '',
                        refused2: '',
                        deleteFlag: '0',
                        insuranceRemarkIf: '2',
                        insuranceRemark: '',
                        idPhotoPath: ''
                    },
                    name: '丁曙光',
                    six: {
                        code: '0'
                    },
                    NationalityList: {
                        code: 'ML'
                    },
                    birthdayTime: '1982-10-14',
                    maritalList: {
                        code: '1'
                    },
                    idType1List: {
                        code: '2'
                    },
                    cardNum: '12345',
                    cardInvalid: '2023-08-16',
                    workUnit: '人保健康',
                    job: '员工',
                    occupatioBig: {
                        code: '1',
                        id: '1'
                    },
                    occupatioSmall: {
                        code: '2',
                        id: '2',
                        occupCode: '00101',
                        occupLevel: '1'
                    },
                    income: '10',
                    provinceList: {
                        addressCode: '150000',
                        code: '150000'
                    },
                    cityList: {
                        addressCode: '152200',
                        code: '152200'
                    },
                    countyList: {
                        code: '152224'
                    },
                    Street: '西城区丰汇大街',
                    Community: '丰汇园小区',
                    postalCode: '100032',
                    telephone: '',
                    cellphone: '18910886919',
                    email: 'dingshuguang@picchealth.com',
                    Payment: {
                        index: '社会医疗保险'
                    },
                    orInsurance: {
                        index: '否'
                    },
                    orBenefits: {
                        index: '否'
                    },
                    remarksInput: {
                        index: '2',
                        Remarks: '2'
                    }
                }
            },
            Applicant: {
                relation: {
                    dict_code: 'relation',
                    dict_name: '本人',
                    parent_id: null,
                    remark: null,
                    dict_id: '243',
                    code: '00'
                },
                ApplicantCustomer: {
                    customerId: '180815115044916',
                    name: '丁曙光',
                    genderCode: '0',
                    birthday: '1982-10-14',
                    idType: '',
                    idNo: '12345',
                    idValidDate: '',
                    marriage: '1',
                    degree: '',
                    nativePlace: '',
                    occupationCode: '00101',
                    modifyTime: '2018-10-25 09:28:03',
                    socialInsuFlag: '',
                    englishName: '',
                    chinSpellName: '',
                    smokeFlag: 0,
                    createId: '0',
                    createDate: '2018-08-15 11:50:44',
                    cresteId: '',
                    childStatus: '',
                    occupationType: '',
                    occupationName: '',
                    nativeCity: '',
                    salary: '10',
                    idEffstartDate: '',
                    idEffendDate: '',
                    office: '员工',
                    groupAgentCode: '',
                    marriageInput: '',
                    cardtypeInput: '',
                    country: '',
                    occupCode: '',
                    occupName: '',
                    taxmethod: '',
                    taxregistration: '',
                    socialcredit: '',
                    occupation2: '',
                    smoke: '',
                    enterprise: '人保健康',
                    provincecode: '150000',
                    citycode: '152200',
                    areacode: '152224',
                    street: '西城区丰汇大街',
                    community: '丰汇园小区',
                    email: 'dingshuguang@picchealth.com',
                    zipcode: '100032',
                    mobile: '18910886919',
                    age: '',
                    phone: '',
                    deathrisk: '',
                    deathriskmonry: '',
                    medlcal: '',
                    under: '',
                    underDetail: '',
                    levelcode: '',
                    loginAccount: '2111010008',
                    occupBigcode: '1',
                    occupSmallcode: '2',
                    occupLevelcode: '1',
                    nationalityId: 'ML',
                    nationalityId2: 'CHN',
                    idType2: '2',
                    idTypeCode: '',
                    idStartDate: '2017-08-16',
                    idEndDate: '2023-08-16',
                    longDate: '',
                    paystyle: '社会医疗保险',
                    refused: '否',
                    haved: '否',
                    havedMoney: '',
                    firstRelationOne: '12',
                    firstRelationTwo: '',
                    secondRelationOne: '',
                    secondFirstRelationOne: '',
                    secondFirstRelationTwo: '',
                    thirdRelationOne: '',
                    thirdRelationTwo: '',
                    thirdFirstRelationOne: '',
                    thirdFirstRelationTwo: '',
                    taxhospital: '',
                    taxdutymoney: '',
                    taxdutyscale: '',
                    taxdutyamount: '',
                    taxdutyrange: '',
                    secondRelationTwo: '',
                    refused2: '',
                    deleteFlag: '0',
                    insuranceRemarkIf: '2',
                    insuranceRemark: '',
                    idPhotoPath: ''
                },
                name: '丁曙光',
                six: {
                    code: '0'
                },
                NationalityList: {
                    code: 'ML'
                },
                birthdayTime: '1982-10-14',
                maritalList: {
                    code: '1'
                },
                idType1List: {
                    code: '2'
                },
                cardNum: '12345',
                cardInvalid: '2023-08-16',
                workUnit: '人保健康',
                job: '员工',
                occupatioBig: {
                    code: '1',
                    id: '1'
                },
                occupatioSmall: {
                    code: '2',
                    id: '2',
                    occupCode: '00101',
                    occupLevel: '1'
                },
                income: '10',
                provinceList: {
                    addressCode: '150000',
                    code: '150000'
                },
                cityList: {
                    addressCode: '152200',
                    code: '152200'
                },
                countyList: {
                    code: '152224'
                },
                Street: '西城区丰汇大街',
                Community: '丰汇园小区',
                postalCode: '100032',
                telephone: '',
                cellphone: '18910886919',
                email: 'dingshuguang@picchealth.com',
                Payment: {
                    index: '社会医疗保险'
                },
                orInsurance: {
                    index: '否'
                },
                orBenefits: {
                    index: '否'
                },
                remarksInput: {
                    index: '2',
                    Remarks: '2'
                }
            },
        };
    }


    componentDidMount() {
        console.log(this.state.insurMap);
        this.props.state.loadAnimation = false;
        this.props.setState(this.props.state);
    }
    /***@ XinD 2018/11/9 周岁计算 @***/
    age = (strBirthday) =>{
        let returnAge;
        let strBirthdayArr= strBirthday.split("-");
        let birthYear = Number(strBirthdayArr[0]);
        let birthMonth = Number(strBirthdayArr[1]);
        let birthDay = Number(strBirthdayArr[2]);

        let d = new Date();
        let nowYear = d.getFullYear();
        let nowMonth = d.getMonth() + 1;
        let nowDay = d.getDate();

        if(nowYear == birthYear)
        {
            returnAge = 0;//同年 则为0岁
        }
        else
        {
            let ageDiff = nowYear - birthYear ; //年之差
            if(ageDiff > 0)
            {
                if(nowMonth == birthMonth)
                {
                    let dayDiff = nowDay - birthDay;//日之差
                    if(dayDiff < 0)
                    {
                        returnAge = ageDiff - 1;
                    }
                    else
                    {
                        returnAge = ageDiff ;
                    }
                }
                else
                {
                    let monthDiff = nowMonth - birthMonth;//月之差
                    if(monthDiff < 0)
                    {
                        returnAge = ageDiff - 1;
                    }
                    else
                    {
                        returnAge = ageDiff ;
                    }
                }
            }
            else
            {
                returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
            }
        }

        return returnAge;//返回周岁年龄
    };

    /***@ XinD 2018/11/9 档次或保额 @***/
    AmountorRank = (data) =>{
        console.log(data);
        if(data.inputType == 'AMOUNT'){
            if(data.isbind){
                return(
                    <span>{data.amount}</span>
                )
            }else{
                return(
                    <input type="text" value={data.amount}/>
                )
            }
        }else if(data.inputType == 'RANK'){

        }
    };
    /***@ XinD 2018/11/9 展开、收起产品列表 @***/
    openList = (data,index) =>{
        // let productData = this.props.state.data.insurMap[index].productList
        // productData.map(prod=>{
        //     if(prod.code == data.code){
        //         prod.openStyle = !prod.openStyle
        //     }
        // })
        // this.props.state.data.insurMap = {
        //     ...this.props.state.data.insurMap,
        //     [index]:{
        //         ...this.props.state.data.insurMap[index],
        //         productList: productData
        //     }
        // }
        // this.state.setState(this.props.state)
        let productData = this.state.insurMap[index].productList;
        productData.map(prod=>{
            if(prod.code == data.code){
                prod.openStyle = !prod.openStyle
            }
        });
        this.setState({
            insurMap:{
                ...this.state.insurMap,
                [index]:{
                    ...this.state.insurMap[index],
                    productList: productData
                }
            }
        })

    };
    /***@ XinD 2018/11/9 产品显示模版 @***/
    showProduct = (data,index) =>{
        return(
            <li onClick={this.openList.bind(this,data,index)} className={data.openStyle?'openList':''}>
                <dl>
                    <dd className='top'>
                        <span className={data.ismain?'mainP':'addP'}>{data.ismain?'主':'附'}</span>
                        <span className='productName'>{data.abbrName}</span>
                        <img src="image/icon/xuanZ.png" alt="" className={data.openStyle?'':'close'}/>
                    </dd>
                    <dd className='DataBox'>
                        <div className='term'>
                            代码：{data.code.slice(2)}
                        </div>
                        <div className='term'>
                            保额/档次：{this.AmountorRank(data)}
                        </div>
                        <div className='term'>
                            保险期间：{this.insurOrPay(data,'insure')}
                        </div>
                        <div className='term'>
                            缴费期间：{this.insurOrPay(data,'pay')}
                        </div>
                        {
                            data.inputType == 'QUANTITY' && this.AmountorRank(data)
                        }
                        {data.code == '00340602' && this.inputList(data,index,value)}

                    </dd>
                </dl>
                <div className='line'>
                    <font>
                        期缴保费：
                    </font>
                    {this.premium(data,index,'premium')}
                </div>
                {
                    data.ismain && <div className='addProduct'>
                        <button>增加附加险</button>
                    </div>
                }
            </li>
        )
    };
    /***@ XinD 2018/11/9 输入项 @***/
    inputList = (data,index,value) =>{
        if(data[value]){
            return(
                <input type="text" defaultValue={data[value]?data[value]:'请输入'}/>
            )
        }
    };
    /***@ XinD 2018/11/9 保费模版 @***/
    premium = (data,index,value) =>{
        if(data.inputType == 'PREMIUM'){
            return(
                <input type="text" defaultValue={data[value]?data[value]:'请输入'}/>
            )
        }else{
            return(
                <span>{data[value]}元</span>
            )
        }

    };
    /***@ XinD 2018/11/9 保险期间或缴费期间 @***/
    insurOrPay = (data,value) =>{
        if(data.insure_code!='parent'){
            return(
                <select value={value}>
                    {
                         data.factors.map(prod=>{
                            if(prod.name == value.toUpperCase()){
                                return prod.detail.map(res=>{
                                    return(
                                        <option value={res[1]}>{res[1]}</option>
                                    )
                                })
                            }
                        })
                    }
                </select>
            )
        }else{
            return(
                <span>同主险</span>
            )
        }
    };
    render() {
        let insurMap = this.state.insurMap;
        // let insurMap = this.props.state.data.insurMap
        return (
            <div className='Main'>
                {
                    insurMap && Object.keys(insurMap).map(prod=>{
                        let data = insurMap[prod];
                        return(
                            <div className='plan_Box'>
                                <div className='title'>
                                    <span className='number'>
                                        {prod}
                                    </span>
                                    <span className='name'>
                                        {data.name}
                                    </span>
                                    <span className='six'>
                                        {data.six.code == '0'?'男':'女'}
                                    </span>
                                    <span className='age'>
                                        {this.age(data.birthdayTime)}
                                    </span>
                                    <span className='careerCode'>
                                        职业代码：{data.occupatioSmall.occupCode}
                                    </span>
                                    <img src="image/icon/del.png" className='del' alt=""/>
                                </div>
                                <ul className='product'>
                                    {
                                        data.productList.map(res=>{
                                            {
                                                return this.showProduct(res,prod)
                                            }
                                        })
                                    }
                                </ul>
                                <div className='addProduct'>
                                    <button>增加附加险</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

let mainFun = new Main();
module.exports = GetPage({
    id: 'home',
    component: Main,
    title: mainFun.state.headertitle,
    attach: ''
});
