// بيانات المستخدمين المتاحة (يجب أن تكون أكثر أمانًا في الواقع)
const users = [
    { username: 'hussain', password: '123', role: 'manager' } // مدير واحد فقط
];

// دالة لتسجيل الدخول
function login(event) {
    event.preventDefault();  // منع إعادة تحميل الصفحة عند إرسال النموذج

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // البحث عن المستخدم في بيانات المستخدمين
    const user = users.find(u => u.username === username && u.password === password);

    // التحقق من وجود المستخدم
    if (user) {
        // حفظ بيانات المستخدم في localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));

        // التوجيه إلى الصفحة الرئيسية بناءً على الدور
        if (user.role === 'manager') {
            window.location.href = 'index.html'; // التوجيه للمدير
        }
    } else {
        // محاولة للبحث عن الموظف
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        const employee = employees.find(e => e.username === username && e.password === password);

        if (employee) {
            // حفظ بيانات الموظف في localStorage
            localStorage.setItem('currentUser', JSON.stringify(employee));
            window.location.href = 'employee-dashboard.html'; // التوجيه للموظف
        } else {
            // إظهار رسالة خطأ في حالة فشل التحقق
            document.getElementById('error-message').textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة!';
        }
    }
}
