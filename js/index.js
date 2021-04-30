let request;
window.onload = async () => {
    let token;
    await fetch("ghtoken.txt", {
        method: 'GET',
        redirect: 'follow'
    }).then(response => response.text())
        .then(data => token = data);
    request = axios.create({
        baseURL: 'https://api.github.com/repos/LeagueLugas/LeagueLugas.github.io/contents',
        timeout: 1000,
        // headers: {'Authorization': 'token ' + token}
    });
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
    request.get('post/' + section).then(data => {
        let sectionElement = document.getElementById("section__" + section);
        data.data.reverse().slice(limitFrom, limitTo).forEach(folder => {
            request.get(folder.path).then(post => {
                let indexFile = post.data.filter(p => p.name.endsWith(".md"))[0].name;
                let imageFile = post.data.filter(p => p.name.startsWith("index_image"))[0].download_url;
                let title = indexFile.substr(0, indexFile.lastIndexOf(".md"));

                let div = document.createElement("div");
                let a = document.createElement("a");
                let img = document.createElement("img");
                let p = document.createElement("p");

                img.src = imageFile;
                img.alt = title;
                p.innerHTML = title;
                a.href = `post/?section=${section}&id=${folder.name}`;
                div.className = "content__section";

                a.append(img, p);
                div.append(a);
                sectionElement.append(div);
            })
        });
    });
}

const getIndexSections = (elementId, section) => {
    sectionRequest(section, 0, 4);
}
