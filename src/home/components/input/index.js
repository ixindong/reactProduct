import React,{Component} from 'react';//引入react
import * as tool from 'publicJs';
/**
 * 验证为空：required 默认为验证
 * 为空提示：emptyTip
 * 错误提示：errorTip
 * 表单类型：dataType
 * username:只能输入2-4个中文
 * password:只能输入6-18个字母与数字的组合,没有特殊字符
 * telephone:手机号码
 * identity: 身份证
 * email：邮件
 * url: 网址
 * imgCode: 图形验证码
 * phoneCode: 手机验证码
 * bankcard: 银行卡
 * money: 金钱
 * couponCode:兑换码
 */
/**
 * 验证规则
 * @type {Object}
 */
var rules={
	'username': '^[\u4e00-\u9fa5]{2,4}$',
	'password': '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$',
	'telephone': '^1[3|4|5|7|8][0-9]{9}$',
	'identity': '^(\\d{18})|\\d{17}(\\d|X|x)$',
	'email': "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
	'url': '^((http|https):\/\/(\\w+:{0,1}\\w*@)?(\\S+)|)(:[0-9]+)?(\/|\/([\\w#!:.?+=&%@!\-\/]))?$',
	'imgCode': '^[a-zA-Z0-9]{4}$',
	'phoneCode': '^[a-zA-Z0-9]{4}$',
	'bankcard': '^\\d{12,19}$',
	'couponCode': '^[a-zA-Z0-9]*$',
	'money': '^[0-9]{1}[\\d]*\.?[\\d]{0,2}$'
}
/**
 * 为空提示
 * @type {Object}
 */
var emptyTips={
	'username': '姓名不能为空!',
	'password': '密码不能为空!',
	'telephone': '手机号码不能为空!',
	'identity': '身份证号码不能为空!',
	'email': "邮箱不能为空",
	'url': '网址不能为空!',
	'imgCode': '图形验证码不能为空!',
	'phoneCode': '手机验证码不能为空!',
	'bankcard': '银行卡号不能为空!',
	'couponCode':'兑换码不能为空',
	'money': '金钱不能为空!'
}

/**
 * 错误提示
 * @type {Object}
 */
var errorTips={
	'username': '姓名为2-4个中文',
	'password': '密码为6-18个字母与数字的组合,没有特殊字符',
	'telephone': '手机号码为11位有效号码',
	'identity': '身份证格式错误',
	'email': "邮箱格式错误",
	'url': '网址格式错误',
	'imgCode': '图形验证码错误',
	'phoneCode': '手机验证码错误',
	'bankcard': '银行卡号不符合规则',
	'couponCode':'兑换码不符合规则',
	'money': '金钱不符合规则'
}

/**
 * 默认placeholder值
 * @type {Object}
 */
var placeholders={
	'username': '请输入用户名',
	'password': '请输入6-18位字母与数字的组合',
	'telephone': '请输入手机号码',
	'identity': '请输入身份证号码',
	'email': "请输入邮箱",
	'url': '请输入网址',
	'imgCode': '请输入图形验证码',
	'phoneCode': '请输入手机验证码',
	'bankcard': '请输入银行卡号',
	'couponCode':'请输入兑换码',
	'money': '请输入金额'
}

/**
 * 默认maxLength值
 * @type {Object}
 */
var maxLengths={
	'username': '',
	'password': '18',
	'telephone': '11',
	'identity': '18',
	'email': "",
	'url': '',
	'imgCode': '4',
	'phoneCode': '4',
	'bankcard': '19',
	'money': '10'
}

var rule;//input验证规则
var emptyTip;//为空提示
var errorTip;//错误提示
var placeholder;//placeholder
var maxLength;//最大长度限制
/**
 * input 组件
 * 默认为需要验证 required 为空
 * errorTip emptyTip placeholder 默认存在,可以选择性填写
 * rule 验证规则默认存在,可以选择性填写
 * dataType 类型根据input需要验证类型填写
 */
