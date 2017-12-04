// call native code function
window.callMobile = function (handlerInterface, handlerMethod, parameters) {
  // handlerInterface由iOS addScriptMessageHandler与andorid addJavascriptInterface 代码注入而来。
  var dic = { 'handlerInterface': handlerInterface, 'function': handlerMethod, 'parameters': parameters }
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    window.webkit.messageHandlers[handlerInterface].postMessage(dic)
  } else {
    window[handlerInterface][handlerMethod]()
    // window[handlerInterface][handlerMethod](JSON.stringify(dic))
    // window.Phone.chargeAction()
  }
}

// native code call webview javascript
let callWebview = (handlerMethod, parameters) => {
  if (!this[handlerMethod]) {
    console.error('PO error: function "' + handlerMethod + '" is not defined')
    return
  }
  this[handlerMethod](parameters)
}

export default {
  chargeAction () {
    // window.Phone.chargeAction()
    window.callMobile('Phone', 'chargeAction', null)
  },
  addCallWebviewListener () {
    window.callWebview = callWebview
  }
}
