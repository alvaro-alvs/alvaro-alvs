

export const OxxPing = async () => {
    const res = await fetch('https://oxx-three.vercel.app/oxx/ping/', {
        method: "GET",
        headers: {
            'api-key': 'xUp2jAz5hQZM#wCsKb'
        }
    });
    
    return res
}