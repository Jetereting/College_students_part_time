/**
 * Created by Au on 2015/12/4.
 */
//调整浏览器窗口大小
function resizeWindowsToPhone(url) {
//打开一个新窗口并设置其大小
    window.open(url, '', 'width=450,height=750,location=no,menubar=no,status=no,toolbar=no');
//不询问是否关闭
    window.opener = null;
    window.open('', '_self');
//关闭自己的窗口
    window.close();
}


//图片上传预览    IE是用了滤镜。参数为 ：文件 图片的高度 图片的宽度
function previewImage(file, MAXWIDTH, MAXHEIGHT) {

    var div = document.getElementById('avatar');
    if (file.files && file.files[0]) {
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.onload = function () {
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
//                 img.style.marginLeft = rect.left+'px';
            img.style.marginTop = rect.top + 'px';
            img.style.borderRadius = 27 + 'px';
        }
        var reader = new FileReader();
        reader.onload = function (evt) {
            img.src = evt.target.result;
        }
        reader.readAsDataURL(file.files[0]);
    }
    else //兼容IE
    {
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;border-radius: 27px;;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
    }
}
function clacImgZoomParam(maxWidth, maxHeight, width, height) {
    var param = {top: 0, left: 0, width: width, height: height};
    if (width > maxWidth || height > maxHeight) {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if (rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
        } else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }

    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}
//上传图片预览end

//日期选择器start
//<input type="text" style="width:70px" onfocus="HS_setDate(this)"></td>

function HS_DateAdd(interval, number, date) {
    number = parseInt(number);
    if (typeof(date) == "string") {
        var date = new Date(date.split("-")[0], date.split("-")[1], date.split("-")[2])
    }
    if (typeof(date) == "object") {
        var date = date
    }
    switch (interval) {
        case "y":
            return new Date(date.getFullYear() + number, date.getMonth(), date.getDate());
            break;
        case "m":
            return new Date(date.getFullYear(), date.getMonth() + number, checkDate(date.getFullYear(), date.getMonth() + number, date.getDate()));
            break;
        case "d":
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() + number);
            break;
        case "w":
            return new Date(date.getFullYear(), date.getMonth(), 7 * number + date.getDate());
            break;
    }
}
function checkDate(year, month, date) {
    var enddate = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
    var returnDate = "";
    if (year % 4 == 0) {
        enddate[1] = "29"
    }
    if (date > enddate[month]) {
        returnDate = enddate[month]
    } else {
        returnDate = date
    }
    return returnDate;
}
/**
 * @return {number}
 */
