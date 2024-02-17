(function () {
    // const portfolioName = document.querySelector(".porfolio-name");
    // portfolioName.textContent += ` W: ${window.innerWidth} | H: ${window.innerHeight}`;
    // console.log(window.innerHeight);
})();

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')
const portfolioItems = document.querySelectorAll('.portfolio > .portfolio__item');

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    navLinks.forEach(link => {
        // console.log(link)
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
});

portfolioItems.forEach(item => {
    let itemImage = item.querySelector("img");
    let itemSrc = itemImage.src;
    let fName = itemSrc.split("/").pop().split(".")[0];
    let name = fName.replace("-", " ").replace("_", " ");
    let createSpan = document.createElement("span");
    createSpan.classList.add("portfolio__title");
    createSpan.classList.add("text-shadow-dark");
    let itemName = name.replace(name[0], name[0].toUpperCase());
    createSpan.textContent = itemName;
    item.appendChild(createSpan);

    let fNameToLowerCase = fName.toLocaleLowerCase();

    if(fNameToLowerCase.includes("sdf")){
        item.href = `${item.href}?iframe=${item.getAttribute("data-view-path")};fname=${itemSrc.split("/").pop()}`;
    }
    else if(fNameToLowerCase.includes("portfolio")){
        item.href = item.href + '?img=' + itemSrc.split("/").pop();
    }

    if(itemImage.alt.length === 0){
        itemImage.alt = `${itemName} image`;
    }

    item.addEventListener("mouseover", function(e){
        let itemTitle = item.querySelector("span.portfolio__title");
        itemTitle.setAttribute("style", "z-index:1; opacity:1");
        console.log(itemImage.alt.length)
    });

    item.addEventListener("mouseleave", function(e){
        let itemTitle = item.querySelector("span.portfolio__title");
        itemTitle.setAttribute("style", "z-index:-1; opacity:0;");
    });
});

const getUrl = window.location.href;
const getUrlPath = window.location.pathname.replace("/","");
const getUrlParams = window.location.search.replace("?","");
let viewItemBtn = document.querySelector("button#viewItem");

if(viewItemBtn !== null && viewItemBtn !== undefined){
    viewItemBtn.addEventListener("click", function(){
        let showItem = document.querySelector(".site-view");
        showItem.classList.remove("hide");

        viewPortfolioItem();

        showItem.scrollIntoView(true);
    });
}

function viewPortfolioItem(){
    if(getUrlPath === "portfolio-item.html"){
        let slitParams = getUrlParams.split("=");
        let tagName = slitParams[0];
        let getUrl = (tagName === "iframe")? slitParams[1].split(";")[0] : slitParams[1];
        let fpath = (tagName === "iframe")? slitParams[2] : getUrl;
        let name = '';
        let itemViewer = document.querySelector(".site-view > .section-container");
    
        if(tagName === "iframe"){
            let createIframe = document.createElement("iframe");
            createIframe.src = getUrl;
            createIframe.setAttribute("frameborder", 0);
            createIframe.setAttribute("onload", "this.style.opacity = 1");
    
            itemViewer.innerHTML = createIframe.outerHTML;
            name = fpath.replace("-", " ").replace("_", " ");
        }
        if(tagName === "img"){
            let createImg = document.createElement("img");
            createImg.src = `./${tagName}/${getUrl}`;
            let fName = getUrl.split("/").pop().split(".")[0];
            name = fName.replace("-", " ").replace("_", " ");
            if(createImg.alt.length === 0){
                createImg.alt = `${name} image`;
            }
            createImg.setAttribute("onload", "this.style.opacity = 1");
    
            itemViewer.innerHTML = createImg.outerHTML;
        }
    
        headerImg = document.querySelector(".section__image > img");
        headerImg.src = `./img/${fpath}`;
        headerImg.alt = `${name} image`;
        headerImg.setAttribute("style", "border-radius: 20px");
    }
}

