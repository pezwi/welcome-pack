const DEFAULT_PIN = '1234';

let enteredPin = '';
let isAuthenticated = false;

function loadData() {
    const stored = localStorage.getItem('welcomePackData');
    if (stored) {
        return JSON.parse(stored);
    }
    return {
        guestNames: '',
        checkInDate: '',
        checkInTime: '15:00',
        checkOutDate: '',
        checkOutTime: '10:00',
        wifiNetwork: '',
        wifiPassword: '',
        ownerContact: ''
    };
}

function saveData(data) {
    localStorage.setItem('welcomePackData', JSON.stringify(data));
}

function enterPin(num) {
    if (enteredPin.length < 4) {
        enteredPin += num;
        updatePinDisplay();
    }
}

function clearPin() {
    enteredPin = '';
    updatePinDisplay();
}

function updatePinDisplay() {
    let display = enteredPin.padEnd(4, '_');
    document.getElementById('pinDisplay').textContent = display;
}

function submitPin() {
    const storedPin = localStorage.getItem('welcomePackPin') || DEFAULT_PIN;

    if (enteredPin === storedPin) {
        isAuthenticated = true;
        document.getElementById('pinScreen').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        loadFormData();
    } else {
        document.getElementById('pinError').textContent = 'Incorrect PIN';
        enteredPin = '';
        updatePinDisplay();
        setTimeout(() => {
            document.getElementById('pinError').textContent = '';
        }, 2000);
    }
}

function logout() {
    isAuthenticated = false;
    enteredPin = '';
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('pinScreen').classList.remove('hidden');
    updatePinDisplay();
}

function loadFormData() {
    const data = loadData();
    document.getElementById('adminGuestNames').value = data.guestNames || '';
    document.getElementById('adminCheckInDate').value = data.checkInDate || '';
    document.getElementById('adminCheckInTime').value = data.checkInTime || '15:00';
    document.getElementById('adminCheckOutDate').value = data.checkOutDate || '';
    document.getElementById('adminCheckOutTime').value = data.checkOutTime || '10:00';
    document.getElementById('adminWifiNetwork').value = data.wifiNetwork || '';
    document.getElementById('adminWifiPassword').value = data.wifiPassword || '';
    document.getElementById('adminOwnerContact').value = data.ownerContact || '';
}

function saveFormData(e) {
    e.preventDefault();

    const data = {
        guestNames: document.getElementById('adminGuestNames').value,
        checkInDate: document.getElementById('adminCheckInDate').value,
        checkInTime: document.getElementById('adminCheckInTime').value,
        checkOutDate: document.getElementById('adminCheckOutDate').value,
        checkOutTime: document.getElementById('adminCheckOutTime').value,
        wifiNetwork: document.getElementById('adminWifiNetwork').value,
        wifiPassword: document.getElementById('adminWifiPassword').value,
        ownerContact: document.getElementById('adminOwnerContact').value
    };

    saveData(data);
    alert('Changes saved successfully!');
}

function changePin() {
    const newPin = document.getElementById('newPin').value;

    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
        alert('PIN must be exactly 4 digits');
        return;
    }

    localStorage.setItem('welcomePackPin', newPin);
    document.getElementById('newPin').value = '';
    alert('PIN updated successfully!');
}

document.addEventListener('DOMContentLoaded', () => {
    updatePinDisplay();
    document.getElementById('guestForm').addEventListener('submit', saveFormData);
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadData, saveData };
}