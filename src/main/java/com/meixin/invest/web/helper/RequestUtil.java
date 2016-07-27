package com.meixin.invest.web.helper;

import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;

import com.google.common.collect.Maps;

public class RequestUtil {
	
	
	public static String getDomain(HttpServletRequest request){
		StringBuffer url = request.getRequestURL();
		String domain = url.delete(url.length() - request.getRequestURI().length(), url.length()).toString();
		return domain;
	}
	
	public static String getIp(HttpServletRequest request){
		String ip = request.getHeader("x-real-ip");
		if(StringUtils.isEmpty(ip)){
			ip = request.getRemoteAddr();
		}
		return ip;
	}

	public static Map<String,String> parseToMap(HttpServletRequest request){
		@SuppressWarnings("unchecked")
		Map<String,String[]> map = request.getParameterMap();

		Map<String,String> result = Maps.newHashMap();

		for(Iterator<String> it=map.keySet().iterator();it.hasNext();){
			String key = it.next();
			String[] values = map.get(key);
			String value = null;
			if(values != null){
				value = values[0];
			}
			result.put(key, value);
		}
		return result;
	}

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
