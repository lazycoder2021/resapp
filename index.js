window.addEventListener('DOMContentLoaded', function () {
    var db = firebase.firestore();

    const menuItems = document.querySelector('.menu-items'); 

    db.collection('menu').get()
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            console.log(data)

            data.map((d) => {
                console.log(d.item_name)
                menuItems.innerHTML += `<div class="menu-item">
                <div class="menu-details-1">
                    <h2>${d.item_name}</h2 >
                </div>
                <div class="menu-details-2">
                    <div class="menu-desc-1">
                        <p>${d.item_desc}</p>
                    </div>
                    <div class="menu-desc-2">
                        <p>${d.item_price}</p><a class="cart-button">Add to cart</a>
                    </div>
                </div>
            </div>`;

                document.querySelectorAll('.cart-button').forEach((btn) => {
                    btn.addEventListener('click', function (e) {
                        
                        //console.log(e.target.parentElement)
                        //const parentDiv = e.target.parentElement; 
                        //const price = console.log(parentDiv.getElementsByTagName('p')[0].innerText)
                        console.log(e.target.parentElement.parentElement.parentElement)
                        const selectedItem = e.target.parentElement.parentElement.parentElement;
                        console.log(selectedItem.getElementsByTagName('h2')[0].innerText);
                        var itemname = selectedItem.getElementsByTagName('h2')[0].innerText; 
                        console.log(selectedItem.getElementsByTagName('p')[0].innerText);
                        var itemdesc = selectedItem.getElementsByTagName('p')[0].innerText;
                        console.log(selectedItem.getElementsByTagName('p')[1].innerText);
                        var itemprice = selectedItem.getElementsByTagName('p')[1].innerText;
                        alert('item added!')
                        console.log(itemname, itemdesc, itemprice);
                        document.querySelector('.cart-box').innerHTML += `<p>${itemname}${itemprice}</p><span class="checkout-btn">Checkout</span>`
                    })
                })

               

            })
        })

})





const firebaseConfig = {
    apiKey: "AIzaSyDXl9rvxj2bSqB3DdzkkXdNFlWVU6TmnnU",
    authDomain: "restaurant-app-f1443.firebaseapp.com",
    projectId: "restaurant-app-f1443",
    storageBucket: "restaurant-app-f1443.appspot.com",
    messagingSenderId: "68327482219",
    appId: "1:68327482219:web:f2d4414dae3fbe7f59622e"
};


firebase.initializeApp(firebaseConfig)


var db = firebase.firestore()



document.querySelector('.registration-form').addEventListener('submit', async function (e) {
    e.preventDefault(); 


    

    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;

    if (!email || !password) {
        alert('please enter email and password')
    } else {
        alert(email + password)
        alert('your account has been created, please sign in order food');
     

        document.querySelector('.registration-form').classList.add('hide'); 

        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXl9rvxj2bSqB3DdzkkXdNFlWVU6TmnnU", {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                email: email,
                password: password
            }),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })



        const data = await response.json()
        console.log(data)

    }
     
}); 


document.querySelector('.login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email1 = document.querySelector('.email1').value;
    const password1 = document.querySelector('.password1').value;
    console.log(email1, password1)

    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB6wjKtRIf0Z9-uRyEstYHrFH2CqkNaVL8", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
            email: email1,
            password: password1
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    alert('you have successfully logged in')

    const data = await response.json()
    const userId = data.localId;
    const useremail = data.email;
    console.log(useremail)
    console.log(userId)


    //console.log(data.idToken)

    


})


