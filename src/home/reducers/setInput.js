const SI = (_ID = '', seting = {}) => {
    const cb = {
        setDefaut: () => {
            var defaults = Object.assign({
                path: '', //当前页面的href
                loadAnimation: true, //true显示加载动画，false 不显示加载动画
                loadMsg: '加载中', //加载提示
                title: '',//页面标题
                data: {}, //页面的数据
                alertShow: false,//提示框
                alertMsg: '',//提示文字
                onChange: function(){},//改变输入框的值
                inputs: [],//input对象集合
                checked: true,//协议勾选状态
                btnClick: function(){},//提交按钮点击事件
                btnStatus: false,//提交按钮状态,true为正常按钮 false为不可点击按钮
            }, seting);
            return {
                defaults,
                path: {}
            };
        },
        setState: (state, target) => {
            state.path[target.path] = target;
            return Object.assign({},state);
        }
    }
    return (state = {}, action = {}) => {
        if (action._ID && action._ID !== _ID) {
            return state;
        } else if (cb[action.type]) {
            return cb[action.type](state, action.target);
        } else {
            return cb.setDefaut();
        }
    }
}
export default SI;
