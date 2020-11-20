import React from 'react'
import {withRouter, RouteComponentProps} from 'react-router-dom'
import StorageModel, { MANAGE_TOKEN } from '../utils/storage'
const Storage = new StorageModel()

type IProps = RouteComponentProps & {

}
const Auth = (props: IProps ) => {
  if (!Storage.get(MANAGE_TOKEN)) {
    props.history.replace('/login')
  }
  // console.log(props)
  return (
    <></>
  )
}

export default withRouter(Auth)