ERROR = {
    FIRST_NAME_EMPTY:   100000,
    FIRST_NAME_ERROR:   100001,
    LAST_NAME_EMPTY:    100010,
    LAST_NAME_ERROR:    100011,
    COUNTRY_EMPTY:      100020,
    COUNTRY_ERROR:      100021,
    ID_NUMBER_EMPTY:    100030,
    ID_NUMBER_ERROR:    100031,
    PASSPORT_EMPTY:     100040,
    PASSPORT_ERROR:     100041,
    BIRTHDAY_EMPTY:     100050,
    BIRTHDAY_ERROR:     100051,
    SSN_EMPTY:          100060,
    SSN_ERROR:          100061,

    PROVINCE_EMPTY:     100100,
    PROVINCE_ERROR:     100101,
    CITY_EMPTY:         100110,
    CITY_ERROR:         100111,
    ADDRESS_EMPTY:      100120,
    ADDRESS_ERROR:      100121,
    ROOM_EMPTY:         100130,
    ROOM_ERROR:         100131,
    POSTAL_EMPTY:       100140,
    POSTAL_ERROR:       100141,

    AMOUNT_EMPTY:       100200,
    AMOUNT_ERROR:       100201,
    SIGN_EMPTY:         100210,
    SIGN_ERROR:         100211,
    ACC_NAME_EMPTY:     100220,
    ACC_NAME_ERROR:     100221,
    ACC_NUM_EMPTY:      100230,
    ACC_NUM_ERROR:      100231,
    ROUTING_NUM_EMPTY:  100240,
    ROUTING_NUM_ERROR:  100241,

    PAY_EMPTY:          101000,
    ACC_EMPTY:          101010,
    CHECK_EMPTY:        101020,
    PHOTO_EMPTY:        101030,
    AGREEMENT_EMPTY:    101040,

    ACCREDITED_EMPTY:   102000,
    ACCREDITED_ERROR:   102001,
    INCOME_EMPTY:       102010,
    CHOOSE_EMPTY:       102020,
    CITIZEN_EMPTY:      102030,
    WITHHOLDING_EMPTY:  102040,

}

HINT = {
    100000: '请填写您的姓',
    100001: '请用汉语拼音填写姓',
    100010: '请填写您的名',
    100011: '请用汉语拼音填写名',
    100020: '请选择国家与地区',
    100021: '您选择的国家有误',
    100030: '请填写您的身份证号码',
    100031: '身份证号码格式不正确',
    100040: '请填写您的护照号码',
    100041: '护照号码格式不正确',
    100050: '请选择您的生日',
    100051: '您的生日未满18岁,无法进行投资',
    100060: '请填写SSN号码',
    100061: 'SSN号码格式不正确',

    100100: '请填写省份名称',
    100101: '省份名称格式不正确',
    100110: '请填写城市名称',
    100111: '城市名称格式不正确',
    100120: '请填写您的街道名称',
    100121: '街道名称格式不正确',
    100130: '请填写您的公寓号',
    100131: '公寓号格式不正确',
    100140: '请填写您的邮政编码',
    100141: '邮政编码格式不正确',

    100200: '请输入投资金额',
    100201: '投资金额至少为10000,为5000的倍数',
    100210: '请在最下方签名',
    100211: '签名格式不正确',
    100220: '请填写卡片姓名',
    100221: '卡片姓名格式不正确',
    100230: '请填写卡片验证码',
    100231: '卡片验证码格式不正确',
    100240: '请填写卡片号码',
    100241: '卡片号码格式不正确',

    101000: '请选择付款方式',
    101010: '请选择卡片类型',
    101020: '请选择卡片类型',
    101030: '请上传照片',
    101040: '请认真阅读并同意上述协议',

    102000: '请选择',
    102001: '您选择不，将不能继续进行后面的投资',
    102010: '请选择',
    102020: '请选择',
    102030: '请选择',
    102040: '请选择',
}
function format_error(key, s) {
    if (key == 'ENname') {
        if (s.length == 0)
						return ERROR.LAST_NAME_EMPTY;
				if (!isAlpha(s))
						return ERROR.LAST_NAME_ERROR;
        return 0;
    }
    if (key == 'ENssn') {
        if (s.length == 0) {
            return ERROR.SSN_EMPTY;
        }
        var reg = /^\d{9}$/;
        if (!reg.test(s)) {
            return ERROR.SSN_ERROR;
        }
        return 0;
    }
    if (key == 'ENbirthday') {
        if (s.length == 0)
            return ERROR.BIRTHDAY_EMPTY;
				if (!isBirthday18(s))
						return ERROR.BIRTHDAY_ERROR;
        return 0;
    }
    if (key == 'ENaddress') {
        if (s.length == 0)
            return ERROR.ADDRESS_EMPTY;
        return 0;
    }
    if (key == 'ENroom') {
        if (s.length == 0)
            return ERROR.ROOM_EMPTY;
        return 0;
    }
    if (key == 'ENcity') {
        if (s.length == 0)
            return ERROR.CITY_EMPTY;
        return 0;
    }
    if (key == 'ENstate') {
        if (s.length == 0)
            return ERROR.PROVINCE_EMPTY;
        return 0;
    }
    if (key == 'ENpostal') {
        if (s.length == 0)
            return ERROR.POSTAL_EMPTY;
        return 0;
    }

    if (key == 'firstname') {
        if (s.length == 0)
            return ERROR.FIRST_NAME_EMPTY;
				if (!isAlpha(s))
						return ERROR.FIRST_NAME_ERROR;
        return 0;
    }
    if (key == 'lastname') {
        if (s.length == 0)
            return ERROR.LAST_NAME_EMPTY;
				if (!isAlpha(s))
						return ERROR.LAST_NAME_ERROR;
        return 0;
    }
    if (key == 'country') {
        if (s.length == 0)
            return ERROR.COUNTRY_EMPTY;
        return 0;
    }
    if (key == 'idnumber') {
        if (s.length == 0)
            return ERROR.ID_NUMBER_EMPTY;
        return 0;
    }
    if (key == 'passport') {
        if (s.length == 0) {
            return ERROR.PASSPORT_EMPTY;
        }
        var reg = /^[0-9a-zA-Z]\d{8}$/;
        if (!reg.test(s)) {
            return ERROR.PASSPORT_ERROR;
        }
        return 0;
    }
    if (key == 'birthday') {
        if (s.length == 0)
            return ERROR.BIRTHDAY_EMPTY;
				if (!isBirthday18(s))
						return ERROR.BIRTHDAY_ERROR;
        return 0;
    }
    if (key == 'province') {
        if (s.length == 0)
            return ERROR.PROVINCE_EMPTY;
        return 0;
    }
    if (key == 'city') {
        if (s.length == 0)
            return ERROR.CITY_EMPTY;
        return 0;
    }
    if (key == 'address') {
        if (s.length == 0)
            return ERROR.ADDRESS_EMPTY;
        return 0;
    }
    if (key == 'room') {
        if (s.length == 0)
            return ERROR.ROOM_EMPTY;
        return 0;
    }
    if (key == 'postal') {
        if (s.length == 0)
            return ERROR.POSTAL_EMPTY;
        return 0;
    }
    if (key == 'amount') {
        if (s.length == 0)
            return ERROR.AMOUNT_EMPTY;
				if (!isValidAmount(s))
						return ERROR.AMOUNT_ERROR;
        return 0;
    }
    if (key == 'sign') {
        if (s.length == 0)
            return ERROR.SIGN_EMPTY;
        return 0;
    }
    if (key == 'accountname') {
        if (s.length == 0)
            return ERROR.ACC_NAME_EMPTY;
        return 0;
    }
    if (key == 'routingnumber') {
        if (s.length == 0)
            return ERROR.ROUTING_NUM_EMPTY;
				if (!isRoutingNumber(s))
						return ERROR.ROUTING_NUM_ERROR;
        return 0;
    }
    if (key == 'accountnumber') {
        if (s.length == 0)
            return ERROR.ACC_NUM_EMPTY;
        return 0;
    }
}

