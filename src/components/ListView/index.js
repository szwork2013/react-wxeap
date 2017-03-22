import React, { PropTypes } from 'react';
import {
    ListView,
    RefreshControl
} from 'antd-mobile';
const styles = {
    listView: {
        height: document.documentElement.clientHeight * 11 / 12,
        width: document.documentElement.clientWidth,
        backgroundColor: 'rgb(245,245,249)'
    },
    footer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        alignItems:'center',
        textAlign: 'center',
        verticalAlign: 'middle',
    },
    sep: {
        height: 1,
        width: '32%',
        backgroundColor: 'rgb(220,220,225)',
    }
}
export default class extends React.Component {

    static propTypes = {
        header: PropTypes.string,
        pageSize: PropTypes.number.isRequired,
        renderRow: PropTypes.func.isRequired,
        onFetch: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => true,
        });
        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            tasks: [],
            refreshing: false,
            isLoading: false,
            page: 1,
            allLoaded: false
        }
    }

    reload = () => {
        this.onRefresh();
    }

    componentDidMount() {
        this.onRefresh();
    }

    send = (page) => {
        this.props.onFetch && this.props.onFetch(page, (tasks, allLoaded) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(tasks),
                tasks,
                refreshing: false,
                isLoading: false,
                allLoaded
            });
        });
    }
    onEndReached = () => {
        const { isLoading, allLoaded, page } = this.state;
        if (isLoading === false && allLoaded === false) {
            if (this.state.tasks.length === 0) return;/*初始化不加载 */
            this.setState({
                page: page + 1,
                isLoading: true
            });
            this.send(page + 1);
        }
    }

    onRefresh = () => {
        const { refreshing } = this.state;
        if (refreshing === false) {
            this.setState({ refreshing: true, page: 1 });
            this.send(1);
        }
    }

    render() {
        const { header, pageSize, renderRow } = this.props;
        const { allLoaded, isLoading, refreshing } = this.state;
        return (
            <div>
                <ListView
                    style={styles.listView}
                    dataSource={this.state.dataSource}
                    initialListSize={0}
                    renderHeader={header ? () => <span>{header}</span> : null}
                    renderFooter={() =>
                        <div style={styles.footer}>
                            <div style={styles.sep}/>
                            {allLoaded ? '没有更多了' : isLoading ? '加载中...' : '加载完毕'}
                            <div style={styles.sep}/>
                        </div>}
                    renderRow={renderRow}
                    pageSize={pageSize}
                    scrollRenderAheadDistance={0}
                    scrollEventThrottle={20}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={30}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={this.onRefresh} />}
                        {...this.props}/>
        </div>
        )
    }
}