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
    //   generateData("Settings")
      break;
    case "add-item-button":
      refreshWindow("main-add-items-container");
    //   generateData("Add Item")
      break;
    case "medications-button":
      refreshWindow("main-medications-container");
      generateData("Medications")
      break;
    case "bills-button":
      refreshWindow("main-bills-container");
      generateData("Bills")
      break;
    case "appointments-button":
      refreshWindow("main-appointments-container");
      generateData("Appointments")
      break;
    case "reminders-button":
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


// CHANGE CHECKBOXES AND CHECK VALUE
const checkboxes = document.querySelectorAll(".item-checkbox");

checkboxes.forEach(item => {
    item.addEventListener("click", e => {
        const target = e.target
        const id = target.getAttribute("name")
        const value = target.checked
        changeCheckbox(id, value)
    })
})

function changeCheckbox(id, value) {
    // const item_id = document.querySelector("#user_id").value;
    const url = "/api/checkbox"
    if (value) {
        value = true;
    } else if (!value) {
        value = false
    }

    const json_upload = JSON.stringify({
        "reminderId" : id,
        "checked" : value
    });
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json");
    http.onreadystatechange = (e) => {
        if (http.readyState == 4 && http.status === 200) {
            console.log(http.response)
        }
    }
    http.send(json_upload);
}