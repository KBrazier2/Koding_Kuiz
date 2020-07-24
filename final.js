const gamertag = document.getElementById('gamertag');
const savePointBtn = document.getElementById('savePointBtn');
const finalPoint = document.getElementById('finalPoint');
const mostRecentPoint = localStorage.getItem('mostRecentPoint');

const topPoint = JSON.parse(localStorage.getItem("topPoint")) || [];

const MAX_TOP_POINT = 5;


finalPoint.innerText = mostRecentPoint;


gamertag.addEventListener('keyup', () =>{
    savePointBtn.disabled = !gamertag.value;
});

saveTopPoint = (e) => {

    e.preventDefault();

    const point = {
        point: mostRecentPoint,
        name: gamertag.value
    };
    topPoint.push(point);
    topPoint.sort( (a,b) => b.point - a.point)
    topPoint.splice(5);

    localStorage.setItem('topPoint', JSON.stringify(topPoint));
    window.location.assign("index.html");


};