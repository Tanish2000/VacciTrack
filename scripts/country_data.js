var c_data = [];  //An array that holds the vaccination data of different countries 
var data = [];

// Fecthing data for multiple countries to display in "Top five countries..."
async function fetch_country_data()
{
    try{
        data = await Promise.all([
            fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/United%20States.csv').then((response) => response.text()),
            fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/United%20Kingdom.csv').then((response) => response.text()),
            fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/China.csv').then((response) => response.text()),
            fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/Russia.csv').then((response) => response.text()),
            fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/India.csv').then((response) => response.text()),
            fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/Germany.csv').then((response) => response.text()),
            fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/Italy.csv').then((response) => response.text()),
            fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/France.csv').then((response) => response.text()),
        ]);  
        
        var population = [
            331000000, //USA
            68153448,  //UK
            1443509447,  //China
            145981477, //Russia
            1390197629, //India
            83000000, //Germany
            60360000, //Italy
            65381957, //France 
        ]

        var i = 0;
        data.forEach((country)=>{
            var info = country.split('\n');  //Data cleaning by newline character
            var last_row = info[info.length-2];  // Getting the last row of the data
            var last_row_array = last_row.split(',');  // Spliting data by commas
            console.log(Number(last_row_array[last_row_array.length-2]));
            var vaccine_percent =  (Number(last_row_array[last_row_array.length-3])/population[i]) *100;
            c_data.push(vaccine_percent.toFixed(2));  // Pushing data to array 
            i = i+1;
        })
    }
    catch(err)
    {
        console.log(err);
        // window.open("/404.html", "_self");
    }
}


var top_country_graph;
async function top_country_chart()
{
    await fetch_country_data();
    // c_data.sort();
    if(top_country_graph)
    {
        top_country_graph.destroy();
    }

    var graph = document.getElementById('top_country_chart').getContext('2d');
    top_country_graph =  new Chart(graph, {
        type: 'horizontalBar',
        data: {
            labels: ["USA","UK",'China','Russia','India','Germany','Italy','France'],
            datasets: [{
                label: 'Country',
                backgroundColor: [
                    'rgba(10, 99, 132, 0.6)',
                    'rgba(30, 99, 132, 0.6)',
                    'rgba(60, 99, 132, 0.6)',
                    'rgba(90, 99, 132, 0.6)',
                    'rgba(120, 99, 132, 0.6)',
                    'rgba(150, 99, 132, 0.6)',
                    'rgba(180, 99, 132, 0.6)',
                    'rgba(210, 99, 132, 0.6)',
                    'rgba(240, 99, 132, 0.6)'
                  ],
                  borderColor: [
                    'rgba(0, 99, 132, 1)',
                    'rgba(30, 99, 132, 1)',
                    'rgba(60, 99, 132, 1)',
                    'rgba(90, 99, 132, 1)',
                    'rgba(120, 99, 132, 1)',
                    'rgba(150, 99, 132, 1)',
                    'rgba(180, 99, 132, 1)',
                    'rgba(210, 99, 132, 1)',
                    'rgba(240, 99, 132, 1)'
                  ],
                data: c_data,
                borderWidth: 2,
            }],            
        },
        options: {
            maintainAspectRatio: false,                        
        }
    });

}

top_country_chart();