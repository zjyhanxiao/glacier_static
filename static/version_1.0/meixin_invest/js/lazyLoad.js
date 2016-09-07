/**
 * Created by admin on 2016/9/7.
 */
$(document).ready(function () {
    function loadPhoto () {
        var djson={
            "about":
                ['https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_aboutus_01_300x188.jpg',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_aboutus_02_300x200.jpg',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_aboutus_03_300x213.jpg',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_aboutus_04_300x199.jpg'],
            "report":
                ['https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/media/media_index/yahu.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/media/media_index/wangyi.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/media/media_index/toutiao.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/media/media_index/tencent.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/media/media_index/souhu.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/media/media_index/36kr.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/media/media_index/huanqiu.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/media/media_index/chuangyebang.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/media/media_index/aifenxi.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/media/media_index/iheima.png'],
            "partner":
                ['https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_01.jpg',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_02.jpg',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_03.jpg',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_04.jpg',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_05.jpg',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_06_458x189.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_07.jpg',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_08.jpg',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_09.jpg',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_10.jpg'],
            "partner_mb":
                ['https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_01_364x34.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_02_311x76.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_03_541x133.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_04_285x135.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_05_220x55.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_06_458x189.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_07_315x96.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_08_290x86.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_09_540x221.png',
                    'https://s1.meixinglobal.com/static/version_1.0/dist/meixin_invest/img/landing/landing_list_logo_10_478x175.png']
        };
        var arrAboutUs=$("#aboutUs").find('img');
        $.each(arrAboutUs,function (i,k) {
            arrAboutUs.eq(i).attr('src',djson.about[i]);
        });
        var arrReport=$("#report-pc").find('img');
        $.each(arrReport,function (i,k) {
            arrReport.eq(i).attr('src',djson.report[i]);
        });
        var arrReportMb=$("#report-mb").find('img');
        $.each(arrReportMb,function (i,k) {
            arrReportMb.eq(i).attr('src',djson.report[i]);
        });
        var arrPartner=$("#partner-pc").find('img');
        $.each(arrPartner,function (i,k) {
            arrPartner.eq(i).attr('src',djson.partner[i]);
        });
        var arrPartnerMb=$("#partner-mb").find('img');
        $.each(arrPartnerMb,function (i,k) {
            arrPartnerMb.eq(i).attr('src',djson.partner_mb[i]);
        });
    }
});