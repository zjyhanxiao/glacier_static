package com.meixin.invest.web.helper;

import com.meixin.invest.cache.MemcacheUtil;
import com.meixin.invest.model.AuthUser;
import lombok.Data;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * 自定义session
 * @author meixin
 *
 */
@Data
public class Session {
	
	/**
	 * 自定义session_id在cookie中的key
	 */
	public static final String SESSION_ID_COOKIE_KEY = "mx_sid";
	/**
	 * cookie过期时间, 10 day
	 */
	public static final int COOKIE_MAX_AGE = 864000;
	
	private String sid = null;
	
	private String csrfToken;
	
	private AuthUser user;
	
	private Map<String,String> profileModifyForm;
	
	public static Session initSession(String sid, HttpServletRequest request){
		Session session = MemcacheUtil.getSession(sid);
		if(session == null){
			session = new Session();
			session.setSid(sid);
		}
		session.persist(request);
		return session;
	}
	
	public void persist(HttpServletRequest request){
		MemcacheUtil.setSession(sid, this);

	}

}
