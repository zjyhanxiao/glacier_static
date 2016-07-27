package com.meixin.invest.web.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
@Slf4j
public class DefaultController {

	@RequestMapping(value = "/{name}.html",method = RequestMethod.GET)
	public String defaultHandler(@PathVariable String name) {
		return name;
	}
}
