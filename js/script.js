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
});

// ------------------
// Destinations Page
// ------------------
$(document).ready(function () {

    // Inyectar estilos del overlay hover
    $('<style>').text(`
        .card { overflow: hidden; }
        .card img.card-img { transition: transform 0.25s ease; }
        .card:hover img.card-img { transform: scale(1.05); }
        .card .card-img-overlay {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.68);
            transform: translateY(100%);
            transition: transform 0.50s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card:hover .card-img-overlay { transform: translateY(0); }
        .card-title { font-weight: bold; }
    `).appendTo('head');

    // Masonry
    var $grid = $('#masonry-grid');

    $grid.imagesLoaded(function () {
        $grid.masonry({
            columnWidth: '.grid-sizer',
            itemSelector: 'article',
            percentPosition: true,
            gutter: 0,
            horizontalOrder: false,
        });
    });

    // Filtro de categorías
    $('.filter-btn').on('click', function () {
        var filter = $(this).data('filter');

        if (filter === 'all') {
            $grid.find('article').show();
        } else {
            $grid.find('article').each(function () {
                var category = $(this).find('[data-category]').data('category');
                $(this).toggle(category === filter);
            });
        }

        $grid.imagesLoaded(function () {
            $grid.masonry('layout');
        });
    });

});

// ----------------
// Pricing Page
// ----------------

// Tooltips Bootstrap
$('[data-bs-toggle="tooltip"]').each(function () {
    new bootstrap.Tooltip(this, {
        trigger: 'hover focus',
        boundary: 'window'
    });
});

// Estilos para el ícono ℹ y hover de filas
$('<style>').text(`
    .tooltip-trigger {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        margin-left: 6px;
        font-size: 12px;
        font-style: normal;
        color: #fff;
        background-color: #0d6efd;
        border-radius: 50%;
        cursor: pointer;
        user-select: none;
        vertical-align: middle;
        line-height: 1;
    }
    .tooltip-trigger:hover {
        background-color: #0b5ed7;
    }
    tbody tr {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        cursor: pointer;
    }
    tbody tr:hover {
        transform: scaleY(1.08);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.53);
        position: relative;
        z-index: 1;
    }
    tbody tr:hover td {
        background-color: rgba(13, 110, 253, 0.06);
    }
`).appendTo('head');
