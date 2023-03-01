import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navber'
import { publicRequest } from '../../hooks/requestMethods'

export default function AutoExpensePage() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [autoExpense, setAutoExpense] = useState([])
    const [totalAutoExpenses, setTotalAutoExpenses] = useState(0)
    const [newAutoExpense, setNewAutoExpense] = useState({description:"",amount:""})

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("budget"))

        // sroting autoExpenses array by date
        data.autoExpenses.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
        setAutoExpense(data.autoExpenses)
        console.log(data.autoExpenses)
    }, [])

    // getting total autoExpenses of corrent month from autoExpenses array amount
    useEffect(() => {
        const totalAutoExpenses = autoExpense.reduce((acc, item) => {
            const date = new Date(item.date)           
            const now = new Date()   
            return acc + item.amount
           
               
            
        }, 0)
        
        setTotalAutoExpenses(totalAutoExpenses)
    }, [autoExpense])

    // on change input handler for new autoExpense
    const onChangeHandler = (e) => {
        setNewAutoExpense({...newAutoExpense,[e.target.id]:e.target.value})
        console.log(newAutoExpense)
    }

    // on submit handler for new autoExpense
    const onSubmitHandler = (e) => {
        e.preventDefault()
        publicRequest(user.accessToken).post("expense/autoExpense",newAutoExpense)
        .then((res) => {

            // add new autoExpense to begining of autoExpense array
            setAutoExpense([res.data,...autoExpense])

            console.log(res.data)
            window.alert("AutoExpense added successfully.")

        })
        .catch((err) => {
            console.log(err.respons.data)
        })

    }


    return (
        <div>
            <div class=" top-0 left-0 right-0">
            <Navbar />
            </div>
            <div className="p-4 md:p-8">
                <div className="mt-4">
                    <h1 className="text-3xl font-bold text-center"> AutoExpense</h1>
                    <h2 className="text-4xl font-bold text-center text-blue-500">${totalAutoExpenses}</h2>
                </div>

                <form className="flex flex-col md:flex-row items-center justify-center w-full mt-8">
                    <input className="w-full md:w-1/2 h-10 border-2 border-gray-300 rounded-lg px-3 mb-2 md:mr-2 md:mb-0 placeholder-gray-400" type="text" placeholder="Description" id ="description" onChange={onChangeHandler}/>
                    <input className="w-full md:w-1/2 h-10 border-2 border-gray-300 rounded-lg px-3 mb-2 md:mr-2 md:mb-0 placeholder-gray-400" type="number" placeholder="Amount" id="amount" onChange={onChangeHandler}/>
                    <button className="w-full md:w-1/2 h-10 bg-blue-500 text-white font-bold rounded-lg border border-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800" type="submit" onClick={onSubmitHandler}>Add</button>
                </form>

                <div className="flex items-center justify-center w-full mt-8">
                    <table className="w-full text-left rounded-lg">
                    <thead>
                        <tr className="text-gray-800 border border-b-0">
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Date</th>
                        </tr>
                    </thead>

                    {autoExpense.map((item) => (
                        <tbody key={item.id}>
                        <tr className="w-full font-light text-gray-700 bg-gray-100 whitespace-no-wrap border border-b-0">
                            <td className="px-4 py-4">{item.description}</td>
                            <td className="px-4 py-4">${item.amount.toFixed(2)}</td>
                            <td className="px-4 py-4">{new Date(item.date).toLocaleDateString('en-US')}</td>
                        </tr>
                        </tbody>
                    ))}
                    </table>
                </div>
            </div>
        </div>
    )
}
