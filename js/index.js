window.onload = () => {
    typeTitle("main__title")
        .then(() => {
            setTimeout(() => {
                disableTypeAnimation("main__title");
                typeTitle("main__title__sub");
            }, 1000)
        })
}
window.onscroll = () => {
    if (window.pageYOffset >= 60) {
        document.getElementById("header").style.transform = "translateY(60px)"
    } else {
        document.getElementById("header").style.transform = ""
    }
    if (window.pageYOffset >= window.innerHeight) {
        document.getElementById("footer").style.transform = "translateY(-60px)"
    } else {
        document.getElementById("footer").style.transform = ""
    }
}

const typeTitle = async (titleElementId) => {
    let titleElement = document.getElementById(titleElementId);
    let title = titleElement.innerText.split("");
    let titleIndex = 0;
    titleElement.style.display = "inline-block";
    titleElement.innerHTML = "";
    let typingInterval = setInterval(() => {
        titleElement.innerHTML = titleElement.innerHTML + title[titleIndex++];
        if (titleIndex === title.length) clearInterval(typingInterval);
    }, 200);
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 200 * title.length);
    });
}

const disableTypeAnimation = (elementId) => {
    document.getElementById(elementId).style.animation = "unset";
}

const downPage = (position) => {
    window.scrollTo(0, position);
}
