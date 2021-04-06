window.addEventListener('load', function () {
  // handle scroll
  const circle = document.getElementsByClassName('circle')[0];
  const slide = document.getElementsByClassName('slide')[0];
  const slideBase = document.getElementsByClassName('slide-base')[0];
  // const oT1 = slide.offsetTop;
  // const oT2 = slideBase.offsetTop;
  // const oT3 = circle.offsetTop;


  function handleSlide(e) {
    const wineList = document.getElementsByClassName('wine-list')[0];
    const oL1 = slide.offsetLeft;
    const oL2 = slideBase.offsetLeft;
    const oL3 = circle.offsetLeft;
    const cLeft = e.pageX - oL1 - oL2 - oL3;

    function moving(e) {
      circle.style.left = e.pageX - cLeft - oL1 - oL2 + 'px';
      const percent = parseInt(circle.style.left) / parseInt(slideBase.offsetWidth - circle.offsetWidth);

      wineList.scrollLeft = (wineList.scrollWidth - wineList.clientWidth) * percent;

      const oL3 = circle.offsetLeft;
      if (oL3 < 0) {
        circle.style.left = 0;
      }
      if (oL3 > (slideBase.offsetWidth - circle.offsetWidth)) {
        circle.style.left = slideBase.offsetWidth - circle.offsetWidth + 'px';
      }
    }

    document.addEventListener('mousemove', moving, false);

    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', moving);
    }, false);
  }

  function handleSlide2(e) {
    console.log('down');
    console.log(e.touches);
    const wineList = document.getElementsByClassName('wine-list')[0];
    const oL1 = slide.offsetLeft;
    const oL2 = slideBase.offsetLeft;
    const oL3 = circle.offsetLeft;
    const cLeft = e.pageX - oL1 - oL2 - oL3;

    function moving(e) {
      console.log('move');
      circle.style.left = e.pageX - cLeft - oL1 - oL2 + 'px';
      const percent = parseInt(circle.style.left) / parseInt(slideBase.offsetWidth - circle.offsetWidth);

      wineList.scrollLeft = (wineList.scrollWidth - wineList.clientWidth) * percent;

      const oL3 = circle.offsetLeft;
      if (oL3 < 0) {
        circle.style.left = 0;
      }
      if (oL3 > (slideBase.offsetWidth - circle.offsetWidth)) {
        circle.style.left = slideBase.offsetWidth - circle.offsetWidth + 'px';
      }
    }

    document.addEventListener('touchmove', moving, false);

    document.addEventListener('touchend', function () {
      console.log('up');
      document.removeEventListener('touchmove', moving);
    }, false);
  }


  circle.addEventListener('mousedown', handleSlide, false);
  circle.addEventListener('touchstart', handleSlide2, false);
})
