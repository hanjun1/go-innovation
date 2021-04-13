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
  let menu = e.target.innerHTML;
  switch (menu) {
    case "Settings":
      refreshWindow("main-settings-container");
      break;
    case "Add Item":
      refreshWindow("main-add-items-container");
      break;
    case "Medications":
      refreshWindow("main-medications-container");
      break;
    case "Bills":
      refreshWindow("main-bills-container");
      break;
    case "Appointments":
      refreshWindow("main-appointments-container");
      break;
    case "Reminders":
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
