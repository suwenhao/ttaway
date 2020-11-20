import React, { Component } from 'react';
import { FlagIcon, FlagIconCode } from 'react-flag-kit'
import { Select, Divider } from 'antd'

const { Option } = Select

const localeMap = {
  "en-US": {
    locale: "en-US",
    text: "英语",
    flag: "US",
    content: "Hello World!"
  },
  "zh-CN": {
    locale: "zh-CN",
    flag: "CN",
    text: "中文",
    content: "草，你好！!"
  },
  "fr-FR": {
    locale: "fr-FR",
    flag: "FR",
    text: "法语",
    content: "Bonjour le mondel!"
  }
}

interface IContext {
  state: any,
  updateLocale: (value: any) => void
}
type TIocaleType = "en-US" | "zh-CN" | "fr-FR"

const obj: IContext = { state: localeMap['en-US'], updateLocale: () => { } }

const ThemeContext = React.createContext(obj)
class LocaleSwitcher extends Component {
  public state = localeMap['zh-CN']
  render() {
    let obj: any = {
      state: this.state,
      updateLocale: (value: any) => {
        let key = value as TIocaleType
        this.setState(localeMap[key])
      }
    }
    return (
      <ThemeContext.Provider value={obj}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

const LocaleSelect = (props: any) => (
  <ThemeContext.Consumer>
    {(context) => {
      return (
        <div>
          <Select defaultValue={context.state.locale} onChange={context.updateLocale}>
            {
              Object.keys(localeMap).map((item, i) => {
                let o = localeMap[item as TIocaleType]
                return (
                  <Option key={i} value={item}>{o.text}</Option>
                )
              })
            }
          </Select>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)
const LocalFlag = (props: any) => {
  return (
    <ThemeContext.Consumer>
      {(context) => {
        let flag = context.state.flag as FlagIconCode
        return (
          <div>
            <FlagIcon code={flag} size={200} />
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}
const LocalContent = (props: any) => (
  <ThemeContext.Consumer>
    {(context) => {
      return (
        <div>
          <h1>{context.state.content}</h1>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)
class Context extends Component {
  public render(): any {
    return (
      <div>
        <LocaleSwitcher>
          <Divider/>
          <LocaleSelect />
          <LocalFlag />
          <LocalContent />
        </LocaleSwitcher>
      </div>
    )
  }
}

export default Context;
