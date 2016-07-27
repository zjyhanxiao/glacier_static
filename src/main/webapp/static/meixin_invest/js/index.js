function _handleErrors(e) {
  var t = !1, n = !1, r = "";
  $("#" + e + "SelectError").attr("error", !1), $("#" + e + "NameError").attr("error", !1), $("#" + e + "EmailError").attr("error", !1), $("#" + e + "PhoneError").attr("error", !1);
  var i = $(_getSelectIdFromType(e)).val();
  i === "default" && ($("#" + e + "SelectError").attr("error", !0), t = !0);
  var s = $("#" + e + "Name").val();
  s === "" && ($("#" + e + "NameError").attr("error", !0), t = !0);
  var o = $("#" + e + "Email").val();
  o.toString().indexOf("@") === -1 && ($("#" + e + "EmailError").attr("error", !0), n = !0, r += "Please enter a valid email.</br>");
  var u = $("#" + e + "Phone").val();
  return u === "" && ($("#" + e + "PhoneError").attr("error", !0), t = !0), t && (r += "Please fill out required fields above."), {
    error: t || n,
    errorMsg: r
  }
}
function _resetForm(e, t) {
  e.find("input:text, textarea").val("")
}
function supportsSVG() {
  return !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
}
function stickyNav() {
  var e = $(window).width(), t = $(window).scrollTop();
  t > $(".navbar").outerHeight() && e >= 768 ? $(".navbar").addClass("sticky") : $(".navbar").removeClass("sticky")
}
/*function resizeFunctions() {
  var e = $(window).width(), t = $(window).height();
  $("#refer").length == 0 && (e < 768 ? ($(".navbar").removeClass("navbar-fixed-top"), $(".windowHeight").css("height", "auto")) : ($(".navbar").addClass("navbar-fixed-top"), $(".windowHeight").css("height", t)))
}*/
function scrollDown() {
  var e = $(window).scrollTop();
  $("html, body").animate({scrollTop: $("#featured").position().top})
}
function scrollFAQ() {
  var e = $(window).scrollTop();
  $("html, body").animate({scrollTop: $("#faq").position().top})
}
function tracking() {
  $(".navbar #btnGetStarted").click(function () {
    ga("send", "event", {eventCategory: "Home Page Button Click", eventAction: "Get Started", eventLabel: "Clicked"})
  }), $("#footerContent #footer-email").click(function () {
    ga("send", "event", {eventCategory: "Home Page Button Click", eventAction: "Email Us", eventLabel: "Clicked"})
  }), $("#getStartedBtn").click(function () {
    ga("send", "event", {eventCategory: "Contact", eventAction: "Information Request", eventLabel: "Home Page"})
  }), $("#hero .btn-play").click(function () {
    ga("send", "event", {eventCategory: "Home Page Button Click", eventAction: "Play Video", eventLabel: "Clicked"})
  }), $("#featured-techcrunch").click(function () {
    ga("send", "event", {eventCategory: "Home Page Button Click", eventAction: "TechCrunch", eventLabel: "Clicked"})
  }), $("#featured-wsj").click(function () {
    ga("send", "event", {eventCategory: "Home Page Button Click", eventAction: "WSJ", eventLabel: "Clicked"})
  }), $("#featured-entrepreneur").click(function () {
    ga("send", "event", {eventCategory: "Home Page Button Click", eventAction: "Entrepreneur", eventLabel: "Clicked"})
  }), $("#stayTuned #investBtn").click(function () {
    ga("send", "event", {eventCategory: "Contact", eventAction: "Information Request", eventLabel: "Invest"})
  }), $("#submitReferral").click(function () {
    ga("send", "event", {eventCategory: "Contact", eventAction: "Information Request", eventLabel: "Refer"})
  }), $("#btn-subscribe-blog").click(function () {
    ga("send", "event", {eventCategory: "Email", eventAction: "Signup", eventLabel: "Blog Sidebar"})
  })
}
var selectBoxes = {};
$.fn.serializeObject = function () {
  var e = this.serializeArray(), t = {};
  for (var n = 0; n < e.length; n++)t[e[n].name] = e[n].value;
  return t
}, $("#btn-subscribe-blog").click(function (e) {
  e.preventDefault();
  var t = $(this).html(), n = $(this).outerWidth();
  $(this).css("width", n), $(this).html('<div class="loading"></div>');
  var r = "#emailBlogForm", i = $(r + " .email").val(), s = -5;
  if (!i || !i.match(/^.+@.+\..+$/)) {
    $(r + " p.error-msg").fadeIn(100).html("Please enter a valid email."), $("#btn-subscribe-blog").html(t);
    return
  }
  $.ajax(Able.baseUrl + "/api/subscribe_jsonp", {
    dataType: "jsonp",
    data: {payload: JSON.stringify($(r + " form").serializeObject())},
    success: function (e) {
      lastSubscriberEmail = e.subscriber_email, lastSubscriberId = e.subscriber_id, $(r + " form").fadeOut("fast", function () {
        $(r + " .successMsg").fadeIn(300), $(r + " .linkedIn").length && IN.User.isAuthorized() && $(r + " .linkedIn").hide()
      }), $("#btn-subscribe-blog").html(t)
    }
  })
}), $(window).load(function () {
  var e = $(window).width(), t = $(window).height();
  tracking()
}), $(document).ready(function () {
  function u(e) {
    if (e.origin === "https://player.vimeo.com") {
      var t = JSON.parse(e.data);
      switch (t.event) {
        case"ready":
          f();
          break;
        case"finish":
          l()
      }
    }
  }

  function a(e, t) {
    var n = {method: e};
    t && (n.value = t);
    var r = $("iframe"), i = r.attr("src").split("?")[0];
    r[0].contentWindow.postMessage(JSON.stringify(n), i)
  }

  function f() {
    a("addEventListener", "finish")
  }

  function l() {
    $("#mktVideo").length && "true" === $("#player").attr("data-ftu") && $("#mktVideo").modal("hide"), $("#bbVideo").length && $("#bbVideo").modal("hide")
  }

  $("#blog .postPage").length > 0 && $(window).scroll(function () {
    var e = $(window).scrollTop(), t = $("#content-wrapper").offset().top;
    e >= t ? $("#social-bar").addClass("sticky") : $("#social-bar").removeClass("sticky")
  });
  if ($("#home #hiw-video").length > 0) {
    var e = new Image;
    e.src = "../images/hiw-video.gif";
    var t = $(window).scrollTop(), n = $("#featured").offset().top, n = $("#featured").offset().top;
    t >= n ? $("#hiw-video img").attr("src", e.src) : $(window).scroll(function () {
      t = $(window).scrollTop(), n = $("#featured").offset().top, t >= n && ($("#hiw-video img").attr("src", e.src), $(window).unbind("scroll"))
    })
  }
  var r = {wait: ".15s", over: ".7s", vFactor: "0.10", mobile: !1, scale: {direction: "up", power: "5%"}};
  //window.sr = new scrollReveal(r), $('[data-toggle="popover"]').popover(), $(".tile-wrapper").length > 0 && ($(".tile-wrapper").jcarousel({wrap: "circular"}), $(".jcarousel-control-prev").on("jcarouselcontrol:inactive", function () {
  //  $(this).addClass("ng-hide")
  //}).on("jcarouselcontrol:active", function () {
  //  $(this).removeClass("ng-hide")
  //}).jcarouselControl({target: "-=1"}), $(".jcarousel-control-next").on("jcarouselcontrol:inactive", function () {
  //  $(this).addClass("ng-hide")
  //}).on("jcarouselcontrol:active", function () {
  //  $(this).removeClass("ng-hide")
  //}).jcarouselControl({target: "+=1"}));
  //if (!supportsSVG()) {
  //  $("body").addClass("no-svg");
  //  var i = document.getElementsByTagName("img"), s = /.*\.svg$/;
  //  for (var o = 0; o != i.length; ++o)i[o].src.match(s) && (i[o].src = i[o].src.slice(0, -3) + "png")
  //}
  //$(window).bind("resize", resizeFunctions), 
  $(window).bind("scroll", stickyNav);
  if ($("#mktVideo").length !== 0 || $("#bbVideo").length !== 0)window.addEventListener ? window.addEventListener("message", u, !1) : window.attachEvent("onmessage", u, !1);
  $("#mktVideo").on("show.bs.modal", function (e) {
    $(".embed-container").html('<iframe src="//fast.wistia.net/embed/iframe/vtd4o7jgct" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen></iframe><script src="//fast.wistia.net/assets/external/E-v1.js" async></script>'), e.relatedTarget === "ftu" && $("#player").attr("data-ftu", "true")
  }), $("#bbVideo").on("show.bs.modal", function (e) {
    $(".embed-container").html('<iframe id="player" src="https://player.vimeo.com/video/112083938?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
  }), $("#bbVideo, #mktVideo").on("hide.bs.modal", function (e) {
    $(".embed-container").empty()
  }), "video" === window.location.hash.substr(1) && $("#mktVideo").modal("show", "ftu"), $(".form-group input").focus(function () {
    $(".form-group").removeClass("focus"), $(this).parent().addClass("focus")
  }), $(".form-group input").blur(function () {
    $(".form-group").removeClass("focus")
  });
  //var c = $(window).width(), h = $(window).height();
  //$("#refer").length == 0 && (c < 768 ? $(".navbar").removeClass("navbar-fixed-top") : ($(".navbar").addClass("navbar-fixed-top"), $(".windowHeight").css("height", h))), $("a.scroll-down-arrows").bind("click", scrollDown), $("a#btn-learn-more").bind("click", scrollFAQ)
});