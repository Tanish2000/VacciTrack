console.log("India's Covid-19 Tracker");

var india_data;

const commas = (number) => {
    number = number.split(".");
    return number[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,") + (number[1] ? ("." + number[1]) : "");
}


const make_chart = (data) => {
    var pie_chart = document.getElementById('fig_container').getContext('2d');
    PieChart = new Chart(pie_chart, {
        type: 'pie',
        data: {
            labels: ["Active Cases", "Deaths" , "Recovered"],
            datasets: [{
                backgroundColor: [
                    '#EAF609',
                    '#F60909',
                    '#44aa56'
                ],
                data: [data.active, data.deaths , data.recovered]
            }],
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 14,
                    fontFamily: "'Kiwi Maru', serif",
                    margin: "5px 5px",
                }
            },
            hover: {
                animationDuration: 1000 // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 1000 // animation duration after a resize
        }
    });
}


const make_table = (data)=>{

    data.forEach(e => {

        let table = document.getElementById('tbody');
        let tr = document.createElement('tr');

        const keys = ["state","active","confirmed","deaths","recovered"];

        for (let i = 0; i < 5; i++) {
            let td = document.createElement('td');
            td.setAttribute('scope', 'row');
            td.classList.add('text-left')
            if(e[keys[i]]=="State Unassigned"  || e[keys[i]]=="Dadra and Nagar Haveli and Daman and Diu")
            {
                break;
            }
            td.innerHTML = commas(e[keys[i]]);
            tr.appendChild(td);            
        }

        table.appendChild(tr);
        
    });

}

const fetchData = async () => {

    try {
        const res = await fetch('https://api.covid19india.org/data.json');
        const data = await res.json();

        india_data = data.statewise[0];

        document.getElementById('active_cases').innerHTML = commas(data.statewise[0].active);
        document.getElementById('confirmed_cases').innerHTML = commas(data.statewise[0].confirmed);
        document.getElementById('deaths').innerHTML = commas(data.statewise[0].deaths);
        document.getElementById('recovered').innerHTML = commas(data.statewise[0].recovered);
        document.getElementById('last_updated').innerHTML = commas(data.statewise[0].lastupdatedtime);

        make_chart(india_data);
        make_table(data.statewise.slice(1,data.statewise.length));
        // console.log(data.statewise.slice(1,data.statewise.length));

    } catch (error) {
        console.log(error.message)
    }
}

fetchData();
