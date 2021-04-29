window.onload = () => {
    getIndexSections("section__java", "java");
    getIndexSections("section__server", "server");
    getIndexSections("section__etc", "etc");
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
    if (window.pageYOffset >= 970) {
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

const sectionRequest = (section, limitFrom, limitTo) => {
    axios({
        method: 'get',
        url: 'https://api.github.com/repos/LeagueLugas/LeagueLugas.github.io/contents/post/' + section,
    }).then(data => {
        data.data.reverse().slice(limitFrom, limitTo).forEach(post => {
            axios({
                method: 'get',
                url: 'https://api.github.com/repos/LeagueLugas/LeagueLugas.github.io/contents/' + post.path
            })
        });
    });
}

const getIndexSections = (elementId, section) => {
    let element = document.getElementById(elementId);
    sectionRequest(section, 0, 4);
}
