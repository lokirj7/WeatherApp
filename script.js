let lat;
let lon;
let locationname=document.getElementById("locationname");
let setIcon = document.getElementById("icon");
let description=document.getElementById("description");
// let temperature=document.getElementById("temperature");
let minTemp=document.getElementById("minTemp");
let maxTemp=document.getElementById("maxTemp");



if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async (position) =>{
        lat=position.coords.latitude;
        lon=position.coords.longitude; 


        let data=await getWeatherData(lat,lon);
        var map = L.map('map').setView([lat, lon], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


        
        // console.log(lat,lon);
        // console.log(position);
    
        var marker = L.marker([lat, lon]).addTo(map);
         marker.bindPopup(`<b>${data.name}</b>`).openPopup();


        map.on('click', async function(e){
            const data=await getWeatherData(e.latlng.lat,e.latlng.lng);
            console.log("clicked", data)
            marker.setLatLng([e.latlng.lat,e.latlng.lng]);
            marker.bindPopup(`<b>${data.name}</b>`).openPopup();


        });



        return data;
    })
}

        // async function getData(){
        //     let res= await fetch('https://jsonplaceholder.typicode.com/users')
        //     let data= await res.json()
        //     console.log(data)
        // }
        // getData()
     
        
        async function getWeatherData(lat,lon){
        let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8f2811fd8133dc2ec9a19c3ec7a4dfcc`
        let response =await fetch(api);
        let data =await response.json();

        console.log(data);

        dataHandler(data);
        return data;
    }



    function dataHandler(data){
       // const{description}=data.weather[0];
        const{name}=data.name;
        const{temp,temp_min,temp_max}=data.main;
        const{speed}=data.wind;
        const{icon}=data.weather[0];


      // Changing after Fetch api in Html page  
        locationname.innerHTML=data.name;
        description.innerHTML=data.weather[0].description;
        console.log(temp+"")
        document.getElementById("temperature").innerHTML=temp;
        minTemp.innerHTML="Min-temp:"+temp_min;
        maxTemp.innerHTML="Max-temp:"+temp_max;
        document.getElementById("windSpeed").innerHTML=speed;
        setIcon.style["background-image"]=`url(${setIconFunction(icon)})`

    }
    function setIconFunction(icon) {
 
        const icons = {
            "01d": "./animated/day.svg",
            "02d": "./animated/cloudy-day-1.svg",
            "03d": "./animated/cloudy-day-2.svg",
            "04d": "./animated/cloudy-day-3.svg",
            "09d": "./animated/rainy-1.svg",
            "10d": "./animated/rainy-2.svg",
            "11d": "./animated/rainy-3.svg",
            "13d": "./animated/snowy-6.svg",
            "50d": "./animated/mist.svg",
            "01n": "./animated/night.svg",
            "02n": "./animated/cloudy-night-1.svg",
            "03n": "./animated/cloudy-night-2.svg",
            "04n": "./animated/cloudy-night-3.svg",
            "09n": "./animated/rainy-1.svg",
            "10n": "./animated/rainy-2.svg",
            "11n": "./animated/rainy-3.svg",
            "13n": "./animated/snowy-6.svg",
            "50n": "./animated/mist.svg"
        };
     
        return icons[icon];
    }