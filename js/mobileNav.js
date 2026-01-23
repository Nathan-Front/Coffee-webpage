

async function mobileNavFetch(){
  const mobileNav = await fetch("/mobileNavigation.html");
  const navHtml =await mobileNav.text();
  document.body.insertAdjacentHTML("beforeend", navHtml);

  toUser();
  burgerContent();
  mobileNavigationBtn();
}
mobileNavFetch();

function mobileNavigationBtn(){
  document.addEventListener("click", (e)=>{
    const homeBtn = e.target.closest("#mobile-home-button");
    if(homeBtn){
      window.location.href = "index.html";
    }

    const coffeeBeanBtn = e.target.closest("#mobile-beans-button");
    if(coffeeBeanBtn){
      window.location.href = "coffeeBeans.html";
    }

    const reserveBtn = e.target.closest("#mobile-reserve-button");
    if(reserveBtn){
      window.location.href = "reservation.html";
    }
  });
}

function toUser(){
  const userBtn = document.getElementById("mobile-user-button");
  if(!userBtn) return;
  const inputFieldContainer = document.createElement("div");
  const closeBtn = document.createElement("button");
  closeBtn.className = "close-input-field";
  closeBtn.textContent = "X";
  userBtn.addEventListener("click", async () =>{
    if(userBtn.disabled)return;
    userBtn.disabled = true;
    const inputField = await fetch("login.html"); //Get the login html content
    inputFieldContainer.className = "input-field-container";
    const html = await inputField.text(); //Convert to text to be able to display
    inputFieldContainer.innerHTML = html;
    const closeButtonPos = inputFieldContainer.querySelector("main");
    closeButtonPos.prepend(closeBtn);
    document.body.append(inputFieldContainer);
    requestAnimationFrame(() => {
      inputFieldContainer.offsetHeight; //forces a layout reflow, it locks in the initial state (without .activeInput)
      inputFieldContainer.classList.add("activeInput");
    });
  });
  closeBtn.addEventListener("click", () =>{
    inputFieldContainer.classList.remove("activeInput");
    setTimeout(() => { //Delay to allow CSS transition
      inputFieldContainer.remove();
      userBtn.disabled = false;
    }, 400); //This is needed to match the CSS transition duration which is 0.4s
  });
}

function burgerContent(){
  const burgerOpen = document.getElementById("burger");
  const burgerClose = document.getElementById("burger-close");
  
  burgerOpen.addEventListener("click", () =>{
   
    burgerOpen.style.display = "none";
    burgerClose.style.display = "flex";
  });

  burgerClose.addEventListener("click", () =>{
    
    burgerOpen.style.display = "flex";
    burgerClose.style.display = "none";
  
  });
}
