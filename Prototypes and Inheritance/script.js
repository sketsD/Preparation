"strict mode";

// const Book = function (title, author, year) {
//   this.title = title;
//   this.author = author;
//   this.year = year;
// };

// Book.prototype.showBookInfo = function () {
//   console.log(
//     `The "${this.title}" is written by ${this.author} in ${this.year}`
//   );
// };

// const the10Xrule = new Book("dima", "Oleg", 1999);
// console.log(the10Xrule);
// the10Xrule.showBookInfo();

// const EBook = function (title, author, year, format, fileSize) {
//   Book.call(this, title, author, year);
//   this.format = format;
//   this.fileSize = fileSize;
// };

// EBook.prototype = Object.create(Book.prototype);
// EBook.prototype.showFormat = function () {
//   console.log(`Format of the file: $${this.format}`);
// };
// EBook.prototype.constructor = EBook;

// const bookArr = new EBook("A", "f", 8999, "aaaa", "ssjsj");
// console.log(bookArr);
// bookArr.showBookInfo();
// bookArr.showFormat();
// _____________________________________________________________________________________

// class Book {
//   constructor(title, author, year) {
//     this.title = title;
//     this.author = author;
//     this.year = year;
//   }
//   showBookInfo = function () {
//     console.log(
//       `The "${this.title}" is written by ${this.author} in ${this.year}`
//     );
//   };
// }
// const the10Xrule = new Book("dima", "Oleg", 1999);
// console.log(the10Xrule);
// the10Xrule.showBookInfo();

// class EBook extends Book {
//   constructor(title, author, year, format, fileSize) {
//     super(title, author, year);
//     this.format = format;
//     this.fileSize;
//   }
//   showFormat = function () {
//     console.log(`Format of the file: ${this.format}`);
//   };
// }

// const bookArr = new EBook("A", "f", 8999, "aaaa", "ssjsj");
// console.log(bookArr);
// bookArr.showBookInfo();
// bookArr.showFormat();
// ___________________________________________________________________________________________
// class Room {
//   constructor(num) {
//     this.num = num;
//     this.isBooked = false;
//   }
//   bookRoom() {
//     if (!this.isBooked) {
//       this.isBooked = true;
//       console.log(`You booked the room #${this.num}`);
//     } else {
//       console.log(`Room #${this.num} is booked already`);
//     }
//   }
//   roomStatus() {
//     console.log(`Room #${this.num} is ${this.isBooked ? "booked" : "free"}`);
//   }
// }

// class Hotel {
//   constructor(name) {
//     this.name;
//     this.rooms = [];
//   }
//   addRoom(room) {
//     this.rooms.push(room);
//     console.log(...this.rooms);
//   }
//   bookRoom(roomNumber) {
//     const room = this.rooms.find((room) => room.num === roomNumber);
//     console.log(room);
//     if (room) {
//       room.bookRoom.call(room);
//     } else {
//       console.log("Such room is not excit");
//     }
//   }
//   getAllRoomsInHotel() {
//     this.rooms.forEach((room) => console.log(room));
//   }
//   getAllRoomsStatus() {
//     this.rooms.forEach((room) => room.roomStatus.call(room));
//   }
// }

// const grandHotel = new Hotel("Grand Hotel");
// const vip1 = new Room(999);
// const room401 = new Room(401);
// const room203 = new Room(203);
// const room319 = new Room(319);

// grandHotel.addRoom(vip1);
// grandHotel.addRoom(room401);
// grandHotel.addRoom(room203);
// grandHotel.addRoom(room319);

// grandHotel.bookRoom(999);
// grandHotel.getAllRoomsStatus();

// ___________________________________________________________________________________________
// Game

// class Creature {
//   constructor(name, health, power) {
//     this.name = name;
//     this.health = health;
//     this.power = power;
//     // console.log(this);
//   }
//   attack(creature) {
//     creature.health -= this.power;
//     // console.log(this);
//     // console.log(creature);
//   }
// }

// class Player extends Creature {
//   constructor(name, health, power, inventory) {
//     super(name, health, power);
//     this.inventorySize = 2;
//     this.inventory = inventory;
//   }
//   isInventoryFull() {
//     if (this.inventory.length < this.inventorySize) return false;
//     else return true;
//   }
//   addItem(item) {
//     this.inventory.push(item);
//   }
//   openInvetory() {
//     console.log(...this.inventory);
//   }
//   replaceItem(nameItemToReplace, itemToAdd) {
//     this.inventory = this.inventory.map((item) =>
//       item.name === nameItemToReplace ? itemToAdd : item
//     );
//   }

//   #checkInventory(action) {
//     const item = this.inventory.find((item) => item.type === action);
//     if (item) {
//       console.log(`You can use ${action}`);
//       return item;
//     } else {
//       console.log(`You don't have this item`);
//       return false;
//     }
//   }

//   useHeal() {
//     const itemHeal = this.#checkInventory("heal");
//     if (itemHeal) {
//       this.health += itemHeal.power;
//       this.inventory = this.inventory.filter((item) => item !== itemHeal);
//       console.log(`${this.name}: ${this.health}`);
//       itemHeal.useItem.call(itemHeal);
//     }
//   }

//   useWeapon() {
//     const itemWeapon = this.#checkInventory("weapon");
//     if (itemWeapon) {
//       this.power += itemWeapon.power;
//       console.log(`${this.name}: ${this.power}`);
//       itemWeapon.useItem.call(itemWeapon);
//     }
//   }
// }

