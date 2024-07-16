class Charts {
    constructor(){
        this.year = 2022;
        this.months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    async getTransactions(id) {
        this.months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const response = await fetch('./json/data.json');
        const result = await response.json();

        let transactions = result["transactions"].filter(transaction => {
            let same = transaction["customer_id"] == id;
            return same;
        })
        for (let i = 0; i < transactions.length; i++) {
            let date = new Date(transactions[i]["date"])
            if(this.year == date.getFullYear()){
            let month = date.getMonth();
            this.months[month] += transactions[i]["amount"]
            }
        }
    }
    async showChart(id,name) {
        await this.getTransactions(id);
        
        document.getElementById("home").classList.add("hidden");
        document.getElementById("chart").classList.remove("hidden");
        document.getElementById("chart").innerHTML =
            `
           <div class="my-5 flex justify-between items-center">
            <div>
                <h2 class=" text-2xl font-bold">Detailed Transactions</h2>
            </div>
            <div class="icon">
                <i class="fa-solid cursor-pointer fa-xmark h2 text-2xl" id="exit"></i>
            </div>
        </div>
        <div class="my-5">
            <div class="flex md:flex-row flex-col items-center justify-between">
                <div class="w-1/4 text-center">
                    <img src="images/user.png" class="w-full" alt="user">
                    <p class="my-4 font-bold text-3xl">${name}</p>
                    <p class="my-4 font-bold">Year</p>
                    <div class="flex justify-between">
                        <p class="cursor-pointer" id="prev">&#11207;</p>
                        <p id="year">${this.year}</p>
                        <p class="cursor-pointer" id="next">&#11208;</p>
                    </div>
                </div>
                <div class="w-full md:w-3/4 md:my-0 my-5">
                    <div>
                        <canvas id="myChart"></canvas>
                    </div>
                </div>
    
            </div>
        </div>
            `;
           await this.makeChart();
        document.getElementById("exit").addEventListener("click",function(){
            document.getElementById("home").classList.remove("hidden");
        document.getElementById("chart").classList.add("hidden");
        })
        
        document.getElementById("prev").addEventListener("click",()=>{
            this.year--;
            this.showChart(id,name);
        })
        document.getElementById("next").addEventListener("click",()=>{
            this.year++;
            this.showChart(id,name);
        })

    }
    async makeChart() {
        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Amount of Transaction per month',
                    data: this.months,
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

export default Charts;
