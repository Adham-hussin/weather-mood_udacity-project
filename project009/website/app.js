/* Global Variables */
const API = '&units=imperial&APPID=fcf9611b15a5e47a1f8afd3806a7a2a4';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
//function for getteing the data from API
const fetchData = async (url) => {
    const rs = await fetch(url);
    try {
        let data = await rs.json();
        return data;

    } catch (e) {
        console.log('error', e);
    }
}
// get data asynchronous function to get data from the server
const getData = async (url) => {
    const rs = await fetch(url);
    try {
        let data = rs.json();
        return data;
    } catch (e) {
        console.log('error', e);
    }
}
// post data asynchronous function to send data to the server
const postData = async (url, data) => {
    const rs = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    });
}
//UI update function to show the data to the user
const updateUI = async () => {
    // getting elements from the dom
    const dateE = document.getElementById('date');
    const tempE = document.getElementById('temp');
    const contentE = document.getElementById('content');
    // get updated data from server
    let UI = await getData('/weatherIn');
    console.log(UI);
    // update UI according to retrieved data
    dateE.innerHTML = 'Date : ' + UI.date;
    tempE.innerHTML = 'Temprature : ' + UI.temp + ' °F';
    contentE.innerHTML = 'Feeling : ' + UI.content;
}

//adding event listener to the generate button
document.getElementById('generate').addEventListener('click', async () => {
    // getting elements from the dom and constructing the url
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    const url = baseUrl + zip + API;

    // storing weather data in a variable and printing it to the console
    const wData = await fetchData(url);
    console.log(wData)

    const temp = wData.main.temp;

    const data = {
        date: newDate,
        temp: temp,
        content: content
    }
    postData('/weatherOut', data);
    updateUI();
});
//7468616e6b7320696e20616476616e6365
