package com.meixin.invest.utils;

import lombok.extern.slf4j.Slf4j;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

@Slf4j
public class AppConfig {
	
	private static final String MEMCACHE_SERVER;
	private static final String MEMCACHE_USERNAME;
	private static final String MEMCACHE_PASSWORD;
	
	private static Properties prop;
	private static InputStream inputStream;		
	static {
		try {
		
			inputStream = new FileInputStream(ConfigUtil.get("config.file"));
			prop = new Properties();
			prop.load(inputStream);
		} catch (Exception ex) {
			try {
				if (inputStream != null) {
					inputStream.close();
				}
			} catch (IOException e) {
				log.error("",e);
			}
		}

		MEMCACHE_SERVER = prop.getProperty("memcache_server");
		MEMCACHE_USERNAME = prop.getProperty("memcache_username");
		MEMCACHE_PASSWORD = prop.getProperty("memcache_password");
	}
	public static String getMemcacheServer() {
		return MEMCACHE_SERVER;
	}
	public static String getMemcacheUsername() {
		return MEMCACHE_USERNAME;
	}
	public static String getMemcachePassword() {
		return MEMCACHE_PASSWORD;
	}
	
	

}
