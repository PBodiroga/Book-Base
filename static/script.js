//validate form for add/edit book
function validateForm() {
  let author = document.getElementById("author").value;
  let description = document.getElementById("desc").value;
  let price = document.getElementById("price").value;
  let genre = document.getElementById("genre").value;
  let title = document.getElementById("title").value;
  let img = document.getElementById("customFile").value;

  if (title == "") {
    document.getElementById("err1").innerHTML = "Title is required";
    return false;
  } else {
    document.getElementById("err1").innerHTML = "";
  }
  if (author == "") {
    document.getElementById("err2").innerHTML = "Author is required";
    return false;
  } else {
    document.getElementById("err2").innerHTML = "";
  }

  if (description == "") {
    document.getElementById("err3").innerHTML = "Description is required";
    return false;
  } else {
    document.getElementById("err3").innerHTML = "";
  }
  if (price == "") {
    document.getElementById("err4").innerHTML = "Price is required";
    return false;
  } else if (!/^\d+(,\d{1,2})?$/.test(price)) {
    document.getElementById("err4").innerHTML = "Price must be a number";
    return false;
  } else {
    document.getElementById("err4").innerHTML = "";
  }

  if (img == "") {
    document.getElementById("err5").innerHTML = "Path to img is required";
    return false;
  } else {
    document.getElementById("err5").innerHTML = "";
  }

  if (genre == "") {
    document.getElementById("err6").innerHTML = "Genre is required";
    return false;
  } else {
    document.getElementById("err6").innerHTML = "";
  }
  return true;
}

//show book
var currentPage = 1;

function showBook() {
  var booksList;

  if (localStorage.getItem("booksList") == null) {
    booksList = [];
  } else {
    booksList = JSON.parse(localStorage.getItem("booksList"));
  }

  var searchInput = document.getElementById("searchInput").value.toLowerCase();

  var html = "";
  var startIndex = (currentPage - 1) * 12;
  var endIndex = startIndex + 12;

  booksList.slice(startIndex, endIndex).forEach(function (element, index) {
    var title = element.title.toLowerCase();
    var author = element.author.toLowerCase();

    if (title.includes(searchInput) || author.includes(searchInput)) {
      html += `<div class="col-sm-12 col-md-6 col-lg-3"><div class="article1 d-flex flex-column align-items-center justify-content-center"><h4 id="naslov">${element.title}</h4>
                  <div class="aut"><i>${element.author}</i></div>
                  <img class="container-sm col-md-4 col-sm-4 image" src="img/${element.img}"  alt="book"/>
                  <div class="pricecls">${element.price}$</div></div>
                  <div class="buttons d-flex align-items-center justify-content-center gap-4">
                  <button class="btn btn-success" onclick="modalInfo(${index})">Info</button>
                  <button class="btn btn-danger" onclick="modal(${index})">Delete</button>
                  <button class="btn btn-warning" onclick="updateBook(${index})">Edit</button></div></div>`;
    }
  });

  document.getElementById("book").innerHTML = html;
  document.getElementById("currentPage").innerHTML = currentPage;
}

document.onload = showBook();

document.getElementById("searchInput").addEventListener("keyup", function () {
  showBook();
});

//add book

function addData() {
  if (validateForm() == true) {
    let author = document.getElementById("author").value;
    let description = document.getElementById("desc").value;
    let price = document.getElementById("price").value;
    let genre = document.getElementById("genre").value;
    let title = document.getElementById("title").value;
    let img = document.getElementById("customFile").value;

    if (localStorage.getItem("booksList") == null) {
      booksList = [];
    } else {
      booksList = JSON.parse(localStorage.getItem("booksList"));
    }
    booksList.push({
      title: title,
      author: author,
      price: price,
      description: description,
      genre: genre,
      img: img,
    });
    localStorage.setItem("booksList", JSON.stringify(booksList));
    showBook();
    document.getElementById("author").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("price").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("title").value = "";
    document.getElementById("customFile").value = "";
  }
}

//delete book

function deleteBook(index) {
  var booksList;
  if (localStorage.getItem("booksList") == null) {
    booksList = [];
  } else {
    booksList = JSON.parse(localStorage.getItem("booksList"));
  }

  var startIndex = (currentPage - 1) * 12;

  booksList.splice(startIndex + index, 1);
  document.getElementById("modalCenter").style.display = "none";
  localStorage.setItem("booksList", JSON.stringify(booksList));

  showBook();
}

//edit book

