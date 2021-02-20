const aside = document.querySelector("aside"); // 오른쪽 Person / Wealth

// 버튼
const addUserBtn = document.querySelector("#add_user");
const doubleBtn = document.querySelector("#double");
const showMillionairesBtn = document.querySelector("#show_millionaires");
const sortBtn = document.querySelector("#sort");
const calculateWealthBtn = document.querySelector("#calculate_wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch함수 받아오기
async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api"); // fetch함수를 res에 담아주기
    const data = await res.json(); // res(fetch함수가 담긴 변수)를 json으로 풀어주기(해석)

    const user = data.results[0]; // fetch함수 내 result에서 0번째 데이터 가져오기  >> user에 값 담기

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
}
addUserBtn.addEventListener("click", getRandomUser);

// data배열(빈배열)에 newUser 내용을 담아준다
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
    // Clear aside div
    aside.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

    providedData.forEach((item) => {
        const element = document.createElement("div");

        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        aside.appendChild(element);
    });
}

// Format number as money
function formatMoney(number) {
    return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Calculate the total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    aside.appendChild(wealthEl);
}
calculateWealthBtn.addEventListener("click", calculateWealth);

// Double eveyones money
function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
}
doubleBtn.addEventListener("click", doubleMoney);

// Sort users by richest
function sortByRichest() {
    // console.log(123);
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}
sortBtn.addEventListener("click", sortByRichest);

// Filter only millionaires
function showMillionaires() {
    data = data.filter((user) => user.money > 1000000);

    updateDOM();
}
showMillionairesBtn.addEventListener("click", showMillionaires);
