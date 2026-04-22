// Theme and Preferences.
$(document).ready(function () {

    // Load saved preference.
    let savedTheme = localStorage.getItem("theme") || "light";
    $("html").attr("data-bs-theme", savedTheme);

    // Apply initial state.
    applyTheme(savedTheme);

    // Toggle-theme button.
    $("#theme-toggle").on("click", function () {

        let current = $("html").attr("data-bs-theme");
        let next = current === "light" ? "dark" : "light";

        $("html").attr("data-bs-theme", next);
        localStorage.setItem("theme", next);

        applyTheme(next);

        // Change toggle-theme icon.
        $(this).find("i").toggleClass("bi-moon bi-sun");
    });

    // Apply dark-mode.
    function applyTheme(theme) {

        // Navbar
        if (theme === "dark") {
            $("#main-navbar")
                .removeClass("bg-light navbar-light")
                .addClass("bg-dark navbar-dark");
        } else {
            $("#main-navbar")
                .removeClass("bg-dark navbar-dark")
                .addClass("bg-light navbar-light");
        }

        // Hero overlay.
        if (theme === "dark") {
            $("#hero-overlay")
                .removeClass("text-dark")
                .addClass("text-light")
                .css({
                    "text-shadow": "0 0 12px rgba(0,0,0,1)",
                    "font-size": "clamp(2rem, 4vw, 3.5rem)"
                });
        } else {
            $("#hero-overlay")
                .removeClass("text-light")
                .addClass("text-dark")
                .css({
                    "text-shadow": "0 0 10px rgba(255,255,255,0.9)",
                    "font-size": "clamp(2rem, 4vw, 3.5rem)"
                });
        }

        // Carousel arrow icons.
        $(".carousel-control-prev-icon, .carousel-control-next-icon")
            .css("filter", "invert(1)");
    }
});


// Hero
$(document).ready(function () {

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
$(document).ready(function () {

    $(".card").hover(
        function () {
            $(this).css({
                transform: "scale(1.05)",
                transition: "0.3s"
            });
        },
        function () {
            $(this).css({
                transform: "scale(1)",
                transition: "0.3s"
            });
        }
    );
});


// Counters
$(document).ready(function () {

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

$(document).ready(function () {
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

        // Animación hover
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