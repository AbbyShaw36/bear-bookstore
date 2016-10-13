;
(function(global, document) {
  "use strict";

  var globalLoadListener = function() {
    signoutEvent();
  };

  var signoutEvent = function() {
    var signoutBtn = document.getElementById("signoutBtn");
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

    signoutBtn.addEventListener("click", signoutBtnClickListener, false);
  };

  global.addEventListener("load", globalLoadListener, false);
})(window, document);
