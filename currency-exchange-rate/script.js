// Grabbing the DOM elements.

const currencyElementOne = document.getElementById("currency-one");
const currencyElementTwo = document.getElementById("currency-two");
const amountElementOne = document.getElementById("amount-one");
const amountElementTwo = document.getElementById("amount-two");

const rateElement = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM

function calculate() {

  const currency_one = currencyElementOne.value;
  const currency_two = currencyElementTwo.value;
  fetch(
    `https://v6.exchangerate-api.com/v6/0d85c31cb81ed7c1467411cb/latest/${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
        if (data.hasOwnProperty("conversion_rates")) {
            const rate = data.conversion_rates[currency_two];
            rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
            amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
        }
    });
}

// Event Listeners

currencyElementOne.addEventListener("change", calculate);
amountElementOne.addEventListener("input", calculate);
currencyElementTwo.addEventListener("change", calculate);
amountElementTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyElementOne.value;
  currencyElementOne.value = currencyElementTwo.value;
  currencyElementTwo.value = temp;
  calculate();
});

calculate();
