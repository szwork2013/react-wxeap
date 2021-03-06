import React, { Component, PropTypes } from 'react';
import ListView from '../ListView';
import { SearchBar, Popup } from 'antd-mobile';
import Header from './header';
import * as COLORS from '../../constants';

export default class Search extends Component {

    static instance = Popup.newInstance();

    static show = (options) => {
        Search.instance.show(<Search {...options} />, { transitionName: 'slide-down' });
    };

    static hide = () => {
        Search.instance.hide();
    };

    static propTypes = {
        onSearch: PropTypes.func, // 触发搜索
        renderRow: PropTypes.func, // 渲染每一行
        onCancel: PropTypes.func,// 取消查找
        placeholder: PropTypes.string,// 输入框默认的搜索数据
        label: PropTypes.string,// 默认下方icon提示文字
        notFoundLabel: PropTypes.string,// 未找到数据的提示文字
    }

    static defaultProps = {
        label: '查找内容',
        notFoundLabel: '未找到相关内容',
        placeholder: '搜索'
    }

    constructor(props) {
        super(props);
        this.state = {
            focused: false, // 输入框是否聚焦
            isEmpty: false, // 搜索结果是否为空
            isInit: true, // 是否初始化
        };
    }

    componentDidMount() {
        this.setState({ focused: true });
        this.mounted = true;
        window.addEventListener('resize', () => {
            this.forceUpdate();
        }, false);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    onFetch = () => {
        // 不做任何事
    }

    renderHeader = () => {
        return <Header label={this.state.isInit ? this.props.label : this.props.notFoundLabel} type={this.state.isInit ? 'search' : 'search-noresult'} />;
    }

    onCancel = () => {
        this.setState({ focused: false });
        this.props.onCancel && this.props.onCancel();
        Search.instance.hide();
    }

    onFocus = () => {
        this.setState({ focused: false });
    }

    onSubmit = (value) => {
        // 过滤前后空格
        value = value.replace(/(^\s*)|(\s*$)/g, ''); 
        if (!value) {
            this.listView.fill([], true);
            return this.setState({ isInit: true, focused: false });
        } 
        // 触发onSearch
        this.props.onSearch && this.props.onSearch(value, list => {
            if (!this.mounted) return;
            this.setState({ isEmpty: list.length === 0 });
            this.listView.fill(list, true);
        });
        this.setState({ isInit: false, focused: false });
    }

    render() {
        return (
            <div style={{ ...styles.container, height: document.documentElement.clientHeight }}>
                <div style={styles.searchBar}>
                    <SearchBar
                        focused={this.state.focused}
                        placeholder={this.props.placeholder}
                        onSubmit={this.onSubmit}
                        onFocus={this.onFocus}
                        onCancel={this.onCancel}
                        showCancelButton
                    />
                </div>
                <ListView
                    style={{
                        height: document.documentElement.clientHeight - 120,
                        width: '100%',
                        backgroundColor: 'rgb(245,245,249)'
                    }}
                    ref={o => this.listView = o}
                    refreshable={false}
                    listId="search"
                    pageSize={100}
                    footerHidden={true}
                    renderRow={this.props.renderRow}
                    onFetch={this.onFetch}
                    renderHeader={this.state.isEmpty || this.state.isInit ? this.renderHeader : null}
                    nocache={true}
                />;
            </div>
        );
    }
}

const styles = {
    container: {
        width: '100%',
        backgroundColor: COLORS.BACKGROUND_COLOR
    },
    searchBar: {
        paddingTop: 20,
        width: '100%',
        height: 90,
        overflow: 'hidden',
        borderRadius: 5,
    }
};