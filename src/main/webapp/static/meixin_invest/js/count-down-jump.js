function countDown(){
    var countDownNotice = document.getElementById("count-down-notice");
    var counter = 3;
    var noticeElement = document.createElement("h1");
        noticeElement.innerHTML = "3秒钟自动返回首页.";
    var timer;
    var redirectUrl = "/";

    countDownNotice.parentNode.replaceChild(noticeElement, countDownNotice);

    timer = setInterval(function () {
    counter--;
    if (counter < 0) {
        clearInterval(timer);
        window.location.href = redirectUrl;

    } else {
        noticeElement.innerHTML = counter.toString() + "秒钟自动返回首页";
    }
    }, 1000);
}
countDown();