//Lispen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

// Save bookmark
function saveBookmark(e){
    //console.log("It Works Bitch");
    var siteName = document.getElementById("siteName").value;
    var siteURL = document.getElementById("siteURL").value;

    var bookmark = {
        name: siteName,
        url: siteURL
    }
    if (localStorage.getItem('bookmarks') === null) {
            //init array
        var bookmarks = [];
            //.push adds to array
        bookmarks.push(bookmark);
            // set to local storage         //JSON.stringify turns into string
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {
        //fetch bookmarks from local storage   
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        //add bookmark to array
        bookmarks.push(bookmark);
        //re-set back to local storage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    
    // re-fetch bookmarks
    fetchBookmarks();
    // Prevent form from submitting
    //e.preventDefault();
}
// Delete bookmark function

function deleteBookmark(url){
    //get bookmarks from Local storage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // loop through bookmarks
    for (var i = 0; i <bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }
    // reset back to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    // re-fetch bookmarks
    fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //console.log(bookmarks);
    // Get outpuy id
    var bookmarksResults = document.getElementById("bookmarksResults");
    
    //Build output
    
    bookmarksResults.innerHTML = " ";
    for(var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
        bookmarksResults.innerHTML += '<div class="well">'+
                                        '<h3>'+name+
                                        ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+ 
                                        ' <a onClick="deleteBookmark(\''+url+'\')"class="btn btn-danger" href="#">Delete</a>'+ 

                                        '</h3>'+
                                        '</div>';

    }
}