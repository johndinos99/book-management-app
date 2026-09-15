const addForm = document.querySelector(".add-form");
const searchForm = document.querySelector(".search-form");

function validateField(field) {
	const errorEl = field.parentElement.querySelector(".error-message");
	const isNegativePrice = field.name === "price" && field.value !== "" && Number(field.value) < 0;

	if (!field.validity.valid || isNegativePrice) {
		errorEl.textContent = isNegativePrice
			? "Price cannot be negative"
			: field.dataset.error || "This field is required";
		field.classList.add("invalid");

		return false;
	}

	errorEl.textContent = "";
	field.classList.remove("invalid");

	return true;
}

addForm.querySelectorAll("input, select").forEach((input) => {
	input.addEventListener("blur", () => {
		validateField(input);
	});

	input.addEventListener("input", () => {
		validateField(input);
	});
});

addForm.addEventListener("submit", (e) => {
	e.preventDefault();

	let isValid = true;
	const fields = addForm.querySelectorAll("input, select");

	fields.forEach((field) => {
		const fieldValid = validateField(field);

		if (!fieldValid) {
			isValid = false;
		}
	});

	if (isValid) {
		const xhr = new XMLHttpRequest();
		const formData = new FormData(addForm);

		xhr.open("POST", "http://localhost:3000/books", true);
		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.onload = function () {
			try {
				if (this.status >= 200 && this.status < 300) {
					alert(JSON.parse(this.responseText).message);
					addForm.reset();
					return;
				}

				alert(JSON.parse(this.responseText).error);
			} catch (error) {
				alert("Something went wrong");
			}
		};

		xhr.send(JSON.stringify(Object.fromEntries(formData)));
	} else {
		addForm.querySelector(":invalid").focus();
	}
});

searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(searchForm);
	const keyword = formData.get("keyword").trim();

	if (!keyword) return;

	const resultTable = document.querySelector(".result-table");
	const results = document.getElementById("results");

	results.innerHTML = "";
	resultTable.style.display = "none";

	const xhr = new XMLHttpRequest();

	xhr.open("GET", `http://localhost:3000/books/${encodeURIComponent(keyword)}`, true);

	xhr.onload = function () {
		try {
			if (this.status >= 200 && this.status < 300) {
				const books = JSON.parse(this.responseText);

				resultTable.style.display = "block";
				results.innerHTML = books
					.map(
						(book) =>
							`<tr>
								<td>${book.title}</td>
								<td>${book.author}</td>
								<td>${book.genre}</td>
								<td>$${book.price}</td>
							</tr>`,
					)
					.join("");
				return;
			}

			resultTable.style.display = "block";
			results.innerHTML = `
				<tr>
					<td colspan="4">No books found with the specified keyword</td>
				</tr>
			`;
		} catch (error) {
			resultTable.style.display = "block";
			results.innerHTML = `
				<tr>
					<td colspan="4">Something went wrong. Please try again.</td>
				</tr>
			`;
		}
	};

	xhr.send();
});
