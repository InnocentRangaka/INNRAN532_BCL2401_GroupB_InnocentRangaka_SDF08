(function () {
    const portfolioName = document.querySelector(".porfolio-name");
    portfolioName.textContent += ` W: ${window.innerWidth} | H: ${window.innerHeight}`;
    console.log(window.innerHeight);
})();