function isPhone(s) {
    if (s.length == 0) return true;
     var reg = /^([+0-9])+$/;
     return reg.test(s);
}

function isMail(s) {
    if (s.length == 0) return true;
     var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return reg.test(s);
}

function isCode(s) {
    if (s.length == 0) return true;
     var reg = /\d{6}$/;
     return reg.test(s);
}

function isPassword(s) {
    if (s.length == 0) return true;
    if (s.length < 6) return false;
    if (s.length > 20) return false;
		var reg = /^([A-Za-z]+(?=[0-9])|[0-9]+(?=[A-Za-z]))[a-z0-9]+$/ig;
		var num = /[0-9]+/;
		var alpha = /[A-Za-z]+/;
		//if (!num.test(s)) return false;
		if (!alpha.test(s)) return false;
    return true;
}

function number_format(s) {
    if (s.length <= 3) return s;
    return number_format(s.substring(0, s.length-3)) + ',' + s.substring(s.length-3, s.length);
}

function funder_type(t) {
    if (t == 1) return '国际投资人';
    if (t == 2) return '美国合格投资人';
    if (t == 3) return '非美国合格投资人';
    return '投资人';
}

function passport2taxid(s) {
		ret = ""
		for (i=0; i<s.length; i++){
			var c = s.charAt(i);
			var first;
			if (('0'<=c) & (c <= '9')) {
					first = (s.charCodeAt(i)-48) % 10;
			}
			if (('a'<=c) & (c <= 'z')) {
					first = (s.charCodeAt(i)-96) % 10;
			}
			if (('A'<=c) & (c <= 'Z')) {
					first = (s.charCodeAt(i)-64) % 10;
			}
			ret = ret + String(first)
		}
    return ret;
}

function isRoutingNumber(s) {
    if (s.length != 9) return false;
    return true;
}

function isBirthday18(s) {
		var today = new Date();
		today_y = 1900 + today.getYear();
		today_m = 1 + today.getMonth();
		today_d = today.getDate();
		ymd = s.split('-');
		year = Number(ymd[0]); month = Number(ymd[1]); date = Number(ymd[2]);
		if (today_y - year < 18) return false;
		else if (today_y - year == 18) {
				if (today_m - month < 0) return false;
				else if (today_m - month == 0) {
						if (today_d - date < 0) return false;
						else return true;
				}
				else return true;
		}
		return true;
}

function isValidAmount(s){
		amount = Number(s);
		if (s < 10000) return false;
		if (s % 5000 != 0) return false; // this should be from debt_par_value, but it's okay for now
		return true;
}

function isAlpha(s){
		return /^[ A-Za-z]+$/i.test(s);
}

function get_investor_profile(success_func, error_func) {
    $.ajax({
        url: API_PROFILE,
        dataType: 'json',
        data: {},
        success: function(result, status) {
            success_func(result);
        },
        error: function(result, status) {
            if (result.status == 401) {
                window.location.href = URL_LOGIN_PHONE;
            }
            if (error_func) error_func(result);
        },
        fail: function(result, status) {
        },
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader('Authorization','Bearer ' + $.cookie('access_token'));
        }
    });
}

