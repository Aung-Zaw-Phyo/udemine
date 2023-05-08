import Cookies from 'js-cookie'

export const storeLink = (data) => {
    let now = new Date();
    now.setTime(now.getTime() + 24 * 3600 * 1000);
    document.cookie = `detail=${JSON.stringify(data)}; expires=${now.toUTCString()}`
}

export const getLink = () => {
    if(document.cookie && Cookies.get('detail')){
        const detail = Cookies.get('detail')
        return detail
    }else{
        return false
    }
}