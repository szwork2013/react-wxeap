import React from 'react';
import View from '../View';
import ImageViewer from '../ImageViewer';
import * as COLORS from '../../constants';
import * as Acc from '../../utils/acc';
import { Icon } from 'antd-mobile';

export default class AccView extends React.Component {
    static propTypes = {
        accs: React.PropTypes.array
    }

    static defaultProps = {
        accs: []
    }

    getFileImg(acc) {
        const url = API.substring(0, API.length - 6);
        const filetype = this.getFileType(acc.oName);
        if (filetype === 'png' || filetype === 'jpg' || filetype === 'jpeg' || filetype === 'gif') {
            return `${url}Service/WxGetFile.ashx?imgSize=small&hash=${acc.hash}`;
        } else if (filetype === 'txt')
            return `${url}Images/Yunpan/txt80.png`;
        else if (filetype === 'xls' || filetype === 'xlsx')
            return `${url}Images/Yunpan/Xls80.png`;
        else if (filetype === 'doc' || filetype === 'docx')
            return `${url}Images/Yunpan/Doc80.png`;
        else if (filetype === 'pptx' || filetype === 'ppt')
            return `${url}Images/Yunpan/PPT80.png`;
        else if (filetype === 'zip' || filetype === 'rar')
            return `${url}Images/Yunpan/Zip80.png`;
        else if (filetype === 'pdf')
            return `${url}Images/Yunpan/PDF80.png`;
        else
            return `${url}Images/Yunpan/Unknown80.png`;
    }

    getFileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    }

    onAccClick = (acc) => {
        const url = API.substring(0, API.length - 6);
        // 获取文件后缀名，如果是图片文件就调用图片文件的组件预览，否则就跳转至预览页面
        const filetype = this.getFileType(acc.oName);
        if (filetype === 'png' || filetype === 'jpg' || filetype === 'jpeg' || filetype === 'gif')
            ImageViewer(0, [{ url: `${url}Service/WxGetFile.ashx?hash=${acc.hash}` }]);
        else
            window.location.href = Acc.getPreviewPath(acc.id);
    }

    render() {
        const { accs } = this.props;
        return (
            <View style={{ ...styles.container, height: 40 * 2 + 80 + 100 * accs.length + 20 }}>
                <View style={{ ...styles.card, height: 80 + 100 * accs.length + 20 }}>
                    <View style={styles.labelRow}>
                        <img src={require('../../assets/acc.png')} style={styles.icon} />
                        <View style={styles.label}>
                            附件
                        </View>
                    </View>
                    {
                        accs.map((acc, i) => (
                            <View key={i} style={{ ...styles.accRow, borderBottom: i === accs.length - 1 ? '0' : `1px solid ${COLORS.BORDER_COLOR}` }} onClick={() => this.onAccClick(acc)}>
                                <img src={this.getFileImg(acc)} style={styles.fileImg} />
                                <View style={{ ...styles.label, color: COLORS.TITLE_COLOR }}>
                                    {acc.oName}
                                    <span style={styles.size}>{`(${parseInt(acc.size / 1024)}KB)`}</span>
                                </View>
                                <View style={styles.arrow}>
                                    <Icon type="right" color={COLORS.SUBTITLE_COLOR} size="md" />
                                </View>
                            </View>
                        ))
                    }
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        width: '100%',
        backgroundColor: COLORS.BACKGROUND_COLOR
    },
    card: {
        boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.2)',
        borderRadius: 8,
        backgroundColor: 'white',
        flexDirection: 'column',
        marginTop: 40,
        marginLeft: 40,
        marginRight: 40,
        flex: 1,
        overflow: 'hidden'
    },
    labelRow: {
        alignItems: 'center',
        height: 80,
        width: '100%'
    },
    icon: {
        height: 40,
        width: 40,
        marginLeft: 30
    },
    label: {
        fontSize: 30,
        color: COLORS.SUBTITLE_COLOR,
        marginLeft: 10,
        flex: 1,
        height: '100%',
        alignItems: 'center',
        overflow: 'hidden'
    },
    accRow: {
        marginLeft: 30,
        width: '100%',
        height: 100,
        alignItems: 'center'
    },
    fileImg: {
        width: 60,
        height: 60,
        borderRadius: 8
    },
    size: {
        color: COLORS.SUBTITLE_COLOR,
        marginLeft: 10,
        fontSize: 28
    },
    arrow: {
        marginRight: 40,
        width: 40,
        height: 40,
        marginBottom: 10
    }
};