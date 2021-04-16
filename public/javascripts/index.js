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


// CHANGE CHECKBOXES AND CHECK VALUE
const checkboxes = document.querySelectorAll(".item-checkbox");

checkboxes.forEach(item => {
    item.addEventListener("click", e => {
        const target = e.target
        const id = target.getAttribute("name")
        const value = target.checked
        changeCheckboxFromCheckbox(id, value)
        changeAlertFromCheckbox(id, value)
    })
})

function changeCheckboxFromCheckbox(id, value) {
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

const notificationContainers = document.querySelectorAll(".notification-container")
function changeAlertFromCheckbox(id, value) {
    for (let i = 0; i < notificationContainers.length; i++) {
        const container = notificationContainers[i]
        if (container.id == id && value == true) {
            container.remove()
            break;
        }
    }
}


// SEND ALERT TO USER
const notifyButtons = document.querySelectorAll(".notify-button");

notifyButtons.forEach(item => {
    item.addEventListener("click", e => {
        let target = e.target
        const id = target.getAttribute("name")
        target.innerHTML = "Sent"
        target.classList.add("disabled")
        sendAlert(id)
    })
})

function sendAlert(id) {
    const url = "/api/createAlert"
    const json_upload = JSON.stringify({
        "reminderId" : id,
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


// ALERT BUTTONS HANDLER
const alertButtons = document.querySelectorAll(".alert-button-yes, .alert-button-dismiss");

alertButtons.forEach(item => {
    item.addEventListener("click",e => {
        let target = e.target
        const value = target.value
        const id = target.getAttribute("name") 
        updateAlert(id, value)
    })
})

function updateAlert(id, value) {
    const url = "/api/updateAlertStatus"
    const json_upload = JSON.stringify({
        "id" : id,
        "value": value
    });
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json");
    http.onreadystatechange = (e) => {
        if (http.readyState == 4 && http.status === 200) {
            changeCheckboxFromAlerts(JSON.parse(http.response))
        }
    }
    http.send(json_upload);
}

function changeCheckboxFromAlerts(response) {
    if (response.reminder) {
        for (let i = 0; i < checkboxes.length; i++) {
            const checkbox = checkboxes[i]
            if (parseInt(checkbox.name) == response.reminderId) {
                checkbox.checked = true
                break;
            }
        }
    }
}