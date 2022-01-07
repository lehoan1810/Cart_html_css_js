const cardShoes = document.querySelector(".card"),
	totalItem = document.querySelector(".card-title-amount"),
	items = cardShoes.querySelector(".shop-items"),
	emptyText = document.querySelector(".cart-empty-text"),
	saveCart = document.querySelector(".cart-items");

fetch("./data/shoes.json")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		detailShoes(data.shoes);
	})
	.catch(() => console.log("err!!!"));

const detailShoes = (value) => {
	for (let i = 0; i < value.length; i++) {
		const p = value[i];
		items.innerHTML += `<div class="shop-item">
							<div class="shop-item-image" style="background-color: ${p.color};">
								<img src="${p.image}" alt="" srcset="" />
							</div>
							<div class="shop-item-name">${p.name}</div>
							<div class="shop-item-description">${p.description}</div>
							<div class="shop-item-bottom">
							<div class="shop-item-price">$${p.price.toFixed(2)}</div>
							<div class="shop-item-button">ADD TO CART</div>
							</div>
						</div>`;
	}
	let listItems = items.querySelector(".shop-item"),
		carts = items.querySelectorAll(".shop-item .shop-item-button");
	for (let i = 0; i < carts.length; i++) {
		carts[i].addEventListener("click", () => {
			cartNumbers(value[i]);
			carts[i].innerHTML = `<img class="icon-check" src="./images/check.png"/>`;
			carts[i].classList.add("circle");
		});
	}

	handleAddToCart(carts);
};
let Cart = JSON.parse(localStorage.getItem("cartItems")) || [];
const handleAddToCart = (carts) => {
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

const updateCart = () => {
	saveCart.innerHTML = "";
	if (Cart.length <= 0) {
		emptyText.innerText = "Your cart is empty.";
	} else {
		emptyText.innerText = "";
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
								<div class="cart-item-price">$${item.price.toFixed(2)}</div>
								<div class="cart-item-actions">
									<div class="cart-item-count">
										<div class="cart-item-count-button" onclick="handleDecrease(${item.id})">-</div>
										<div class="cart-item-count-number">${item.count}</div>
										<div class="cart-item-count-button" onclick="handleIncrease(${item.id})">+</div>
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
	}
	totalPrice();
	localStorage.setItem("cartItems", JSON.stringify(Cart));
};

const cartNumbers = (products) => {
	if (Cart.some((item) => item.id === products.id)) {
		return;
	} else {
		Cart.push({ ...products, count: 1, check: true });
	}
	updateCart();
	let smooth = document.querySelectorAll(".cart-item");
	smooth[smooth.length - 1].classList.add("running");
	setTimeout(() => {
		smooth[smooth.length - 1].classList.remove("running");
	}, 3000);
};
// total price
const totalPrice = () => {
	let total = 0;
	Cart.forEach((item) => {
		total += item.price * item.count;
	});
	totalItem.innerText = `$${total.toFixed(2)}`;
};
const deleteProduct = (id) => {
	Cart = Cart.filter((item) => {
		return item.id !== id;
	});
	let change = document.querySelectorAll(".shop-item-button");
	change[id - 1].classList.remove("circle");
	change[id - 1].innerText = "ADD TO CART";

	updateCart();
};
const handleDecrease = (id) => {
	for (let i = 0; i < Cart.length; i++) {
		if (Cart[i].id == id) {
			Cart[i].count -= 1;
		}
		if (Cart[i].count <= 0) {
			Cart.splice(i, 1);
			let change = document.querySelectorAll(".shop-item-button");
			change[id - 1].classList.remove("circle");
			change[id - 1].innerText = "ADD TO CART";
		}
	}
	updateCart();
};
const handleIncrease = (id) => {
	Cart = Cart.map((item) => {
		let count = item.count;
		if (item.id === id) {
			count++;
		}
		return { ...item, count };
	});
	updateCart();
};
updateCart();
