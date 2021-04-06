window.addEventListener('load', function () {
  // load the airtable library, call it "Airtable";
  var Airtable = require("airtable");
  // console.log(Airtable);

  // use airtable library, connect to our base using API key
  var base = new Airtable({ apiKey: 'keyloGFGjDynz8Y9k' }).base('app6zc4s5reZmh12Y');

  // get our collection base, select all the records
  // specify functions that will receive the data
  base("Wine")
    .select({})
    .eachPage(gotPageOfWines, gotAllWines);

  // an empty array to hold our data
  var wines = [];

  // callback function that receives our data
  function gotPageOfWines(records, fetchNextPage) {
    console.log("gotPageOfWines() ---> 1");
    // add the records from this page to our array
    wines.push(...records);
    // request more pages
    fetchNextPage();
  }

  // call back function that is called when all pages are loaded
  function gotAllWines(err) {
    console.log("gotAllWines() ---> 2");

    // report an error, you'd want to do something better than this in production
    if (err) {
      console.log("error loading data");
      console.error(err);
      return;
    }

    // call functions to log and show the books
    // consoleLogWines();
    showWines();
  }

  // just loop through the books and console.log them
  function consoleLogWines() {
    console.log("consoleLogWines()");
    wines.forEach(wine => {
      console.log("Wine:", wine);
    });
  }

  // look through our airtable data, create elements
  function showWines() {
    const container = document.querySelector('main.wines.container');
    const ul = document.createElement('ul');
    ul.classList.add('wine-list');
    container.appendChild(ul);

    // display wines in list
    wines.forEach(wine => {
      const li = document.createElement('li');
      li.classList.add('wine-item', wine.fields.body.toLowerCase(), wine.fields.type.replace(' ', "").toLowerCase());
      ul.appendChild(li);

      const imgBox = document.createElement('div');
      imgBox.classList.add('item-img');
      li.appendChild(imgBox);

      const titleBox = document.createElement('div');
      titleBox.classList.add('titles');
      li.appendChild(titleBox);

      const img = new Image();
      img.src = wine.fields.Attachments[0].url;
      imgBox.appendChild(img);

      const brand = document.createElement('h1');
      const designer = document.createElement('h1');
      brand.classList.add('brand');
      brand.innerText = wine.fields['Wine Brand'];
      designer.classList.add('designer');
      designer.innerText = wine.fields.Designer;
      titleBox.appendChild(brand);
      titleBox.appendChild(designer);

      const contexts = wine.fields.context;
      contexts.forEach(context => {
        li.classList.add(context.toLowerCase());
      });
    })

    // filter wines and display in the list
    const sortSpans = Array.from(document.querySelectorAll('.sort>span'));
    const items = Array.from(document.getElementsByClassName('wine-item'));
    let resultList = [];

    function handleSort() {
      if (!this.classList.contains('active')) {
        this.classList.add('active');
      } else {
        this.classList.remove('active');
      }

      let activeSpans = sortSpans.filter(span => {
        return span.classList.contains('active');
      })

      ul.innerHTML = '';

      if (!activeSpans.length) {
        items.forEach(li => {
          ul.appendChild(li);
        })
        // console.log(ul.children.length);
      }

      console.log(activeSpans);
      let classNames = activeSpans.map(ele => {
        return ele.className.replace(' active', "").slice(2);
      });
      // console.log(classNames);

      resultList = [];

      items.forEach(li => {
        classNames.forEach(name => {
          if (li.classList.contains(name)) {
            if (!resultList.includes(li)) {
              resultList.push(li);
            }
          }
        })
      })

      // console.log(resultList);

      resultList.forEach(res => {
        ul.appendChild(res);
      });
    }

    // add click event which to filter wines
    sortSpans.forEach(span => {
      span.addEventListener('click', handleSort);
    })

  }
})




