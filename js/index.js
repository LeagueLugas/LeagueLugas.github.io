window.onload = () => {
    contentOffset = document.getElementById("content").offsetTop;
    typeTitle("main__title")
        .then(() => {
            setTimeout(() => {
                disableTypeAnimation("main__title");
                typeTitle("main__title__sub");
            }, 500)
        })
}
window.onscroll = (e) => {
    if (window.pageYOffset >= 60) {
        document.getElementById("header").style.transform = "translateY(60px)"
    } else {
        document.getElementById("header").style.transform = ""
    }
    if (window.pageYOffset >= 980) {
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
    }, 100);
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 100 * title.length);
    });
}

const disableTypeAnimation = (elementId) => {
    document.getElementById(elementId).style.animation = "unset";
}

const downPage = (position) => {
    window.scrollTo(0, position);
}

const movePage = (url) => {
    window.open(url, '_blank');
}
