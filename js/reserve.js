function reserveSeat(){
    const reserveBtn = document.getElementById("reserve-button");
    const loginUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const loggedUser = document.querySelector(".user-name-logged");
    reserveBtn.addEventListener("click", () =>{
        if(!seatLoc){
            alert("Select seat");
            return;
        }
        const seatRes = JSON.parse(localStorage.getItem("reserveSeat")) || [];
        const loggedUser = document.querySelector(".logged-in-user").textContent;
        if(seatRes.some(user => user.user === loggedUser)){
            alert("This user had already a reservation");
            return;
        }
       document.querySelector(".form-panel-container").style.display = "flex";
       loggedUser.textContent = loginUser;
       document.body.classList.add("no-scroll");
    });
        
}
document.addEventListener("DOMContentLoaded", reserveSeat);

let seatReserved = 0;
let seatLoc;
function selectSeatToReserve(){
    const radios = document.querySelectorAll(
        ".single-window-table input[type='radio'], \
         .double-seat-window-table input[type='radio'], \
         .group-center-table input[type='radio']"
    );
    let lastChecked = null;
    radios.forEach(radio => {
        radio.addEventListener("change", () => {
            const li = radio.closest("li");
            const imgEl = li.querySelector("img");
            const seat = radio.value;          
            const seatRes = JSON.parse(localStorage.getItem("reserveSeat")) || [];
           /* if (seatRes.some(item => item.seat === seat)) {
                alert("Seat already reserved");
                radio.checked = false;
                 radio.disabled = true;  
                imgEl.src = getSelectedImg(imgEl);
                return;
            }*/
            if (lastChecked && lastChecked !== radio) {
                const prevImg = lastChecked.closest("li").querySelector("img");
                prevImg.src = getDefaultImg(prevImg);
            }
            imgEl.src = getSelectedImg(imgEl);
            lastChecked = radio;
            seatLoc = seat;
        });
    });
}

function getDefaultImg(img) {
  if (img.src.includes("single")) return "./images/services/reservation/singleseat1.png"; 
  if (img.src.includes("double")) return "./images/services/reservation/doubleseat1.png"; 
  if (img.src.includes("four")) return "./images/services/reservation/fourseat1.png"; 
  if (img.src.includes("six")) return "./images/services/reservation/sixseat1.png";
}

