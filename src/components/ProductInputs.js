import React, { useEffect, useState } from 'react'


const getLocalData = () => {
    let lists = localStorage.getItem("list")

    if (lists) {
        return JSON.parse(localStorage.getItem("list"))
    }
    else {
        return []
    }
}
function ProductInputs() {
    const [inputArr, setInputArr] = useState(getLocalData())
    const [inputData, setInputData] = useState({
        name: "",
        price: "",
        description: "",
        id: new Date().getTime().toString()
        // id: Math.floor(Math.random() * 100)
    })
    const [toggleSubmit, setToggleSubmit] = useState(true)
    const [isEditData, setIsEditData] = useState(null)

    const changeHandle = (e) => {

        setInputData({ ...inputData, [e.target.name]: e.target.value })
        e.preventDefault()
    }
    let { name, price, description} = inputData;
    const handleChange = (e) => {
        if (!name || !price || !description) {
            alert("please fill all the required feilds")
        }
        else if (inputData && !toggleSubmit) {
            // alert("this is working")
            setInputData(
                inputArr.map((elem) => {
                    if (elem.id === isEditData) {
                        return { ...elem.name, name: inputData.value }
                    }
                    return elem;
                })
            )
           
            setToggleSubmit(true)
            setInputData('')
            setIsEditData(null)
        }
        else {


  setInputArr([...inputArr, { name, price, description,id: new Date().getTime().toString()}])
            console.log(inputArr)
            // console.log(inputData)
            setInputData({ name: "", price: "", description: "" })
            e.preventDefault()
        }
    }
    const handleEdit = (ind) => {
        let newEditData = inputArr.find((elem) => {
            return elem.id === ind
        })
        setToggleSubmit(false)
        setInputData(newEditData)
        setIsEditData(ind)
        console.log(newEditData)
    }

    const handleDelete = (index) => {
        console.log(index)
        const updatedItems = inputArr.filter((elem) => {
            return elem.id !== index
        })
        setInputArr(updatedItems)
    }

    // const handleDelete=(index)=>{
    //     let reduceData=[...inputArr]
    //     reduceData.splice(index);

    //     setInputArr(reduceData)
    // }

    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(inputArr))
    }, [inputArr])

    return (
        <>
            <div className='container product-inp'>
                <div className='input-container'>
                    <div className='detail-1'>
                        <div style={{ padding: "0px 20px" }}>
                            <label htmlFor="product">Products: </label><br />
                            <input type="text" placeholder='name' name='name' value={inputData.name} onChange={changeHandle} />
                        </div>
                        <div>
                            <label htmlFor="price">Price: </label><br />
                            <input type="number" placeholder='$' name='price' value={inputData.price} onChange={changeHandle} />
                        </div>
                    </div>
                    <div className='inp-2'>

                        <label htmlFor="desccription">Description</label><br />
                        <textarea name='description' value={inputData.description} onChange={changeHandle}></textarea>

                    </div>
                </div>
                {
                    toggleSubmit ? <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", marginLeft: "20px" }}>
                        <button className='btn btn-primary' type="submit"
                            onClick={handleChange}
                        > Add</button>
                    </div>
                        :
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", marginLeft: "20px" }}>
                            <button className='btn btn-primary px-2' type="submit"
                                onClick={handleChange}
                            > Update Data</button>
                        </div>
                }
            </div>
            {
                inputArr.map((elem) => {
                    return (
                        <div className='container product-container' key={elem.id}>
                            <div >
                                <div className="card ">
                                    <div className="card-body product-card">
                                        <h5 className="card-title">{elem.name} </h5>
                                        <p className="card-text">{elem.description}</p>
                                        <div className='btn-div'>
                                            <div>
                                                <button className='btn btn-primary mx-1' onClick={() => handleEdit(elem.id)}>Edit</button>
                                                <button className='btn btn-primary mx-1' onClick={() => handleDelete(elem.id)}>Delete</button>
                                            </div>
                                            <h3>{elem.price}$</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ProductInputs