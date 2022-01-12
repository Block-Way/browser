import {post,get,put,patch} from '@/utils/request'
export const login = params =>get('http://119.8.55.78:1234/listdelegate',params)