package com.meixin.invest.web.interceptor;

import com.meixin.invest.model.AuthUser;
import com.meixin.invest.web.helper.CSRFTokenManager;
import com.meixin.invest.web.helper.RequestUtil;
import com.meixin.invest.web.helper.Session;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

@Slf4j
public class SessionInterceptor implements HandlerInterceptor {
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		
		Session session = makeSession(request, response);
		request.setAttribute("session", session);
		//logger.info("test:"+request.getSession().getAttribute("test"));
		
		AuthUser user = session.getUser();
		if(user != null){
			request.setAttribute("user", user);
		}

		//csrf_token
		String csrf_token = session.getCsrfToken();
		if(StringUtils.isEmpty(csrf_token)){
			csrf_token = CSRFTokenManager.getTokenForSession(request);
		}
		request.setAttribute(CSRFTokenManager.CSRF_TOKEN, "<input type=\"hidden\" name=\"csrf_token\" value=\""+csrf_token+"\">");
		
		Cookie cookie = new Cookie("access_token", csrf_token);
		cookie.setDomain(request.getServerName());
		cookie.setPath("/");
		cookie.setMaxAge(Session.COOKIE_MAX_AGE);
		response.addCookie(cookie);
		
		//source
		String source = request.getParameter("source");
		if(StringUtils.isEmpty(source)){
			source = request.getParameter("fcode");
		}
		if(StringUtils.isNotEmpty(source)){
			cookie = new Cookie("source", source);
			cookie.setDomain(request.getServerName());
			cookie.setPath("/");
			cookie.setMaxAge(2592000);//30day
			response.addCookie(cookie);
		}

		//log
		StringBuilder access = new StringBuilder();
		access.append(request.getRequestURI());
		access.append(", ");
		if(user != null){
			access.append(user.getId());
		}else{
			access.append("0");
		}
		access.append(", refer=");
		access.append(request.getHeader("Referer"));		
		access.append(", auth=");
		access.append(request.getHeader("Authorization"));
		access.append(", csrf=");
		access.append(request.getParameter(CSRFTokenManager.CSRF_TOKEN));
		access.append(", ua=");
		access.append(request.getHeader("User-Agent"));
		response.setHeader("Access-Control-Allow-Origin", "*");
		log.info(access.toString());
		return true;
	}

	
	private Session makeSession(HttpServletRequest request, HttpServletResponse response){
		String sid = RequestUtil.getCookie(request, Session.SESSION_ID_COOKIE_KEY);

		if(StringUtils.isEmpty(sid)){
			sid = UUID.randomUUID().toString();
		}
		Session session = Session.initSession(sid, request);
		
		//将sid存入cookie
		Cookie cookie = new Cookie(Session.SESSION_ID_COOKIE_KEY, sid);
		cookie.setDomain(request.getServerName());
		cookie.setPath("/");
		cookie.setMaxAge(Session.COOKIE_MAX_AGE);
		response.addCookie(cookie);
	
		return session;	
	}


	public void postHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler, ModelAndView modelAndView) throws Exception {
	}

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
			Object handler, Exception ex) throws Exception {
			
	}

}
