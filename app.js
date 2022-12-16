document.getElementById('audio').play();

//snowfall
//
// I'm hotlinking to some SVG images from flaticon.com
// for use as the snowflakes. I hope that remains possible
// especially with the below attribution;
//
// ❄ Icons made by Freepik from www.flaticon.com
// ❄ https://www.flaticon.com/packs/snowflakes
//

let colorType = {
  type: "multi"
};

let colors = {
  color1: "rgba(255,255,255,1)",
  color2: "rgba(233,239,250,1)",
  color3: "rgba(222,241,250,1)",
  color4: "rgba(178,209,219,1)",
  color5: "rgba(135,143,145,1)"
};

let options = {
  alphaSpeed: 2,
  alphaVariance: 1,
  color: [colors.color1, colors.color2, colors.color3, colors.color4],
  composition: "source-over",
  count: 120,
  direction: 160,
  drift: 2,
  glow: 50,
  imageUrl: [
    "snowimg/snowflake.png",
    "snowimg/snowflake(1).png",
    "snowimg/snowflake(2).png",
    "snowimg/snowflake(3).png",
    "snowimg/snowflake(4).png",
    "snowimg/snowflake(5).png",
    "snowimg/snowflake(6).png",
    "snowimg/snowflake(7).png",
    "snowimg/snowflake(8).png"
  ],
  maxAlpha: 2,
  maxSize: 24,
  minAlpha: -0.2,
  minSize: 3,
  parallax: 6,
  rotation: 0.5,
  shape: ["image"],
  speed: 2.5,
  style: "fill",
  twinkle: false,
  xVariance: 20,
  yVariance: 20
};

window.onload = function () {
  initStats();
  initSparticles();
  initGui();
};

window.initSparticles = function () {
  var $main = document.querySelector("main");
  window.mySparticles = new Sparticles($main, options);
};

window.initStats = function () {
  var stats = new Stats();
  stats.domElement.classList.add("stats");
  document.body.appendChild(stats.domElement);
  function statsDisplay() {
    stats.begin();
    stats.end();
    requestAnimationFrame(statsDisplay);
  }
  requestAnimationFrame(statsDisplay);
};

window.initGui = function () {
  const s = window.mySparticles;
  const shapes = ["circle", "square", "triangle", "diamond", "line", "image"];
  const styles = ["fill", "stroke", "both"];
  const colorOptions = ["single", "multi", "rainbow"];
  const composites = [
    "source-over",
    "source-in",
    "source-out",
    "source-atop",
    "destination-over",
    "destination-in",
    "destination-out",
    "destination-atop",
    "lighter",
    "copy",
    "xor",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity"
  ];
  const rerender = () => {
    window.mySparticles.destroy();
    window.initSparticles();
  };
  var rerenderColors = function (v) {
    if (colorType.type === "rainbow") {
      options.color = "rainbow";
    } else if (colorType.type === "single") {
      options.color = colors.color1;
    } else {
      options.color = Object.keys(colors).map((i) => {
        return colors[i];
      });
    }
    rerender();
  };

  const gui = new dat.GUI({ load: options });
  const part = gui.addFolder("Particles");
  part.open();
  part.add(options, "count", 1, 1500, 1).onFinishChange(rerender);
  part.add(options, "shape", shapes).onFinishChange(rerender);
  part.add(options, "style", styles).onFinishChange(rerender);
  const image = part.addFolder("Image");
  // image.add( options, "imageUrl").onFinishChange(rerender);
  part.add(options, "minSize", 1, 50, 1).onFinishChange(rerender);
  part.add(options, "maxSize", 1, 50, 1).onFinishChange(rerender);
  const anim = gui.addFolder("Animation");
  anim.add(options, "direction", 0, 360, 1).onFinishChange(rerender);
  anim.add(options, "speed", 0, 100, 0.1).onFinishChange(rerender);
  anim.add(options, "rotation", 0, 100, 0.1).onFinishChange(rerender);
  const move = anim.addFolder("Movement");
  move.add(options, "parallax", 0, 10, 0.1).onFinishChange(rerender);
  move.add(options, "drift", 0, 10, 0.1).onFinishChange(rerender);
  move.add(options, "xVariance", 0, 50, 0.1).onFinishChange(rerender);
  move.add(options, "yVariance", 0, 50, 0.1).onFinishChange(rerender);
  const vis = gui.addFolder("Visual");
  vis.add(options, "glow", 0, 50).onFinishChange(rerender);
  vis.add(options, "composition", composites).onFinishChange(rerender);
  const alpha = vis.addFolder("Alpha");
  alpha.add(options, "twinkle").onFinishChange(rerender);
  alpha.add(options, "minAlpha", -2, 2, 0.1).onFinishChange(rerender);
  alpha.add(options, "maxAlpha", -2, 2, 0.1).onFinishChange(rerender);
  alpha.add(options, "alphaSpeed", 0, 50, 1).onFinishChange(rerender);
  alpha.add(options, "alphaVariance", 0, 20, 1).onFinishChange(rerender);
  const color = vis.addFolder("Color");
  color.open();
  color.add(colorType, "type", colorOptions).onFinishChange(rerenderColors);
  color.addColor(colors, "color1").onFinishChange(rerenderColors);
  color.addColor(colors, "color2").onFinishChange(rerenderColors);
  color.addColor(colors, "color3").onFinishChange(rerenderColors);
  color.addColor(colors, "color4").onFinishChange(rerenderColors);
  color.addColor(colors, "color5").onFinishChange(rerenderColors);
};

