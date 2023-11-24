var form = document.getElementById('form');
form.addEventListener('submit', addToDatabase);


async function fetchData() {
    console.log("hello")
    try {
        const response = await axios.get('http://localhost:4000/expense/fetch');
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

fetchData().then(response => displayData(response));



function displayData(expenses) {
    console.log('display',expenses);
    const display = document.getElementById('display');
    display.innerHTML = '';

    if (!Array.isArray(expenses) || expenses.length === 0) {
        display.textContent = 'No expenses available.';
        return;
    }

    const ul = document.createElement('ul');

    expenses.forEach(element => {
        const amount = element.amount;
        const description = element.description;
        const category = element.category;

        const li = document.createElement('li');
        li.textContent = `Amount = ${amount}, Description = ${description}, Category = ${category}`;

        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        deleteButton.style.margin = '0 5px';
        editButton.style.margin = '0 5px';

        editButton.textContent = 'Edit Expense';
        deleteButton.textContent = 'Delete Expense';

        deleteButton.addEventListener('click', () => deleteExpense(element.id));
        editButton.addEventListener('click', () => editExpense(element));

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        ul.appendChild(li);
    });

    display.appendChild(ul);
}


async function deleteExpense(expenseId) {
    try {
        await axios.delete(`http://localhost:4000/expense/delete/${expenseId}`);
        const newData = await fetchData();
        displayData(newData);
    } catch (err) {
        console.error(err);
        alert('Failed to delete expense');
    }
}



async function editExpense(expense) {
    // Implement edit functionality here
    // You can use the expense object to pre-fill the form for editing
}



async function addToDatabase(e) {
    e.preventDefault();

    let amount = document.getElementById("amount").value;
    let description = document.getElementById("Description").value;
    let category = document.getElementById('cat').value;

    try {
        await axios.post('http://localhost:4000/expense/store', {
            amount: amount,
            description: description,
            category: category,
            completed: false
        })
        .then(result => {
            alert("Data successfully stored");
        
            document.getElementById("amount").value = "";
            document.getElementById("Description").value = "";
            document.getElementById('cat').value = "Fuel";
    
            console.log("Response from server", result);
        })
        .catch(err =>{
            console.log(err);
        });

        const newData = await fetchData();
        displayData(newData);

    } catch (err) {
        console.log(err);
        alert('Failed to store data');
    }
}