export default class Input extends Component{
	//设置默认props
	static defaultProps={
		dataType: '',
		placeholder:'',
		rule: '',
		emptyTip: '',
		errorTip: '',
		required: 'true',
		isBlur: false //是否需要光标离开验证
	}
	//构建函数
	constructor(props){
		super(props);
	}
	//获取input的验证规则
	initAttr(){
		//验证规则初始化
		rule=this.props.rule||rules[this.props.dataType];

		//为空提示初始化
		emptyTip=this.props.emptyTip||emptyTips[this.props.dataType];
		//错误提示初始化
		errorTip=this.props.errorTip||errorTips[this.props.dataType];

		//placeholder初始化
		placeholder=this.props.placeholder||placeholders[this.props.dataType];

		//maxLength初始化
		maxLength=this.props.maxlength||maxLengths[this.props.dataType];
	}
	//inputChange
	inputChange=(e)=>{
		let value=e.target.value;
		let index=this.props.index;
		let isEmpty=true;//是否为空
		let isTrue=true;//验证规则
		let errorText='';//错误的提示
		this.initAttr();
		//是否需要验证
		if(this.props.required=='true'){
			//用户输入是否为空
			if(tool.strUtil.isEmpty(value)){
				isEmpty = true;//为空
				isTrue = false;//错误
				errorText=emptyTip;
			}else{
				isEmpty = false;//不为空
				let config=this.testValue(value);//返回用户错误的提示
				isTrue=config.isTrue;
				errorText=config.errorText;
			}
		}
		this.props.onChange(value,index,isEmpty,isTrue,errorText);//更新用户输入的内容
	}
	/**
	 * [验证是否符合规则],执行对应的操作,返回错误提示,不弹窗
	 */
	testValue=(str)=>{
		let obj={};
		obj.errorText='';
		obj.isTrue=false;
		var testRegex=new RegExp(rule);
		//如果匹配
		if(testRegex.test(str)){
			/**
			 * 最小金额判断
			 * @param  {[type]} !tool.strUtil.isEmpty(this.props.startMoney) [description]
			 * @return {[type]}                                         [description]
			 */
			if(!tool.strUtil.isEmpty(this.props.startMoney)){
				if(parseFloat(str)<parseFloat(this.props.startMoney)){
					if(!tool.strUtil.isEmpty(this.props.startMoneyTip)){
						obj.errorText=this.props.startMoneyTip;
					}else{
						obj.errorText=`最小金额为${this.props.startMoney}元`;
					}
					return obj;
				}
			}

			/**
			 * 最大金额判断
			 * @param  {[type]} !tool.strUtil.isEmpty(this.props.startMoney) [description]
			 * @return {[type]}                                         [description]
			 */
			if(!tool.strUtil.isEmpty(this.props.endMoney)){
				if(parseFloat(str)>parseFloat(this.props.endMoney)){
					if(!tool.strUtil.isEmpty(this.props.endMoneyTip)){
						obj.errorText=this.props.endMoneyTip;
					}else{
						obj.errorText=`最大金额为${this.props.endMoney}元`;
					}
					return obj;
				}
			}
			obj.isTrue=true;
			return obj;
		}else{
			obj.errorText=errorTip;
		}
		return obj;
	}

	//清空输入框的值
	del = (e) => {
		let value = '';
		let index = this.props.index;
		let isEmpty = true;//是否为空
		let isTrue = false;//验证规则
		let errorText='';//错误的提示
		this.props.onChange(value,index,isEmpty,isTrue,errorText);//更新用户输入的内容
	}
	render(){
		this.initAttr();
		return(
			<div className='component-input'>
				<input  type={this.props.type}  className={`input ${this.props.className||''}`}
				maxLength={maxLength} placeholder={placeholder}
				onChange={this.inputChange} />
			<i className={`icon-del ${this.props.value?'show':'hide'}`}  onClick={this.del}></i>
			</div>

		)
	}
	shouldComponentUpdate(nextProps){
		return this.props!==nextProps;
	}
}
/**
 * 组件属性校正
 * @type {Object}
 */
Input.propTypes={
  required: React.PropTypes.string,//是否验证 默认为true
  emptyTip: React.PropTypes.string,//为空提示
  errorTip: React.PropTypes.string,//错误提示
  type: React.PropTypes.string.isRequired,//input type
	dataType: React.PropTypes.string.isRequired,//验证类型
  maxlength: React.PropTypes.string,//最大长度限制
  rule: React.PropTypes.string,//正则
  startMoney:React.PropTypes.string,//最小金额
	startMoneyTip:React.PropTypes.string,//最小金额错误提示
  endMoney:React.PropTypes.string,//最大金额
	startMoneyTip:React.PropTypes.string,//最大金额错误提示
  index: React.PropTypes.string.isRequired,//当前input的下标 表示为第几个input 从0开始
}
