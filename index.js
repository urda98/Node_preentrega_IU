const key = process.argv[2];
const data = process.argv[3];

switch (key) {
    case 'GET':
        getProducts();
        break;
    case 'GET_ID': {
        const productId = data.split('/')[1];
        getProductById(productId);
        break;
    }
    case 'POST': {
        const resource = process.argv[3];
        const title = process.argv[4];
        const priceArg = process.argv[5];
        const category = process.argv[6];
        if (resource !== 'products' || title == null || priceArg == null || category == null) {
            console.log('Usage: npm run start POST products <title> <price> <category>');
            break;
        }
        const price = Number(priceArg);
        if (Number.isNaN(price)) {
            console.error('Invalid price:', priceArg);
            break;
        }
        postProducts(title, price, category);
        break;
    }
    case 'DELETE':
        deleteProducts();
        break;
    default:
        console.log('Invalid key')
        break;
}

async function getProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error('Error fetching products:', error)
    }
}

async function getProductById(productId) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error('Error fetching product by id:', error)
    }
}

async function postProducts(title, price, category) {
    try {
        const newProduct = {
            title,
            price,
            category
        }
        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error posting products:', error);
    }
}