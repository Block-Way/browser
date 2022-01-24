import {get} from '@/utils/request'
export const blockStatistics = params =>get('http://119.8.55.78:1234/blockStatistics',params)
