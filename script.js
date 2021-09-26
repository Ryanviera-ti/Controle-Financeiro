
const transactionsul = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')



const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
.getItem('transactions') !== null ? localStorageTransactions : []
 
const removeTransaction = ID => {
  transactions = transactions.filter(transaction => 
        transaction.id !== ID )
        updateLocalStorage()
    init()
}
const addTransactionIntoDOM = transaction => {
const operator = transaction.amount < 0 ? '-' : '+'
const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
const amountWithoutOperator = Math.abs(transaction.amount)
const li = document.createElement('li')

li.classList.add( CSSClass)
    li.innerHTML = `
    ${transaction.name} 
    <span>${operator} R$ ${Math.abs(amountWithoutOperator)}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id}">
    x
    </button>
    `
    transactionsul.append(li)


}

const updateBalancevalues = () => {
    const transactionAmounts = transactions.map(transaction => transaction.amount)
    const total = transactionAmounts
    .reduce ((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)
    const income = transactionAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value ) => accumulator + value, 0)
    .toFixed(2)
    const expense = Math.abs ( transactionAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)


    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}


 const init = () => {
  transactions.forEach(addTransactionIntoDOM)
    updateBalancevalues()
 }

 init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}




const generateID = () => Math.round(Math.random () * 1000)
 
const addToTransactionsArray = (transactionName, transactionAmount) =>{
    transactions.push( {
        id: generateID(),
         name: transactionName,
         amount: Number(transactionAmount)
       }
    )

const cleaninputs = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
}



const handleFormSubmit = event => 
    event.preventDefault()

const transactionName = inputTransactionName.value.trim()
const transactionAmount = inputTransactionAmount.value.trim()
   const  isSomeInputEmpty = transactionName === '' || transactionAmount === '' 

     if(isSomeInputEmpty) {
         alert('Por favor, preencha tanto o nome como o valor da transação')
         return
     
     }

     addToTransactionsArray(transactionName , transactionAmount)
        init()
        updateLocalStorage()
        cleaninputs()
    
    
}

 form.addEventListener('submit',  handleFormSubmit)