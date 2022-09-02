const  ul = document.querySelector('#nav');
const loadNav = () => {
    fetch("https://openapi.programming-hero.com/api/news/categories")
    .then(res => res.json())
    .then(data => displayNav(data?.data?.news_category))
}

let count = 0;
const displayNav = (categories) => {
    // console.log(categories[0].category_name);
    categories?.forEach(category => {
        count++;
        const li = document.createElement("li");
        li.innerHTML = `<a href="#" id="0${count}" onclick="displayNews(id)">${category?.category_name}</a>`;
        ul.appendChild(li);
    })
}
loadNav();

// document.getElementById("nav").addEventListener('click', (event)=> {
//     // console.log(event.target.innerText);
//     const newsResult = document.querySelector(".news-result");
// })

const displayNews = (id) => {
    // console.log(id);
    // newsResult.textContent = "";
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then(res => res.json())
    .then(data => showNews(data?.data))
}

const showNews = (allNews) => {
    const newsResult = document.querySelector(".news-result");
    newsResult.textContent = "";
    console.log(allNews);
    allNews?.forEach(news => {
        // author name: news?.author?.name
        // news title : news?.title
        // <img src="${news?.thumbnail_url}" alt="">
        console.log(news?.title);
        const div = document.createElement("div");
        div.classList.add("news");
        div.innerHTML = `
        <div class="news-details">
            <img src="${news?.image_url}" alt="">
            <div>
                <h3>${news?.title}</h3>
                <p class="news-desc">${news?.details.slice(0,700)}<span title="more...">...</span></p>
            </div>
        </div>
        `
        newsResult.appendChild(div);
    })
}