// class Item {
//   constructor(name, type, power, volume) {
//     this.name = name;
//     this.type = type;
//     this.power = power;
//     this.volume = volume;
//   }
//   itemStatus() {
//     console.log(this);
//   }
//   useItem() {
//     if (this.volume >= 2) this.volume -= 1;
//     else console.log("No more item");
//   }
// }

// class Monster extends Creature {
//   constructor(name, health, power) {
//     super(name, health, power);
//     this.type = this.name = name;
//   }
// }

// const monsters = [
//   { name: "wolf", health: 50, power: 5 },
//   { name: "zombie", health: 80, power: 10 },
// ];
// const items = [
//   {
//     name: "Golden sword",
//     type: "weapon",
//     power: 8,
//     volume: 5,
//     probability: 3,
//   },
//   {
//     name: "metal sword",
//     type: "weapon",
//     power: 5,
//     volume: 5,
//     probability: 1,
//   },
//   {
//     name: "Healing small",
//     type: "heal",
//     power: 10,
//     volume: 1,
//     probability: 8,
//   },
//   {
//     name: "Healing big",
//     type: "heal",
//     power: 10,
//     volume: 10,
//     probability: 2,
//   },
// ];

// const playerAction = function (message, executeFunction) {
//   const playerDesicon = prompt(`${message}? (yes / no)`);
//   playerDesicon === "yes" && executeFunction();
// };

// const walkAndFind = function () {
//   const randomItem = items[Math.floor(Math.random() * items.length)];
//   const itemFound = randomItem.probability < Math.random() * 10 && randomItem;
//   if (itemFound) {
//     const { name, type, power, volume } = itemFound;
//     const item = new Item(name, type, power, volume);
//     return itemFound;
//   }
//   return undefined;
// };

// const newMonster = function (level) {
//   const monster = monsters[Math.floor(Math.random() * monsters.length)];
//   const { name, health, power } = monster;
//   return new Monster(name, health + level * 2, power);
// };

// let level = 1;
// let gameOn = true;
// const gameLoop = function () {
//   console.log(`Current level: ${level}`);
//   const player = new Player(prompt("Enter your name: "), 100, 10, [
//     new Item("Healing small", "heal", 10, 1),
//     new Item("wooden sword", "weapon", 2, 5),
//   ]);
//   while (gameOn) {
//     player.health = 100;
//     player.power += level;

//     const item = walkAndFind();

//     if (item && !player.isInventoryFull()) {
//       const { name, type, power, volume } = item;
//       playerAction(`Do you wish pick up ${item.name}`, () =>
//         player.addItem(new Item(name, type, power, volume))
//       );
//       console.log(player);
//     } else if (item && player.isInventoryFull()) {
//       const { name, type, power, volume } = item;
//       console.log("You found " + item.name);
//       console.log("Your items: ");
//       console.log(...player.inventory);
//       const replace = prompt(
//         "Do you wish to replace one of the items? (yes / no)"
//       );
//       replace === "yes" &&
//         player.replaceItem(
//           prompt("Name the item: "),
//           new Item(name, type, power, volume)
//         );
//     }
//     const monster = newMonster(level);

//     while (player.health > 0 && monster.health > 0) {
//       const action = prompt("attack = 1 / heal=2 / equip=3");
//       if (action === "3") {
//         player.useWeapon();
//         continue;
//       }
//       action === "1" ? player.attack(monster) : player.useHeal();
//       if (monster.health <= 0) {
//         console.log("You won!");
//         playerAction("Stop the game?", () => (gameOn = false));
//         level++;
//         break;
//       }
//       monster.attack(player);
//       console.log(
//         `Your health :${player.health} : Monster's health: ${monster.health}`
//       );
//       if (player.health <= 0) gameOn = false;
//     }
//   }
// };

// gameLoop();

// _________________________________________________________________________________________________________________________________
const WeatherStation = {
  temperature: null,
  humidity: null,
  pressure: null,
  history: [],

  updateWeatherData(temp, humidity, pressure) {
    this.temperature = temp;
    this.humidity = humidity;
    this.pressure = pressure;

    this.history.push({ temp, humidity, pressure, timestamp: new Date() });

    console.log("Weather data updated:");
    console.log(
      `Temperature: ${this.temperature}°C, Humidity: ${this.humidity}%, Pressure: ${this.pressure} mmHg`
    );
  },

  displayWeatherForecast() {
    let forecast = "No data";

    if (this.temperature > 25 && this.humidity < 50) {
      forecast = "Sunny";
    } else if (this.temperature < 0) {
      forecast = "Cloudy";
    } else if (this.humidity > 80) {
      forecast = "Rain or fog";
    } else if (this.pressure < 740) {
      forecast = "Low pressure, possible rain";
    } else {
      forecast = "Cloudy with sunny areas";
    }

    console.log(`Weather forecast: ${forecast}`);
  },

  analyzeWeatherHistory() {
    if (this.history.length === 0) {
      console.log("No history");
      return;
    }

    console.log("Analysis of  weather data:");
    this.history.forEach((record) => {
      console.log(
        `${record.timestamp.toLocaleString()}: temp: ${
          record.temp
        }°C, humidity: ${record.humidity}%, pressure: ${record.pressure} mmHg.`
      );
    });
  },
};

WeatherStation.updateWeatherData(18, 85, 745);
WeatherStation.displayWeatherForecast();
WeatherStation.analyzeWeatherHistory();
// _______________________________________________________________________________________________________________________________________________
