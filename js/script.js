// Theme and Preferences.
$(function () {

    // Objects and variables
    const $html = $("html")
    const $filterButton = $(".filter-btn");

    const defaultTheme = "light"
    const savedTheme = localStorage.getItem("theme") || defaultTheme;

    // Initialization
    $html.attr("data-bs-theme", savedTheme);
    // Apply initial state.
    applyTheme(savedTheme);

    initHeroTypingAnimation();
    initCardAnimation();
    initCounters();
    initRatingSystemAnimation();
    initFlipCardAnimation();
    initDestinationsPage();
    initPricingPage();

    // Events
    $filterButton.on("click",
        function () {
        $filterButton.removeClass("active");
        $(this).addClass("active");
    }
    );

    $filterButton.on("mouseenter", function () {
        $(this).addClass("filter-tilt")
    }).on("mouseleave", function () {
        $(this).removeClass("filter-tilt");
    })

    // Toggle-theme button action.
    $("#theme-toggle").on("click", function () {
        let currentTheme = $html.attr("data-bs-theme");
        let nextTheme = currentTheme === "light" ? "dark" : "light";

        $html.attr("data-bs-theme", nextTheme);
        localStorage.setItem("theme", nextTheme);

        // Change toggle-theme icon.
        $(this)
            .find("i")
            .toggleClass("bi-moon-fill bi-sun-fill");
        $(this).toggleClass("btn-dark btn-light");

        applyTheme(nextTheme);
    });

    // Functions
    function applyTheme(theme) {

        // Page 1: Home
        // Carousel arrow icons.
        // TODO: Figure out how those buttons/indicators work (this is a hack).
        $(".carousel-control-prev-icon, .carousel-control-next-icon")
            .css("filter", "invert(1)");

        // Page 2: Destinations
        if (theme === "dark") {
            $filterButton
                .removeClass("btn-outline-dark")
                .addClass("btn-outline-light");
        } else {
            $filterButton
                .removeClass("btn-outline-light")
                .addClass("btn-outline-dark");
        }
    }

    function initHeroTypingAnimation() {
        function typingEffect(element, speed) {
            let text = element.text();
            element.text("");
            let i = 0;

            let timer = setInterval(function () {
                if (i < text.length) {
                    element.append(text.charAt(i));
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, speed);
        }

        typingEffect($("#hero-title"), 80);
        // setTimeout(() => typingEffect($("#hero-subtitle"), 50), 1200);
    }

    function initCardAnimation() {
        if ($("#page-home").length) {
            $(".card")
                .on("mouseenter",
                    function () {
                        $(this).addClass("card-rotate");
                    })
                .on("mouseleave",
                    function () {
                        $(this).removeClass("card-rotate");
                    })
        }

        if ($("#page-agencies").length) {
            $(".card")
                .on("mouseenter",
                    function () {
                        $(this).addClass("card-scale");
                    })
                .on("mouseleave",
                    function () {
                        $(this).removeClass("card-scale");
                    })
        }
    }

    function initCounters() {
        $(".counter").each(function () {
            let $this = $(this);
            let target = +$this.data("target");

            $({ countNum: 0 }).animate(
                { countNum: target },
                {
                    duration: 2000,
                    easing: "swing",
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum);
                    }
                }
            );
        });
    }

    function initRatingSystemAnimation () {
        $(".rating .star").on("click", function (e) {
            let value = $(this).data("value");
            let group = $(this).parent().data("rating-group");
            let $star = $(`.rating[data-rating-group='${group}'] .star`);

            $star.removeClass("active bi-star-fill").addClass("bi-star");

            $star.each(function () {
                if ($(this).data("value") <= value) {
                    $(this)
                        .addClass("active bi-star-fill")
                        .removeClass("bi-star");
                }
            });
        });
    }

    function initFlipCardAnimation() {
        $(".flip-indicator")
            .on("click", function (e) {
                e.stopPropagation();
                $(this)
                    .closest(".flip-lower")
                    .toggleClass("flipped");
            })
            .on("mouseenter",
                function () {
                    $(this)
                        .find(".flip-indicator__icon")
                        .addClass("rotate");
                })
            .on("mouseleave",
                function () {
                    $(this)
                        .find(".flip-indicator__icon")
                        .removeClass("rotate");
                })
    }

    function initDestinationsPage() {
        const $grid = $("#masonry-grid");

        if (!$grid.length) return;

        $grid.imagesLoaded(function () {
            $grid.masonry({
                columnWidth: ".grid-sizer",
                itemSelector: "article",
                percentPosition: true,
                gutter: 0,
                horizontalOrder: false
            });
        });

        $(".filter-btn").on("click", function () {
            const filter = $(this).data("filter");

            if (filter === "all") {
                $grid.find("article").show();
            } else {
                $grid.find("article").each(function () {
                    const category = $(this).find(".card").data("category");
                    $(this).toggle(category === filter);
                });
            }

            $grid.imagesLoaded(function () {
                $grid.masonry("layout");
            });
        });
    }

    function initPricingPage() {
        if (!$('.pricing').length) return;

        $('[data-bs-toggle="tooltip"]').each(function () {
            new bootstrap.Tooltip(this, {
                trigger: 'hover focus',
                boundary: 'window'
            });
        });
    }
});