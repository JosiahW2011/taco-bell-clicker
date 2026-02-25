// Labels and buttons
let title = document.getElementById('title'); let clicker = document.getElementById('clicker'); let sign = document.getElementById('sign');
let sellTacos = document.getElementById('sellTacos'); let cheeseTypeBttn = document.getElementById('cheeseType'); let employeeBttn = document.getElementById('employees');
let locationBttn = document.getElementById('locations'); let countriesBttn = document.getElementById('countries'); let reset = document.getElementById('reset');

// Main Variables
let nameBttn = document.getElementById('name');
let name = localStorage.getItem("tacobellclickeruser") || "USER";
let tacos = Number(localStorage.getItem("tacoscount")) || 0;
let money = Number(localStorage.getItem("moneymade")) || 0;
let cheeseTypes = ['Brie', 'Cambert', 'Velveeta', 'Canned', 'American', 'Cheddar', 'Gouda', 'Parmesan', 'Romano', 'Swiss', 'Emmental', 'Grass-Fed', 'Raw', 'Goat', 'Feta', 'Mozzarella', 'Cottage', 'Ricotta'];

const kaching = new Audio('https://codehs.com/uploads/b47b7fad6a735900057cd7614f924ffe');
const click = new Audio('https://codehs.com/uploads/9152e26148c499b4a497148f24a0165e');
const vipBell = new Image(); vipBell.src = "https://codehs.com/uploads/d91ea99659e72eb7ebab1bccfe66eb8a";
vipBell.style = "position: absolute;"

let saving = true;
let storedUpgrades = JSON.parse(localStorage.getItem("tacobellclickerupgrades"));
let upgrades;
if (storedUpgrades) {
	upgrades = storedUpgrades;
} else {
	upgrades = {
		pricePerTaco: 1,
		tacosPerClick: 1,
		newCheesePrice: 5,
		cheeseType: 0,
		employeeCount: 0,
		employeePrice: 250,
		locations: 0,
		locationPrice: 1000,
		countries: 0,
		countryPrice: 1000000
	};
}

function renderUI() {
	if (upgrades.cheeseType > cheeseTypes.length - 1) { cheeseTypeBttn.innerHTML = "🧀 HIT BEST CHEESE TYPE: Ricotta 🧀"; cheeseTypeBttn.disabled = true; } else { cheeseTypeBttn.innerHTML = `🧀 Upgrade Cheese Type 🧀</br>Type: ${cheeseTypes[upgrades.cheeseType]} </br>Price: ${upgrades.newCheesePrice}`; }
	employeeBttn.innerHTML = `💼 Get Employees 💼</br>Count: ${upgrades.employeeCount}</br>Price: ${upgrades.employeePrice}`;
	locationBttn.innerHTML = `🌇 Host New Location 🌇</br>Count: ${upgrades.locations}</br>Price: ${upgrades.locationPrice}`;
	if (upgrades.cheeseType > cheeseTypes.length - 1) { countriesBttn.innerHTML = "🌎 YOU BOUGHT ALL 195 COUNTRIES!!! 🌎"; countriesBttn.disabled = true; } else { countriesBttn.innerHTML = `🌎 Buy Countries 🌎</br>Countries: ${upgrades.countries}</br>Price: ${upgrades.countryPrice}`; }
}

function getRandInt(low,high) { let min = Math.ceil(low); let max = Math.floor(high); return Math.floor(Math.random() * (max - min + 1)) + min; }
function fixNumber(num, fix) { return Math.round(num * fix) / fix; }

renderUI();

