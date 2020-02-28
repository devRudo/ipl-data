document.addEventListener('DOMContentLoaded', () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/matches-per-year');
    xhr.send();
    xhr.onload = () => {
        if (xhr.status != 200) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
            let obj = JSON.parse(xhr.responseText);
            let years = Object.keys(obj);
            let jsonArr = [];
            for (key in obj) {
                jsonArr.push([Number(key), obj[key]]);
            }
            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Matches played per year'
                },
                xAxis: {
                    title: {
                        text: 'Years'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Matches played'
                    },
                    tickInterval: 1
                },
                series: [{ showInLegend: false, data: jsonArr }]
            });
        }
    };
    xhr.onerror = () => {
        alert("Request failed");
    };

});