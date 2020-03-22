import moment from 'moment';

export const convertDate = (date, format) => {
    const convertedDate = moment(date).format(format);
    return convertedDate;
}

export const debounce = (func, delay) => { 
    let debounceTimer 
    return function() { 
        const context = this
        const args = arguments 
            clearTimeout(debounceTimer) 
                debounceTimer 
            = setTimeout(() => func.apply(context, args), delay) 
    } 
}  