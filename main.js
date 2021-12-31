const cardShoes = document.querySelector(".card"),
	totalItem = document.querySelector(".card-title-amount"),
	items = cardShoes.querySelector(".shop-items"),
	emptyText = document.querySelector(".cart-empty-text"),
	saveCart = document.querySelector(".cart-items");

console.log("innerHTML: ", emptyText);

// imgShoes = cardShoes.querySelector(".card-body .shop-item-image img");

fetch("./data/shoes.json")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		detailShoes(data.shoes);
		// console.log("data: ", data.shoes);
	})
	.catch(() => console.log("err!!!"));

const detailShoes = (value) => {
	console.log(value.length);
	for (let i = 0; i < value.length; i++) {
		const p = value[i];
		items.innerHTML += `<div class="shop-item">
							<div class="shop-item-image" style="background-color: ${p.color};">
								<img src="${p.image}" alt="" srcset="" />
							</div>
							<div class="shop-item-name">${p.name}</div>
							<div class="shop-item-description">${p.description}</div>
							<div class="shop-item-bottom">
							<div class="shop-item-price">${p.price}</div>
							<div class="shop-item-button">ADD TO CART</div>
							</div>
						</div>`;
	}
	let listItems = items.querySelector(".shop-item"),
		carts = items.querySelectorAll(".shop-item .shop-item-button");
	for (let i = 0; i < carts.length; i++) {
		console.log("cart data:", carts.length);
		carts[i].addEventListener("click", () => {
			cartNumbers(value[i]);
		});
	}
};
let Cart = JSON.parse(localStorage.getItem("cartItems")) || [];
console.log("data", Cart);
const cartNumbers = (products) => {
	if (Cart.some((item) => item.id === products.id)) {
		alert("product exist!!!");
	} else {
		Cart.push({ ...products, count: 1 });
	}
	console.log("cart User: ", Cart);

	updateCart();
};

const updateCart = () => {
	if (Cart.length <= 0) {
		emptyText.innerText = "Your cart is empty.";
	} else {
		emptyText.innerText = "";
	}
	console.log("save cart: ", saveCart);
	saveCart.innerHTML = "";
	Cart.forEach((item) => {
		saveCart.innerHTML += `<div class="cart-item">
							<div class="cart-item-left">
								<div class="cart-item-image" style="background-color: ${item.color};">
									<div class="cart-item-image-block">
										<img
											src="${item.image}"
											alt=""
											srcset=""
										/>
									</div>
								</div>
							</div>
							<div class="cart-item-right">
								<div class="cart-item-name">${item.name}</div>
								<div class="cart-item-price">$${item.price}</div>
								<div class="cart-item-actions">
									<div class="cart-item-count">
										<div class="cart-item-count-button" onclick="handleCount('decrease',${item.id})">-</div>
										<div class="cart-item-count-number">${item.count}</div>
										<div class="cart-item-count-button" onclick="handleCount('increase',${item.id})">+</div>
									</div>
									<div onclick="deleteProduct(${item.id})" class="cart-item-remove">
										<img
											class="cart-item-remove-icon"
											src="./images/trash.png"
											alt=""
											srcset=""
										/>
									</div>
								</div>
							</div>
						</div>`;
	});
	totalPrice();
	localStorage.setItem("cartItems", JSON.stringify(Cart));
};

// total price
const totalPrice = () => {
	let total = 0;
	Cart.forEach((item) => {
		total += item.price * item.count;
	});
	console.log(total);
	totalItem.innerText = `$${total.toFixed(2)}`;
	console.log("sum: ", totalItem);
};

//
const deleteProduct = (id) => {
	Cart = Cart.filter((item) => item.id !== id);
	updateCart();
};

//
const handleCount = (action, id) => {
	Cart = Cart.map((item) => {
		let count = item.count;

		if (item.id === id) {
			if (action === "decrease") {
				count--;
			} else if (action === "increase") {
				count++;
			}
		}
		console.log("count: ", count);
		console.log("item: ", item);
		return { ...item, count };
	});
	updateCart();
};
updateCart();
