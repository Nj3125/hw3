const container = document.getElementById("mult-table");
const generateButton = document.getElementById("generate");

generateButton.addEventListener("click", () => {
    // Clear previous table:
    clearTable();

    // Obtain values for the mins & maxes of rows & columns:
    const minRow = parseFloat(document.getElementById("minrow").value);
    const maxRow = parseFloat(document.getElementById("maxrow").value);
    const minCol = parseFloat(document.getElementById("mincol").value);
    const maxCol = parseFloat(document.getElementById("maxcol").value);

    // Validate input based on conditions:
    const notNumber = isNaN(minRow) || isNaN(maxRow) || isNaN(minCol) || isNaN(maxCol);
    const notInteger = !Number.isInteger(minRow) || !Number.isInteger(maxRow) || !Number.isInteger(minCol) || !Number.isInteger(maxCol);
    const minOverMax = minRow > maxRow || minCol > maxCol;
    const outOfRange =  minRow < -50 || maxRow > 50 || minCol < -50 || maxCol > 50;

    // Display any errors to user as neccesary:
    displayErrors(outOfRange, minOverMax, notNumber, notInteger);

    const isValid = !(notNumber || notInteger || minOverMax || outOfRange);

    // Stop script if not valid:
    if (!isValid) {
        return;
    }

    // Create a table in the document:
    const table = document.createElement("table");

    // Fill the table appropriately:
    for (let i = minRow - 1; i <= maxRow; i++) {
        // Add a new row:
        const row = document.createElement("tr");

        for (let j = minCol - 1; j <= maxCol; j++) {
            // Determine if this is a header row, header column, or the origin:
            const headerRow = (i == minRow - 1);
            const headerColumn = (j == minCol - 1);
            const origin = headerRow && headerColumn;

            // Create cells accordingly:
            const cell = document.createElement(headerRow || headerColumn ? "th" : "td");

            // Fill the table out based on position in for loop:
            if (origin) {
                cell.textContent = "*";
            } else if (headerRow) {
                cell.textContent = j;
            } else if (headerColumn) {
                cell.textContent = i;
            } else {
                cell.textContent = i * j;
            }
            // Add cell to row:
            row.appendChild(cell);
        }
        // Add row to table:
        table.appendChild(row);
    }
    // Add table to container:
    container.appendChild(table);
});

// Clears the previous table:
function clearTable() {
    container.innerHTML = "";
}

// Displays errors based on which errors occur:
function displayErrors(outOfRange, minOverMax, notNumber, notInteger) {
    const outOfRangeError = document.getElementById("in-range");
    const maxOverMinError = document.getElementById("max-over-min");
    const wholeNumberError = document.getElementById("whole-number");
    const isNumberError = document.getElementById("is-number");

    if (outOfRange) {
        outOfRangeError.classList.add("invalid");
    } else {
        outOfRangeError.classList.remove("invalid");
    }

    if (minOverMax) {
        maxOverMinError.classList.add("invalid");
    } else {
        maxOverMinError.classList.remove("invalid");
    }

    if (notNumber) {
        isNumberError.classList.add("invalid");
    } else {
        wholeNumberError.classList.remove("invalid");
    }

    if (notInteger) {
        wholeNumberError.classList.add("invalid");
    } else {
        isNumberError.classList.remove("invalid");
    }
}