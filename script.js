let totalAmount = 0; // المتغير لحفظ الإجمالي
let billItems = [];  // مصفوفة لحفظ العناصر المضافة للفواتير
let products = [];   // مصفوفة لحفظ المنتجات المتاحة

// دالة لإضافة منتج جديد إلى قائمة المنتجات
function addNewProduct() {
    let productName = document.getElementById('productName').value.trim();
    let productPrice = parseFloat(document.getElementById('productPrice').value);

    if (productName && productPrice > 0) {
        // إضافة المنتج إلى المصفوفة
        products.push({ name: productName, price: productPrice });
        
        // إضافة المنتج إلى القائمة المنسدلة
        let productSelect = document.getElementById('productSelect');
        let option = document.createElement('option');
        option.value = productPrice;
        option.textContent = `${productName} - ${productPrice} ريال`;
        productSelect.appendChild(option);
        
        // إعادة تعيين المدخلات
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
    } else {
        alert("يرجى إدخال اسم المنتج وسعر صحيح.");
    }
}

// دالة لتحديث السعر بناءً على المنتج المحدد والكمية
function updatePrice() {
    let productSelect = document.getElementById('productSelect');
    let quantity = document.getElementById('quantity').value;
    let price = parseFloat(productSelect.value) * quantity;
}

// دالة لإضافة المنتج إلى الفاتورة
function addToBill() {
    let productSelect = document.getElementById('productSelect');
    let quantity = document.getElementById('quantity').value;
    let productName = productSelect.options[productSelect.selectedIndex].text;
    let price = parseFloat(productSelect.value);
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
    let billContent = document.querySelector('.container').innerHTML;
    let printWindow = window.open('', '', 'height=600,width=800');
    
    printWindow.document.write('<html><head><title>طباعة الفاتورة</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('@media print {');
    printWindow.document.write('body { font-family: Arial, sans-serif; color: black; }');
    printWindow.document.write('header { background-color: #2c3e50; color: white; padding: 10px 0; text-align: center; }');
    printWindow.document.write('table { width: 100%; border-collapse: collapse; margin-top: 20px; }');
    printWindow.document.write('table th, table td { padding: 12px; text-align: left; border: 1px solid #ccc; font-size: 18px; }');
    printWindow.document.write('table th { background-color: #3498db; color: white; }');
    printWindow.document.write('p { font-size: 18px; font-weight: bold; margin-top: 20px; }');
    printWindow.document.write('table td button { display: none; }');
    printWindow.document.write('}'); // @media print
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    
    printWindow.document.write(billContent);
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    printWindow.print();
}

// دالة لحفظ الفاتورة في localStorage
function saveBill() {
    const bill = {
        items: billItems,
        totalAmount: totalAmount,
        date: new Date().toLocaleString()
    };

    // الحصول على الفواتير المحفوظة في localStorage
    let savedBills = JSON.parse(localStorage.getItem('bills')) || [];

    // إضافة الفاتورة الجديدة إلى القائمة
    savedBills.push(bill);

    // حفظ الفواتير في localStorage
    localStorage.setItem('bills', JSON.stringify(savedBills));

    // مسح البيانات الحالية
    billItems = [];
    totalAmount = 0;
    updateBillTable();
    updateTotalAmount();

    alert("تم حفظ الفاتورة بنجاح!");
}

// دالة لعرض جميع الفواتير المحفوظة في صفحة منفصلة
function loadSavedBills() {
    let savedBills = JSON.parse(localStorage.getItem('bills')) || [];
    let billsContainer = document.getElementById('savedBills');
    
    savedBills.forEach((bill, index) => {
        let billDiv = document.createElement('div');
        billDiv.classList.add('bill-item');
        billDiv.innerHTML = `
            <h3>فاتورة رقم ${index + 1} - ${bill.date}</h3>
            <ul>
                ${bill.items.map(item => `<li>${item.productName} - ${item.quantity} × ${item.price} ريال = ${item.totalPrice} ريال</li>`).join('')}
            </ul>
            <p><strong>المجموع: ${bill.totalAmount} ريال</strong></p>
        `;
        billsContainer.appendChild(billDiv);
    });
}
