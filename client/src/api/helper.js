import Cookies from 'js-cookie'

export const storeLink = (data) => {
    let now = new Date();
    now.setTime(now.getTime() + 24 * 3600 * 1000);
    document.cookie = `detail_link=${JSON.stringify(data)}; expires=${now.toUTCString()}`
}

export const getLink = () => {
    if(document.cookie && Cookies.get('detail_link')){
        const detail_link = Cookies.get('detail_link')
        return detail_link
    }else{
        return false
    }
}