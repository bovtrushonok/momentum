class Momentum {
    constructor () {
        this.time = '';
        this.hours = '';
        this.day = '';
        this.greeting =  '';
        this.name = '';
        this.focus = '';
        this.currentImageBase = [];
        this.images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
    }

    getTime() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let sec = now.getSeconds();
        if(sec < 10) sec= '0' + sec;
        if(minutes < 10) minutes= '0' + minutes;
        this.time = `${hours}:${minutes}:${sec}`;
        time.textContent = this.time;
        if(minutes == '00' && sec == '00') this.getImage(hours);
        setInterval (this.getTime, 1000); 
    }

    getDay() {
        let now = new Date();
        let weekDay = function() {
            switch(now.getDay()) {
                case 0:
                    return "Воскресенье";
                break;
                case 1:
                    return "Понедельник";
                break;
                case 2:
                    return "Вторник";
                break;
                case 3:
                    return "Среда";
                break;
                case 4:
                    return "Четверг";
                break;
                case 5:
                    return "Пятница";
                break;
                case 6:
                    return "Суббота";
                break;
                default:
                    return "Здесь всегда воскресенье";
                break;
            };
        }();

        let month = function() {
            switch(now.getMonth()) {
                case 0:
                    return "января";
                break;
                case 1:
                    return "февраля";
                break;
                case 2:
                    return "марта";
                break;
                case 3:
                    return "апреля";
                break;
                case 4:
                    return "мая";
                break;
                case 5:
                    return "июня";
                break;
                case 6:
                    return "июля";
                break;
                case 7:
                    return "августа";
                break;
                case 8:
                    return "сентября";
                break;
                case 9:
                    return "октября";
                break;
                case 10:
                    return "ноября";
                break;
                case 11:
                    return "декабря";
                break;
               
                default:
                    return "Здесь всегда июль";
                break;
            };
        }();

        let date = now.getDate();
        this.day = `${weekDay}, ${date} ${month}`;
        day.textContent = this.day;
        setInterval (this.getDay, 1000); 
    }

    setGreeting() {
        let now = new Date();
        let hours = now.getHours();
        if(this.hours < 6) this.greeting = 'Доброй ночи,'
        else if(this.hours < 12) this.greeting = 'Доброе утро,';
        else if (this.hours < 18) this.greeting = 'Добрый день,';
        else this.greeting = 'Добрый вечер,';

        greeting.textContent = this.greeting;
    
    }

    getName() {
        if(localStorage.getItem('name')) name.textContent = localStorage.getItem('name');
        else name.textContent = '[Enter Name]';
    }

    setName(e) {
        if( e.type == 'keydown' && e.code == 'Enter' ) {
            if (e.target.innerText == '') {
                e.target.textContent = '[Enter Name]';
                localStorage.removeItem('name');
            }
            else localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    }

    getFocus() {
        if(localStorage.getItem('focus')) focus.textContent = localStorage.getItem('focus');
        else focus.textContent = '[Enter Plan]';
    }

    setFocus(e) {
        if( e.type == 'keydown' && e.code == 'Enter' ) {
            if (e.target.innerText == '') {
                e.target.textContent = '[Enter plan]';
                localStorage.removeItem('focus');
            }
            else localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    }

    async getQuote() {  
        const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
        const res = await fetch(url);
        const data = await res.json(); 
        phrase.textContent = data.quoteText;
        phraseAuthor.textContent = data.quoteAuthor;
    }

    async getWeather() {  
        let currentCity = (localStorage.getItem('city')) ? localStorage.getItem('city') : '[Enter city]';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&lang=ru&appid=88029370652b5b8a53deaeebff191a8e&units=metric`;
        try {
        const res = await fetch(url);
        const data = await res.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        let roundedTemp = Math.round(data.main.temp)
        temperature.textContent = `${roundedTemp}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed}m/s`; 
        }
        catch(error) {
            temperature.textContent = '';
            humidity.textContent = '';
            wind.textContent = ''; 
            alert('Для получения прогноза введите название города');
        }
    }

    createImagesArray() {
        let currentImageBase = [];
        let baseChoices = ['./assets/images/night/', './assets/images/morning/', './assets/images/day/', './assets/images/evening/' ]
        let randomCoef = this.randomInteger(1, 14);
        for(let i = 0; i < baseChoices.length; i++) {
            currentImageBase.push([]);
            for (let k = 0; k < 6; k++) {
            currentImageBase[i].push(baseChoices[i] + this.images[k + randomCoef]);
            }
        }
        this.currentImageBase = currentImageBase;
        console.log(this.currentImageBase);
        let timeNow = new Date();
        let currentHour = timeNow.getHours();
        this.getImage(currentHour);
    }

    getImage(hours) {
        let imageSrc;
        switch(hours) {
            case hours < 6:
              imageSrc = this.currentImageBase[0][hours];
            break;
            case hours < 12:
              imageSrc = this.currentImageBase[1][hours];
            break;
            case hours < 18:
                imageSrc = this.currentImageBase[2][hours];
            break;
            case hours < 23:
                imageSrc = this.currentImageBase[3][hours];
            break;
            default:
                imageSrc = this.currentImageBase[0][5];
            break;
        }
        this.setBgImage(imageSrc);
    } 

    setBgImage(data) {
        const src = data;
        const img = document.createElement('img');
        img.src = src;
        img.onload = () => {    
           body.style.backgroundImage = `url(${src})`;
        }; 
    }

    viewAllImages() {
        let now = new Date();
        let hours = now.getHours();
        for (let i = 0; i < 24; i++) {
            hours += i;
            console.log(hours);
            if (hours < 23) this.getImage(hours);
            else {
               this.getImage(0);
            }
        }
    }

    randomInteger(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    init() {
        this.getTime();
        this.getDay();
        this.setGreeting();
        this.getName();
        this.getFocus();
        this.getWeather();
        this.createImagesArray();
    }

};

//get DOM elements
const body = document.querySelector('body');
const time = document.querySelector('.time');
const day = document.querySelector('.day');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
const phrase = document.querySelector('.phrase');
const phraseAuthor = document.querySelector('.phraseAuthor');
const phraseChangeBtn = document.querySelector('.phraseChangeBtn');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const updBcg = document.querySelector('.update-bcg');

const momentum = new Momentum();
momentum.init();

name.addEventListener('blur', momentum.setName);
name.addEventListener('keydown', momentum.setName);
name.addEventListener('click', () => {
    name.textContent = '';
});

focus.addEventListener('blur', momentum.setFocus);
focus.addEventListener('keydown', momentum.setFocus);
focus.addEventListener('click', () => {
    focus.textContent = '';
});

document.addEventListener("DOMContentLoaded", momentum.getQuote);
phraseChangeBtn.addEventListener('click', momentum.getQuote);

document.addEventListener('DOMContentLoaded', () => {
    city.textContent = localStorage.getItem('city') ? localStorage.getItem('city') : '[Enter city]';
    momentum.getWeather();
});

city.addEventListener('blur', (e) => {
    if (city.textContent == '') {
        city.textContent = (localStorage.getItem('city')) ? localStorage.getItem('city') : '[Enter city]';
    }
    else {
    localStorage.setItem('city', city.textContent);
    momentum.getWeather();
    }
});

city.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        if (city.textContent == '') {
            city.textContent = (localStorage.getItem('city')) ? localStorage.getItem('city') : '[Enter city]';
          }
        else {
            localStorage.setItem('city', city.textContent);
            momentum.getWeather();
        }
        city.blur();
    }
});
city.addEventListener('click', () => {
    city.textContent = '';
});

document.addEventListener('load', momentum.createImagesArray);
updBcg.addEventListener('click', momentum.viewAllImages);

