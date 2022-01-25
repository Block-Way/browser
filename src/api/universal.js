import {get} from '@/utils/request'
export const getblock = (params) =>get('http://119.8.55.78:1234/block/' + params)
export const getblocktx = (params) =>get('http://119.8.55.78:1234/blocktx/' + params)
export const gettx = (params) =>get('http://119.8.55.78:1234/tx/' + params)
export const get_address = (params) =>get('http://119.8.55.78:1234/address/' + params)
export const get_address_tx = (params) =>get('http://119.8.55.78:1234/txlist/3/' + params + '/0/10')