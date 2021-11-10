// const proxy = 'http://localhost:8080';
const proxy ="https://gamingatoll.com"
export async function fetchData(path,requestOptions) {
    let response;
    
    requestOptions.headers = {
        ...requestOptions.headers,
        'Content-Type' : "application/json",
        'Accept' : 'application/json',
        'Authorization' : localStorage.accessToken
    } 

    console.log(requestOptions)
          await fetch(proxy + path,requestOptions).then(res => res.json()).then(async data =>{
              console.log(data)
          if (data.authStatus == undefined || data.authStatus == null) {
            console.log("AUTHORIZED")
            response= data; 
            return response;
          }
          else {
            console.log("Message is unauthorized Try to refresh session")
            const payload = {
                refreshToken:localStorage.refreshToken
            }
    
            const requestoptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }
            console.log("Generate new key with refresh token")
            await fetch(`${proxy}/refresh_session`,requestoptions).then(res => res.json()).then(data=>{
                if (data.status) {
                    console.log("access token refreshed by using refreshtoken",data)
                    localStorage.accessToken  = data.accessToken
                    localStorage.refreshToken = data.refreshToken
                    requestOptions.headers = {
                        ...requestOptions.headers,
                        'Authorization' : localStorage.accessToken
                    } 
                    response = fetchData(path,requestOptions)
                }
                else {
                    console.log("Refresh token is also expired")
                    response = null;
                }
            })
          }
      })
      return response;
}
