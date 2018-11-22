import React, { Component, PropTypes } from 'react'
import * as tool from 'publicJs'
import MailList from 'MailList'
import DatePicker from 'react-mobile-datepicker';
import GetPage from 'getPage'

class Main extends Component {
  constructor() {
    super();
    this.state = {
      MailListState: false,
      CustomerLenght: 10000,
      CustomerPage: 1,
      CustomerList: '',
      actCustomerImg: 'image/icon/Magnifier.png',
      CustomerImg: 'image/icon/MailList.png',
      six: [
        {
          code: 1,
          dict_name: '男'
        }, {
          code: 2,
          dict_name: '女'
        }
      ],

    };
  }
  componentDidMount() {
    window._this = this;
    let maritalList = [];
    let idType1List = [];
    let crossSellingTypeList = [];
    this.props.state.loadAnimation = false;
    this.props.setState(this.props.state);
    /***@ XinD 2018/10/31 查询已建客户 @***/
    piccAjax('/customerInfo/QueryCustomerList', {
      "loginAccount": "2111100149",
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
      console.log(occupatioBig, 'occupatioBig');
      _this.setState({
        occupatioBig: occupatioBig,
        occupatioSmall: occupatioSmall,
      })
    });
  }

  /***@ XinD 2018/11/1 输入项 @***/
  inputList = (title, placeholder, value, classStyle, EmphasisStyle) => {
    if (!EmphasisStyle) {
      return (
        <li className='list'>
          <div className={classStyle ? '' : 'border'}>
            <div className='name'>{title}</div>
            <input type="text" placeholder={placeholder} onChange={this.onchangeInput.bind(this, value)}/>
          </div>
        </li>
      )
    } else {
      return (
        <li className='list'>
          <div className={classStyle ? '' : 'border'}>
            <div className='name EmphasisStyle'>{title}</div>
            <input type="text" placeholder={placeholder} onChange={this.onchangeInput.bind(this, value)}/>
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
              <div className='name'>{title}</div>
              <select onChange={this.onchangeSelect.bind(this, value)}>
                <option>{placeholder}</option>
                {
                  occupatioSmall.map(prod => {
                    return (
                      <option
                        value={prod.code || prod.occupCode}>{prod.dict_name}{prod.occupName}</option>
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
              <div className='name'>{title}</div>
              <select onChange={this.onchangeSelect.bind(this, value)}>
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
      this.state[value].map(prod => {
        if (prod.occupCode == e.target.value) {
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

  /***@ XinD 2018/11/1 弹出时间选择框 @***/
  timeClick = (value) => {
    this.setState({
      [value]: true,
      actTimeValue: value
    })
  };
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
    console.log(this.props.state)
  };
  /***@ XinD 2018/11/1 时间选择 @***/
  selectTime = (title, placeholder, value, classState) => {
    return (
      <li className='list'>
        <div className={classState ? 'border noBorder' : 'border'}>
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
  render() {
    return (
      <div>

        <ul className='informationFilling'>
          <li className='box selectHeight'>
            <ul>
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
                this.inputList('年龄', '请输入年龄', 'age')
              }
              {
                this.selectTime('出生日期', '请选择出生日期', 'birthdayTime')
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
                this.fontList('职业代码', (this.props.state.data.Applicant && this.props.state.data.Applicant.occupatioSmall && this.props.state.data.Applicant.occupatioSmall.occupLevel) ? this.props.state.data.Applicant.occupatioSmall.occupLevel : '')
              }

            </ul>
          </li>
        </ul>

        
      </div>
    )
  }
}


let mainFun = new Main();
module.exports = GetPage({
  id: 'home',
  component: Main,
  title:'建议书制作',
  attach: {
    icon: mainFun.state.CustomerImg,
    width: '18',
    height: '20',
    attachClick: mainFun.MailList
  }
});
