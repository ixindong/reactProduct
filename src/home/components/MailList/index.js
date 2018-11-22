import React, {Component} from 'react';//引入react
import Dictionaries from 'Dictionaries';//引入react
//创建loading组件
export default class MainList extends Component {
    //构建函数
    constructor(props) {
        super(props);
        this.state = {
            actCustomer:'',
            ClickShowText:'',
            customerShowState:false
        }
    }

    componentDidMount() {
        /***@ XinD 2018/10/31 对客户列表进行重新分组、排序 @***/
        let CustomerList = {
            "A": ["A"],
            "B": ["B"],
            "C": ["C"],
            "D": ["D"],
            "E": ["E"],
            "F": ["F"],
            "G": ["G"],
            "H": ["H"],
            "I": ["I"],
            "J": ["J"],
            "K": ["K"],
            "L": ["L"],
            "M": ["M"],
            "N": ["N"],
            "O": ["O"],
            "P": ["P"],
            "Q": ["Q"],
            "R": ["R"],
            "S": ["S"],
            "T": ["T"],
            "U": ["U"],
            "V": ["V"],
            "W": ["W"],
            "X": ["X"],
            "Y": ["Y"],
            "Z": ["Z"],
            "#": ["#"],
        };
        let newDictionaries = new Dictionaries;
        let str = '';
        let re = new RegExp("^[a-zA-Z]+$");
        this.props.CustomerList.map(prod => {
            str = newDictionaries.makePy(prod.name);
            str = str[0].substring(0, 1);
            if (re.test(str) == true) {
                Object.keys(CustomerList).map(key => {
                    if (str == key) {
                        CustomerList[key].push(prod)
                    }
                })
            } else {
                CustomerList['#'].push(prod)
            }
        });
        Object.keys(CustomerList).map(prod => {
            if (CustomerList[prod].length == 0) {
                delete CustomerList[prod]
            }
        });
        this.setState({
            CustomerList: CustomerList
        })
    }
    /***@ XinD 2018/10/31 选择单条客户 @***/
    CustomerClick = (key) =>{
        this.props.sureCustomer(key);
        this.setState({
            actCustomer:key.customerId
        })
    };
    /***@ XinD 2018/10/31 通讯录列表模版 @***/
    MailCustomerList = () => {
        let CustomerList = this.state.CustomerList || '';
        if (CustomerList != '') {
            return Object.keys(CustomerList).map(prod => {
                if(CustomerList[prod].length != 1){
                    return CustomerList[prod].map((key,index)=>{
                        if(index==0) {
                            return (
                                <dt id={key + 'M'}>{key}</dt>
                            )
                        }else{
                            return (
                                <dd>
                                    {(key.customerId && this.state.actCustomer != key.customerId) && <img src="image/icon/check.png" alt="" onClick={this.CustomerClick.bind(this,key)}/>}
                                    {(key.customerId && this.state.actCustomer == key.customerId) && <img src="image/icon/actCheck.png" alt=""/>}

                                    <span className='name'>{key.name}</span>
                                    <span className='gender'>{key.genderCode==1?'女':'男'}</span>
                                    <span>{key.birthday}</span>
                                </dd>
                            )
                        }
                    })
                }
            })
        }
    };
    /***@ XinD 2018/10/31 点击名字首字母，跳转到对应位置并在屏幕中央显示点击项 @***/
    scrollToAnchor = (anchorName) => {
        this.setState({
            ClickShowText:anchorName.substring(0, 1),
            customerShowState:true
        },()=>{
            setTimeout(()=>{
                this.setState({
                    customerShowState:false
                })
            },500)
        });
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if(anchorElement) { anchorElement.scrollIntoView({block: 'start', behavior: 'smooth',alignToTop:true}); }
        }
    };
    /***@ XinD 2018/10/31 右侧名字首字母缩写 @***/
    DictionariesList = () =>{
        let CustomerList = this.state.CustomerList || '';
        return Object.keys(CustomerList).map(prod => {
            if(CustomerList[prod].length != 1){
                return(
                    <li onClick={this.scrollToAnchor.bind(this,prod + "M")}>{prod}</li>
                )
            }
        })
    };
    /***@ XinD 2018/10/31 底部确定、取消按钮 @***/
    editState = (value) =>{
        this.props.stateClick(value)
    };
    render() {
        return (
            <div>
                <dl className='MailList'>
                    {
                        this.MailCustomerList()
                    }
                </dl>
                <ul className='DictionariesList'>
                    {
                        this.DictionariesList()
                    }
                </ul>
                {
                    this.state.customerShowState && <div className='customerIdShow'>
                        {
                            this.state.ClickShowText
                        }
                    </div>
                }
                <footer>
                    <span onClick={this.editState.bind(this,false)}>取消</span>
                    <span onClick={this.editState.bind(this,true)}>确定</span>
                </footer>
            </div>
        )
    }
}

