let darkMode;
let request;
window.onload = async () => {
    let token;
    await fetch("../ghtoken.txt", {
        method: 'GET',
        redirect: 'follow'
    }).then(response => response.text())
        .then(data => token = data);
    request = axios.create({
        timeout: 3000,
        // headers: {'Authorization': 'token ' + token}
    });

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let section = urlParams.get("section");
    let postId = urlParams.get("id");
    request.get(`https://api.github.com/repos/LeagueLugas/LeagueLugas.github.io/contents/post/${section}/${postId}`)
        .then(post => {
            let indexFile = post.data.filter(p => p.name.endsWith(".md"))[0];
            let imageFile = post.data.filter(p => p.name.startsWith("index_image"))[0].download_url;
            let title = indexFile.name.substr(0, indexFile.name.lastIndexOf(".md"));

            document.title = "ㄹㅇㅋㅋ | " + title;
            document.getElementById("header__title").innerHTML = section.toUpperCase() + " - " + title;

            let requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            fetch(indexFile.download_url, requestOptions)
                .then(response => response.text())
                .then(result => {
                    let converter = new showdown.Converter();
                    converter.setFlavor('github');
                    converter.setOption("omitExtraWLInCodeBlocks", true);
                    converter.setOption("parseImgDimensions", true);
                    converter.setOption("tables", true);
                    converter.setOption("ghMentions", true);
                    converter.setOption("openLinksInNewWindow", true);
                    converter.setOption("emoji", true);
                    document.getElementById("main__content").innerHTML = converter.makeHtml(result);
                })
                .catch(error => location.href = "../");
        });

    darkMode = localStorage.getItem("dark_mode") === "true";
    if (darkMode == null) {
        localStorage.setItem("dark_mode", "false");
        darkMode = false;
    }
    setDarkMode(darkMode);
}

const changeDarkMode = () => {
    darkMode = !darkMode;
    setDarkMode(darkMode);
    localStorage.setItem("dark_mode", darkMode.toString());
}
const setDarkMode = (dark) => {
    let body = document.getElementById("body");
    let content = document.getElementById("main__content");
    let button = document.getElementById("dark__mode");
    let image = document.getElementById("dark__mode__image");
    if (dark) {
        body.style.backgroundColor = "#22272e";
        content.className = "dark__mode";
        button.style.backgroundColor = "#f1f1f1";
        image.src = "../images/dark_mode_on.svg";
        button.style.transform = "rotate(360deg)"
        button.onmouseenter = () => {
            button.style.transform = "rotate(360deg) scale(1.1)"
        }
        button.onmouseleave = () => {
            button.style.transform = "rotate(360deg) scale(1.0)"
        }
    } else {
        body.style.backgroundColor = "#f1f1f1";
        content.className = "";
        button.style.backgroundColor = "#22272e";
        image.src = "../images/dark_mode_off.svg";
        button.style.transform = "rotate(0deg)"
        button.onmouseenter = () => {
            button.style.transform = "rotate(0deg) scale(1.1)"
        }
        button.onmouseleave = () => {
            button.style.transform = "rotate(00deg) scale(1.0)"
        }
    }
}
