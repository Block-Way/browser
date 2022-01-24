var moment = require('moment');
//let day = moment.unix(1318781876).format('yyyy-MM-DD HH:mm:ss');
//console.log(day)

//var moment = require('moment');
//let ret = moment().unix() - 1641968892//.format();
//console.log(ret);
//ret = moment().second(ret);
//let ret = moment.unix(1641968892).fromNow()
//console.log(ret)

function getfromNow(time) {
    ret = moment().diff(moment.unix(time),'seconds')
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
//ret = a.diff(b, '')
//console.log(getfromNow(1641971352 + 3600))
//a.diff(b, 'years', true); // 1.75
let time_end = 1641372328;
let time_begin = 1640916097;
console.log(moment.unix(time_end).from(moment.unix(time_begin), true));

