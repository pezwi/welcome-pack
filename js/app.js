const DEFAULT_PIN = '1234';
const WEATHER_COORDS = { lat: 53.22, lon: 0.34 };

const defaultData = {
    guestNames: 'Welcome!',
    checkInDate: '',
    checkInTime: '15:00',
    checkOutDate: '',
    checkOutTime: '10:00',
    wifiNetwork: 'WiFi Network',
    wifiPassword: 'Password',
    ownerContact: '07700 900000'
};

function loadGuestData() {
    const stored = localStorage.getItem('welcomePackData');
    if (stored) {
        return JSON.parse(stored);
    }
    return { ...defaultData };
}

function saveGuestData(data) {
    localStorage.setItem('welcomePackData', JSON.stringify(data));
}

function updateDisplay() {
    const data = loadGuestData();

    document.getElementById('guestNames').textContent = data.guestNames;
    document.getElementById('checkInDate').textContent = formatDate(data.checkInDate);
    document.getElementById('checkInTime').textContent = data.checkInTime || '';
    document.getElementById('checkOutDate').textContent = formatDate(data.checkOutDate);
    document.getElementById('checkOutTime').textContent = data.checkOutTime || '';

    if (document.getElementById('wifiNetwork')) {
        document.getElementById('wifiNetwork').textContent = data.wifiNetwork;
    }
    if (document.getElementById('wifiPassword')) {
        document.getElementById('wifiPassword').textContent = data.wifiPassword;
    }
    if (document.getElementById('ownerContact')) {
        document.getElementById('ownerContact').textContent = data.ownerContact;
    }
}

function formatDate(dateStr) {
    if (!dateStr) return '---';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

async function loadWeather() {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_COORDS.lat}&longitude=${WEATHER_COORDS.lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Europe%2FLondon&forecast_days=4`
        );
        const data = await response.json();

        const current = data.current;
        const currentTemp = Math.round(current.temperature_2m);
        const currentDesc = getWeatherDescription(current.weather_code);
        document.getElementById('weatherTemp').textContent = `${currentTemp}°C`;
        document.getElementById('weatherDesc').textContent = currentDesc;

        const daily = data.daily;
        const forecastContainer = document.getElementById('weatherForecast');
        forecastContainer.innerHTML = '';

        for (let i = 1; i <= 3; i++) {
            const date = new Date(daily.time[i]);
            const dayName = date.toLocaleDateString('en-GB', { weekday: 'short' });
            const tempMax = Math.round(daily.temperature_2m_max[i]);
            const tempMin = Math.round(daily.temperature_2m_min[i]);
            const icon = getWeatherIcon(daily.weather_code[i]);

            forecastContainer.innerHTML += `
                <div class="forecast-day">
                    <span class="day-name">${dayName}</span>
                    <span class="day-icon">${icon}</span>
                    <span class="day-temp">${tempMax}° / ${tempMin}°</span>
                </div>
            `;
        }
    } catch (error) {
        console.error('Weather load error:', error);
        document.getElementById('weatherDesc').textContent = 'Weather unavailable';
    }
}

function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Foggy',
        51: 'Light drizzle',
        53: 'Drizzle',
        55: 'Drizzle',
        61: 'Light rain',
        63: 'Rain',
        65: 'Rain',
        71: 'Light snow',
        73: 'Snow',
        75: 'Snow',
        80: 'Rain showers',
        81: 'Rain showers',
        82: 'Rain showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm'
    };
    return descriptions[code] || 'Unknown';
}

function getWeatherIcon(code) {
    if (code === 0 || code === 1) return '☀️';
    if (code === 2) return '⛅';
    if (code === 3) return '☁️';
    if (code >= 45 && code <= 48) return '🌫️';
    if (code >= 51 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 77) return '❄️';
    if (code >= 80 && code <= 82) return '🌦️';
    if (code >= 95) return '⛈️';
    return '🌤️';
}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    loadWeather();
    initScrollTopButton();
});

function initScrollTopButton() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 200 ? 'flex' : 'none';
    });
}