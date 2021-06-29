window.onload = ()=> {

    fetch('http://url-shortner-exp.herokuapp.com/urls')
    .then(res=>{
        return res.json();
    }).then(res=>{
        document.querySelector("#dashboard").innerText = '';
    })

    const btn1 = document.querySelector("#btn");
    btn1.addEventListener("click", (event)=>{
        event.preventDefault();
        const formele = document.querySelector("#form");
        const formData = new FormData(formele);
        if(validate(formData.get('longUrl'))){
            const request = new Request('http://url-shortner-exp.herokuapp.com/url', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(Object.fromEntries(formData))
            });
            fetch(request).then((res)=>{
                return res.json();
            }).then((res)=>{
                document.querySelector("#output").innerText = res.shortUrl;
            });
        }else{
            document.querySelector("#output").innerText = "Invalid Url";
        }

        fetch('http://url-shortner-exp.herokuapp.com/urls')
        .then(res=>{
            return res.json();
        }).then(res=>{
            let stg = '';
            for(const key in res){
                stg += 'http://url-shortner-exp.herokuapp.com/' + key + ' : ' + res[key] + '\n'
            }
            document.querySelector("#dashboard").innerText = stg;
        })
    });

    const cpy = document.querySelector("#copy");
    cpy.addEventListener("click", ()=>{
        const copytext = document.querySelector("#output");
        copytext.select();
        document.execCommand("copy");
    })

    function validate(url){
        var patt = /(https|http):\/\/\S+\.\S+/;
        var result = url.match(patt);
        if(result){
            return true;
        }else{
            return false;
        }
    }
}