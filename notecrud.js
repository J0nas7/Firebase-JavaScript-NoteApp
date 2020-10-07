class Note {
    constructor(title, date, content, id, star) {
        this.title = title;
        this.date = date;
        this.content = content;
        this.id = id;
        this.star = star;
    }
}
var noteArray = [];
var showFavs = false;
let theNotes = document.getElementsByClassName("notes")[0];
document.getElementById("theNoteTitle").focus();

function createNote() {
    var now = new Date().getTime();
    db.collection("notes").add({
        title: document.getElementById("theNoteTitle").value,
        date: now,
        content: document.getElementById("theNoteContent").value,
        star: "no"
    })
    .then(function(docRef) {
        document.getElementById("theNoteId").value = docRef.id;
        noteArray.push(new Note(
                                    document.getElementById("theNoteTitle").value, 
                                    now, 
                                    document.getElementById("theNoteContent").value, 
                                    docRef.id,
                                    "no"
                                ));
        updateNoteList();
        readNote(docRef.id);
    });
}

function updateNote(star = "no") {
    var now = new Date().getTime();
    var theId = document.getElementById("theNoteId").value;
    db.collection("notes").doc(theId).update({
        title: document.getElementById("theNoteTitle").value,
        date: now,
        content: document.getElementById("theNoteContent").value,
        star: star
    }).then(()=>{
        var theNote = noteArray.filter((note) => (note.id == theId))[0];
        theNote.title = document.getElementById("theNoteTitle").value;
        theNote.date =  now;
        theNote.content = document.getElementById("theNoteContent").value;
        theNote.star = star;
        updateNoteList();
        readNote(theId);
    });
}

function updateNoteList() {
    theNotes.innerHTML = "";
    noteArray.sort((a, b) => (b.date > a.date) ? 1 : -1);
    var theArray = noteArray;
    if (showFavs) {
        theArray = theArray.filter((note)=>(note.star == "yes"));
    }
    var searchTerm = document.getElementById("theSearch").value;
    if (searchTerm) {
        theArray = theArray.filter((note) => (
                                                note.title.includes(searchTerm) || 
                                                note.content.includes(searchTerm) || 
                                                timestampToShortDate(note.date).includes(searchTerm) ||
                                                timestampToReadableDate(note.date).includes(searchTerm)
                                            ));
    }
    document.getElementById("noteListCount").innerHTML = "("+theArray.length+")";
    theArray.forEach((note) => {
        theNotes.innerHTML +=   "<div class='aNote' id='"+note.id+"'>"+
                                "<span class='nTitle'>"+note.title+"</span>"+
                                "<span class='nDate'>"+timestampToShortDate(note.date)+"</span>"+
                                "<span class='nContent'>"+note.content.slice(0,10)+"...</span>"+
                                "<div class='clrBth fltLft'></div>"+
                                "</div>";
    });
    notesEventListener();
}

function readNote(noteId) {
    var theNote = noteArray.filter((note) => (note.id == noteId))[0];
    console.log(theNote);
    document.getElementById("theNoteId").value = theNote.id;
    document.getElementById("theNoteStar").value = theNote.star;
    document.getElementById("theNoteTitle").value = theNote.title;
    document.getElementById("theNoteDate").innerHTML = timestampToReadableDate(theNote.date);
    document.getElementById("theNoteContent").value = theNote.content;
    document.getElementById("notemenu").style.display = "block";

    document.getElementById("marked").style.display = (theNote.star == "yes" ? "block" : "none");
    document.getElementById("unmarked").style.display = (theNote.star == "no" || theNote.star == undefined ? "block" : "none");

    menuTrigger.classList.remove("triggered");
    noteList.classList.remove("open");
    
    var items = document.getElementsByClassName("aNote");
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove("active");
    }
    document.getElementById(theNote.id).classList.add("active");
}

function loadAllNotes() {
    db.collection("notes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            noteArray.push(new Note(doc.data().title, doc.data().date, doc.data().content, doc.id, doc.data().star));
        });
        updateNoteList();
    });
}
loadAllNotes();

function notesEventListener() {
    var elements = document.getElementsByClassName("aNote");
    var findNote = function() {
        var noteId = this.getAttribute("id");
        readNote(noteId);
    };
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', findNote, false);
    }
}

document.getElementById("newNote").addEventListener("click", () => {
    document.getElementById("theNoteId").value = "";
    document.getElementById("theNoteTitle").value = "";
    document.getElementById("theNoteTitle").focus();
    document.getElementById("theNoteDate").innerHTML = "today";
    document.getElementById("theNoteContent").value = "";
    document.getElementById("notemenu").style.display = "none";
    updateNoteList();
});

document.getElementById("deleteNote").addEventListener("click", () => {
    var noteId = document.getElementById("theNoteId").value;
    if (noteId) {
        db.collection('notes').doc(noteId).delete();
        noteArray = noteArray.filter((note) => (note.id != noteId));
        
        document.getElementById("theNoteId").value = "";
        document.getElementById("theNoteTitle").value = "";
        document.getElementById("theNoteTitle").focus();
        document.getElementById("theNoteDate").innerHTML = "today";
        document.getElementById("theNoteContent").value = "";
        document.getElementById("notemenu").style.display = "none";
        updateNoteList();
    } else {
        alert("Select a note you want to delete!");
    }
});

document.getElementById("toggleImportant").addEventListener("click", () => {
    var noteId = document.getElementById("theNoteId").value;
    var noteStar = document.getElementById("theNoteStar").value;
    if (noteId) {
        if (noteStar == "no" || noteStar == "undefined") {
            updateNote("yes");
        } else if (noteStar == "yes") {
            updateNote();
        }
    } else {
        alert("Select a note you want to mark as important!");
    }
});

document.getElementById("noteFavs").addEventListener("click", () => {
    if (!showFavs) {
        document.getElementById("noteFavs").innerHTML = "&#9733;";
        showFavs = true;
    } else if (showFavs) {
        document.getElementById("noteFavs").innerHTML = "&#9734;";
        showFavs = false;
    }
    updateNoteList();
});

// TYPING LISTENERS
let typingTimer;                //timer identifier
let doneTypingInterval = 3500;  //time in ms (5 seconds)
let listenTitle = document.getElementById('theNoteTitle');
let listenContent = document.getElementById('theNoteContent');

//on keyup, start the countdown
listenTitle.addEventListener('keyup', () => { elementCheck(); });
listenContent.addEventListener('keyup', () => { elementCheck(); });

function elementCheck() {
    clearTimeout(typingTimer);
    if (listenTitle.value && listenContent.value) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
}

//user is "finished typing," do something
function doneTyping () {
    if (document.getElementById("theNoteId").value) {
        // update an existing note
        updateNote();
    } else {
        // create a new note
        createNote();
    }
}

// user is typing in the searchbox
document.getElementById("theSearch").addEventListener('keyup', () => { updateNoteList(); });