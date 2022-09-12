const wrapper = document.querySelector('.wrapper');
inputPart = wrapper.querySelector('.input-part');
infoTxt = inputPart.querySelector('.info-txt');
inputField = inputPart.querySelector('input');
locationBtn = inputPart.querySelector('button');
let api;
let keyId = 'c86a00f73557b3ea8b9455279a8cd63f';
weatherIcons = document.querySelector('.weather-part img');
arrowBack = wrapper.querySelector('header ion-icon')
inputField.addEventListener('keyup',e =>{
    if(e.key == 'Enter' && inputField.value != ''){
        requestApi(inputField.value);
    }
})

locationBtn.addEventListener('click', ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else{
        alert('Ooops... Your Browser Not Support geolocation')
    }
})

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${keyId}`;
    fetchData();
}
function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add('pending')}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${keyId}`;
    fetchData();
}

function fetchData(){
    infoTxt.innerText = 'Getting Weather Details...'
    infoTxt.classList.add('pending')
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace('pending', 'error');
        infoTxt.innerText =  `Oops! ${inputField.value} isn't a valid city name`;
    }
    else{

        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;



if(id == 800){
        weatherIcons.src = 'icons/clear.svg';
}
else if(id >= 200 && id <= 232){
    weatherIcons.src = 'icons/strom.svg';
}
else if(id >= 600 && id <= 622){
    weatherIcons.src = 'icons/snow.svg';
}
else if(id >= 701 && id <= 781){
    weatherIcons.src = 'icons/haze.svg';
}
else if(id >= 801 && id <= 804){
    weatherIcons.src = 'icons/cloud.svg';
}
else if(id >= 300 && id <= 321 || (id >= 500 && id <= 531)){
    weatherIcons.src = 'icons/rain.svg';
}






        wrapper.querySelector('.temp .numb').innerText = Math.floor(temp);
     wrapper.querySelector('.weather').innerText = description;
     wrapper.querySelector('.location span').innerText = `${city}, ${country}`;
     wrapper.querySelector('.temp .numb-2').innerText = Math.floor(feels_like);
     wrapper.querySelector('.humidity span').innerText = `${humidity}%`;

        infoTxt.classList.remove('pending', 'error');
        wrapper.classList.add('active');
    }
}

arrowBack.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
    inputField.value = "";
})