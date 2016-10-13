;
(function(global, doc) {
  "use strict";

  global.addEventListener("load", globalLoadListener, false);

  function globalLoadListener() {
    var submitBtn = doc.getElementById("signin__submit");

    submitBtn.addEventListenter("click", signinForm_submitClickListener,
      false);
  }

  function signinForm_submitClickListener() {
    // 获取表单信息
    var name = doc.getElementById("signin__name").value.trim();
    var password = doc.getElementById("signin__password").value.trim();

    // 用于提交
    var data = "";

    // 判断是否为空
    if (!name || !password) {
      alert("用户名和密码不能为空！");
      return;
    }

    // 整合提交数据
    data = "name=" + encodeURIComponent(name) + "&&password=" +
      encodeURIComponent(password);

    // ajax提交
    Util.ajax({
      method: "POST",
      url: "/api/admin/sign",
      async: true,
      data: data,
      success: function(data) {
        alert("登录成功!");
        location.href = "index";
      },
      error: function(req) {
        alert("登录失败！");
        throw new Error(req.statusText);
      }
    });
  }
})(window, document);
