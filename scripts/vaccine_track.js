// JQuery for scroll to top button
$(document).ready(function(){
    
    //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 200) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    
    //Click event to scroll to top
    $('.scrollToTop').click(function(){
        $('html, body').animate({scrollTop : 0},100);
        return false;
    });
    
});

let country_name = "India"
let vaccine_data = [];
let vaccine_dates = [];
let row = [];

const commas = (number) => {
    number = number.split(".");
    return number[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,") + (number[1] ? ("." + number[1]) : "");
}

async function remove_ele() {
    let table = document.getElementById('tbody');

    while (table.hasChildNodes()) {
        table.removeChild(table.childNodes[0]);
    }
}


async function getdata() {
    try {
        const test_url = "India.csv"

        const url = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/" + country_name + ".csv";
        const response = await fetch(url);

        const data = await response.text();

        const rows = data.split('\n').slice(1);

        // const country_details = rows[0].split(',');

        vaccine_data = [];
        vaccine_dates = [];
        row = [];

        await remove_ele();


        for (var j = 0; j < (rows.length - 1); j++) {
            const regex = /(".*?")(?=\s*,|\s*$)/;

            rows[j] = rows[j].replace(regex, "Vaccine_name");

            row.push(rows[j].split(','));

            let table = document.getElementById('tbody');
            let tr = document.createElement('tr');
            let th = document.createElement('th');
            th.setAttribute('scope', 'row');
            th.innerHTML = row[j][1];
            tr.appendChild(th);

            vaccine_data.push(row[j][4]);
            vaccine_dates.push(row[j][1]);

            for (var i = 0; i < 3; i++) {
                let td = document.createElement('td');
                if (row[j][4 + i] == "") row[j][4 + i] = "NA"
                td.innerHTML = commas(row[j][4 + i]);
                tr.appendChild(td);
            }

            table.appendChild(tr);
        }


    }
    catch (err) {
        window.open("/404.html", "_blank");
    }

}

var chart;
var PieChart;
async function make_chart() {
    await getdata();
    if (chart) {
        chart.destroy();
    }
    if (PieChart) {
        PieChart.destroy();
    }
    var data_chart = document.getElementById('vaccine_chart').getContext('2d');
    chart = new Chart(data_chart, {
        type: 'line',

        data: {
            labels: vaccine_dates,
            datasets: [{
                label: 'Covid Vaccinations in ' + country_name,
                backgroundColor: 'rgba(255, 70, 100, 0.6)',
                borderColor: '#40403E',
                data: vaccine_data,
            }],
        },

        options: {
            maintainAspectRatio: false
        }
    });

    if(row[row.length - 1][5]=="NA" || row[row.length - 1][6]=="NA")
    {
        document.getElementById('not_avl').style.display = "block";
        document.getElementById('pieChart').style.display = "none";
    }
    else{
        document.getElementById('pieChart').style.display = "block";
        document.getElementById('not_avl').style.display = "none";
    }

    var pie_chart = document.getElementById('vaccine_dose_piechart').getContext('2d');
    PieChart = new Chart(pie_chart, {
        type: 'doughnut',
        data: {
            labels: ["First Dose", "Second Dose"],
            datasets: [{
                backgroundColor: [
                    pattern.draw('zigzag-vertical', 'rgb(255, 89, 105)'),
                    pattern.draw('diamond', '#36a2eb'),
                ],
                data: [row[row.length - 1][5], row[row.length - 1][6]]
            }],
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 19,
                    fontFamily: "'Kiwi Maru', serif",
                    margin: "5px 5px"
                }
            },
            hover: {
                animationDuration: 1000 // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 1000 // animation duration after a resize
        }
    });

    // console.log(vaccine_data);
    // console.log(vaccine_dates)
}

make_chart();

async function set_values() {
    await getdata();
    document.getElementById('t_vaccine').innerHTML = commas(row[row.length - 1][4])
    document.getElementById('f_dose').innerHTML = commas(row[row.length - 1][5])
    document.getElementById('s_dose').innerHTML = commas(row[row.length - 1][6])
}


set_values();


document.getElementById('country').addEventListener('change', () => {
    var index = document.getElementById('country').selectedIndex;
    var options = document.getElementById('country').options;
    country_name = options[index].value;
    make_chart();
    set_values();
    document.getElementById('c_name').innerHTML = country_name;
    document.getElementById('c2_name').innerHTML = country_name;
})
