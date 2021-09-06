const ring = {
  "pathEl": null,
  "animateEl": null,
  "time": 2,
  "circles": [
    {
      "r": 50,
      "centerX": 50,
      "centerY": 50,
      "deltaExt": 2,
      "deltaInt": 0,
      "points": null,
      "toAnimation": null
    },
    {
      "r": 45,
      "centerX": 50,
      "centerY": 50,
      "deltaExt": 1,
      "deltaInt": 2,
      "points": null,
      "toAnimation": null
    }
  ]
};
const core = {
  "pathEl": null,
  "animateEl": null,
  "time": 1,
  "circles": [
    {
      "r": 30,
      "centerX": 50,
      "centerY": 50,
      "deltaExt": 2.5,
      "deltaInt": 2,
      "points": null,
      "toAnimation": null
    }
  ]
};
const svgEl = document.querySelector("svg#char");
ring.pathEl = svgEl.querySelector("path");
ring.animateEl = ring.pathEl.querySelector("animate");
core.pathEl = svgEl.querySelector("path.char_center");
core.animateEl = core.pathEl.querySelector("animate");
const glowEl = svgEl.querySelector(".char_center_glow-1");
function getCircle(r = 10, centerX = 0, centerY = 0) {
  const quarter = r * 0.55;
  const points = [
    {
      x: centerX,
      y: centerY - r,
      cx: centerX - quarter,
      cy: centerY - r
    },
    {
      x: centerX + r,
      y: centerY,
      cx: centerX + r,
      cy: centerY - quarter
    },
    {
      x: centerX,
      y: centerY + r,
      cx: centerX + quarter,
      cy: centerY + r
    },
    {
      x: centerX - r,
      y: centerY,
      cx: centerX - r,
      cy: centerY + quarter
    }
  ];
  return points;
}
function getD(...circles) {
  let d = "";
  circles.forEach((points) => {
    d += "M" + points[0].x + " " + points[0].y;
    points.forEach((point) => {
      d += " S" + point.cx + " " + point.cy + " " + point.x + " " + point.y;
    });
    d += " S" + points[0].cx + " " + points[0].cy + " " + points[0].x + " " + points[0].y;
    d += "Z";
  });
  return d;
}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function randomPoints(points, minus, plus) {
  points.forEach((point, i) => {
    points[i].x = point.x + getRandomArbitrary(minus, plus);
    points[i].y = point.y + getRandomArbitrary(minus, plus);
  });
  return points;
}
function updatePath(circleEl) {
  let toAnimations = [];
  circleEl.circles.forEach((circle) => {
    toAnimations.push(circle.toAnimation);
  });
  circleEl.animateEl.setAttribute("from", getD.apply(this, toAnimations));
  toAnimations.forEach((toAnimation, i) => {
    toAnimation = JSON.parse(JSON.stringify(circleEl.circles[i].points));
    toAnimations[i] = randomPoints(toAnimation, -circleEl.circles[i].deltaInt, circleEl.circles[i].deltaExt);
  });
  circleEl.circles.forEach((circle, i) => {
    circleEl.circles[i].toAnimation = toAnimations[i];
  });
  circleEl.animateEl.setAttribute("to", getD.apply(this, toAnimations));
  circleEl.animateEl.beginElement();
}
function initCircles(circles) {
  circles.forEach((circle, i) => {
    circles[i].points = getCircle(circle.r, circle.centerX, circle.centerY);
    circles[i].toAnimation = JSON.parse(JSON.stringify(circle.points));
  });
}
ring.animateEl.addEventListener("endEvent", () => {
  updatePath(ring);
});
core.animateEl.addEventListener("endEvent", () => {
  updatePath(core);
});
console.log("Lab Project - SVG Animation");
initCircles(ring.circles);
ring.pathEl.setAttribute("d", getD(ring.circles[0].points, ring.circles[1].points));
ring.animateEl.setAttribute("dur", ring.time + "s");
initCircles(core.circles);
core.pathEl.setAttribute("d", getD(core.circles[0].points));
core.animateEl.setAttribute("dur", core.time + "s");
glowEl.innerHTML = core.pathEl.outerHTML;
updatePath(ring);
updatePath(core);
