// 封装全局请求接口

// get请求
getRequest = (baseUrl, param, successCallback, errorCallback) => {
    $.ajax({
        url: baseUrl,
        method: 'GET',
        data: param,
        dataType: 'json',
        success: function (res) {
            if (res.code == 200) {
                if (typeof successCallback === 'function') {
                    successCallback(res);
                }
            }
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            errorCallback("请求失败：" + error);
        }
    });
}

// get请求
postRequest = (baseUrl, param, successCallback, errorCallback) => {
    $.ajax({
        url: baseUrl,
        method: 'POST',
        contentType: "application/json",
        data: JSON.stringify(param),
        dataType: 'json',
        success: function (res) {
            if (res.code == 200) {
                if (typeof successCallback === 'function') {
                    successCallback(res);
                }
            }
        },
        error: function (xhr, status, error) {
            // 请求失败时的处理
            errorCallback("请求失败：" + error);
        }
    });
}
