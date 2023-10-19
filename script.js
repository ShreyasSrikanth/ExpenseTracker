var form = document.getElementById('form');

form.addEventListener('submit',addlocalStorage)

function addlocalStorage(e){
    e.preventDefault();

    var amount = document.getElementById("amount").value;
    var Description = document.getElementById("Description").value;
    var cat = document.getElementById("cat").value;

    var display = document.getElementById('display');

    var expObj = {amount:amount,Description:Description,cat:cat};

    var JSONstr = JSON.stringify(expObj);

    localStorage.setItem(cat+Description,JSONstr);

    var ul = document.createElement('ul');
    var li = document.createElement('li');

    li.textContent= 'Amount = ' + amount + ' Description = ' + ' Category = ' + cat;

    var editButton = document.createElement('button');
    var deleteButton = document.createElement('button');

    deleteButton.style.margin = '0 5px'
    editButton.style.margin = '0 5px'

    editButton.textContent = 'Edit Expense';
    deleteButton.textContent = 'Delete Expense';


    deleteButton.addEventListener('click',deleted);

    function deleted(e){
        localStorage.removeItem(cat+Description);
        ul.removeChild(li);
    }

    editButton.addEventListener('click',edit);

    function edit(e){
        var useObj = JSON.parse(localStorage.getItem(cat+Description))

        document.getElementById("amount").value = useObj.amount;
        document.getElementById("Description").value = useObj.Description;
        document.getElementById("cat").value = useObj.cat;

        localStorage.removeItem(cat+Description);
        ul.removeChild(li);
    }

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    ul.appendChild(li);
    display.appendChild(ul);

    document.getElementById('amount').value = '';
    document.getElementById('Description').value = '';
    document.getElementById('cat').value = '';

    alert('User data stored in local storage!');
}