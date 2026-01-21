// ===== ตัวแปรหลัก =====

// ตัวเลขที่โชว์บนจอ
let display = "0";

// เลขตัวแรก
let operand1 = null;

// เลขตัวที่สอง
let operand2 = null;

// เครื่องหมาย + - × ÷
let operator = null;

// ประวัติการคำนวณ
let history = [];

// ===== ฟังก์ชันแสดงผล =====
function updateDisplay() {
    document.getElementById("display").textContent = display;
}

// ===== เพิ่มตัวเลข =====
function appendDigit(digit) {
    // ถ้าหน้าจอเป็น 0 แล้วกด 0 อีก ไม่ต้องทำอะไร
    if (display === "0" && digit === 0) return;

    // ถ้าหน้าจอเป็น 0 ให้แทนด้วยเลขใหม่
    if (display === "0") {
        display = String(digit);
    } else {
        // ถ้าไม่ใช่ 0 ให้ต่อเลขไปเรื่อย ๆ
        display += digit;
    }

    updateDisplay();
}

// ===== เพิ่มจุดทศนิยม =====
function appendDecimal() {
    // ถ้ายังไม่มีจุด ให้เพิ่ม
    if (!display.includes(".")) {
        display += ".";
        updateDisplay();
    }
}

// ===== เลือกเครื่องหมาย =====
function selectOperator(op) {
    // ถ้ายังไม่มีเลขแรก ให้เก็บเลขปัจจุบัน
    if (operand1 === null) {
        operand1 = Number(display);
    } else {
        // ถ้ามีแล้ว ให้คำนวณก่อน
        calculate();
        operand1 = Number(display);
    }

    operator = op;
    display = ""; // เตรียมรับเลขใหม่
}

// ===== คำนวณ =====
function calculate() {
    if (operand1 === null || operator === null) return;

    operand2 = Number(display);

    // ป้องกันการหารด้วยศูนย์
    if (operator === "÷" && operand2 === 0) {
        alert("ห้ามหารด้วย 0");
        clearAll();
        return;
    }

    let result;

    // คำนวณตามเครื่องหมาย
    if (operator === "+") result = operand1 + operand2;
    else if (operator === "-") result = operand1 - operand2;
    else if (operator === "×") result = operand1 * operand2;
    else if (operator === "÷") result = operand1 / operand2;

    // บันทึกประวัติ
    history.push(`${operand1} ${operator} ${operand2} = ${result}`);

    display = String(result);
    operand1 = null;
    operator = null;

    updateDisplay();
    updateHistoryDisplay();
}

// ===== ล้างค่า =====
function clearAll() {
    display = "0";
    operand1 = null;
    operand2 = null;
    operator = null;
    updateDisplay();
}

// ===== แสดงประวัติ =====
function updateHistoryDisplay() {
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";

    // แสดงล่าสุดก่อน
    history.slice().reverse().forEach(item => {
        const p = document.createElement("p");
        p.textContent = item;
        historyList.appendChild(p);
    });
}

// ===== ผูกปุ่ม =====
for (let i = 0; i <= 9; i++) {
    document
        .getElementById(`btn-${i}`)
        .addEventListener("click", () => appendDigit(i));
}

document.getElementById("btn-add").addEventListener("click", () => selectOperator("+"));
document.getElementById("btn-subtract").addEventListener("click", () => selectOperator("-"));
document.getElementById("btn-multiply").addEventListener("click", () => selectOperator("×"));
document.getElementById("btn-divide").addEventListener("click", () => selectOperator("÷"));

document.getElementById("btn-decimal").addEventListener("click", appendDecimal);
document.getElementById("btn-equals").addEventListener("click", calculate);
document.getElementById("btn-clear").addEventListener("click", clearAll);

// ===== Keyboard Support =====
document.addEventListener("keydown", (event) => {
    const key = event.key;

    // ถ้ากดเลข 0-9
    if (key >= "0" && key <= "9") {
        appendDigit(Number(key));
    }

    // เครื่องหมายบวก
    else if (key === "+") {
        selectOperator("+");
    }

    // เครื่องหมายลบ
    else if (key === "-") {
        selectOperator("-");
    }

    // คูณ (ใช้ * บนคีย์บอร์ด)
    else if (key === "*") {
        selectOperator("×");
    }

    // หาร (ใช้ / บนคีย์บอร์ด)
    else if (key === "/") {
        selectOperator("÷");
    }

    // จุดทศนิยม
    else if (key === ".") {
        appendDecimal();
    }

    // กด Enter = เท่ากับ
    else if (key === "Enter") {
        calculate();
    }

    // กด Backspace = ล้างค่า
    else if (key === "Backspace") {
        clearAll();
    }
});
