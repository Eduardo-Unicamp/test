export async function postRequest(url,jsonObject){
    const response = await fetch(url,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:jsonObject
        }
    );
    return response;

}



export function jsonFromForm(loginForm){
    const formData = new FormData(loginForm);
    const plainObject = Object.fromEntries(formData.entries());
    return JSON.stringify(plainObject);
    }




export function getTokenCookie(){
    const decodedCookie = decodeURIComponent(document.cookie);
    const cArray = decodedCookie.split("; ")[0].split("=");
    const token = cArray[1];
    return token;
}

export function saveTokenCookie(token){
    const cookieDuration = 1;//hours

    let expireDate = new Date();
    expireDate.setTime(expireDate.getTime()+cookieDuration*60*60*1000);
    let expires = "expires" + expireDate.toUTCString();

    document.cookie = `authToken = ${token};expires=${expires};path=/`;
}