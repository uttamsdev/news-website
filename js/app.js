// toggle spinner 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
//toggle search result
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result-toggle').style.display = displayStyle;
}


toggleSpinner('none');

const dataCount = document.getElementById("count");
dataCount.style.display = "none";
const  ul = document.querySelector('#nav');
const loadNav = () => {
    toggleSearchResult('none');
    fetch("https://openapi.programming-hero.com/api/news/categories")
    .then(res => res.json())
    .then(data => displayNav(data?.data?.news_category)).catch((err) => {
        console.log(err);
      });
}

let count = 0;
const displayNav = (categories) => {
    // console.log(categories[0].category_name);
    categories?.forEach(category => {
        count++;
        const li = document.createElement("li");
        li.innerHTML = `<a href="#" id="0${count}"  onclick="displayNews(id)">${category?.category_name}</a>`;
        ul.appendChild(li);
    })
}
loadNav();

// document.getElementById("nav").addEventListener('click', (event)=> {
//     // console.log(event.target.innerText);
//     const newsResult = document.querySelector(".news-result");
// })

const displayNews = (id) => {
    toggleSpinner('block');
    // console.log(id);
    // newsResult.textContent = "";
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then(res => res.json())
    .then(data => showNews(data?.data)).catch((err) => {
        console.log(err);
      });
}

const showNews = (allNews) => {
    const newsResult = document.querySelector(".news-result");
    newsResult.textContent = "";
    console.log("len",allNews.length);
    const count = allNews.length;
    if(count !== 0){
        dataCount.innerText = `${count}  items found for this category`;
    }
    else {
        dataCount.innerText = `No news found`;
        toggleSpinner('none');
        newsResult.textContent = "";
        return;
    }
   
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
            <div>
                <div class="news-x">
                <img src="${news?.image_url}" alt="">
                <div>
                    <h3>${news?.title}</h3>
                    <p class="news-desc">${news?.details.slice(0,700)}<span title="more...">...</span></p>
                </div>
                 </div>
                <div class="author-info">
                    <div class="author-det">
                    <img class="author-img" src="${news?.author?.img}" alt="">
                    <div><p class="author-name">${news?.author?.name ? news?.author?.name :  "Data not available" }</p>
                    <p class="autor-date">${news?.author?.published_date.split(" ")[0]}</p> </div>
                    </div>
                    <p><i class="fa-regular fa-eye"> </i><span class="rating">${news?.total_view ? news?.total_view : 'Data not available'}</span></p>
                    <p><b>Rating:</b> ${news?.rating?.number}</p>
                    <i class="fa-sharp fa-solid fa-arrow-right" id="${news?._id}" onclick="loadNewsModal(id)" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                </div>
            </div>
        </div>
        `
        newsResult.appendChild(div);
        toggleSpinner('none');
        dataCount.style.display = "block";
        toggleSearchResult('block');
    })
}



// modal data load
const loadNewsModal = (id) => {

    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res => res.json())
    .then(data => showNewsModal(data?.data)).catch((err) => {
        console.log(err)
    });
    console.log("my id is",id);
    console.log("testing");
}
// toggleSpinner("none");

// show news modal
const showNewsModal = (news) => {
    console.log(news);
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = `
    <div class="news-details">
    <div>
        <div class="">
        <img class="modal-img" src="${news[0]?.image_url}" alt="">
        <div>
            <h3>${news[0]?.title}</h3>
            <p class="news-desc">${news[0]?.details.slice(0,400)}<span title="more...">...</span></p>
        </div>
         </div>
        <div class="author-info">
            <div class="author-det">
            <img class="author-img" src="${news[0]?.author?.img}" alt="">
            <div><p class="author-name">${news[0]?.author?.name ? news[0]?.author?.name :  "Data not available" }</p>
            <p class="autor-date">${news[0]?.author?.published_date.split(" ")[0]}</p> </div>
            </div>
            <p><i class="fa-regular fa-eye"> </i><span class="rating">${news[0]?.total_view ? news[0]?.total_view : 'Data not available'}</span></p>
            <p><b>Rating:</b> ${news[0]?.rating?.number}</p>
            <i class="fa-sharp fa-solid fa-arrow-right" id="${news?._id}" onclick="loadNewsModal(id)" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
        </div>
    </div>
</div>
    `
    
}