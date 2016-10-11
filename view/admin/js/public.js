var Util = {};

Util.ajax = function(args) {
  var method = args.method;
  var url = args.url;
  var data = args.data || null;
  var async = args.async || false;
  var success = args.success;
  var error = args.error;
  var request = new XMLHttpRequest();

  if (!method) {
    throw new Error("Request method must provided");
    return;
  }

  if (!url) {
    throw new Error("Request url must provided");
    return;
  }

  request.open(method, url, async);
  request.onreadyStatechange = function() {
    if (request.readyState == 4) {
      if (request.status === 200) {
        success(request.responseText);
        return;
      }

      error(request);
    }
  };
};
