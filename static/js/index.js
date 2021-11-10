window.onload = ()=> {

    function formRow(key, url){
        const rowBox = document.createElement('div');
        rowBox.style.width = '80%';
        const urlBox = document.createElement('div');
        const shortBox = document.createElement('div');
        shortBox.style.float = 'right';
        urlBox.innerText = url;
        shortBox.innerText = 'https://url-shortner-exp.herokuapp.com/'+key;
        rowBox.appendChild(urlBox);
        rowBox.appendChild(shortBox);
        document.querySelector("#dashboard").appendChild(rowBox);
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
    btn1.addEventListener("click", (event)=>{
        event.preventDefault();
        const formele = document.querySelector("#form");
        const formData = new FormData(formele);
        if(validate(formData.get('longUrl'))){

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
                document.querySelector("#output").innerText = res.shortUrl;
            });
            
        }else{
            document.querySelector("#output").innerText = "Invalid Url";
        }

        fetch('https://url-shortner-exp.herokuapp.com/urls')
        .then(res=>{
            return res.json();
        }).then(res=>{
            for(const key in res){
                formRow(key, res[key]);
            }
        })
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