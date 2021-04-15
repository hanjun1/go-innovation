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
    //   generateData("Settings")
      break;
    case "Add Item":
      refreshWindow("main-add-items-container");
    //   generateData("Add Item")
      break;
    case "Medications":
      refreshWindow("main-medications-container");
      generateData("Medications")
      break;
    case "Bills":
      refreshWindow("main-bills-container");
      generateData("Bills")
      break;
    case "Appointments":
      refreshWindow("main-appointments-container");
      generateData("Appointments")
      break;
    case "Reminders":
      refreshWindow("main-reminders-container");
      generateData("Reminders")
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

function generateData(category) {
    const url = `/api/category/${category}/`
    const json_upload = JSON.stringify({
        "test": "hello"
    });
    const http = new XMLHttpRequest();
    http.open("GET", url, true)
    http.setRequestHeader("Content-Type", "application/json");
    http.onreadystatechange = (e) => {
        if (http.readyState == 4 && http.status === 200) {
            console.log(http.response)
        }
    }
    http.send(json_upload)
}