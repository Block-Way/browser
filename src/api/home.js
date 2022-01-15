import {post,get,put,patch} from '@/utils/request'
import {getfromNow} from '@/utils/lib'
export const listdelegate = params =>get('http://119.8.55.78:1234/listdelegate',params)
export const listdelegate2 = params =>get('http://119.8.55.78:1234/listdelegate2',params)
export const newblock = params =>get('http://119.8.55.78:1234/newblock',params)
export const newtx = params =>get('http://119.8.55.78:1234/newtx',params)
export const fromNow = params =>getfromNow(params)
