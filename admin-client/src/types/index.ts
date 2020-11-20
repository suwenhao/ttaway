import { Reducer } from 'redux'
import { AxiosResponse } from 'axios'

export interface ReducerModel<S = any> extends Reducer<S> { }

interface IAction<P> {
  type: string;
  polyload?: P;
}
export interface ActionModel<P=any> {
  (polyload?: P): IAction<P>
}

interface Response extends AxiosResponse<any> {}
export type Request<T> = (params: T, self?: any) => Promise<Response>
export interface AxiosPromise<T=any> extends Promise<any>{}
