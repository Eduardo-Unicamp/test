import { postRequest,saveTokenCookie,jsonFromForm } from "../global.js";

   

    const authUrl="https://bookat-readings-manager.onrender.com/auth/login";

    let loginForm = document.getElementById('login-form');

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        
        //convert html form to json
        let loginJson =jsonFromForm(loginForm);
         
        //
        if(!(loginJson.username=="" || loginJson.password=="")){
           authenticate(loginJson);
        }else{
            loginUnsuccessful();//make this function
        }
    });


    async function authenticate(loginJson){
        loginJson=validate(loginJson);

         const response = await postRequest(authUrl,loginJson);

        if(response.ok){
            //obtem o token da resposta do servidor
            const token =  (await response.json()).token;
            saveTokenCookie(token);
            console.log("✅ Cookie salvo com sucesso!");
            

        }
    }

    function validate(loginJson){
        return loginJson;//placeholder
    }