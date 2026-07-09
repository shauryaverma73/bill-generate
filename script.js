// ===============================
// Hardcoded Influencer Details
// ===============================

const influencer = {
    name: "Your Name",
    address: "Your Address",
    city: "New Delhi, India",
    email: "you@email.com",
    phone: "+91 9876543210",
    pan: "ABCDE1234F",
    gst: "",
    bank: "HDFC Bank",
    account: "12345678901234",
    ifsc: "HDFC0001234",
    upi: "yourupi@okhdfcbank"
};

// ===============================
// Form Elements
// ===============================

const invoiceNumber = document.getElementById("invoiceNumber");
const invoiceDate = document.getElementById("invoiceDate");
const dueDate = document.getElementById("dueDate");

const brandName = document.getElementById("brandName");

const campaignName = document.getElementById("campaignName");
const deliverable = document.getElementById("deliverable");
const description = document.getElementById("description");

const amount = document.getElementById("amount");
const gst = document.getElementById("gst");

const notes = document.getElementById("notes");

// ===============================
// Summary Labels
// ===============================

const subtotalLabel = document.getElementById("subtotal");
const gstAmountLabel = document.getElementById("gstAmount");
const totalLabel = document.getElementById("total");

// ===============================
// Buttons
// ===============================

const previewBtn = document.getElementById("previewBtn");
const downloadBtn = document.getElementById("downloadPdf");

const saveBtn = document.getElementById("saveJson");

const loadBtn = document.getElementById("loadJsonBtn");
const loadInput = document.getElementById("loadJson");

const resetBtn = document.getElementById("resetBtn");

// ===============================
// Hidden Invoice Elements
// ===============================

const invoice = document.getElementById("invoice");

const pInvoiceNumber = document.getElementById("pInvoiceNumber");
const pInvoiceDate = document.getElementById("pInvoiceDate");
const pDueDate = document.getElementById("pDueDate");

const pBrand = document.getElementById("pBrand");

const pCampaign = document.getElementById("pCampaign");
const pDeliverable = document.getElementById("pDeliverable");
const pDescription = document.getElementById("pDescription");

const pAmount = document.getElementById("pAmount");

const pSubtotal = document.getElementById("pSubtotal");
const pGST = document.getElementById("pGST");
const pTotal = document.getElementById("pTotal");

const pWords = document.getElementById("pWords");

const pNotes = document.getElementById("pNotes");

// ===============================
// Global Variables
// ===============================

let subtotal = 0;
let gstAmount = 0;
let grandTotal = 0;

// ===============================
// Auto Fill Today's Date
// ===============================

const today = new Date().toISOString().split("T")[0];

invoiceDate.value = today;

// ===============================
// Currency Formatter
// ===============================

const currency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
});

// ===============================
// Utility Function
// ===============================

function formatMoney(value) {
    return currency.format(Number(value || 0));
}

// ==========================================
// Calculate GST & Totals
// ==========================================

function calculateTotals() {

    subtotal = Number(amount.value) || 0;

    const gstPercent = Number(gst.value) || 0;

    gstAmount = subtotal * gstPercent / 100;

    grandTotal = subtotal + gstAmount;

    subtotalLabel.textContent = formatMoney(subtotal);

    gstAmountLabel.textContent = formatMoney(gstAmount);

    totalLabel.textContent = formatMoney(grandTotal);

}


// ==========================================
// Convert Number To Words
// (Indian Number System)
// ==========================================

function numberToWords(num) {

    if (num === 0) return "Zero Rupees Only";

    const ones = [
        "",
        "One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
        "Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen",
        "Sixteen","Seventeen","Eighteen","Nineteen"
    ];

    const tens = [
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety"
    ];

    function convert(n){

        if(n < 20)
            return ones[n];

        if(n < 100)
            return tens[Math.floor(n/10)] + " " + ones[n%10];

        if(n < 1000)
            return (
                ones[Math.floor(n/100)] +
                " Hundred " +
                convert(n%100)
            );

        if(n < 100000)
            return (
                convert(Math.floor(n/1000)) +
                " Thousand " +
                convert(n%1000)
            );

        if(n < 10000000)
            return (
                convert(Math.floor(n/100000)) +
                " Lakh " +
                convert(n%100000)
            );

        return (
            convert(Math.floor(n/10000000)) +
            " Crore " +
            convert(n%10000000)
        );

    }

    return convert(Math.round(num)).replace(/\s+/g," ").trim() + " Rupees Only";

}



