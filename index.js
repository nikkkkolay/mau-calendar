document.addEventListener("DOMContentLoaded", () => {
    const calendarWrapper = document.querySelector(".flat-calendar-wrapper");
    const leftControl = document.querySelector(".control-left");
    const rightControl = document.querySelector(".control-right");

    const updateControlsVisibility = () => {
        const scrollLeft = calendarWrapper.scrollLeft;
        const maxScrollLeft = calendarWrapper.scrollWidth - calendarWrapper.clientWidth;

        if (scrollLeft <= 0) {
            leftControl.style.width = "0";
            leftControl.style.opacity = "0";
            leftControl.style.marginRight = "0";
            leftControl.childNodes[1].style.fontSize = "0";
        } else {
            leftControl.style.width = "40px";
            leftControl.style.opacity = "1";
            leftControl.style.marginRight = "12px";
            leftControl.childNodes[1].style.fontSize = "26px";
        }

        if (scrollLeft >= maxScrollLeft) {
            rightControl.style.width = "0";
            rightControl.style.opacity = "0";
            rightControl.style.marginLeft = "0";
            rightControl.childNodes[1].style.fontSize = "0";
        } else {
            rightControl.style.width = "40px";
            rightControl.style.opacity = "1";
            rightControl.style.marginLeft = "12px";
            rightControl.childNodes[1].style.fontSize = "26px";
        }
    };

    const handleScroll = (direction) => {
        if (direction === "left") {
            calendarWrapper.scrollBy({ left: -340, behavior: "smooth" });
        } else {
            calendarWrapper.scrollBy({ left: 340, behavior: "smooth" });
        }
    };

    calendarWrapper.addEventListener("scroll", updateControlsVisibility);
    updateControlsVisibility();

    leftControl.addEventListener("click", () => handleScroll("left"));
    rightControl.addEventListener("click", () => handleScroll("right"));

    const removeFocusClass = () => {
        const focusElements = document.querySelectorAll(".day.active.focus");
        focusElements.forEach((element) => {
            element.classList.remove("focus");
        });
    };

    calendarWrapper.addEventListener("click", (e) => {
        const activeElement = e.target.closest(".day.active");
        if (activeElement) {
            const tooltip = activeElement.querySelector(".flat-calendar-tooltip");
            const tooltipContainer = document.querySelector(".flat-calendar-tooltip-container");

            const elementRect = activeElement.getBoundingClientRect();
            const wrapperRect = e.currentTarget.getBoundingClientRect();
            const positionX = elementRect.left - wrapperRect.left;

            tooltipContainer.innerHTML = "";
            tooltip.style.marginLeft = `${positionX}px`;
            removeFocusClass();

            const tooltipCopy = tooltip.cloneNode(true);
            activeElement.classList.add("focus");

            tooltipContainer.appendChild(tooltipCopy);
        }
    });

    document.addEventListener("click", (e) => {
        const activeElement = e.target.closest(".day.active");
        if (!activeElement) {
            const tooltipContainer = document.querySelector(".flat-calendar-tooltip-container");
            tooltipContainer.innerHTML = "";
            removeFocusClass();
        }
    });

    window.addEventListener("resize", () => {
        const tooltipContainer = document.querySelector(".flat-calendar-tooltip-container");
        tooltipContainer.innerHTML = "";
        removeFocusClass();
    });

    calendarWrapper.addEventListener("scroll", () => {
        const tooltipContainer = document.querySelector(".flat-calendar-tooltip-container");
        tooltipContainer.innerHTML = "";
        removeFocusClass();
    });
});
