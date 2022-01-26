username=localStorage.getItem("username");
roomname=localStorage.getItem("roomname");
// Your web app's Firebase configuration
const firebaseConfig = {
      apiKey: "AIzaSyAJroz87lGpq0e1CSIdeQIt_ETF2WinMK4",
      authDomain: "kwitter-234af.firebaseapp.com",
      databaseURL: "https://kwitter-234af-default-rtdb.firebaseio.com",
      projectId: "kwitter-234af",
      storageBucket: "kwitter-234af.appspot.com",
      messagingSenderId: "249441244729",
      appId: "1:249441244729:web:5e955434cebc23e6009fe8"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
//YOUR FIREBASE LINKS

function getData() { firebase.database().ref("/"+roomname).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
      console.log(firebase_message_id);
      console.log(message_data);
      name = message_data['name'];
      message = message_data['message'];
      like = message_data['like'];
      name_with_tag = "<h4>" + name+ "<img class='user_tick' src='tick.png'> </h4>";
      message_with_tag = "<h4 class='message_h4'>" +message+ "</h4>";
      like_button = "<button class='btn btn-warning' id="+firebase_message_id+      "value= " +like+ "onclick='updatedLike(this.id)' > ";
      span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " +like+ "</span></button> <hr>";

      row = name_with_tag + message_with_tag + like_button + span_with_tag;
      document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function updatedLike(message_id){
      console.log("click.likebutton- "+message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updatedLike = Number(likes) + 1;
      console.log(updatedLike);
      firebase.database().ref(roomname).child(message_id).update({
            like: updatedLike
      });
}

function logOut(){
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location.replace("index.html");
}

function send(){
      msg = document.getElementById("message").value;
      firebase.database().ref(roomname).push({
            name: username,
            message: msg,
            like: 0
      });
      document.getElementById("message").value = "";
}