// ==========================================
// Update Hidden Invoice
// ==========================================

function updatePreview() {

    calculateTotals();

    pInvoiceNumber.textContent = invoiceNumber.value;

    pInvoiceDate.textContent = invoiceDate.value;

    pDueDate.textContent = dueDate.value;

    pBrand.textContent = brandName.value;

    pCampaign.textContent = campaignName.value;

    pDeliverable.textContent = deliverable.value;

    pDescription.textContent = description.value;

    pAmount.textContent = formatMoney(subtotal);

    pSubtotal.textContent = formatMoney(subtotal);

    pGST.textContent = formatMoney(gstAmount);

    pTotal.textContent = formatMoney(grandTotal);

    pWords.textContent = numberToWords(grandTotal);

    pNotes.textContent = notes.value;

}



// ==========================================
// Collect Form Data
// ==========================================

function collectInvoiceData(){

    calculateTotals();

    return {

        invoiceNumber: invoiceNumber.value,

        invoiceDate: invoiceDate.value,

        dueDate: dueDate.value,

        brandName: brandName.value,

        campaignName: campaignName.value,

        deliverable: deliverable.value,

        description: description.value,

        amount: amount.value,

        gst: gst.value,

        subtotal: subtotal,

        gstAmount: gstAmount,

        total: grandTotal,

        notes: notes.value

    };

}



// ==========================================
// Fill Form From JSON
// ==========================================

function fillForm(data){

    invoiceNumber.value = data.invoiceNumber || "";

    invoiceDate.value = data.invoiceDate || "";

    dueDate.value = data.dueDate || "";

    brandName.value = data.brandName || "";

    campaignName.value = data.campaignName || "";

    deliverable.value = data.deliverable || "";

    description.value = data.description || "";

    amount.value = data.amount || "";

    gst.value = data.gst || 0;

    notes.value = data.notes || "";

    calculateTotals();

    updatePreview();

}



// ==========================================
// Reset Form
// ==========================================

function resetForm(){

    document.querySelectorAll("input, textarea").forEach(el=>{

        if(el.type==="file") return;

        if(el.type==="date"){

            el.value="";

        }else{

            el.value="";

        }

    });

    invoiceDate.value = today;

    gst.value = 0;

    calculateTotals();

    updatePreview();

}



// ==========================================
// Live Updates
// ==========================================

[
    amount,
    gst,
    invoiceNumber,
    invoiceDate,
    dueDate,
    brandName,
    campaignName,
    deliverable,
    description,
    notes
].forEach(input => {

    input.addEventListener("input", () => {

        calculateTotals();
        updatePreview();

    });

});

// ==========================================
// Preview Button
// ==========================================

previewBtn.addEventListener("click", () => {

    updatePreview();

    alert("Invoice preview has been updated.\n\nNow click 'Download PDF'.");

});

// ==========================================
// Download PDF
// ==========================================

downloadBtn.addEventListener("click", async () => {

    updatePreview();

    invoice.style.left = "0";
    invoice.style.top = "0";
    invoice.style.position = "fixed";

    const canvas = await html2canvas(invoice, {
        scale: 2,
        useCORS: true
    });

    invoice.style.left = "-9999px";
    invoice.style.position = "absolute";

    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    const width = pdf.internal.pageSize.getWidth();

    const height =
        canvas.height * width / canvas.width;

    pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        width,
        height
    );

    const filename =
        invoiceNumber.value.trim() || "Invoice";

    pdf.save(`${filename}.pdf`);

});

// ==========================================
// Save JSON
// ==========================================

saveBtn.addEventListener("click", () => {

    const data = collectInvoiceData();

    const blob = new Blob(
        [
            JSON.stringify(data, null, 4)
        ],
        {
            type: "application/json"
        }
    );

    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download =
        (invoiceNumber.value || "Invoice") + ".json";

    a.click();

});

// ==========================================
// Load JSON
// ==========================================

loadBtn.addEventListener("click", () => {

    loadInput.click();

});

loadInput.addEventListener("change", e => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {

        const data =
            JSON.parse(reader.result);

        fillForm(data);

        alert("Invoice loaded successfully.");

    };

    reader.readAsText(file);

});

// ==========================================
// Reset
// ==========================================

resetBtn.addEventListener("click", () => {

    if (!confirm("Reset the invoice?")) return;

    resetForm();

});

// ==========================================
// Initialize
// ==========================================

calculateTotals();

updatePreview();
