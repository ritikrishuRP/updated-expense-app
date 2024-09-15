let totalValue = 0;

function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
        sellingPrice: parseFloat(event.target.sellingPrice.value),
        product: event.target.product.value,
    };

    totalValue += userDetails.sellingPrice;

    axios.post(
            "http://localhost:3000/expense/add-expense",
            userDetails
        )
        .then((response) => {
            displayUserOnScreen(response.data.newUserDetail);
            updateTotalValue();
        })
        .catch((error) => console.error(error));

    // Clearing the input fields
    document.getElementById("sellingPrice").value = "";
    document.getElementById("product").value = "";
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get('http://localhost:3000/expense/get-expense')
        .then((response) => {
            for (let i = 0; i < response.data.allExpenses.length; i++) {
                displayUserOnScreen(response.data.allExpenses[i]);
                totalValue += response.data.allExpenses[i].sellingPrice;
            }
            updateTotalValue();
        })
        .catch((error) => console.error('Error fetching user details:', error));
});

function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
        document.createTextNode(
            `${userDetails.sellingPrice} - ${userDetails.product}`
        )
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete Product"));
    userItem.appendChild(deleteBtn);

    const userList = document.querySelector("ul");
    userList.appendChild(userItem);

    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit Product"));
    userItem.appendChild(editBtn);

    const userList2 = document.querySelector("ul");
    userList2.appendChild(userItem);

    deleteBtn.addEventListener("click", function (event) {
        const userId = userDetails.id;
        totalValue -= userDetails.sellingPrice;
        axios.delete(`http://localhost:3000/expense/delete-expense/${userId}`)
            .then((response) => {
                userList.removeChild(userItem);
                updateTotalValue();
            })
            .catch((error) => {
                console.error('Error deleting user details:', error);
                // Update total value even if there's an error deleting the product
                updateTotalValue();
            });
    });

    editBtn.addEventListener("click", function (event) {
        const userId = userDetails.id;
        totalValue -= userDetails.sellingPrice;
        document.getElementById('sellingPrice').value = userDetails.sellingPrice;
        document.getElementById('product').value = userDetails.product;

        axios.delete(`http://localhost:3000/expense/delete-expense/${userId}`)
            .then((response) => {
                userList.removeChild(userItem);
                updateTotalValue();
            })
            .catch((error) => {
                console.error('Error deleting user details:', error);
                // Update total value even if there's an error deleting the product
                updateTotalValue();
            });
    });

    
}

function updateTotalValue() {
    const totalValueElement = document.getElementById("totalValue");

}

// Do not touch the code below
