window.addEventListener('load', function () {
  // handle scroll
  const circle = document.getElementsByClassName('circle')[0];
  const slide = document.getElementsByClassName('slide')[0];
  const slideBase = document.getElementsByClassName('slide-base')[0];
  // const oT1 = slide.offsetTop;
  // const oT2 = slideBase.offsetTop;
  // const oT3 = circle.offsetTop;

  /*
          offsetLeft1      oL2      oL3    oL4
          window=>slide 
                      slide=>s-base
                            s-base=>circle
                                      circle=>mouse
        |               ______________________________________________
        |<============>|<======>[<------>| <=> ~ |------------]      |
        |              |_____________________________________________|
        |<==========pageX====================>
  */

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

      // change the size of background of body
      const changeRate = 0.7 * percent;
      let rateRes = parseInt((changeRate + 0.3) * 100);
      rateRes = rateRes < 30 ? 30 : rateRes > 100 ? 100 : rateRes;
      // console.log(rateRes);
      document.body.style.backgroundImage = `radial-gradient(50% 50% at 50% 50%, #FFA9A9 0%, #FFFFFF ${rateRes}% )`;
      // console.log(document.body.style.backgroundImage);
    }

    document.addEventListener('mousemove', moving, false);

    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', moving);
    }, false);
  }


  circle.addEventListener('mousedown', handleSlide, false);
})