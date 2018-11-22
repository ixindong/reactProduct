import React, {Component, PropTypes} from 'react'
import Banner from 'banner'
import GetPage from 'getPage'
import MainInsure from "MainInsure";
import ComplanyEtc from "ComplanyEtc";
import Footer from "footer";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            Bannerlist: [
                {
                    bannerUrl: 'image/home/1.jpg'
                }, {
                    bannerUrl: 'image/home/2.jpg'
                }, {
                    bannerUrl: 'image/home/3.jpg'
                }
            ],
            MainInsure: [
                {
                    MainInsureName: '在线投保',
                    MainInsureImage: 'image/home/onlineInsur.png',
                    Link: '#/productList',
                    insurType: '00'
                }, {
                    MainInsureName: '建议书',
                    MainInsureImage: 'image/home/proposal.png',
                     Link: '#/proposal',
                    insurType: ''
                }, {
                    MainInsureName: '税优投保',
                    MainInsureImage: 'image/home/SimpleInsur.png',
                    insurType: '20'
                }
            ],
            complanyEtc: [
                {
                    complanyEtcTitle: '公司介绍',
                    complanyEtcImage: 'image/home/picc.png'
                }, {
                    complanyEtcTitle: '产品介绍',
                    complanyEtcImage: 'image/home/productintroduce.png'
                }, {
                    complanyEtcTitle: '培训资料',
                    complanyEtcImage: 'image/home/Trainingmaster.png'
                }, {
                    complanyEtcTitle: '健康资讯',
                    complanyEtcImage: 'image/home/Healthinform.png'
                }
            ],
            footerNav: [
                {
                    footerText: '首页',
                    footerImage: 'image/icon/index.png',
                    actFooterImage: 'image/icon/actIndex.png'
                }, {
                    footerText: '个人管理',
                    footerImage: 'image/icon/Personal.png',
                    actFooterImage: 'image/icon/actPersonal.png'
                }, {
                    footerText: '团队管理',
                    footerImage: 'image/icon/team.png',
                    actFooterImage: 'image/icon/actTeam.png'
                }, {
                    footerText: '我的',
                    footerImage: 'image/icon/mine.png',
                    actFooterImage: 'image/icon/actMine.png'
                },
            ]
        }
    }

    componentDidMount() {
        this.props.state.loadAnimation = false;

        this.props.state.data.footerNav = this.state.footerNav;
        this.props.state.isFooterAct = 1;
        this.props.state.alertClick = () => {
            this.alertClick()
        };
        this.props.setState(this.props.state);
    }

    /***@ XinD 2018/10/29 短信 @***/
    news = () => {
        this.props.state.alertShow = true;
        this.props.state.alertType = '1';
        this.props.state.alertMsg = '消息功能暂未开放！';
        this.props.setState(this.props.state);
    };

    render() {
        return (
            <div>
                <Banner list={this.state.Bannerlist}></Banner>
                <div className='MainBanner' onClick={this.news}>
                    <img src="image/icon/news.png" alt="短信"/>
                </div>

                <MainInsure list={this.state.MainInsure}></MainInsure>

                <ComplanyEtc list={this.state.complanyEtc}></ComplanyEtc>
                <Footer list={this.props.state.data.footerNav} isFooterAct={this.props.state.data.isFooterAct}></Footer>
            </div>
        )
    }
}

module.exports = GetPage({
    id: 'home',
    component: Main
});
