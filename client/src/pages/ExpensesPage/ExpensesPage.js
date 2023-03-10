import React, { useState,useEffect } from 'react';
import Navbar from '../../components/Navbar/Navber';
import { publicRequest } from '../../hooks/requestMethods';

export default function ExpensesPage() {

    const[user,setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const[expenses,setExpenses] = useState([]);
    const[totalExpenses,setTotalExpenses] = useState(0);
    const[newExpense,setNewExpense] = useState({description:"",amount:""});
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("budget"));
        data.expenses.sort((a,b) => {
            return new Date(b.date) - new Date(a.date);
        });
        setExpenses(data.expenses);
        console.log(data.expenses);
    },[]);

    useEffect(() => {
        const totalExpenses = expenses.reduce((acc,item) => {
            const date = new Date(item.date);
            const now = new Date();
            if(date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()){
                return acc + item.amount;
            }else{
                return acc;
            }
        },0);
        setTotalExpenses(totalExpenses);
    },[expenses]);

    const onChangeHandler = (e) => {
        setNewExpense({...newExpense,[e.target.id]:e.target.value});
        console.log(newExpense);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        publicRequest(user.accessToken).post("expense",newExpense)
        .then((res) => {
            setExpenses([res.data,...expenses]);
            console.log(res.data);
            window.alert("Expense added successfully.");
        })
        .catch((err) => {
            console.log(err.response.data);
        })
    }



    return (
       <div>
            <div class=" top-0 left-0 right-0">
            <Navbar />
            </div>
            <div className="p-4 md:p-8">
                <div className="mt-4">
                    <h1 className="text-3xl font-bold text-center"> {new Date().toLocaleString('default', { month: 'short' })} Expense</h1>
                    <h2 className="text-4xl font-bold text-center text-blue-500">{totalExpenses.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
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

                    {expenses.map((item) => (
                        <tbody key={item.id}>
                        <tr className="w-full font-light text-gray-700 bg-gray-100 whitespace-no-wrap border border-b-0">
                            <td className="px-4 py-4">{item.description}</td>
                            <td className="px-4 py-4">${item.amount.toFixed(2)}</td>
                            <td className="px-4 py-4">{new Date(item.date).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                        </tr>
                        </tbody>
                    ))}
                    </table>
                </div>
            </div>
        </div>
    )
}
