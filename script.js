const billInput = document.querySelector("[data-bill]");
const peopleInput = document.querySelector("[data-people]");
const fixedTips = document.querySelectorAll("[data-tip]");
const customTips = document.querySelector("[data-custom]");
const tipAmountDisplay = document.querySelector("[data-tip-amount]");
const totalAmountDisplay = document.querySelector("[data-total-amount]");
const resetButton = document.querySelector("[data-reset-button]");

let billValue = "0.0";
let tipValue = "0.0";
let peopleValue = "0";

billInput.addEventListener("input", () => {
  billValue = parseFloat(billInput.value);
  if (
    billInput.value == "-" ||
    billInput.value == "0" ||
    billInput.value == "+" ||
    billInput.value == ""
  ) {
    billInput.value = "";
  }
  calculateTip();
});

fixedTips.forEach((tip) => {
  tip.addEventListener("click", () => {
    fixedTips.forEach((fixedTip) => fixedTip.classList.remove("active"));
    if (!tip.classList.contains("active")) {
      tip.classList.add("active");
      customTips.value = "";
      tipValue = parseFloat(tip.innerText) / 100;
    } else {
      tip.classList.remove("active");
    }
    calculateTip();
  });
});

customTips.addEventListener("input", () => {
  tipValue = parseFloat(customTips.value) / 100;
  if (
    customTips.value == "-" ||
    customTips.value == "0" ||
    customTips.value == "+" ||
    customTips.value == ""
  ) {
    customTips.value = "";
  }
  fixedTips.forEach((fixedTip) => fixedTip.classList.remove("active"));
  if (customTips.value !== "") {
    calculateTip();
  }
});

peopleInput.addEventListener("input", () => {
  peopleValue = parseFloat(peopleInput.value);
  if (peopleInput.value == "0") {
    peopleInput.parentNode.classList.add("alert");
    peopleInput.value = "";
    setTimeout(function () {
      peopleInput.parentNode.classList.remove("alert");
    }, 3000);
  } else if (peopleInput.value == "-" || peopleInput.value == "+" || peopleInput.value == "") {
    peopleInput.value = "";
  }

  calculateTip();
});

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = parseFloat((billValue * tipValue) / peopleValue).toFixed(2);
    let totalAmount = parseFloat((billValue * (tipValue + 1)) / peopleValue).toFixed(2);
    tipAmountDisplay.innerText = `$${tipAmount}`;
    totalAmountDisplay.innerText = `$${totalAmount}`;
  }
}

resetButton.addEventListener("click", () => {
  billInput.value = "0";
  customTips.value = "";
  peopleInput.value = "0";
  fixedTips.forEach((tip) => tip.classList.remove("active"));
  tipAmountDisplay.innerText = "$0.00";
  totalAmountDisplay.innerText = "$0.00";
});
