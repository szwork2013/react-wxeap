'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _dva2 = _interopRequireDefault(_dva);

var _router = require('dva/router');

var _middleware = require('./middleware');

var _history = require('history');

var _constants = require('./constants');

var CONSTANTS = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MobileApp = function () {
    function MobileApp(routes, options) {
        _classCallCheck(this, MobileApp);

        this.mobileApp = (0, _dva2.default)({
            onAction: [_middleware.locationChangeMiddleware],
            history: (0, _router.useRouterHistory)(_history.createHashHistory)({ queryKey: false }) });
        this.addModel(routes);
        this.addRouter(routes);
        this.configureAPI(options);
    }

    _createClass(MobileApp, [{
        key: 'start',
        value: function start() {
            var _this = this;

            if (CONSTANTS.DEV_MODE && this.auth && this.auth.length > 0) {
                fetch(this.origin + this.auth, { credentials: 'include' }).then(function () {
                    _this.mobileApp.start('#root');
                });
            } else {
                this.mobileApp.start('#root');
            }
        }
    }, {
        key: 'addModel',
        value: function addModel(routes) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var route = _step.value;
                    var model = route.model;

                    this.mobileApp.model(model);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'addRouter',
        value: function addRouter(routes) {
            this.mobileApp.router(function (_ref) {
                var history = _ref.history;

                return _react2.default.createElement(
                    _router.Router,
                    { history: history },
                    routes.map(function (route) {
                        return _react2.default.createElement(_router.Route, { key: route.path, path: route.path, component: route.component });
                    })
                );
            });
        }
    }, {
        key: 'configureAPI',
        value: function configureAPI(options) {
            var module = options.module,
                origin = options.origin,
                auth = options.auth;

            this.origin = origin;
            this.auth = auth;

            var APIConfig = function APIConfig(origin, module) {
                var url = window.location.href.toLowerCase();
                var end = url.indexOf('/' + module);
                url = url.substring(0, end);
                return CONSTANTS.DEV_MODE ? origin + '/api/' : url + '/api/';
            };

            global.API = APIConfig(origin, module);
        }
    }]);

    return MobileApp;
}();

exports.default = MobileApp;