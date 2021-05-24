export const dateFormatter = (dateStr, props = "", delimeter = ".") => {
    var d = new Date(dateStr);
    var curr_date = String(d.getDate());
    var curr_month = String(d.getMonth() + 1);
    var curr_year = String(d.getFullYear());
    var curr_hour = String(d.getHours());
    var curr_minutes = String(d.getMinutes());
    if (curr_date.length === 1) curr_date = "0" + curr_date;
    if (curr_month.length === 1) curr_month = "0" + curr_month;
    if (curr_hour.length === 1) curr_hour = "0" + curr_hour;
    if (curr_minutes.length === 1) curr_minutes = "0" + curr_minutes;
    if (props === "-time") {
      return curr_date + delimeter + curr_month + delimeter + curr_year
    }
    return curr_date + delimeter + curr_month + delimeter + curr_year + " " + curr_hour + ":" + curr_minutes
}

export const dateValueFormatter = (dateStr) => {
    var d = new Date(dateStr);
    var curr_date = String(d.getDate());
    var curr_month = String(d.getMonth() + 1);
    var curr_year = String(d.getFullYear());

    if (curr_month.length === 1) curr_month = "0" + curr_month;
    if (curr_date.length === 1) curr_date = "0" + curr_date;
    return curr_year + '-' + curr_month + '-' + curr_date
}

export const timeValueFormatter = (dateStr) => {
    var d = new Date(dateStr);
    var curr_hour = String(d.getHours());
    var curr_minutes = String(d.getMinutes());

    if (curr_hour.length === 1) curr_hour = "0" + curr_hour;
    if (curr_minutes.length === 1) curr_minutes = "0" + curr_minutes;
    return curr_hour + ":" + curr_minutes
}

export const responseDateFormatter = (date, timeStr) => {
    var t = timeStr.split(':');

    let year = date.getFullYear();
    let mounth = date.getMonth();
    let day = date.getDate();

    let hours = Number(t[0]);
    let minutes = Number(t[1]);

    return new Date(year, mounth, day, hours, minutes)
}

export const humanFileSize = (size) => {
    if (size === 0) {
      return "undefined"
    }
    var i = Math.floor( Math.log(size) / Math.log(1024) );
    return ( size / Math.pow(1024, i) ).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

export const stringByNum = (n, text_forms) => {  
    n = Math.abs(n) % 100; var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 === 1) { return text_forms[0]; }
    return text_forms[2];
}
