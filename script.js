const container = document.getElementById("container")
const bgColors = ["#4BCFFA", "#ed57c0", "#f9f39a"];
const btnColors = ['#3498DB', '#E74292', '#FAD02E']
const umbrellas = ["BlueUmbrella", "PinkUmbrella", "YellowUmbrella"]
const loader = document.getElementsByClassName('loader')[0];
const imageContainer = document.getElementsByClassName('image-container')[0];
const buttonLabel = document.getElementById("button-label");
const crossIcon = document.getElementById("cross-icon");
const uploadBtn = document.getElementsByClassName('upload-button')[0];
const btnLogo = document.getElementById("btn-logo-img");
const logoDisplay = document.getElementById('logo-display');

// upload button click
uploadBtn.addEventListener('click', function () {
    document.getElementById('logo-input').click();
});

crossIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    location.reload();
})

//  will get triggered when there is a change in the image selection
document.getElementById('logo-input').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const fileSize = file.size;
    if (fileSize > 5000000) {
        alert("Cannot Upload Logo of Size more than 5 MB")
    } else {
        const fileName = file.name;
        uploadBtn.disabled = true
        if (file) {
            btnLogo.src = "./assets/loader_icon.svg";
            btnLogo.classList.add('animate');
            crossIcon.classList.remove('hidden')
            buttonLabel.innerText = fileName
            imageContainer.classList.add("hidden");
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                btnLogo.classList.remove('animate');
                btnLogo.src = "./assets/upload_icon.svg";
                const reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function (e) {
                    logoDisplay.src = e.target.result;
                    imageContainer.classList.remove("hidden");
                    logoDisplay.classList.remove("hidden");
                    reader.readAsDataURL(file);
                };
            }, 4000);
        }
    }
});

container.style.backgroundColor = bgColors[0]
uploadBtn.style.backgroundColor = btnColors[0];
document.querySelectorAll('.color').forEach(item => {
    item.addEventListener('click', function () {
        const colorImage = this.getAttribute('data-color');
        const umbrella = document.getElementById('umbrella');
        const umbrellaColor = colorImage.split(".")[0].split("-")[1] // will return blue, yellow or pink
        switch (umbrellaColor) {
            case "blue":
                imageContainer.classList.add("hidden");
                setLoading(true)
                setTimeout(() => {
                    umbrella.src = `./assets/${umbrellas[0]}.png`
                    setLoading(false)
                    container.style.backgroundColor = bgColors[0]
                    uploadBtn.style.backgroundColor = btnColors[0];
                    imageContainer.classList.remove("hidden");
                }, 2000); // delay in milliseconds
                break;
            case "pink":
                setLoading(true)
                imageContainer.classList.add("hidden");
                setTimeout(() => {
                    umbrella.src = `./assets/${umbrellas[1]}.png`
                    setLoading(false)
                    container.style.backgroundColor = bgColors[1]
                    uploadBtn.style.backgroundColor = btnColors[1];
                    imageContainer.classList.remove("hidden");
                }, 2000); // delay in milliseconds
                break;
            case "yellow":
                setLoading(true)
                imageContainer.classList.add("hidden");
                setTimeout(() => {
                    umbrella.src = `./assets/${umbrellas[2]}.png`
                    setLoading(false)
                    container.style.backgroundColor = bgColors[2];
                    uploadBtn.style.backgroundColor = btnColors[2];
                    imageContainer.classList.remove("hidden");
                }, 2000); // delay in milliseconds
                break;
        }
    });
});

const setLoading = (isVisible) => {
    if (isVisible) {
        loader.classList.remove("hidden");
    } else {
        loader.classList.add("hidden");
    }
}
