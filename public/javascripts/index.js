const menuBtns = document.querySelectorAll(".button-container");
const closeBtns = document.querySelectorAll(".close");
const allContainer = document.querySelector(".main-all-container");
const mainSubContainer = document.querySelector(".main-sub-container");

menuBtns.forEach((btn) => {
  btn.addEventListener("click", openWindow);
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", closeWindow);
});

function openWindow(e) {
  let menu =
    e.target.id !== ""
      ? e.target.id
      : e.target.parentElement.id !== ""
      ? e.target.parentElement.id
      : e.target.parentElement.parentElement.id;
  switch (menu) {
    case "settings-button":
      refreshWindow("main-settings-container");
      break;
    case "add-item-button":
      refreshWindow("main-add-items-container");
      break;
    case "medications-button":
      refreshWindow("main-medications-container");
      break;
    case "bills-button":
      refreshWindow("main-bills-container");
      break;
    case "appointments-button":
      refreshWindow("main-appointments-container");
      break;
    case "reminders-button":
      refreshWindow("main-reminders-container");
      break;
  }
}

function closeWindow(e) {
  e.target.parentElement.parentElement.classList.add("hidden");
  allContainer.classList.remove("hidden");
}

function refreshWindow(menuName) {
  for (let i = 0; i < mainSubContainer.children.length; i++) {
    mainSubContainer.children[i].classList.add("hidden");
    if (mainSubContainer.children[i].classList.contains(menuName)) {
      mainSubContainer.children[i].classList.remove("hidden");
    }
  }
}