function getSelectedImg(img) {
    const type = img.dataset.seatType;
    switch (type) {
    case "single":
      return "./images/services/reservation/singleseat2.png";
    case "double":
      return "./images/services/reservation/doubleseat2.png";
    case "four":
      return "./images/services/reservation/fourseat2.png";
    case "six":
      return "./images/services/reservation/sixseat2.png";
    default:
      return img.src;
  }
}
function getMarkedSeat(){
    const resSeat = JSON.parse(localStorage.getItem("reserveSeat")) || [];
    if(!resSeat.length) return;
    const selectedDate = document.querySelector("#inputReserveDate").value;
    const selectedTime = document.querySelector("#inputReserveTime").value;
    
    if (!selectedDate || !selectedTime) return;
    
     if (!isSaturday(selectedDate)) {
      alert("Reservations are only allowed on Saturdays.");
      return;
    }
  
    if (!isTimeAllowed(selectedTime)) {
      alert("Reservations are only available between 15:00 and 19:00.");
      return;
    }
    const usedSeats = getUsedSeats(selectedDate, selectedTime);
    const radios = document.querySelectorAll(
    ".single-window-table input[type='radio'], \
     .double-seat-window-table input[type='radio'], \
     .group-center-table input[type='radio']"
    );
    radios.forEach(radio =>{
        const li = radio.closest("li");
        const imgEl = li.querySelector("img");
        const spanEl = li.querySelector("span");
        const seatId = radio.value;
        const used = usedSeats[seatId] || 0;
        const capacity = getSeatCapacity(radio);
        const available = Math.max(0, capacity - used);
        // mark reserved
        if (used > 0) {
            imgEl.src = getSelectedImg(imgEl);
        }
        // display availability (For share tables only)
        if (used > 0 && capacity > 1) {
            spanEl.textContent = available > 0
            ? `${available} seat${available !== 1 ? "s" : ""} left` : "Full";
        }
        if (available === 0 && used > 0) {
            radio.disabled = true;
            li.classList.add("seat-full");
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
  getMarkedSeat();
  selectSeatToReserve(); 
});

const SEAT_TYPE_CAPACITY = {
    four: 4,
    six: 6,
    single: 1,
    double: 2
};
function getSeatCapacity(radio) {
    const img = radio.closest("label").querySelector("img");
    const seatType = img?.dataset.seatType;
    return SEAT_TYPE_CAPACITY[seatType] || 1;
}
function getUsedSeats() {
    const data = JSON.parse(localStorage.getItem("reserveSeat")) || {};
    const seatMap = {};
    data.forEach(item => {
        const seat = item.seat;
        const cnt = Number(item.personCnt) || 0;
        seatMap[seat] = (seatMap[seat] || 0) + cnt;
    });
    return seatMap; 
}

function isSaturday(dateStr) {
  const date = new Date(dateStr);
  return date.getDay() === 6;
}
const dateInput = document.querySelector("#inputReserveDate");

dateInput.addEventListener("change", () => {
  if (!isSaturday(dateInput.value)) {
    alert("Reservations are only available on Saturdays.");
    dateInput.value = "";
  }
});
function saveReservation(reservation) {
  if (!isSaturday(reservation.date)) {
    alert("Only Saturdays are allowed.");
    return;
  }

  if (!isTimeAllowed(reservation.time)) {
    alert("Only 15:00–19:00 reservations are allowed.");
    return;
  }

  const data = JSON.parse(localStorage.getItem("reserveSeat")) || [];
  data.push(reservation);
  localStorage.setItem("reserveSeat", JSON.stringify(data));
}
function nextSaturday() {
  const d = new Date();
  d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7));
  return d.toISOString().split("T")[0];
}
dateInput.value = nextSaturday();
const ALLOWED_TIME = {
  start: "13:00",
  end: "19:00"
};
function isTimeAllowed(timeStr) {
  if (!timeStr) return false;
  const toMinutes = t => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const t = toMinutes(timeStr);
  return (
    t >= toMinutes(ALLOWED_TIME.start) &&
    t <= toMinutes(ALLOWED_TIME.end)
  );
}
const timeInput = document.querySelector("#inputReserveTime");
timeInput.addEventListener("change", () => {
  if (!isTimeAllowed(timeInput.value)) {
    alert("Reservations are only available between 15:00 and 19:00.");
    timeInput.value = "";
  }
});

function reserveButton(){
    const reserveBtn = document.querySelector(".submit-reserve-button");
    const person = document.getElementById("selectNumber");
    const dateReservation = document.getElementById("inputReserveDate");
    const timeReservation = document.getElementById("inputReserveTime");
    const userContact = document.getElementById("inputContact");
    const userEmail = document.getElementById("inputEmail");
     const loginUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
    reserveBtn.addEventListener("click", () =>{
        if(loginUser === "" || loginUser === null) {
            alert("Must be logged in to reserve seat");
            return;
        }
        const usedSeats = getUsedSeats();
        const seatId = radio.value;
        const used = usedSeats[seatId] || 0;
        const capacity = getSeatCapacity(radio);
        const available = Math.max(0, capacity - used);
        if (used > 0 && capacity < 1) {
            alert("Reserve seats are more than the capacity");
            return;
        }
        const personCount = person.value;
        const date = dateReservation.value;
        const time = timeReservation.value;
        const contact = userContact.value;
        const email = userEmail.value;
           const reserveSeat = {
               user: loginUser,
               personCnt: personCount,
               dateReserve: date,
               timeReserve: time,
               userContact: contact,
               userEmail: email,
               seat: seatLoc
        };
        const existing = JSON.parse(localStorage.getItem("reserveSeat")) || [];
        existing.push(reserveSeat);
        localStorage.setItem("reserveSeat", JSON.stringify(existing));
    });
}
reserveButton();
function closeReservePanel(){
    const closePanelBtn = document.querySelector(".close-reserve-button");
    closePanelBtn.addEventListener("click", () =>{
        document.querySelector(".form-panel-container").style.display = "none";
        document.body.classList.remove("no-scroll");
    });
}closeReservePanel();



