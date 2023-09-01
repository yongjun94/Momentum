const UNSPLASH_API_KEY =
  "9ggeLNQJHjoY43UG0ktUZ1BI1VLr0Snd4nlo77OnNZI";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

const body = document.querySelector("body");
locationContainer = document.querySelector(".location");

function load_bgimg() {
    const saved_image = localStorage.getItem("bg");
    if(saved_image === null) {
        get_bgimg();
    } else {
        const parsedImage = JSON.parse(saved_image);
        const today = new Date();
        if(today > parsedImage.expirationOn) {
            get_bgimg();
        } else {
            body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${parsedImage.url})`;
            locationContainer.innerHTML = `${parsedImage.name}, ${parsedImage.city}, ${parsedImage.country}`;
        }
    }
    return;
}

function save_bgimg(imageUrl, city, country, name) {
    const saved_image = localStorage.getItem("bg");
    if (saved_image !== null) {
        localStorage.removeItem("bg");
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    const imageObj = {
        url : imageUrl,
        expiresOn : expirationDate,
        city,
        country,
        name
    };

    localStorage.setItem("bg", JSON.stringify(imageObj));
    load_bgimg();
    return;
}

function get_bgimg() {
    fetch(UNSPLASH_URL)
        .then(response => response.json())
        .then(json => {
            const image=json;
            if (image.urls && image.urls.full && image.location) {
                const fullurl = image.urls.full;
                const location = image.location;
                const city = location.city;
                const country =location.country;
                const name = location.name;
                console.log(fullurl, city, country, name);
                save_bgimg(fullurl ,city, country, name);
            } else {
                //get_bgimg();
            }
        });
    return;
}

function initApp() {
    load_bgimg();
    return;
}

initApp();
