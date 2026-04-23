// Theme and Preferences.
$(function () {

    // Load saved preference.
    let defaultTheme = "light"
    let savedTheme = localStorage.getItem("theme") || defaultTheme;
    $("html").attr("data-bs-theme", savedTheme);

    // Apply initial state.
    applyTheme(savedTheme);

    // Toggle-theme button.
    $("#theme-toggle").on("click", function () {

        let $html = $("html")
        let current = $html.attr("data-bs-theme");
        let next = current === "light" ? "dark" : "light";

        $html.attr("data-bs-theme", next);
        localStorage.setItem("theme", next);

        // Change toggle-theme icon.
        $(this)
            .find("i")
            .toggleClass("bi-moon-fill bi-sun-fill");
        $(this).toggleClass("btn-dark btn-light")

        applyTheme(next);
    });

    // Apply dark-mode.
    function applyTheme(theme) {

        // Carousel arrow icons.
        // TODO: Figure out how those buttons/indicators work (this is a hack).
        $(".carousel-control-prev-icon, .carousel-control-next-icon")
            .css("filter", "invert(1)");
    }
});

// Hero
$(function () {

    function typeEffect(element, speed) {
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

    typeEffect($("#hero-title"), 80);
    setTimeout(() => typeEffect($("#hero-subtitle"), 50), 1200);
});

// Cards
$(function () {

    if ($("#page-home").length) {
        $(".card")
            .on("mouseenter",
                function () {
                    $(this).css({
                        transform: "rotate(-5deg)",
                        transition: "0.3s"
                    });
                })
            .on("mouseleave",
                function () {
                    $(this).css({
                        transform: "rotate(0)",
                        transition: "0.3s"
                    });
                })
    }

    if ($("#page-agencies").length) {
        $(".card")
            .on("mouseenter",
                function () {
                    $(this).css({
                        transform: "scale(1.05)",
                        transition: "0.3s"
                    });
                })
            .on("mouseleave",
                function () {
                    $(this).css({
                        transform: "scale(1)",
                        transition: "0.3s"
                    });
                })
    }
});

// Counters
$(function () {

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
});

// Links (underline)
$(function () {
    $(".nav-underline").each(function () {
        $(this).find(".underline").css({
            "position": "absolute",
            "left": "0",
            "bottom": "0",
            "height": "2px",
            "width": "0%",
            "background-color": "currentColor",
            "transition": "width 0.3s ease"
        });

        // Hover animation
        $(this).hover(
            function () {
                $(this).find(".underline").css("width", "100%");
            },
            function () {
                $(this).find(".underline").css("width", "0%");
            }
        );
    });

});

// Page 3: Agencies
// Rating
$(function () {

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
