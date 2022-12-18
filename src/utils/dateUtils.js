export const parseDate = (dateString, separator="-") => {
    const [year, month, day] = dateString.split(separator)
    const newDate = new Date(+year, +month - 1, +day)
    return newDate
}

export const monthMap = {
    1 : "Jan",
    2 : "Feb",
    3 : "Mar",
    4 : "Apr",
    5 : "May",
    6 : "Jun",
    7 : "Jul",
    8 : "Aug",
    9 : "Sep",
    10 : "Oct",
    11 : "Nov",
    12 : "Dec"
}

export const getMonthYear = (month, year) => {
    return `${monthMap[month]}-${year}`
}

// export function toIsoString(date) {
//     var tzo = -date.getTimezoneOffset(),
//         dif = tzo >= 0 ? '+' : '-',
//         pad = function(num) {
//             return (num < 10 ? '0' : '') + num;
//         };
  
//     return date.getFullYear() +
//         '-' + pad(date.getMonth() + 1) +
//         '-' + pad(date.getDate()) +
//         'T' + pad(date.getHours()) +
//         ':' + pad(date.getMinutes()) +
//         ':' + pad(date.getSeconds()) +
//         dif + pad(Math.floor(Math.abs(tzo) / 60)) +
//         ':' + pad(Math.abs(tzo) % 60);
//   }
