// Define the API endpoint for fetching exchange rates
const api = "https://open.er-api.com/v6/latest/USD"; // API endpoint for exchange rates

// Select DOM elements
const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const convertButton = document.getElementById("convertButton");
const resultDisplay = document.getElementById("result");
const convertedAmountDisplay = document.getElementById("convertedAmount");
const resetButton = document.getElementById("resetButton");

// Populate currency dropdowns
async function populateCurrencies() {
    try {
        const response = await fetch(api);
        if (!response.ok) throw new Error("Failed to fetch currencies");
        
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        // Populate the dropdowns with currency options
        currencies.forEach(currency => {
            const optionFrom = document.createElement("option");
            optionFrom.value = currency;
            optionFrom.textContent = currency;
            fromCurrencySelect.appendChild(optionFrom);

            const optionTo = document.createElement("option");
            optionTo.value = currency;
            optionTo.textContent = currency;
            toCurrencySelect.appendChild(optionTo);
        });
    } catch (error) {
        console.error("Error fetching currencies:", error);
        alert("Could not fetch currencies. Please try again later.");
    }
}

// Convert currency
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    // Validate the input amount
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount to convert.");
        return;
    }

    try {
        const response = await fetch(api);
        if (!response.ok) throw new Error("Failed to fetch exchange rates");
        
        const currencyData = await response.json();
        const fromRate = currencyData.rates[fromCurrency];
        const toRate = currencyData.rates[toCurrency];

        // Calculate the converted amount
        const convertedAmount = (toRate / fromRate) * amount;
        convertedAmountDisplay.textContent = `${convertedAmount.toFixed(2)} ${toCurrency}`;
        resultDisplay.style.display = "block"; // Show the result
    } catch (error) {
        console.error("Error during currency conversion:", error);
        alert("Could not perform currency conversion. Please try again later.");
    }
}

// Reset the form
function resetForm() {
    amountInput.value = '';
    fromCurrencySelect.selectedIndex = 0; // Reset to the first option
    toCurrencySelect.selectedIndex = 0; // Reset to the first option
    resultDisplay.style.display = "none"; // Hide the result
}

// Event listeners
convertButton.addEventListener("click", convertCurrency);
resetButton.addEventListener("click", resetForm);

// Initialize the application
populateCurrencies();