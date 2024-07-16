import Charts from "./chart.js";

let chart = new Charts;

class Transactions {
    async getData() {
        let username = document.getElementById("filterName").value.toLowerCase();
        let minimum = document.getElementById("filterMore").value || 0;
        let maximum = document.getElementById("filterLess").value || Infinity;
        const response = await fetch('./json/data.json');
        const result = await response.json();
        let filtered = result["transactions"].filter(transaction => {
            const customer = result["customers"].find(customer => customer["id"] == transaction["customer_id"])
            if (!customer) return false;
            const match = customer["name"].toLowerCase().includes(username);
            console.log(match)
            const amount = transaction["amount"] >= minimum && transaction["amount"] <= maximum;
            return match && amount;
        })
        result["transactions"] = filtered;

        this.showData(result);
    }
    showData(result) {
        let table = document.getElementById("customers");
        console.log(result["transactions"])
        let show = "";
        let customerName = "";
        if(result["transactions"].length == 0) {
            table.innerHTML = "";
        }
        else {
            for (let i = 0; i < result["transactions"].length; i++) {
                for (let j = 0; j < result["customers"].length; j++) {
                    if (result["customers"][j]["id"] == result["transactions"][i]["customer_id"]) {
                        customerName = result["customers"][j]["name"]
                        break;
                    }
                }
                show += `
            <tr class="border-b rounded-3xl border-blue-gray-200 dark:border-slate-800">
                            <td class="py-3 px-4 w-1/4"><p class=""><img src="images/user.png" alt="user" class="w-1/3 inline">${customerName}</p></td>
                            <td class="py-3 px-4 w-1/4">${result["transactions"][i]["amount"]}</td>
                            <td class="py-3 px-4 w-1/4">${result["transactions"][i]["date"]}</td>
                            <td class="py-3 px-4 w-1/4"><button class="bg-orange-600 p-1 rounded-xl font-bold text-white chart" id="${result["transactions"][i]["customer_id"]}">Show Chart</button></td>

                        </tr>
            `
                table.innerHTML = show;
            }
        const cards = document.querySelectorAll('.chart');
        for (let i = 0; i < cards.length; i++) {
            let name = ""
            cards[i].addEventListener('click', function () {
                for(let l = 0;l<result["customers"].length;l++){
                    if(this.id == result["customers"][l]["id"]){
                        name = result["customers"][l]["name"];
                    }
                }
                chart.showChart(this.id,name);
            }
            )
        }
            
        }
    }
}

export default Transactions;