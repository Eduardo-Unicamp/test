import { postRequest,saveTokenCookie,jsonFromForm } from "../global.js";
const registerUrl = "https://bookat-readings-manager.onrender.com/auth/register";
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit",async (event)=>{
    event.preventDefault();

    let registerJson = jsonFromForm(registerForm);

    let response= await postRequest(registerUrl,registerJson);
    console.log( registerJson);
    if(response.ok){
        return registerSuccessful();
    }else{
        return registerUnsuccessful();
    }

});


function registerSuccessful(){
    alert("Usuário cadastrado!")
}
function registerUnsuccessful(){
    return new Error("Erro no cadastro do usuário");
}