title.innerHTML = "Tacos: " + tacos + " - Taco Bell Clicker"; nameBttn.innerHTML = name + "'s Taco Bell";
clicker.addEventListener('click', function() { click.pause(); click.currentTime = 0; tacos += upgrades.tacosPerClick; click.play(); });
sellTacos.addEventListener('click', function() { kaching.pause(); kaching.currentTime = 0; money += tacos * upgrades.pricePerTaco; tacos = 0; kaching.play(); renderUI(); })
cheeseTypeBttn.addEventListener('click', function() { kaching.pause(); kaching.currentTime = 0; money -= upgrades.newCheesePrice; upgrades.pricePerTaco += 0.25; upgrades.newCheesePrice *= 1.5; upgrades.newCheesePrice = fixNumber(upgrades.newCheesePrice, 2); upgrades.cheeseType += 1; renderUI(); kaching.play(); });
employeeBttn.addEventListener('click', function() { kaching.pause(); kaching.currentTime = 0; money -= upgrades.employeePrice; upgrades.employeeCount += 1; upgrades.employeePrice *= 1.1; upgrades.employeePrice = fixNumber(upgrades.employeePrice, 2); renderUI(); kaching.play(); });
vipBell.addEventListener('click', function() { money *= getRandInt(1,2); document.body.removeChild(vipBell); new Audio('https://codehs.com/uploads/f73f9b8101ae3c5e515064c9f4424cc7').play(); console.clear(); });
nameBttn.addEventListener('click', function() { name = prompt('What will your new name be?') || name; nameBttn.innerHTML = name + "'s Taco Bell"; localStorage.setItem("tacobellclickeruser", name); if (/[A-Za-z0-9]+ yo-quiero-taco-bell/i.test(name)) { upgrades.employeeCount = 999999999; upgrades.cheeseType = 17; upgrades.locations = 999999999; upgrades.pricePerTaco = 999999999; upgrades.tacosPerClick = 999999999; renderUI(); } else { return; } });
locationBttn.addEventListener('click', function() {  kaching.pause(); kaching.currentTime = 0; money -= upgrades.locationPrice; upgrades.locationPrice *= 5; upgrades.locations += 1; upgrades.tacosPerClick *= 10 * getRandInt(1,4); renderUI(); kaching.play(); });
countriesBttn.addEventListener('click', function() { kaching.pause(); kaching.currentTime = 0; money -= upgrades.countryPrice; upgrades.countryPrice *= 10; upgrades.countries += 1; upgrades.pricePerTaco *= 25; renderUI(); kaching.play(); });
reset.addEventListener('click', function() { let sure = prompt('Are you sure you desire to continue? Type "yes" or "y" if so. Click cancel to quit the operation, or leave the input space blank.'); if (sure === null) { return; } else if (sure.toLowerCase() === "yes" || sure.toLowerCase() === "y") { saving = false; localStorage.removeItem("tacoscount"); localStorage.removeItem("moneymade"); localStorage.removeItem("tacobellclickerupgrades"); localStorage.removeItem("tacobellclickeruser"); location.reload(); } });

setInterval(function() {
	title.innerHTML = "Tacos: " + tacos + " - Taco Bell Clicker";
	if (saving === true) {
		localStorage.setItem("tacoscount", tacos);
		localStorage.setItem("moneymade", money);
		localStorage.setItem("tacobellclickerupgrades", JSON.stringify(upgrades));
	}
	tacos += upgrades.employeeCount;
}, 1000);

setInterval(function() { vipBell.style = `position: absolute; left: ${getRandInt(0,window.innerWidth - 100)}px; top: ${getRandInt(0,window.innerHeight - 100)}px; background-color: #ffd700; box-shadow: 0px 5px 10px #ddc600;`; document.body.appendChild(vipBell); vipBell.width = 100; vipBell.height = 100; setTimeout(function() { document.body.removeChild(vipBell); }, 5000); }, 30000);
setInterval(function() { sign.innerHTML = `🌮 TACOS 🌮</br>${tacos}</br>💸 MONEY 💸</br>${money}`; money = fixNumber(money, 2); }, 100);

function update() {
	sellTacos.disabled = tacos < 1;
	cheeseTypeBttn.disabled = upgrades.cheeseType > cheeseTypes.length - 1 || money < upgrades.newCheesePrice;
	employeeBttn.disabled = money < upgrades.employeePrice;
	locationBttn.disabled = money < upgrades.locationPrice;
	countriesBttn.disabled = money < upgrades.countryPrice || upgrades.countries === 195;
	requestAnimationFrame(update);
}

update();
