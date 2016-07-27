package com.meixin.invest.web.helper;

import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;

import com.google.common.collect.Maps;

public class RequestUtil {

	public static String getCookie(HttpServletRequest request, String key){
		Cookie[] cookies = request.getCookies();

		int curVer = -1;
		Cookie res = null;
		if(cookies != null){
			for(Cookie cookie:cookies){
				if(key.equals(cookie.getName())){
					if(cookie.getVersion()>curVer){
						curVer = cookie.getVersion();
						res = cookie;
					}
				}
			}
		}
		if(res != null){
			return res.getValue();
		}else{
			return null;
		}
	}
}
