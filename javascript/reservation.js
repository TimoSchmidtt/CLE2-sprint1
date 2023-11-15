const currDate = new Date();
let date = new Date();

const monthElement = document.getElementById("calendar-month");
const datesElement = document.getElementById("calendar-dates")
const arrows = document.getElementById("calendar-navigation").children;

// Array of month names
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


let currDay = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();


function fillDates() {
    let dayone = new Date(year, month, 1).getDay();
    let lastdate = new Date(year, month + 1, 0).getDate();
    let dayend = new Date(year, month, lastdate).getDay();
    let monthlastdate = new Date(year, month, 0).getDate();

    let lit = "";

    //Add days from last month
    for (let i = dayone; i > 0; i--) {
        lit +=
            `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }

    //Add days from this month
    for (let i = 1; i <= lastdate; i++) {

        let isToday = i === date.getDate()
            && month === new Date().getMonth()
            && year === new Date().getFullYear()
            ? "active"
            : "";
        lit += `<li class="${isToday}">${i}</li>`;
    }

    //Add days after this month
    for (let i = dayend; i < 6; i++) {
        lit += `<li class="inactive">${i - dayend + 1}</li>`
    }

    monthElement.innerText = `${months[month]} ${year}`;
    datesElement.innerHTML = lit;
}

function moveCalendar(string) {
    month = string === "prev" ? month - 1 : month + 1;

    // Check if the month is out of range
    if (month < 0 || month > 11) {
        // Set the date to the first day of the 
        // month with the new year
        date = new Date(year, month, new Date().getDate());

        year = date.getFullYear();
        month = date.getMonth();
    }

    else {
        date = new Date();
    }

    fillDates();
}

arrows[0].addEventListener("click", () => {
    moveCalendar("prev")
});

arrows[1].addEventListener("click", () => {
    moveCalendar("next")
});


fillDates();

const searchParams = new URLSearchParams(window.location.search);
if (searchParams.has('product')) {
    switch (searchParams.get('product').toString()) {
        case "petite":
            {
                document.getElementById("product-selection").value = 0;
                break;
            }
        case "cocoa":
            {
                document.getElementById("product-selection").value = 1;
                break;
            }
        case "golden":
            {
                document.getElementById("product-selection").value = 2;
                break;
            }
        case "symphony":
            {
                document.getElementById("product-selection").value = 3;
                break;
            }
    }
}