function updateBook(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";
  window.scrollTo({ top: 0 });
  document.getElementById("modalDelete").style.display = "none";
  document.getElementById("addbookid").classList.add("inline");
  const scroll = window.scrollY;

  var booksList;
  if (localStorage.getItem("booksList") == null) {
    booksList = [];
  } else {
    booksList = JSON.parse(localStorage.getItem("booksList"));
  }

  document.getElementById("author").value = booksList[index].author;
  document.getElementById("desc").value = booksList[index].description;
  document.getElementById("price").value = booksList[index].price;
  document.getElementById("genre").value = booksList[index].genre;
  document.getElementById("title").value = booksList[index].title;
  document.getElementById("customFile").value = booksList[index].img;

  document.querySelector("#Update").onclick = function () {
    if (validateForm() == true) {
      booksList[index].title = document.getElementById("title").value;
      booksList[index].author = document.getElementById("author").value;
      booksList[index].price = document.getElementById("price").value;
      booksList[index].genre = document.getElementById("genre").value;
      booksList[index].img = document.getElementById("customFile").value;
      booksList[index].description = document.getElementById("desc").value;

      localStorage.setItem("booksList", JSON.stringify(booksList));

      showBook();

      window.scrollTo({ top: scroll });

      document.getElementById("author").value = "";
      document.getElementById("desc").value = "";
      document.getElementById("price").value = "";
      document.getElementById("genre").value = "";
      document.getElementById("title").value = "";
      document.getElementById("customFile").value = "";

      document.getElementById("Submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  };
}
//pagination
function pagination() {
  if (localStorage.getItem("booksList") == null) {
    booksList = [];
  } else {
    booksList = JSON.parse(localStorage.getItem("booksList"));
  }
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    showBook();
  }
}

function nextPage() {
  var booksList;

  if (localStorage.getItem("booksList") == null) {
    booksList = [];
  } else {
    booksList = JSON.parse(localStorage.getItem("booksList"));
  }

  var totalPages = Math.ceil(booksList.length / 12);

  if (currentPage < totalPages) {
    currentPage++;
    showBook();
  }
}

window.onload = function () {
  pagination();
  showBook();
};

document.getElementById("searchInput").addEventListener("keyup", function () {
  showBook();
});

//modalDelete
function modal(index) {
  document.getElementById("modalDelete").style.display = "block";
  let element = document.getElementById("modalDelete");

  element.innerHTML = `
    <div id="modalCenter">
    <span class="x fa fa-close"></span>
      <div class="d-flex flex-column gap-2 align-items-center justify-content-center p-3">
    <p>Are you sure you want to delete it?</p>
      <div id="buttonsModal" class="d-flex align-items-center justify-content-center gap-3">
        <button class="btn btn-dark" onclick = "deleteBook(${index})">Yes</button>
        <button class="closeBtn btn btn-dark">No</button>
      </div>
      </div>
    </div>
    `;

  document.getElementById("modalCenter").style.display = "block";
  document.querySelector(".closeBtn").addEventListener("click", function () {
    document.getElementById("modalDelete").style.display = "none";
  });
  document.querySelector(".x").addEventListener("click", function () {
    document.getElementById("modalDelete").style.display = "none";
  });
}
//modalInfo
function modalInfo(index) {
  var booksList = JSON.parse(localStorage.getItem("booksList"));

  var html = `
    <div id="modalInfo">
      <div class="card scroller">
        <div id="flexX"><span id="x2" class="x2 fa fa-close fa-2x"></span></div>
        <img src="img/${booksList[index].img}" alt="">
        <div>
          <h2>${booksList[index].title}</h2>
          <h4>${booksList[index].author}</h4>
          <h5><i>${booksList[index].genre}</i></h5>
          <p>${booksList[index].description}</p>
        </div>
      </div>
    </div>`;

  document.getElementById("modalInformation").innerHTML = html;
  document.getElementById("x2").addEventListener("click", function () {
    document.getElementById("modalInfo").style.display = "none";
  });
}

//toggle
function toggle() {
  var element = document.getElementById("addbookid");
  element.classList.toggle("hidden");
  element.classList.remove("inline");
}

function toggleMenu() {
  document.body.classList.toggle("open");
}

//header animation
window.onload = function () {
  document.getElementById("header").classList.add("anim");
};

//logout
function logOut() {
  window.location.href = "login.html";
  localStorage.setItem("loggedIn", false);
  localStorage.removeItem("token");
}


//sort
function sortBooks() {
  var booksList;

  if (localStorage.getItem("booksList") == null) {
    booksList = [];
  } else {
    booksList = JSON.parse(localStorage.getItem("booksList"));
  }

  var sortOption = document.querySelector(
    'input[name="sortOption"]:checked'
  ).id;

  switch (sortOption) {
    case "radioName":
      booksList.sort(function (a, b) {
        var titleA = a.title.toLowerCase();
        var titleB = b.title.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      break;

    case "radioPrice":
      booksList.sort(function (a, b) {
        var priceA = parseFloat(a.price);
        var priceB = parseFloat(b.price);
        return priceA - priceB;
      });
      break;

    case "radioGenre":
      booksList.sort(function (a, b) {
        var genreA = a.genre.toLowerCase();
        var genreB = b.genre.toLowerCase();
        if (genreA < genreB) return -1;
        if (genreA > genreB) return 1;
        return 0;
      });
      break;
  }

  localStorage.setItem("booksList", JSON.stringify(booksList));
  showBook();
}

//deleteall

function deleteAll() {
  if (confirm("Are you sure you want to delete all books?") == true) {
    localStorage.removeItem("booksList");
    return showBook();
  } else {
    return false;
  }
}



