const firebaseConfig = {
  apiKey: "AIzaSyA9THvy5iaDALxLpY13-PKGXHO8rDZKFZY",
  authDomain: "quiz2-65615.firebaseapp.com",
  projectId: "quiz2-65615",
  storageBucket: "quiz2-65615.appspot.com",
  messagingSenderId: "27725364648",
  appId: "1:27725364648:web:dd8dc5efd1f6c4d99e319d"
};

firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase

const db = firebase.firestore();// db representa mi BBDD //inicia Firestore

const signUpUser = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      showMessage(`se ha registrado ${user.email}`);
      // ...
      // Guarda El usuario en Firestore
      createUser({
        id: user.uid,
        email: user.email
      });
    })
    .catch((error) => {
      showMessage("Error en el sistema" + error.message);
    });
};
document.getElementById("form1").addEventListener("submit", function (event) {
  event.preventDefault();
  let email = event.target.elements.email.value;
  let pass = event.target.elements.pass.value;
  let pass2 = event.target.elements.pass2.value;
  pass === pass2 ? signUpUser(email, pass) : alert("error passwords didn´t match");
  document.getElementById("form1").reset();
})
const signInUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      showMessage(`se ha logado ${user.email}`)
    })
    .catch((error) => {
      console.log(error.code)
      console.log(error.message)
    });
}
const signOut = () => {
  let user = firebase.auth().currentUser;
  firebase.auth().signOut().then(() => {
    showMessage("Sale del sistema: " + user.email)
  }).catch((error) => {
    showMessage("Hubo un error: " + error);
  });
}
document.getElementById("form2").addEventListener("submit", function (event) {
  event.preventDefault();
  let email = event.target.elements.email2.value;
  let pass = event.target.elements.pass3.value;
  signInUser(email, pass)
  document.getElementById("form2").reset();
})
document.getElementById("signOut").addEventListener("click", signOut);
// Listener de usuario en el sistema
// Controlar usuario logado
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    showMessage(`Está en el sistema:${user.email}`);
  } else {
    showMessage("No hay usuarios en el sistema");
  }
});

function showMessage(message, type = "success") {
  Toastify({
    text: message,
    duration: 4000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", 
    position: "center", 
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: type === "success" ? "green" : "red",
    },
  }).showToast();
}