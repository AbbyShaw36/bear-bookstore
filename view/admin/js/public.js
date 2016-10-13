;
(function(global, document) {
  "use strict";

  var globalLoadListener = function() {
    // 退出
    var signoutBtn = document.getElementById("signoutBtn");
    signoutBtn.addEventListener("click", signoutBtnClickListener, false);
  };

  // 退出事件
  var signoutBtnClickListener = function() {
    Util.ajax({
      mathod: "DELETE",
      url: "/api/admin/sign",
      async: true,
      success: function(data) {
        alert("退出成功！");
        location.href = "sign";
      },
      error: function(req) {
        alert("退出失败！");
        throw new Error(req.statusText);
      }
    });
  };

  global.addEventListener("load", globalLoadListener, false);
})(window, document);
