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
        e.preventDefault()
        const target = e.target.closest(".item-checkbox")
        const id = target.getAttribute("name")
        let value = target.getAttribute("value")
        let path = target.querySelector("path")
        
        if (value == "true" ) {
            value = false
            path.setAttribute("fill-rule", "")
            path.setAttribute("clip-rule", "")
            path.setAttribute("d", "M12 19C12.9193 19 13.8295 18.8189 14.6788 18.4672C15.5281 18.1154 16.2997 17.5998 16.9497 16.9497C17.5998 16.2997 18.1154 15.5281 18.4672 14.6788C18.8189 13.8295 19 12.9193 19 12C19 11.0807 18.8189 10.1705 18.4672 9.32122C18.1154 8.47194 17.5998 7.70026 16.9497 7.05025C16.2997 6.40024 15.5281 5.88463 14.6788 5.53284C13.8295 5.18106 12.9193 5 12 5C10.1435 5 8.36301 5.7375 7.05025 7.05025C5.7375 8.36301 5 10.1435 5 12C5 13.8565 5.7375 15.637 7.05025 16.9497C8.36301 18.2625 10.1435 19 12 19ZM12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12C21 14.3869 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.3869 21 12 21Z")
            target.setAttribute("value", "false")
        } else {
            value = true
            path.setAttribute("fill-rule", "evenodd")
            path.setAttribute("clip-rule", "evenodd")
            path.setAttribute("d", "M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM9.3824 11.0689C9.50441 11.1213 9.61475 11.1975 9.707 11.293L11 12.586L14.293 9.29302C14.3852 9.19751 14.4956 9.12133 14.6176 9.06892C14.7396 9.01651 14.8708 8.98892 15.0036 8.98777C15.1364 8.98662 15.2681 9.01192 15.391 9.0622C15.5138 9.11248 15.6255 9.18673 15.7194 9.28063C15.8133 9.37452 15.8875 9.48617 15.9378 9.60907C15.9881 9.73196 16.0134 9.86364 16.0122 9.99642C16.0111 10.1292 15.9835 10.2604 15.9311 10.3824C15.8787 10.5044 15.8025 10.6148 15.707 10.707L11.707 14.707C11.5195 14.8945 11.2652 14.9998 11 14.9998C10.7348 14.9998 10.4805 14.8945 10.293 14.707L8.293 12.707C8.19749 12.6148 8.1213 12.5044 8.0689 12.3824C8.01649 12.2604 7.9889 12.1292 7.98775 11.9964C7.98659 11.8636 8.0119 11.732 8.06218 11.6091C8.11246 11.4862 8.18671 11.3745 8.2806 11.2806C8.3745 11.1867 8.48615 11.1125 8.60904 11.0622C8.73194 11.0119 8.86362 10.9866 8.9964 10.9878C9.12918 10.9889 9.2604 11.0165 9.3824 11.0689Z")
            target.setAttribute("value", "true")
        }
        changeCheckboxFromCheckbox(id, value)
        changeAlertFromCheckbox(id, value)
    })
})

function changeCheckboxFromCheckbox(id, value) {
    const url = "/api/checkbox"
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
    if (value) {
        for (let i = 0; i < notificationContainers.length; i++) {
            const container = notificationContainers[i]
            if (container.id == id) {
                container.remove()
                break;
            }
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
        const alertId = target.getAttribute("name") 
        updateAlert(alertId, value)
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
            if (parseInt(checkbox.getAttribute("name")) == response.reminderId) {
                let path = checkbox.querySelector("path")
                console.log(path)
                path.setAttribute("fill-rule", "evenodd")
                path.setAttribute("clip-rule", "evenodd")
                path.setAttribute("d", "M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM9.3824 11.0689C9.50441 11.1213 9.61475 11.1975 9.707 11.293L11 12.586L14.293 9.29302C14.3852 9.19751 14.4956 9.12133 14.6176 9.06892C14.7396 9.01651 14.8708 8.98892 15.0036 8.98777C15.1364 8.98662 15.2681 9.01192 15.391 9.0622C15.5138 9.11248 15.6255 9.18673 15.7194 9.28063C15.8133 9.37452 15.8875 9.48617 15.9378 9.60907C15.9881 9.73196 16.0134 9.86364 16.0122 9.99642C16.0111 10.1292 15.9835 10.2604 15.9311 10.3824C15.8787 10.5044 15.8025 10.6148 15.707 10.707L11.707 14.707C11.5195 14.8945 11.2652 14.9998 11 14.9998C10.7348 14.9998 10.4805 14.8945 10.293 14.707L8.293 12.707C8.19749 12.6148 8.1213 12.5044 8.0689 12.3824C8.01649 12.2604 7.9889 12.1292 7.98775 11.9964C7.98659 11.8636 8.0119 11.732 8.06218 11.6091C8.11246 11.4862 8.18671 11.3745 8.2806 11.2806C8.3745 11.1867 8.48615 11.1125 8.60904 11.0622C8.73194 11.0119 8.86362 10.9866 8.9964 10.9878C9.12918 10.9889 9.2604 11.0165 9.3824 11.0689Z")
                checkbox.setAttribute("value", "true")
                break;
            }
        }
    }
}