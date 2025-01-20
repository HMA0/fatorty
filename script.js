let totalAmount = 0; // المتغير لحفظ الإجمالي
let billItems = [];  // مصفوفة لحفظ العناصر المضافة للفواتير

// دالة لتحديث السعر بناءً على المنتج المحدد والكمية
function updatePrice() {
    let productSelect = document.getElementById('productSelect');
    let quantity = document.getElementById('quantity').value;
    let price = parseInt(productSelect.value) * quantity;
}

// دالة لإضافة المنتج إلى الفاتورة
function addToBill() {
    let productSelect = document.getElementById('productSelect');
    let quantity = document.getElementById('quantity').value;
    let productName = productSelect.options[productSelect.selectedIndex].text;
    let price = parseInt(productSelect.value);
    let totalPrice = price * quantity;

    if (price > 0) {
        billItems.push({ productName, quantity, price, totalPrice });
        updateBillTable();
        updateTotalAmount();
    } else {
        alert("يرجى اختيار منتج.");
    }
}

// دالة لتحديث جدول الفاتورة
function updateBillTable() {
    let billTableBody = document.querySelector('#billTable tbody');
    billTableBody.innerHTML = ''; // مسح المحتوى الحالي

    billItems.forEach((item, index) => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.productName}</td>
            <td>${item.quantity}</td>
            <td>${item.totalPrice} ريال</td>
            <td><button onclick="removeFromBill(${index})">إزالة</button></td>
        `;
        billTableBody.appendChild(row);
    });
}

// دالة لإزالة منتج من الفاتورة
function removeFromBill(index) {
    billItems.splice(index, 1);
    updateBillTable();
    updateTotalAmount();
}

// دالة لتحديث المجموع الإجمالي
function updateTotalAmount() {
    totalAmount = billItems.reduce((sum, item) => sum + item.totalPrice, 0);
    document.getElementById('totalAmount').textContent = totalAmount;
}

// دالة للطباعة
function printBill() {
    let billContent = document.querySelector('body').innerHTML;
    let printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>طباعة الفاتورة</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(billContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}
