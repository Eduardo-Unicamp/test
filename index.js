document.getElementById('reading-form').addEventListener('submit',async function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const plainObject = Object.fromEntries(formData.entries());

    //token
    const tokenTestLogin = plainObject.token;
    delete plainObject.token;

    const jsonString = JSON.stringify(plainObject);

    try{
            const response = await fetch('https://bookat-readings-manager.onrender.com/readings-manager',
                {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        //token login
                        'Authorization':`Bearer ${tokenTestLogin}`
                    },
                    body:jsonString
                }
            );
            if(response.ok){
                const responseData = await response.json();
                console.log('Success:', responseData);
                alert('Data sent successfully!');
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