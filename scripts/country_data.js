
c_data = [];  //An array that holds the vaccination data of different countries 

// Fecthing data for multiple countries to display in "Top five countries..."
async function fetch_country_data()
{
    try{
        var data = await Promise.all([
            fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/United%20States.csv').then((response) => response.text()),
            fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/United%20Kingdom.csv').then((response) => response.text()),
            fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/China.csv').then((response) => response.text()),
            fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/Russia.csv').then((response) => response.text()),
            fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/India.csv').then((response) => response.text()),
        ]);        

        data.forEach((country)=>{
            var info = country.split('\n');  //Data cleaning by newline character
            var last_row = info[info.length-2];  // Getting the last row of the data
            var last_row_array = last_row.split(',');  // Spliting data by commas
            c_data.push(last_row_array[last_row_array.length-3]);  // Pushing data to array 
        })
    }
    catch(err)
    {
        console.log(err);
    }
}

fetch_country_data();
console.log(c_data);
