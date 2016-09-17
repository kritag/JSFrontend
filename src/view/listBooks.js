pl.view.listBooks = {
  setupUserInterface: function (argument) {
    var tableBodyEl = document.querySelector("table#books>tbody");
    var i = 0, keys = [], key = "", row={}:
    //load all book objects
    Book.loadAll();
    keys = Object.keys ( Book.instances);
    //for each book, create table row with cell for each attribute
    for (i=0; i<keys.length;i++){
      key=keys[i];
    }
  }
};