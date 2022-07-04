/** formateTime(new Date) -> "2018-07-23" */
export function formateTime(date, delimiter = '-') {  // 曝光函数出去 在需要用得地方引入这个文件 { formateTime } 这种方式引入 formateTime() // 直接传入参数
	const yyyy = date.getFullYear().toString(); 
	const mm = (date.getMonth() + 1).toString();
	const dd = date.getDate().toString();
	return yyyy + delimiter + (mm[1] ? mm : `0${mm[0]}`)
		+ delimiter + (dd[1] ? dd : `0${dd[0]}`);
}