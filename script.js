//change content function
function changeContent(section) {
  if (section != null && section != undefined) {
    var element = document.getElementById(section);
    var mainSections = document.getElementsByClassName("main-content");

    //changing color of navigation links
    var navbarLinks = document.querySelectorAll("nav li a");
    navbarLinks.forEach((navbarLink) => {
      if (navbarLink.dataset.link == section) {
        navbarLink.classList.add("text-blue-400");
        navbarLink.classList.remove("text-white");
        navbarLink.classList.add("active-link");
      } else {
        navbarLink.classList.remove("text-blue-400");
        navbarLink.classList.add("text-white");
        navbarLink.classList.remove("active-link");
      }
    });

    //changing content
    for (let i = 0; i < mainSections.length; i++) {
      let mainSection = mainSections[i];
      if (mainSection.id == section) {
        element.classList.add("flex");
        element.classList.remove("hidden");

        TweenMax.fromTo(
          element,
          1,
          { opacity: 0, y: -100 },
          { opacity: 1, y: 0, ease: "elastic" }
        );
      } else {
        mainSection.classList.add("hidden");
        mainSection.classList.remove("flex");
      }
    }
  }
}

//document loaded event
document.addEventListener("DOMContentLoaded", function (event) {
  //show home page as default
  changeContent("home");

  //navigation links on click events
  var navbarLinks = document.querySelectorAll("nav li a");
  navbarLinks.forEach((link) => {
    link.addEventListener("click", function () {
      changeContent(this.dataset.link);
    });
  });

  //regiser gsap the plugin
  gsap.registerPlugin(MotionPathPlugin);
  gsap.to("#planet1", {
    duration: 40,
    repeat: -1,
    repeatDelay: 0,
    ease: "none",
    motionPath: {
      path: "#pathPlanet1",
      align: "#pathPlanet1",
      autoRotate: true,
      alignOrigin: [0.5, 0.5],
    },
  });

  gsap.to("#planet2", {
    duration: 40,
    repeat: -1,
    repeatDelay: 0,
    ease: "none",
    motionPath: {
      path: "#pathPlanet2",
      align: "#pathPlanet2",
      autoRotate: true,
      alignOrigin: [0.5, 0.5],
    },
  });

  let smallPlanets = document.getElementsByClassName("smallPlanet");
  for (let i = 0; i < smallPlanets.length; i++) {
    const element = smallPlanets[i];
    gsap.to(element, {
      repeat: -1,
      duration: 15,
      repeatDelay: 0,
      yoyo: true,
      ease: "none",
      y: Math.floor(Math.random() * 201) - 100,
      x: Math.floor(Math.random() * 201) - 100,
    });
  }

  let stars = document.getElementsByClassName("star");
  for (let i = 0; i < stars.length; i++) {
    const element = stars[i];
    TweenMax.fromTo(
      element,
      3,
      { opacity: Math.random() * 0.5, y: 0 },
      {
        opacity: Math.random() * 1,
        y: 0,
        repeat: -1,
        duration: Math.random() * 3,
        repeatDelay: 0,
        yoyo: true,
      }
    );
  }
});

//get current active link
function getActiveLink() {
  return document.getElementsByClassName("active-link")[0];
}

//scroll animation
window.addEventListener("wheel", onScroll);

function onScroll(event) {
  let link = undefined;
  if (event.wheelDelta < 0) {
    link =
      getActiveLink().parentElement.nextElementSibling?.lastElementChild
        ?.dataset.link;
    if (link != undefined) {
      changeContent(link);
    }
  } else {
    link =
      getActiveLink().parentElement.previousElementSibling?.lastElementChild
        .dataset.link;
    if (link != undefined) {
      changeContent(link);
    }
  }
}
