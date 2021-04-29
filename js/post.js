window.onload = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let section = urlParams.get("section");
    let postId = urlParams.get("id");
    request.get(`/post/${section}/${postId}`)
        .then(post => {
            console.log(post.data)
            let indexFile = post.data.filter(p => p.name.endsWith(".md"))[0].name;
            let imageFile = post.data.filter(p => p.name.startsWith("index_image"))[0].download_url;
            let title = indexFile.substr(0, indexFile.lastIndexOf(".md"));

            document.title = "ㄹㅇㅋㅋ | " + title;
            document.getElementById("header__title").innerHTML = section.toUpperCase() + " - " + title;
        })
}

const request = axios.create({
    baseURL: 'https://api.github.com/repos/LeagueLugas/LeagueLugas.github.io/contents',
    timeout: 1000,
    headers: {'Authorization': 'token ${{ secrets.GH_TOKEN }}'}
});