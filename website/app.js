/* Global Variables */
const apiKey = '&appid=80a3a79b3e537ca636aebeec4819a0d6';
const zipCode = document.getElementById('zip');
const btn = document.getElementById('generate');
const feelings = document.getElementById('feelings');
const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const feelingDiv = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// adding an event listener to the button
btn.addEventListener('click', handleGenerateBtnClick);


function handleGenerateBtnClick() {
    if (!zipCode.value) {
        alert('Please, enter a zip code');
    } else {
        getData().then(function (data) {
            postData('/addData', {
                date: newDate,
                temp: data.main.temp,
                feelings: feelings.value,
            })
            updateUI();
        })


    }
}

async function getData() {
    const baseUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}${apiKey}`;
    let request = await fetch(baseUrl);
    let response = await request.json();
    try {
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
    }
}

const postData = async (url = "", data = {}) => {
    await fetch(url, {
        "method": "POST",
        "credentials": "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    try {
        const newRes = await res.json();
        console.log(newRes)
        return;
    } catch (error) {}
}

async function updateUI() {
    let req = await fetch('/all');
    try {
        let res = await req.json();
        console.log(res);
        dateDiv.innerHTML = `The date now is ${res.date}`;
        tempDiv.innerHTML = `Temperature: ${res.temp}`;
        feelingDiv.innerHTML = `I feel: ${res.feelings}`;
    } catch (error) {
        console.log(error);
    }

}