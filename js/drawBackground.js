window.addEventListener('load', function () {
  // window.addEventListener('resize', function () {
  //   drawBackground()
  // });
  (function (fn) {
    window.addEventListener("resize", resizeThrottler, false);
    var resizeTimeout;

    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          fn();
        }, 66);
      }
    }
  }(drawBackground));

  drawBackground();

  function drawBackground() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    let exist = document.getElementsByTagName('canvas')[0];
    if (exist) {
      exist.remove();
      let canvas = makeCanvasEle(w, h);
      drawSquare(canvas, w, h);
    } else {
      let canvas = makeCanvasEle(w, h);
      drawSquare(canvas, w, h);
    }
  }

  function makeCanvasEle(w, h) {
    let canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.classList.add('canvas');
    document.body.appendChild(canvas);
    return canvas;
  }

  function drawSquare(canvas, w, h) {
    var ctx = canvas.getContext("2d");
    // describe background
    var gradient = ctx.createLinearGradient(0, 0, w, h);

    gradient.addColorStop(0, "#e0e0e0");
    gradient.addColorStop(1, "#ffffff");
    ctx.fillStyle = gradient;
    ctx.fillRect = (0, 0, canvas.width, canvas.height);
    //describe border
    if (w > 768) {
      var grid_cols = Math.ceil(w / 90);
    } else {
      var grid_cols = Math.ceil(w / 30);
    }
    var grid_rows = 90;
    var cell_height = 90;
    var cell_width = canvas.width / grid_cols;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#646464";
    // begin draw
    ctx.beginPath();
    // draw hor lines
    for (var col = 0; col <= grid_cols; col++) {
      var x = col * cell_width;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }
    //draw ver lines
    for (var row = 0; row <= grid_rows; row++) {
      var y = row * cell_height;
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    // over draw
    ctx.stroke();
  }
})
