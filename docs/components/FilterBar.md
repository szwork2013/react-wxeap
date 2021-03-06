# FilterBar

条件筛选栏组件

```
import { FilterBar } from 'react-wxeap';

conditions = [
    [ { label: '1', value: '1' }, { label: '2', value: '2' } ],
    [ { label: 'a', value: 'a', children: [ { label: 'a-a', value: 'a-b' } ] } ]
    [ { label: '指定条件': value: '指定条件' } ]
]

state = {
    values: [
        ['1'],
        ['a', 'a-a'],
        ['指定条件']
    ]
}

onFilterChange = (values, index) => {
    this.setState({ values })
}

onClick = (i, cb) => {
    if(i === 2) return cb('张三') // 指定条件时，不展开下拉菜单，而是直接修改label
    cb(null) // 将label改为自定义
}

...
render() {
    return (
        ...
        <FilterBar ref={o => this.filterBar = o} conditions={this.conditions} values={this.state.values} onChange={this.onFilterChange} onClick={this.onClick}>
        ...
    )
}
...

```


| 属性 | 说明 | 类型 | 默认值 |
| ----|-----|------|------ |
| conditions    | 筛选条的数据来源，最多支持4个条件     | Array  | [] |
| values    | 当前的值  | Array |  []  |
| onChange   | 条件更改的回调: values为更改后的valus，index为更改的第几个条件  | (values: Array, index: number): void |   |
| onClick | 点击FilterBar, 有两个参数: i和cb，i代表点击第几个条件，cb为回调函数，传入name即可更改该条件的Label，不弹出下拉菜单；传null则不更改，并弹出下拉菜单 | func | |

`FilterBar`实例有一个方法`setLabel`, 用于修改label, 传入要修改的label值和label的位置
```
this.filterBar.setLabel('label', 0)
```

