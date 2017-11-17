// window.chargeAction = function () { alert('charge') }
window.callMobile = function (handlerInterface, handlerMethod, parameters) {
  // handlerInterface由iOS addScriptMessageHandler与andorid addJavascriptInterface 代码注入而来。
  var dic = { 'handlerInterface': handlerInterface, 'function': handlerMethod, 'parameters': parameters }
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    window.webkit.messageHandlers[handlerInterface].postMessage(dic)
  } else {
    // 安卓传输不了js json对象
    window[handlerInterface][handlerMethod](JSON.stringify(dic))
  }
}

export default {
  chargeAction () {
    // window.Phone.chargeAction()
    window.callMobile('Phone', 'chargeAction', '')
  }
}