function WeekDay(date) {
    var theDate;
    if (typeof(date) == "string") {
        theDate = new Date(date.split("-")[0], date.split("-")[1], date.split("-")[2]);
    }
    if (typeof(date) == "object") {
        theDate = date
    }
    return theDate.getDay();
}
function HS_calender() {
    var lis = "";
    var style = "";
    style += "<style type='text/css'>";
    style += ".calender { width:170px; height:auto; font-size:12px; margin-right:14px; background:url(calenderbg.gif) no-repeat right center #fff; border:1px solid #397EAE; padding:1px}";
    style += ".calender ul {list-style-type:none; margin:0; padding:0;}";
    style += ".calender .day { background-color:#EDF5FF; height:20px;}";
    style += ".calender .day li,.calender .date li{ float:left; width:14%; height:20px; line-height:20px; text-align:center}";
    style += ".calender li a { text-decoration:none; font-family:Tahoma; font-size:11px; color:#333}";
    style += ".calender li a:hover { color:#f30; text-decoration:underline}";
    style += ".calender li a.hasArticle {font-weight:bold; color:#f60 !important}";
    style += ".lastMonthDate, .nextMonthDate {color:#bbb;font-size:11px}";
    style += ".selectThisYear a, .selectThisMonth a{text-decoration:none; margin:0 2px; color:#000; font-weight:bold}";
    style += ".calender .LastMonth, .calender .NextMonth{ text-decoration:none; color:#000; font-size:18px; font-weight:bold; line-height:16px;}";
    style += ".calender .LastMonth { float:left;}";
    style += ".calender .NextMonth { float:right;}";
    style += ".calenderBody {clear:both}";
    style += ".calenderTitle {text-align:center;height:20px; line-height:20px; clear:both}";
    style += ".today { background-color:#ffffaa;border:1px solid #f60; padding:2px}";
    style += ".today a { color:#f30; }";
    style += ".calenderBottom {clear:both; border-top:1px solid #ddd; padding: 3px 0; text-align:left}";
    style += ".calenderBottom a {text-decoration:none; margin:2px !important; font-weight:bold; color:#000}";
    style += ".calenderBottom a.closeCalender{float:right}";
    style += ".closeCalenderBox {float:right; border:1px solid #000; background:#fff; font-size:9px; width:11px; height:11px; line-height:11px; text-align:center;overflow:hidden; font-weight:normal !important}";
    style += "</style>";
    var now;
    if (typeof(arguments[0]) == "string") {
        selectDate = arguments[0].split("-");
        var year = selectDate[0];
        var month = parseInt(selectDate[1]) - 1 + "";
        var date = selectDate[2];
        now = new Date(year, month, date);
    } else if (typeof(arguments[0]) == "object") {
        now = arguments[0];
    }
    var lastMonthEndDate = HS_DateAdd("d", "-1", now.getFullYear() + "-" + now.getMonth() + "-01").getDate();
    var lastMonthDate = WeekDay(now.getFullYear() + "-" + now.getMonth() + "-01");
    var thisMonthLastDate = HS_DateAdd("d", "-1", now.getFullYear() + "-" + (parseInt(now.getMonth()) + 1).toString() + "-01");
    var thisMonthEndDate = thisMonthLastDate.getDate();
    var thisMonthEndDay = thisMonthLastDate.getDay();
    var todayObj = new Date();
    today = todayObj.getFullYear() + "-" + todayObj.getMonth() + "-" + todayObj.getDate();
    for (i = 0; i < lastMonthDate; i++) {  // Last Month's Date
        lis = "<li class='lastMonthDate'>" + lastMonthEndDate + "</li>" + lis;
        lastMonthEndDate--;
    }
    for (i = 1; i <= thisMonthEndDate; i++) { // Current Month's Date
        if (today == now.getFullYear() + "-" + now.getMonth() + "-" + i) {
            var todayString = now.getFullYear() + "-" + (parseInt(now.getMonth()) + 1).toString() + "-" + i;
            lis += "<li><a href=javascript:void(0) class='today' onclick='_selectThisDay(this)' title='" + now.getFullYear() + "-" + (parseInt(now.getMonth()) + 1) + "-" + i + "'>" + i + "</a></li>";
        } else {
            lis += "<li><a href=javascript:void(0) onclick='_selectThisDay(this)' title='" + now.getFullYear() + "-" + (parseInt(now.getMonth()) + 1) + "-" + i + "'>" + i + "</a></li>";
        }
    }
    var j = 1;
    for (i = thisMonthEndDay; i < 6; i++) {  // Next Month's Date
        lis += "<li class='nextMonthDate'>" + j + "</li>";
        j++;
    }
    lis += style;
    var CalenderTitle = "<a href='javascript:void(0)' class='NextMonth' onclick=HS_calender(HS_DateAdd('m',1,'" + now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + "'),this) title='Next Month'>&raquo;</a>";
    CalenderTitle += "<a href='javascript:void(0)' class='LastMonth' onclick=HS_calender(HS_DateAdd('m',-1,'" + now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + "'),this) title='Previous Month'>&laquo;</a>";
    CalenderTitle += "<span class='selectThisYear'><a href='javascript:void(0)' onclick='CalenderselectYear(this)' title='Click here to select other year' >" + now.getFullYear() + "</a></span>年<span class='selectThisMonth'><a href='javascript:void(0)' onclick='CalenderselectMonth(this)' title='Click here to select other month'>" + (parseInt(now.getMonth()) + 1).toString() + "</a></span>月";
    if (arguments.length > 1) {
        arguments[1].parentNode.parentNode.getElementsByTagName("ul")[1].innerHTML = lis;
        arguments[1].parentNode.innerHTML = CalenderTitle;
    } else {
        var CalenderBox = style + "<div class='calender'><div class='calenderTitle'>" + CalenderTitle + "</div><div class='calenderBody'><ul class='day'><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul><ul class='date' id='thisMonthDate'>" + lis + "</ul></div><div class='calenderBottom'><a href='javascript:void(0)' class='closeCalender' onclick='closeCalender(this)'>×</a><span><span><a href=javascript:void(0) onclick='_selectThisDay(this)' title='" + todayString + "'>Today</a></span></span></div></div>";
        return CalenderBox;
    }
}
function _selectThisDay(d) {
    var boxObj = d.parentNode.parentNode.parentNode.parentNode.parentNode;
    boxObj.targetObj.value = d.title;
    boxObj.parentNode.removeChild(boxObj);
}
function closeCalender(d) {
    var boxObj = d.parentNode.parentNode.parentNode;
    boxObj.parentNode.removeChild(boxObj);
}
function CalenderselectYear(obj) {
    var opt = "";
    var thisYear = obj.innerHTML;
    for (i = 1970; i <= 2020; i++) {
        if (i == thisYear) {
            opt += "<option value=" + i + " selected>" + i + "</option>";
        } else {
            opt += "<option value=" + i + ">" + i + "</option>";
        }
    }
    opt = "<select onblur='selectThisYear(this)' onchange='selectThisYear(this)' style='font-size:11px'>" + opt + "</select>";
    obj.parentNode.innerHTML = opt;
}
function selectThisYear(obj) {
    HS_calender(obj.value + "-" + obj.parentNode.parentNode.getElementsByTagName("span")[1].getElementsByTagName("a")[0].innerHTML + "-1", obj.parentNode);
}
function CalenderselectMonth(obj) {
    var opt = "";
    var thisMonth = obj.innerHTML;
    for (i = 1; i <= 12; i++) {
        if (i == thisMonth) {
            opt += "<option value=" + i + " selected>" + i + "</option>";
        } else {
            opt += "<option value=" + i + ">" + i + "</option>";
        }
    }
    opt = "<select onblur='selectThisMonth(this)' onchange='selectThisMonth(this)' style='font-size:11px'>" + opt + "</select>";
    obj.parentNode.innerHTML = opt;
}
function selectThisMonth(obj) {
    HS_calender(obj.parentNode.parentNode.getElementsByTagName("span")[0].getElementsByTagName("a")[0].innerHTML + "-" + obj.value + "-1", obj.parentNode);
}
function HS_setDate(inputObj) {
    var calenderObj = document.createElement("span");
    calenderObj.innerHTML = HS_calender(new Date());
    calenderObj.style.position = "absolute";
    calenderObj.style.transform = "translate(-200px, 35px)";
    calenderObj.targetObj = inputObj;
    inputObj.parentNode.insertBefore(calenderObj, inputObj.nextSibling);
}
//日期选择器end
