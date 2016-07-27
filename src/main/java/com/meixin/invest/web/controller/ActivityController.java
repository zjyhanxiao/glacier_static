package com.meixin.invest.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ActivityController {

	@RequestMapping(value = "/activity/main", method = RequestMethod.GET)
	public String activityMain() {
		return "activity/coupon";
	}
}
