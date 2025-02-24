// let data = async () => {
//     let val1 = await fetch('https://api.github.com/users')
//     let val = await val1.json()
//     console.log(val)
//     val.forEach(key => {
//         let loginin = document.createElement('button')
//         let image = document.createElement('img')
//         let main = document.createElement('main')
//         let idd = document.createElement('article')
//         let section = document.createElement('section')
//         image.src = key.avatar_url;
//         loginin.innerHTML = key.login;
//         idd.innerText = key.id;
//         section.append(image)
//         main.append(section)
//         document.body.append(main)
//     })
// }
// data()


async function fetchData() {
    let response = await fetch('https://fakestoreapi.com/products')
    let data = await response.json()
    console.log(response)
    console.log(data)    
    data.forEach(element => {
        let section = document.createElement('section')
        let p = document.createElement('p')
        let image = document.createElement('img')
        let price = document.createElement('p')
        let addToCart = document.createElement('button')
        p.innerHTML = `Title: ${element.title}`
        image.src = element.image
        price.innerHTML = `price: ${element.price}`
        addToCart.innerHTML = "Add to cart"
        section.append(image, p, p, addToCart)
        document.body.append(section)
    });
}

fetchData()