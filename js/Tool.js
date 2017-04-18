/******************************************
 * 类名：生成ID
 * 作用：负责生成系统中用到的独立ID
 * 创建者：杜鹏宇
 * 最后一次修改者：杜鹏宇
 * 最后一次修改时间：20160122
 *****************************************/
var CreateID = {
    //根据用户名创建唯一用户id
    createUserID: function (str) {
        var id = 0;
        for (var i = 0; i < str.length; i++)
            id = id * 7 + str[i].charCodeAt();
        return id;
    },
    //创建唯一协同组id
    createEnvironmentID: function () {
        return Math.floor(Math.random() * 899999 + 100000);
    },
    //创建组件16位id
    createStructID: function () {
        return Math.floor(Math.random() * 8999999999999999 + 1000000000000000);
    }
}

//将URL中的UTF-8字符串转成中文字符串
function getCharFromUtf8(str) {
    var cstr = "";
    var nOffset = 0;
    if (str == "")
        return "";
    str = str.toLowerCase();
    nOffset = str.indexOf("%e");
    if (nOffset == -1)
        return str;
    while (nOffset != -1) {
        cstr += str.substr(0, nOffset);
        str = str.substr(nOffset, str.length - nOffset);
        if (str == "" || str.length < 9)
            return cstr;
        cstr += utf8ToChar(str.substr(0, 9));
        str = str.substr(9, str.length - 9);
        nOffset = str.indexOf("%e");
    }
    ;
    return cstr + str;
}
//将编码转换成字符
function utf8ToChar(str) {
    var iCode, iCode1, iCode2;
    iCode = parseInt("0x" + str.substr(1, 2));
    iCode1 = parseInt("0x" + str.substr(4, 2));
    iCode2 = parseInt("0x" + str.substr(7, 2));
    return String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));
};