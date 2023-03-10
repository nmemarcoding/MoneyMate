import { useState,useEffect } from 'react'
import Navbar from '../../components/Navbar/Navber'
import { publicRequest } from '../../hooks/requestMethods'

export default function IncomePage() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [income, setIncome] = useState([])
    const [totalIncomes, setTotalIncomes] = useState(0)
    const [newIncome, setNewIncome] = useState({description:"",amount:""})
    const [data, setData] = useState({})
    const [montlyIncome, setMontlyIncome] = useState(0)

    useEffect(() => {
        const Data = JSON.parse(localStorage.getItem("budget"))
        setData(Data)
        console.log(data)
        // sroting incomes array by date
        Data.incomes.sort((a, b) => {
            return new Date(b.Date) - new Date(a.Date)
        })
        setIncome(Data.incomes)
        console.log(Data.incomes)
    }, [])

    // getting total incomes of corrent month from incomes array amount
    useEffect(() => {
        const totalIncomes = income.reduce((acc, item) => {
            const date = new Date(item.date)
            const now = new Date()
            if(date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()){
                return acc + item.amount
            }else{
                return acc
            }
        }, 0)
        setTotalIncomes(totalIncomes)
    }, [income])

    // on change input handler for new income
    const onChangeHandler = (e) => {
        setNewIncome({...newIncome,[e.target.id]:e.target.value})
        console.log(newIncome)
    }

    // on submit handler for new income
    const onSubmitHandler = (e) => {
        e.preventDefault()
        publicRequest(user.accessToken).post("income",newIncome)
        .then((res) => {

            // add new income to begining of income array
            setIncome([res.data,...income])
            
            console.log(res.data)
            window.alert("Income added successfully.")

        })
        .catch((err) => {
            console.log(err.respons.data)
        })
    
    }

    // onchange to update fixed montly income
    const onChangeMontlyIncome = (e) => {
        setMontlyIncome(e.target.value)
        console.log(montlyIncome)
    }

    // handeler to update fixed montly income
    const updateMontlyIncome = (e) => {
        e.preventDefault()
        publicRequest(user.accessToken).put("budget/montlyIncome",{montlyIncome:montlyIncome})
        .then((res) => {
            console.log(res.data)
            window.alert("Income updated successfully.")
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
                <h1 className="text-3xl font-bold text-center">{new Date().toLocaleString('default', { month: 'short' })} Income</h1>
                <h2 className="text-4xl font-bold text-center text-blue-500">{totalIncomes.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
            </div>

            <form className="flex flex-col md:flex-row items-center justify-center w-full mt-8">
                <input className="w-full md:w-1/2 h-10 border-2 border-gray-300 rounded-lg px-3 mb-2 md:mr-2 md:mb-0 placeholder-gray-400" type="text" placeholder="Description" id ="description" onChange={onChangeHandler}/>
                <input className="w-full md:w-1/2 h-10 border-2 border-gray-300 rounded-lg px-3 mb-2 md:mr-2 md:mb-0 placeholder-gray-400" type="number" placeholder="Amount" id="amount" onChange={onChangeHandler}/>
                <button className="w-full md:w-1/2 h-10 bg-blue-500 text-white font-bold rounded-lg border border-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800" type="submit" onClick={onSubmitHandler}>Add</button>
            </form>
            {/* teble for showing fixrd montly income mobile responsive */}

            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left rounded-lg mt-4">
                    <thead>
                    <tr className="bg-gray-100 border-b border-gray-200 text-gray-800">
                        <th className="px-4 py-3">Monthly Fixed Income</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-white border-b border-gray-200 text-gray-700">
                        <td className="px-4 py-3">
                        <div className="flex items-center justify-between">
                            <input
                            placeholder={data.montlyIncome}
                            className="bg-gray-100 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 w-full"
                            onChange={onChangeMontlyIncome}
                            type="number"
                            />
                            <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={updateMontlyIncome}>
                            Edit
                            </button>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>



            

            <div className="flex items-center justify-center w-full mt-8">
                <table className="w-full text-left rounded-lg">
                <thead>
                    <tr className="text-gray-800 border border-b-0">
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Date</th>
                    </tr>
                </thead>

                {income.map((item) => (
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
