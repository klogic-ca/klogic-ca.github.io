  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
  import { getDatabase, ref, set, push, child } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD7BluLFmtGwpcIb5NURgvL052lqUBH31w",
    authDomain: "klogic-web-a4a20.firebaseapp.com",
    databaseURL: "https://klogic-web-a4a20-default-rtdb.firebaseio.com",
    projectId: "klogic-web-a4a20",
    storageBucket: "klogic-web-a4a20.appspot.com",
    messagingSenderId: "274483093625",
    appId: "1:274483093625:web:1eb607270050fae76c34a8",
    
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Reference Database
const db = getDatabase(app);

document.querySelector("#submitButton").addEventListener('click', () => {
    console.log("Submit Button Clicked");
    if (grecaptcha.getResponse() == "") {
      alert("You can't proceed!");
    } else {
      var vName = document.getElementById('formControlInput1').value;
      var vEmail = document.getElementById('formControlInput2').value;
      var vQuery = document.getElementById('formControlTextarea1').value;

      writeContactForm(vName,vEmail,vQuery);

      alert("Thank you! Someone will get back to you shortly");
    }
  });

function writeContactForm(username, emailaddress, message){

  const newPostKey = push(child(ref(db), 'contact-forms')).key;
    const reference = ref(db, 'contact-forms/' + newPostKey);
    console.log('key: ' + newPostKey);
    set(reference, {
    name: username,
      email: emailaddress,
      message: message,
      timestamp: Date.now()
    });
}

