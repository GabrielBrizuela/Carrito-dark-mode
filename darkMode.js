document.getElementById('id-sun').onclick = function () {
    document.getElementById('page').classList.remove('dark-mode')
    document.getElementById('id-moon').classList.remove('active')
    localStorage.setItem("darkModeOff", "id-sun")
    this.classList.add('active')
}

document.getElementById('id-moon').onclick = function () {
    document.getElementById('page').classList.add('dark-mode')
    document.getElementById('id-sun').classList.remove('active')
    localStorage.setItem("darkModeOn", "id-moon")
    this.classList.add('active')
}


const switchDark = document.querySelector("#page");

switchDark.addEventListener("change", page);

function page(e) {
    let isChecked = e.target.Checked;
    console.log(isChecked);
    if (isChecked) {
        darkModeOn();
    } else {
        darkModeOff();
    }
}

const darkModeStatus = localStorage.getItem("dark-mode");

if (darkModeStatus == "on") {
    switchDark.checked = true;
    darkModeOn();
}