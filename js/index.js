document.getElementById("submit").addEventListener("click", () => {
    main();
});


let DomID=(id)=>{
    return document.getElementById(id);
}


let main = () => {
    let address = document.getElementById("input_address").value;
    retrieve_location(address).then((res)=>{
        return retrieve_information(res.lat,res.lng);
    }).then((res)=>{
        console.log(res);
        DomID("country").innerHTML=res.location;
        DomID("weather").innerHTML=res.weather;
        DomID("humidity").innerHTML=res.humidity;
        DomID("temperature").innerHTML=res.temperature;
        DomID("local_time").innerHTML=res.local_time;

        DomID("add_img").innerHTML=`
        <img class="img_api" src="${res.icon}" alt="">
        `;
    }).catch((err)=>{
        console.log(err);
    });
}

let retrieve_location = (address) => {
    return new Promise((resolve, reject) => {
        superagent.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBrI-MF4-Lx2hHVyb-E9zEq_ZOAIJxgYyc&address=${address}`).end((err, res) => {
            if (err) {
                console.log("ERROR");
                console.log(err);
                reject(err);
            }

            console.log(res);
            let { lat, lng } = res.body.results[0].geometry.location;
            let data = { lat, lng };
            console.log(lat);
            console.log(lng);
            resolve(data);
        })
    })
}

let retrieve_information = (lat, lng) => {
    return new Promise((resolve, reject) => {
        superagent.get(`http://api.weatherapi.com/v1/current.json?key=28833ef02dec40c7a4390322230901&q=${lat},${lng}`).end((err, res) => {
            
            if(err){
                reject(err);
            }

            console.log(res);
            console.log(res.body.current.cloud);
            console.log(res.body.current.condition.text);

            let data={weather:res.body.current.condition.text,humidity:res.body.current.humidity,icon:res.body.current.condition.icon,temperature:res.body.current.temp_c,location:res.body.location.country,local_time:res.body.location.localtime};

            console.log(data);
            resolve(data);
        })

    });
}













