'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = backToHome;
function backToHome() {
    location.href = function () {
        return API.slice(0, API.indexOf('wxapi'));
    }() + 'Base/Main/WxTouchMain.aspx';
}