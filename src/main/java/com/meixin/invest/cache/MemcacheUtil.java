package com.meixin.invest.cache;

import com.alibaba.fastjson.JSON;
import com.meixin.invest.utils.AppConfig;
import com.meixin.invest.web.helper.Session;
import lombok.extern.slf4j.Slf4j;
import net.spy.memcached.AddrUtil;
import net.spy.memcached.ConnectionFactoryBuilder;
import net.spy.memcached.ConnectionFactoryBuilder.Protocol;
import net.spy.memcached.MemcachedClient;
import net.spy.memcached.auth.AuthDescriptor;
import net.spy.memcached.auth.PlainCallbackHandler;
import org.apache.commons.lang3.StringUtils;

import java.io.IOException;

@Slf4j
public class MemcacheUtil {

//	private static final int MAX_VALUE_SIZE = 1024 * 1024;
//	private static final int EXPIRE_30DAY = 2592000; // 30 day
//	private static final int EXPIRE_30MIN = 1800; //30 min
	private static final int EXPIRE_10DAY = 864000; // 10 day
//	private static final int EXPIRE_1HOUR = 3600; // 1 hour
	private static final int EXPIRE_2MIN = 120; // 1 min
	private static final int EXPIRE_5MIN = 300; // 1 min

	//public static MemcachedClient memcachedClient;
	public static MemcachedClient memcachedClient = null;

	
	static{
		try {
			if(StringUtils.isNotEmpty(AppConfig.getMemcacheUsername()) && StringUtils.isNotEmpty(AppConfig.getMemcachePassword())){
				AuthDescriptor ad = new AuthDescriptor(new String[]{"PLAIN"}, 
						new PlainCallbackHandler(AppConfig.getMemcacheUsername(), AppConfig.getMemcachePassword()));
				
				memcachedClient = new MemcachedClient(
				         new ConnectionFactoryBuilder().setProtocol(Protocol.BINARY).setAuthDescriptor(ad).build(),
				         AddrUtil.getAddresses(AppConfig.getMemcacheServer()));
			}else{
			    memcachedClient = new MemcachedClient(
	                    new ConnectionFactoryBuilder().setProtocol(Protocol.BINARY).build(),
	                    AddrUtil.getAddresses(AppConfig.getMemcacheServer()));
			}
		} catch (IOException e) {
			log.error("", e);
		}
	}
	
	public static void setSession(String sid, Session session){
		String key = "session_"+sid;
		set(key, JSON.toJSONString(session), EXPIRE_10DAY);
	}

	public static Session getSession(String sid){
		String key = "session_"+sid;
		String json = get(key);
		if(StringUtils.isNotEmpty(json)){
			return JSON.parseObject(json, Session.class);
		}else{
			return null;
		}
	}

	private static String get(String key) {
		try {
			return (String)memcachedClient.get(key);
		} catch (Exception e) {
			log.error("", e);
		}
		return null;
	}

	private static void set(String key, String value, int expire) {
		 memcachedClient.set(key, expire,value);
	}

}
