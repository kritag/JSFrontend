function Books( slots){
  this.isbn=slots.isbn;
  this.title=slots.title;
  this.year=slots.year;
};

Book.instances = {};

Book.convertRow2Obj = function(bookRow){
  var book = new Book(bookRow);
  return book;
};

Book.loadAll = function () {
  var key="", keys=[], booksString="", books={}, i=0;
  try {
    if(localStorage.getItem("books")){
      booksString = localStorage.getItem("books")
    }
  } catch(e) {
    alert("Error reading from local storage \n" + e);
  }
  if(booksString){
    bookTable = JSON.parse( booksString);
    keys = Object.keys (books);
    console.log(keys.length + " books loaded.");
    for(var i = 0; i< keys.length;i++){
      key = keys[i];
      Book.instances[key] = Book.convertRow2Obj(books[key]);
    }
  }
};

Book.saveAll = function (){
  var bookTableString="", error=false, nmrOfBooks=Object.keys(Book.instances).length;
  try{
    bookTableString=JSON.stringify(Book.instances);
    localStorage["bookTable"]=bookTableString;
  }
  catch(e){
    alert("Error when writing to local storage \n" + e)
    error = true;
  }
  if (!error){
    console.log(nmrOfBooks + " books saved.");
  }
};

Book.add = function(slots){
  var book = new Book(slots);
  Book.instances[slots.isbn] = book;
  console.log("Book " + slots.isbn + " created.");
};

Book.update = function(slots){
  var book = Book.instances[slots.isbn], year = parseInt(slots.year);
  if(book.title !== slots.title){
    book.title = slots.title;
  }
  if(book.year !== year){
    book.year = year;
  }
  console.log("Book " + slots.isbn + " modified.");
};

Book.destroy = function(isbn){
  if (Book.instances[isbn]){
    console.log("Book " + isbn + " deleted.");
    delete Book.instances[isbn];
  }
  else{
    console.log("There is no book with " + isbn " in the database.")
  }
};

/**********************
Methods for testing
**********************/
//Create test data
Book.createTestData = function (){
  Book.instances["006251587X"] = new Book({isbn:"006251587X", title:"Weaving the Web", year:2000});
  Book.instances["0465026567"] = new Book({isbn:"0465026567", title:"G&ouml;del, Escher, Bach", year:1999});
  Book.instances["0465030793"] = new Book({isbn:"0465030793", title:"I Am A Strange Loop", year:2008});
  Book.saveAll();
};
//Clear data
Book.clearData = function (){
  if(confirm("Do you really want to delete all your book data=")){
    localStorage["bookTable"] = "{}";
  }
};