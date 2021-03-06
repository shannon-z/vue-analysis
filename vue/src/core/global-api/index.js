/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI(Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => { warn('Do not replace the Vue.config object, set individual fields instead.') }
  }
  Object.defineProperty(Vue, 'config', configDef)
  
  // 暴露util方法
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk. 这里暴露的方法最好不要依赖，因为可能变动
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }
  
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick
  
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })
  
  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue
  
  extend(Vue.options.components, builtInComponents)
  
  initUse(Vue)              // 定义： Vue.use 用来注册组件
  initMixin(Vue)            // 定义： Vue.mixin
  initExtend(Vue)           // 定义： Vue.extend
  initAssetRegisters(Vue)   // 定义： Vue.component, Vue.directive, Vue.filter
}
