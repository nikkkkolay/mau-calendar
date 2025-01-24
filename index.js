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
        } else {
            leftControl.style.width = "40px";
            leftControl.style.opacity = "1";
            leftControl.style.marginRight = "12px";
        }

        if (scrollLeft >= maxScrollLeft) {
            rightControl.style.width = "0";
            rightControl.style.opacity = "0";
            rightControl.style.marginLeft = "0";
        } else {
            rightControl.style.width = "40px";
            rightControl.style.opacity = "1";
            rightControl.style.marginLeft = "12px";
        }
    };

    const handleScroll = (direction) => {
        if (direction === "left") {
            calendarWrapper.scrollBy({ left: -280, behavior: "smooth" });
        } else {
            calendarWrapper.scrollBy({ left: 280, behavior: "smooth" });
        }
    };

    calendarWrapper.addEventListener("scroll", updateControlsVisibility);
    updateControlsVisibility();

    leftControl.addEventListener("click", () => handleScroll("left"));
    rightControl.addEventListener("click", () => handleScroll("right"));
});
