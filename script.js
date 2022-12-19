console.log("Jai ShreeRam");
// Getting name and display it
let Client_name_div = document.querySelector(".Client_name");
let dateDiv = document.querySelector(".today");
let Clientname = localStorage.getItem("client_name");
if (Clientname === null || Clientname === "null") {
    console.log("Entering");
    Clientname = prompt("Enter Your Name");
    localStorage.setItem('client_name', Clientname);
}
// Creating blank array to show the history of transection
let tranarr = [];
// Displaying Today's date
let date = new Date().toLocaleDateString('en-Gb');
Client_name_div.innerHTML = Clientname;
dateDiv.innerHTML = date;

// Getting remaining wallet balance and show
let walletbalance = localStorage.getItem("wallet_money");
let remains = document.querySelector('.money_remains');
remains.value = walletbalance
if (walletbalance === null || walletbalance === NaN) {
    remains.value = 0

}
if (remains.value < 50) {
    alert("Your wallet balance is low add some amount");
}

// Add Money popUp Display
let addMoneyBtn = document.getElementById("add_Money");
let popUpDiv = document.querySelector('.pop-up');
addMoneyBtn.addEventListener("click", () => {
    popUpDiv.style.top = "50vh";
})
// Add Expense popUp Display
let addExpBtn = document.getElementById("add_Expense");
let popUpBottomDiv = document.querySelector(".pop_up_bottom");
addExpBtn.addEventListener("click", () => {
    popUpBottomDiv.style.top = "40vh";
})
// Add pop-up Revenue close Btn
let closeBtnRev = document.querySelector(".closeBtnRev");
closeBtnRev.addEventListener("click", () => {
    popUpDiv.style.top = '-1000vh';
})
// Add pop-up expense close Btn
let closeBtnExp = document.querySelector(".closeBtnExp");
closeBtnExp.addEventListener("click", () => {
    popUpBottomDiv.style.top = '-1000vh';
})

// Add Money Btn Working
let addExppopBtn = document.querySelector(".add_Rev");
addExppopBtn.addEventListener("click", () => {
    addMoney();
})
function addMoney() {
    let amount_input = document.querySelector(".Amount_input");
    let addition = parseInt(remains.value) + amount_input.valueAsNumber;
    remains.value = addition
    localStorage.setItem("wallet_money", addition);
    amount_input.value = "";
    // receive_from.value = "";
    // reveive_date.value = "";
}
// Add Expense Btn Work
let addExpensebtnPop = document.querySelector('.add_Exp');
addExpensebtnPop.addEventListener("click", () => {
    addExpense();
});

// Getting expense and show
let expense_local = localStorage.getItem("exp_amount");
let expense_input = document.querySelector(".expense_input");
expense_input.value = expense_local;
if (expense_local === null || expense_local === "Nan") {
    expense_input.value = 0;
}
// Defining addExpense function
function addExpense() {
    let amount_input = document.querySelector(".amount_expense_input");
    let expFor = document.getElementById("exp_for");
    let expDate = document.getElementById("exp_date");
    let sum = parseInt(expense_input.value) + parseInt(amount_input.value);
    expense_input.value = sum;
    localStorage.setItem("exp_amount", sum);
    let newVal = parseInt(remains.value) - parseInt(amount_input.value);
    remains.value = newVal;
    localStorage.setItem("wallet_money", newVal);

    // Appending the transection into DOM
    let newDiv = document.createElement("div");
    newDiv.classList.add("Expense_List_child");
    newDiv.innerHTML = `<div class="des">

    <p class="source_date">${expDate.value}</p>
    <p class="source">${expFor.value}</p>
</div>
<div class="temp">
    <p class="Show_amount">${amount_input.value}</p>
    <button id="remove" class="remove"> Delete</button>
</div>`
    let appendDiv = document.querySelector(".expense_mdiv");
    appendDiv.appendChild(newDiv);
    // Pushing the transection history into array and saving it into localStorage
    tranarr.push(newDiv.innerHTML);
    tranarr.toString()
    console.log(tranarr);
    localStorage.setItem("divArray", JSON.stringify(tranarr));
    amount_input.value = "";
    expFor.value = "";
    expDate.value = "";
}
// Getting array and appending into Dom
let arr = localStorage.getItem("divArray");
if (arr != null) {
    let farr = JSON.parse(arr);
    for (let i = 0; i < farr.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("Expense_List_child");
        newDiv.innerHTML = farr[i];
        let appendDiv = document.querySelector(".expense_mdiv");
        appendDiv.appendChild(newDiv);
    }
}
// Making delete button functional of an expense item
let deleteBtn = document.querySelectorAll(".remove");
deleteBtn.forEach((item, index) => {
    item.addEventListener("click", () => {
        let divs = document.querySelectorAll(".Expense_List_child");
        divs[index].remove();
        if (arr != null) {
            let farr = JSON.parse(arr);
            farr.splice(index, 1);
            let pusharr = JSON.stringify(farr);
            localStorage.setItem("divArray", pusharr);
        }
    })
})