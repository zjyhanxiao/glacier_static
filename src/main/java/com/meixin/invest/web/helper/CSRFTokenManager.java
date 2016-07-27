package com.meixin.invest.web.helper;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

public class CSRFTokenManager {
	
	public static final String CSRF_TOKEN = "csrf_token";

	public static String getTokenForSession(HttpServletRequest request) {
		String token = null;
		Session session = (Session)request.getAttribute("session");
		
		synchronized (session) {
			token = session.getCsrfToken();
			if (null == token) {
				token = UUID.randomUUID().toString();
				session.setCsrfToken(token);
				session.persist(request);
			}
		}
		return token;
	}
}
