

const getButton = document.getElementById('getAllProducts');
const main = document.getElementById('main');

const URL = "http://localhost:4500/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpheTE0NUBnbWFpbC5jb20iLCJpYXQiOjE2NjEzNDA5NzR9.prIKKUMWbfzKyfHkFLx9lZ45NnyyvTVL2qxF6KWqvF0";
getButton.addEventListener("click", () => {
    
    fetch(`${URL}products`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(resp => resp.json())
    .then(data => {
        let createDiv;
        
        for(let i = 0; i < data.products.products.length; i++) {
            createDiv = document.createElement("div");
            createDiv.className = "bg-black w-32 h-24 text-white";
            createDiv.innerHTML = data.products.products[i].ProductName;
            // console.log(data.products.products[i].ProductName);
            main.appendChild(createDiv);
        }
    })
    .catch(err => console.log(err));
});





const uploadButton = document.getElementById('upload');
const pName = document.getElementById('pN');
const pCategory = document.getElementById('pC');
const pPrice = document.getElementById('pP');
const images = document.getElementById('imgFiles');

uploadButton.addEventListener("click", () => {
    
    const formData = new FormData();
    formData.append('productName', pName.value);
    formData.append('productCategory', pCategory.value);
    formData.append('productPrice', pPrice.value);
    formData.append('productImage', images.files);
    
    // for (const [key, value] of formData) {
    //     console.log(`${key}: ${value}\n`);
    //   }

    // const data = {
    //     productName: pName.value,
    //     productCategory: pCategory.value,
    //     productPrice: pPrice.value,
    //     productImage: images.files
    // };
    

    fetch(`${URL}products`, {
        method: "POST",
        body: formData
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
});