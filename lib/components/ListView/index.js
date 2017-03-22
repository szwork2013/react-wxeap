'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/refresh-control/style/css');

var _refreshControl = require('antd-mobile/lib/refresh-control');

var _refreshControl2 = _interopRequireDefault(_refreshControl);

var _css2 = require('antd-mobile/lib/list-view/style/css');

var _listView = require('antd-mobile/lib/list-view');

var _listView2 = _interopRequireDefault(_listView);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
    listView: {
        height: document.documentElement.clientHeight * 11 / 12,
        width: document.documentElement.clientWidth,
        backgroundColor: 'rgb(245,245,249)'
    },
    footer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        textAlign: 'center',
        verticalAlign: 'middle'
    },
    sep: {
        height: 1,
        width: '32%',
        backgroundColor: 'rgb(220,220,225)'
    }
};

var _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.reload = function () {
            _this.onRefresh();
        };

        _this.send = function (page) {
            _this.props.onFetch && _this.props.onFetch(page, function (tasks, allLoaded) {
                _this.setState({
                    dataSource: _this.state.dataSource.cloneWithRows(tasks),
                    tasks: tasks,
                    refreshing: false,
                    isLoading: false,
                    allLoaded: allLoaded
                });
            });
        };

        _this.onEndReached = function () {
            var _this$state = _this.state,
                isLoading = _this$state.isLoading,
                allLoaded = _this$state.allLoaded,
                page = _this$state.page;

            if (isLoading === false && allLoaded === false) {
                if (_this.state.tasks.length === 0) return; /*初始化不加载 */
                _this.setState({
                    page: page + 1,
                    isLoading: true
                });
                _this.send(page + 1);
            }
        };

        _this.onRefresh = function () {
            var refreshing = _this.state.refreshing;

            if (refreshing === false) {
                _this.setState({ refreshing: true, page: 1 });
                _this.send(1);
            }
        };

        var dataSource = new _listView2.default.DataSource({
            rowHasChanged: function rowHasChanged(row1, row2) {
                return true;
            }
        });
        _this.state = {
            dataSource: dataSource.cloneWithRows([]),
            tasks: [],
            refreshing: false,
            isLoading: false,
            page: 1,
            allLoaded: false
        };
        return _this;
    }

    _createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.onRefresh();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                header = _props.header,
                pageSize = _props.pageSize,
                renderRow = _props.renderRow;
            var _state = this.state,
                allLoaded = _state.allLoaded,
                isLoading = _state.isLoading,
                refreshing = _state.refreshing;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_listView2.default, _extends({
                    style: styles.listView,
                    dataSource: this.state.dataSource,
                    initialListSize: 0,
                    renderHeader: header ? function () {
                        return _react2.default.createElement(
                            'span',
                            null,
                            header
                        );
                    } : null,
                    renderFooter: function renderFooter() {
                        return _react2.default.createElement(
                            'div',
                            { style: styles.footer },
                            _react2.default.createElement('div', { style: styles.sep }),
                            allLoaded ? '没有更多了' : isLoading ? '加载中...' : '加载完毕',
                            _react2.default.createElement('div', { style: styles.sep })
                        );
                    },
                    renderRow: renderRow,
                    pageSize: pageSize,
                    scrollRenderAheadDistance: 0,
                    scrollEventThrottle: 20,
                    onEndReached: this.onEndReached,
                    onEndReachedThreshold: 30,
                    refreshControl: _react2.default.createElement(_refreshControl2.default, {
                        refreshing: refreshing,
                        onRefresh: this.onRefresh })
                }, this.props))
            );
        }
    }]);

    return _class;
}(_react2.default.Component);

_class.propTypes = {
    header: _react.PropTypes.string,
    pageSize: _react.PropTypes.number.isRequired,
    renderRow: _react.PropTypes.func.isRequired,
    onFetch: _react.PropTypes.func.isRequired
};
exports.default = _class;