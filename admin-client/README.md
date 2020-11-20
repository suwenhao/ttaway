# 静态文件项目部署
- netlify

# 无状态组件最佳写法
- PureComponent
```
class Item extends PureComponent<{}, {}>{

}
```

# Fragment包住多个div
```
let Hello = () => (
  <Fragment>
    <li>121</li>
    <li>234</li>
  </Fragment>
)

```

# context上下文，在父级组件内要用
```
getChildContext() {
  return {color: "red"}
}
```
赋值，
同时定义静态属性
```
static childContextTypes = {
  color: PropTypes.string
}
```
在字组件中使用
```
Comment.contextTypes={
  color: PropTypes.string
}
let Comment = (props: any, context: any) => {
  console.log(context.color)
}

```
这样来获取


# rekit 强大的浏览器IDE
- npm i rekit -g

# react-powerplug插件
```
import {State} from 'react-powerplug'
<State initial={{counter: 0}}>
  {
    ({state, setState})=>(
      <div>
        <button onClick={() => setState({counter: state.counter-1})}>-</button>
        {state.counter}
        <button onClick={() => setState({ counter: state.counter + 1 })}>+</button>
      </div>
    )
  }
</State>
```
