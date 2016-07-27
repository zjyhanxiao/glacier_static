package com.meixin.invest.utils;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

@Slf4j
class ConfigUtil {

	private static Properties prop;
	private static InputStream inputStream;		
	static {
		try {
			inputStream = ConfigUtil.class.getResourceAsStream("/application.properties");
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
	}
	
	protected static String get(String key){
		return prop.getProperty(key);
	}
}
