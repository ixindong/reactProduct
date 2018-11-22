import * as tool from 'publicJs'
const SD = (_ID = '', setting = {}) => {
    const cb = {
        setDefaut: () => {
            var defaults = Object.assign({
                path: '', //当前页面的href
                loadAnimation: true, //true显示加载动画，false 不显示加载动画
                loadMsg: '加载中', //加载提示
                nextBtn: true,//是否显示翻页
                title: '',//页面标题
                data: {}, //页面的数据
                scrollX: 0, //滚动条X
                scrollY: 0, //滚动条Y
                alertShow: false,//提示框
                alertMsg: '',//提示文字
                currentPage: 0,//当前页数
                pageSize: tool.config.pageSize,//一页显示条数
                mdrender: true //当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
            }, setting);
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
export default SD;
