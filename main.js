const cardShoes = document.querySelector(".card"),
	totalItem = document.querySelector(".card-title-amount"),
	items = cardShoes.querySelector(".shop-items"),
	emptyText = document.querySelector(".cart-empty-text"),
	saveCart = document.querySelector(".cart-items");

console.log("innerHTML: ", emptyText);

// imgShoes = cardShoes.querySelector(".card-body .shop-item-image img");
let dataFetch = [];
fetch("./data/shoes.json")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		detailShoes(data.shoes);
		dataFetch.push(...data.shoes);
		console.log(data);
	})
	.catch(() => console.log("err!!!"));
let Cart = JSON.parse(localStorage.getItem("cartItems")) || [];

const detailShoes = (value) => {
	// dataFetch.push(...value);
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
			carts[i].innerHTML = `<img class="icon-check" src="./images/check.png"/>`;
			carts[i].classList.add("circle");
		});
	}

	nha(carts);
};
// console.log("carts: ", carts);
console.log("dataFetch: ", dataFetch);
const nha = (carts) => {
	Cart.forEach((item) => {
		if (item.check === true) {
			carts[item.id - 1].classList.add("circle");
			carts[
				item.id - 1
			].innerHTML = `<img class="icon-check" src="./images/check.png"/>`;
		} else {
			carts[item.id - 1].classList.add("");
		}
	});
};

console.log("data", Cart);

const updateCart = () => {
	if (Cart.length <= 0) {
		emptyText.innerText = "Your cart is empty.";
	} else {
		emptyText.innerText = "";
	}
	saveCart.innerHTML = "";
	Cart.forEach((item) => {
		console.log("item: ", item);
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
		// let smooth = document.querySelector(".cart-item");
		// setTimeout(function () {
		// 	smooth.classList.add("runn");
		// }, 2000);
		// smooth.classList.remove("running");
		// smooth[item.id - 1].classList.remove("running");
		// console.log("smooth: ", smooth, item.id);
		// setTimeout(function () {
		// 	smooth[item.id - 1].classList.add("running");
		// }, 2000);
	});
	totalPrice();
	localStorage.setItem("cartItems", JSON.stringify(Cart));
};

const cartNumbers = (products) => {
	console.log("id pr:", products.id);
	if (Cart.some((item) => item.id === products.id)) {
		console.log(".");
	} else {
		Cart.push({ ...products, count: 1, check: true });
	}
	// }
	updateCart();
};

// total price
const totalPrice = () => {
	let total = 0;
	Cart.forEach((item) => {
		total += item.price * item.count;
	});
	console.log(total);
	totalItem.innerText = `$${total.toFixed(2)}`;
};

//
let idRemove;
const deleteProduct = (id) => {
	Cart = Cart.filter((item) => {
		return item.id !== id;
	});

	// thu.classList.remove;
	console.log("remove: ", id);
	let thu = document.querySelectorAll(".shop-item-button");
	thu[id - 1].classList.remove("circle");
	thu[id - 1].innerText = "ADD to CART";
	console.log("thu: ", thu);
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
		return { ...item, count };
	});
	updateCart();
};
updateCart();
