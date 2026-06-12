let form = document.getElementById('readings-form');

form.addEventListener('submit',async function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const plainObject = Object.fromEntries(formData.entries());
    
    //token
    const authToken = getTokenCookie();
    delete plainObject.token;//depois mudar o html pra tirar o campo de token e apagar essa linha

    //convert currentPage to integer 
    for(let key in plainObject){
        if(plainObject[key]==""){
            plainObject[key]=null;
        }
        else if(key=="currentPage" && plainObject[key]!=null){
            plainObject[key]=parseInt(plainObject[key],10);//base 10
        }

    }


    const jsonString = JSON.stringify(plainObject);
    console.log(jsonString);

    try{
            const response = await fetch('https://bookat-readings-manager.onrender.com/readings-manager',
                {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        //token login
                        'Authorization':`Bearer ${authToken}`
                    },
                    body:jsonString
                }
            );
            if(response.ok){
                
                console.log('Success: codigo', response.status);
   
            }else {
                console.error('Server returned an error:', response.status);
                // Se o token for inválido, o Spring Boot geralmente retorna 401 (Unauthorized) ou 403 (Forbidden)
                if (response.status === 401 || response.status === 403) {
                    alert('Erro de Autenticação! O token está correto?');
                } else {
                    alert('Falha ao enviar os dados.');
      }
            }
    }catch (error){
        console.error("Falha na requisiçao",error);

    }
    
})


function getTokenCookie(){
        const decodedCookie = decodeURIComponent(document.cookie);
        const cArray = decodedCookie.split("; ")[0].split("=");
        const token = cArray[1];
        return token;
    }