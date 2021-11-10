window.onload = ()=> {

    function formRow(key, url){
        const urlBox = document.createElement('div');
        const shortBox = document.createElement('div');
        urlBox.innerText = url;
        shortBox.innerText = 'https://url-shortner-exp.herokuapp.com/'+key;
        document.querySelector("#dashboard").appendChild(urlBox);
        document.querySelector("#dashboard").appendChild(shortBox);
    }


    fetch('https://url-shortner-exp.herokuapp.com/urls')
        .then(res=>{
            return res.json();
        }).then(res=>{
            for(const key in res){
                formRow(key, res[key]);
            }
        })

    const btn = document.querySelector("#shorten-btn");
    btn.addEventListener("click", (event)=>{
        event.preventDefault();
        const formele = document.querySelector("#form");
        const formData = new FormData(formele);
        let longUrl = formData.get('longUrl');
        if(validate(longUrl)){

            const request = new Request('https://url-shortner-exp.herokuapp.com/url', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(Object.fromEntries(formData))
            });

            fetch(request).then((res)=>{
                return res.json();
            }).then((res)=>{
                document.querySelector("#output-url").innerText = res.shortUrl;
                formRow(res.id, longUrl);
            });
            
        }else{
            document.querySelector("#output-url").innerText = "Invalid Url";
        }
    });

    const cpy = document.querySelector("#copy-btn");
    cpy.addEventListener("click", ()=>{
        const copytext = document.querySelector("#output-url");
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