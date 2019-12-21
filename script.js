$(document).ready(function () {
    notesFromLocalStorage = null;
    notesCount = null;
    colors = ["rgba(255, 0, 0, 0.3)", "rgba(51, 255, 153, 0.3)", "rgba(255, 0, 255, 0.3)", "rgba(255, 215, 51, 0.3)", "rgba(0, 255, 255, 0.3)"];

    getItemsFromLocalStorage();

    //Display/Hide no notes banner - Starts
    if (notesCount == null || notesCount == 0) {
        $("#no-notes").css("display", "block");
        setItemsToLocaStorage(0, []);
    } else {
        displayNotes();
    }
    //Display/Hide no notes banner - Ends

    //To Enable/Disable add button to avoid empty notes - Starts
    $("#ip-text-box").keyup(function () {
        if ($("#ip-text-box").val() != "") {
            $("#add-btn").removeAttr("disabled");
        } else {
            $("#add-btn").attr("disabled", "disabled");
        }
    });
    //To Enable/Disable add button to avoid empty notes - Ends

    //To add notes to local storage - Starts
    $("#add-btn").click(function () {
        $("#no-notes").css("display", "none");
        var note = $("#ip-text-box").val();
        $("#ip-text-box").val("");
        $("#add-btn").attr("disabled", "disabled");
        $("#ip-text-box").focus();
        getItemsFromLocalStorage();
        notesFromLocalStorage.push(note);
        notesCount++;
        setItemsToLocaStorage(notesCount, notesFromLocalStorage);
        displayNotes();
    });
    //To add notes to local storage - Ends

    //To delete notes fetched from local storage and display - Starts
    $("#display-notes").on("click", "input.close-btn", function () {
        var selectCount = this.id;
        getItemsFromLocalStorage();
        notesFromLocalStorage.splice(selectCount - 1, 1);
        notesCount--;
        if (notesCount == 0) {
            $("#no-notes").css("display", "block");
        }
        setItemsToLocaStorage(notesCount, notesFromLocalStorage);
        displayNotes();
    });
    //To delete notes fetched from local storage and display - Ends

    //To display notes from local storage in display - Starts
    function displayNotes() {
        getItemsFromLocalStorage();
        $("#display-notes").html("");
        for (var i = notesCount; i > 0; i--) {
            var randColor = Math.floor(Math.random(1) * 4);
            $("#display-notes").append(`<div  style="background-color: ${colors[randColor]};border: 2px solid ${colors[randColor]};" class="notes-list grid-content"><input style="float: right;background-color: ${colors[randColor]};border: 0px;border-radius: 50%;" class="close-btn" type="button" id="${i}" value="x"><p>${notesFromLocalStorage[i-1]}</p> </div>`);
        }
    }
    //To display notes from local storage in display - Ends

    //To get and set notes to local storage - Starts
    function getItemsFromLocalStorage() {
        notesCount = localStorage.getItem("count");
        notesFromLocalStorage = JSON.parse(localStorage.getItem("notes"));
    }

    function setItemsToLocaStorage(count, notes) {
        localStorage.setItem("notes", JSON.stringify(notes));
        localStorage.setItem("count", count);
    }
    //To get and set notes to local storage - Ends
});