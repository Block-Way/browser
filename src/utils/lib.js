import moment from 'moment'

export function getfromNow(time) {
    let ret = moment().diff(moment.unix(time),'seconds')
    let str = ''
    if (ret < 60) {
        str = ret + " seconds ago"
    } else if (ret < 3600) {
        str = parseInt(ret / 60) + " minute "  + (ret % 60) + " seconds ago"
    } else {
        str = moment.unix(time).fromNow()
    }
    return str;
}

