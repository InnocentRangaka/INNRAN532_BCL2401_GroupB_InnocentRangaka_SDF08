const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')
const portfolioItems = document.querySelectorAll('.portfolio > .portfolio__item');

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    navLinks.forEach(link => {
        // console.log(link);
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
});

// Looping through Portfolio Items
portfolioItems.forEach(item => {
    // Get the image element and extracting Image Information
    let itemImage = item.querySelector("img");
    let itemSrc = itemImage.src;
     // Processing Filename and creating Title:
    // separates the URL path into an array.
    // gets the last element (filename).
    // gets the filename before the .extension.
    // replaces hyphens and underscores with spaces.
    // created element with classes for styling and appended to the item.
    let fName = itemSrc.split("/").pop().split(".")[0];
    let name = fName.replace("-", " ").replace("_", " ");
    // Create a title element and append it to the item
    let createSpan = document.createElement("span");
    createSpan.classList.add("portfolio__title");
    createSpan.classList.add("text-shadow-dark");
    let itemName = name.replace(name[0], name[0].toUpperCase());
    createSpan.textContent = itemName;
    item.appendChild(createSpan);

    // Set href based on filename content:
    // converts the filename to lowercase for conditional checks.
    // Modifying Links Based on Filename.
    let fNameToLowerCase = fName.toLocaleLowerCase();

    if(fNameToLowerCase.includes("sdf")){
        item.href = `${item.href}?iframe=${item.getAttribute("data-view-path")};fname=${itemSrc.split("/").pop()}`;
    }
    else if(fNameToLowerCase.includes("portfolio")){
        item.href = item.href + '?img=' + itemSrc.split("/").pop();
    }

    // Add alt text and aria-label to image
    if(itemImage.alt.length === 0){
        itemImage.alt = `${itemName} image`;
    }

    if(itemImage.getAttribute("aria-label") === null){
        itemImage.setAttribute("aria-label", `${itemName} image`);
    }

    // Implementing Hover Effect for Titles:
    // These event listeners handle mouseover and mouseleave events on each item
    item.addEventListener("mouseover", function(e){
        let itemTitle = item.querySelector("span.portfolio__title");
        itemTitle.setAttribute("style", "z-index:1; opacity:1");
    });

    item.addEventListener("mouseleave", function(e){
        let itemTitle = item.querySelector("span.portfolio__title");
        itemTitle.setAttribute("style", "z-index:-1; opacity:0;");
    });
});

const getUrl = window.location.href;
const getUrlPath = window.location.pathname.replace("/","");
const getUrlParams = window.location.search.replace("?","");

// View item button functionality
const viewItemBtn = document.querySelector("button#viewItem");

if(viewItemBtn !== null && viewItemBtn !== undefined){
    viewItemBtn.addEventListener("click", function(){
        let showItem = document.querySelector(".site-view");
        showItem.classList.remove("hide");
        showItem.querySelector(".section-container").classList.add("loading");

        viewPortfolioItem();

        showItem.scrollIntoView(true);// Add smooth scrolling
    });
}

function viewPortfolioItem(){

    // Check if URL path leads to a portfolio item page
    if(getUrlPath === "portfolio-item.html" || getUrlPath === "portfolio-item"){
        // Extract tag and URL from query parameters
        let slitParams = getUrlParams.split("=");
        let tagName = slitParams[0];
        let getUrl = (tagName === "iframe")? slitParams[1].split(";")[0] : slitParams[1];
        let fpath = (tagName === "iframe")? slitParams[2] : getUrl;

        // Initialize variables
        let name = '';
        let itemViewer = document.querySelector(".site-view > .section-container");
        let isLoading = false;
        
        // Handle iframe scenario
        if(tagName === "iframe"){
            let createIframe = document.createElement("iframe");
            createIframe.id = "itemViewer";
            createIframe.src = getUrl;
            createIframe.setAttribute("frameborder", 0);
            createIframe.setAttribute("onload", "this.style.opacity = 1");
            createIframe.loading = "lazy";
            createIframe.width = itemViewer.offsetWidth;

            if(itemViewer.offsetWidth >= 1){
                // let makeHeight = Math.floor(itemViewer.offsetWidth + 200); 
                // createIframe.setAttribute("height", makeHeight);
            }
            
            itemViewer.innerHTML = createIframe.outerHTML;
            name = fpath.replace("-", " ").replace("_", " ");
            isLoading = true;
        }
        // Handle image scenario
        if(tagName === "img"){
            let createImg = document.createElement("img");
            createImg.src = `./assets/${tagName}/${getUrl}`;
            let fName = getUrl.split("/").pop().split(".")[0];
            name = fName.replace("-", " ").replace("_", " ");
            if(createImg.alt.length === 0){
                createImg.alt = `${name} image`;
            }
            createImg.setAttribute("onload", "this.style.opacity = 1");
            createIframe.width = itemViewer.offsetWidth;
            createIframe.height = itemViewer.offsetWidth;

            itemViewer.innerHTML = createImg.outerHTML;
            isLoading = true;
        }

        console.log();

        if(isLoading){
            let createP = document.createElement("p");
            createP.classList.add("fs-small");
            createP.textContent = "If the Item is not visible, click zoom button again.";
            itemViewer.appendChild(createP);
        }
    
        // Update header image
        headerImg = document.querySelector(".section__image > img");
        headerImg.src = `./assets/img/${fpath}`;
        headerImg.alt = `${name} image`;
        headerImg.setAttribute("style", "border-radius: 20px");
        
        // Remove loading class after 3.5 seconds
        setTimeout(() => {
            document.querySelector(".site-view .section-container").classList.remove("loading");
        }, 3500);
    }
}

// Immediately invoke the function
(function () {
    viewPortfolioItem();
}());

