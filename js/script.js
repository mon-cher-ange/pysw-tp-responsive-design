// Theme and Preferences.
$(function () {
    // Objects and variables
    const $html = $("html")
    const $filterButton = $(".filter-btn");
    const $themeToggle = $("#theme-toggle");
    const $themeToggleIcon = $themeToggle.find("i");

    const defaultTheme = "light"
    const savedTheme = localStorage.getItem("theme") || defaultTheme;

    // Theme initialization.
    $html.attr("data-bs-theme", savedTheme);

    // Set initial icon/button state.
    if (savedTheme === "dark") {
        $themeToggleIcon
            .removeClass("bi-moon-fill")
            .addClass("bi-sun-fill");
        $themeToggle
            .removeClass("btn-outline-secondary")
            .addClass("btn-outline-light");
    }

    // Theme toggle trigger event.
    $themeToggle.on("click", function () {
        let currentTheme = $html.attr("data-bs-theme");
        let nextTheme = currentTheme === "light" ? "dark" : "light";

        $html.attr("data-bs-theme", nextTheme);
        localStorage.setItem("theme", nextTheme);

        // Change toggle-theme icon.
        if (nextTheme === "dark") {
            $themeToggleIcon
                .removeClass("bi-moon-fill")
                .addClass("bi-sun-fill");
            $themeToggle
                .removeClass("btn-outline-secondary")
                .addClass("btn-outline-light");
        } else {
            $themeToggleIcon
                .removeClass("bi-sun-fill")
                .addClass("bi-moon-fill");
            $themeToggle
                .removeClass("btn-outline-light")
                .addClass("btn-outline-secondary");
        }

        applyTheme(nextTheme);
    });

    // Apply initial states.
    applyTheme(savedTheme);
    initHeroTypingAnimation();
    initCardAnimation();
    initCounters();
    initRatingSystemAnimation();
    initFlipCardAnimation();
    initDestinationsContent();
    initPricingPage();
    initContactForm();
    initBlogFilters();
    initRevealComments();
    initArticleReveal();
    initPhishingAnswersVerification();

    // Events
    $filterButton.on("click",
        function () {
        $filterButton.removeClass("active");
        $(this).addClass("active");
    });

    $filterButton.on("mouseenter", function () {
        $(this).addClass("filter-tilt")
    }).on("mouseleave", function () {
        $(this).removeClass("filter-tilt");
    })

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

    function initDestinationsContent() {
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

    function initContactForm() {
        $('#contact-form input, #contact-form textarea').on('input', function () {
            if (this.checkValidity()) {
                $(this).attr('aria-invalid', 'false');
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).attr('aria-invalid', 'true');
                $(this).removeClass('is-valid').addClass('is-invalid');
            }
        });

        // Send form.
        $('#contact-form').on('submit', function (e) {
            e.preventDefault();

            let form = this;

            if (!form.checkValidity()) {
                $(form).addClass('was-validated');
                return;
            }

            // Show spinner.
            $('#contact-loading').removeClass('d-none');

            // Disable button.
            $('#contact-form button').prop('disabled', true).text('Enviando...');

            // Fake sent.
            setTimeout(function () {
                // Hide spinner.
                $('#contact-loading').addClass('d-none');

                // Show modal.
                let modal = new bootstrap.Modal(document.getElementById('contactModal'));
                modal.show();

                // Reset form fields.
                form.reset();
                $('.is-valid').removeClass('is-valid');
                $(form).removeClass('was-validated');

                // Restore button.
                $('#contact-form button').prop('disabled', false).text('Enviar');

            }, 2000);
            console.log("Formulario válido. Listo para enviar.");
        });
    }

    function initBlogFilters() {
        $("#blog-filters button").on("click", function () {

            $("#blog-filters button").removeClass("active");
            $(this).addClass("active");

            const filter = $(this).data("filter");

            if (filter === "all") {
                $(".article-item").fadeIn();
            } else {
                $(".article-item").hide();
                $(`.article-item[data-category="${filter}"]`).fadeIn();
            }
        });
    }

    function initRevealComments() {
        $(".comment-reveal").each(function (i) {
            setTimeout(() => {
                $(this).addClass("show-comment");
            }, i * 300);
        });
    }

    function initPhishingAnswersVerification() {
        $("#phishing-check").on("click", function () {
            const selected = $(".phishing-option:checked").map(function () {
                return $(this).val();
            }).get();

            const feedback = $("#phishing-feedback");
            feedback.empty();

            // Correct answers.
            const answers = ["email", "link", "urgencia"];

            // If user choose "none".
            if (selected.includes("ninguna")) {
                feedback
                    .removeClass()
                    .addClass("alert alert-danger")
                    .text("Cuidado: este correo tiene varias señales claras de fraude. Nunca hagas clic ni ingreses datos.");
                return;
            }

            // Verify if user checked all the correct answers.
            const successes = answers.every(v => selected.includes(v));
            const leftover = selected.filter(v => !answers.includes(v));

            if (successes && leftover.length === 0) {
                feedback
                    .removeClass()
                    .addClass("alert alert-success")
                    .text("¡Muy bien! Identificaste correctamente las señales de phishing en este correo.");
            } else if (selected.length === 0) {
                feedback
                    .removeClass()
                    .addClass("alert alert-warning")
                    .text("Intenta marcar al menos una opción que consideres sospechosa.");
            } else {
                feedback
                    .removeClass()
                    .addClass("alert alert-warning")
                    .html("Has identificado algunas señales, pero no todas.<br><small>Pista: revisa el remitente, el enlace y el tono de urgencia.</small>");
            }
        });
    }

    /* Animations */
    function initArticleReveal() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show-article");
                }
            });
        }, { threshold: 0.2 });

        document
            .querySelectorAll(".article-reveal")
            .forEach(el => observer.observe(el));
    }
});