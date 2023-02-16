export default {
	particles: {
                  // line_linked: {
                  //   shadow: {
                  //     enable: true,
                  //     color: "#3CA9D1",
                  //     blur: 5
                  //   }
                  // },

                  number: {
                    value: 50,
                    limit: 100,
                    density: {
                      enable: true,
                      value_area: 700,
                    },
                  },
    //               move: {
    //   enable: true,
    //   speed: 10,
    //   direction: "left",
    //   random: true,
    //   straight: true,
    //   out_mode: "out",
    //   bounce: false,
    //   attract: {
    //     enable: false,
    //     rotateX: 600,
    //     rotateY: 1200
    //   }
    // },
  
                },
    interactivity: {
       detect_on : "window",
     events: {
  onhover: {
    enable: true,
    mode: "repulse",
  },
   onclick: {
    enable: true,
    mode: "push",
  },
    },
    resize: true
  },
  modes: {
      grab: {
        distance: 200,
        line_linked: {
          opacity: 1
        }
      },
  },
 
  // retina_detect:true,
}