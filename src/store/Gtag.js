

export const sendPageView = (data) => {
    if(window.gtag){
        window.gtag('event', 'page_view', {...data});
    }
}

export const sendEvent = (name, data) => {
    if (window.gtag) {
        window.gtag('event', name, {...data});
    }
}