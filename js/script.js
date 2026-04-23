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
