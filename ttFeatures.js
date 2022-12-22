//Wait for Document is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    //Get feature list
    let list = document.getElementById("list");

    //Data container
    let data = null;

    //Fetch Content from Wordpress
    const getContent = async () => {
        let response = await fetch(
            "https://transformtrading.io/wp-json/wp/v2/tt_feature?orderby=date&order=asc"
        );
        data = await response.json();

        //Create list element with each feature
        data.forEach((each) => {
            let item = document.createElement("li");
            //Add splide slider class
            item.classList.add("splide__slide");
            //Content
            item.innerHTML = `
        ${each.font_awesome_icon}
        <br/>
        <h3>${each.title.rendered}</h3>
        ${each.content.rendered}
        `;
            //Add list element to DOM
            list.appendChild(item);
        });

        //Create slider and settings. add unique ID for multiple slider support.
        var splide = new Splide("#splide1", {
            arrows: false,
            type: "loop",
            perPage: 3,
            pagination: false,
            breakpoints: {
                767: {
                    perPage: 1,
                },
                1024: {
                    perPage: 3,
                },
            },
            focus: "center",
            gap: 30,
            autoScroll: {
                speed: 0.5
            }
        });

        //GEt Progress Bar
        var bar = splide.root.querySelector('.my-carousel-progress-bar');

        //Update progress bar when slide becomes active
        splide.on('mounted pagination:updated', function () {
            var end = splide.Components.Controller.getEnd() + 1;
            var rate = Math.min((splide.index + 1) / end, 1);
            bar.style.width = String(100 * rate) + '%';

        });
        //Mount Slider
        splide.mount(window.splide.Extensions);
    };

    //Run when DOM is loaded
    getContent();
});