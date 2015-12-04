/**
 * Created by Au on 2015/12/4.
 */
function resizeWindowsToPhone(url) {
//打开一个新窗口并设置其大小
    window.open(url, '', 'width=450,height=750,location=no,menubar=no,status=no,toolbar=no');
//    window.open(url, '', 'width=450,height=750');
//不询问是否关闭
    window.opener = null;
    window.open('', '_self');
//关闭自己的窗口
    window.close();
}