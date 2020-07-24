const topPointList = document.getElementById('topPointList');
const topPoint = JSON.parse(localStorage.getItem('topPoint')) || [];

topPointList.innerHTML = topPoint
    .map(point => {
        return `<li class="top-point">${point.name} - ${point.point}</li>`;
    })
    .join("");
