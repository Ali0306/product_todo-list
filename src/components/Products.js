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
function Products() {
  const [inputArr, setInputArr] = useState(getLocalData())
  const [inputData, setInputData] = useState({
    productName: "",
    price: "",
    description: "",
    id:""
    // id: new Date().getTime().toString()
    // id: Math.floor(Math.random() * 100)
  })
  const [toggleSubmit, setToggleSubmit] = useState(true)
    const [isEditData, setIsEditData] = useState(null)


  const changeHandle=(e)=>{
  
    // const name=e.target.name;
    // const value=e.target.value
    setInputData((prev)=>{
return{...prev,[e.target.name]:e.target.value}
    })

  }
 let {productName, price, description}=inputData
  const handleAdd=(e)=>{
e.preventDefault()
if (!productName || !price || !description) {
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


else{
  
  setInputArr([...inputArr, { productName, price, description, id: new Date().getTime().toString() }])
  
  setInputData("")
}
console.log(inputData)
}
// OnEdit Function
const handleEdit = (ind) => {
  let newEditData = inputArr.find((elem) => {
      return elem.id === ind
  })
  setToggleSubmit(false)
  setInputData(newEditData)
  setIsEditData(ind)
  console.log(newEditData)
}

// delete btn funtion 

const handleDelete = (index) => {
  console.log(index)
  const updatedItems = inputArr.filter((elem) => {
      return elem.id !== index
  })
  setInputArr(updatedItems)
}

// UseEffect Funtion
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
              <input type="text" placeholder='name' name='productName'  onChange={changeHandle} />
            </div>
            <div>
              <label htmlFor="price">Price: </label><br />
              <input type="number" placeholder='$' name='price'  onChange={changeHandle} />
            </div>
          </div>
          <div className='inp-2'>

            <label htmlFor="desccription">Description</label><br />
            <textarea name='description'  onChange={changeHandle}></textarea>

          </div>
        </div>

        {
                    toggleSubmit ? <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", marginLeft: "20px" }}>
                        <button className='btn btn-primary' type="submit"
                            onClick={handleAdd}
                        > Add</button>
                    </div>
                        :
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", marginLeft: "20px" }}>
                            <button className='btn btn-primary px-2' type="submit"
                                onClick={handleAdd}
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
                    <h5 className="card-title">{elem.productName} </h5>
                    <p className="card-text">{elem.description}</p>
                    <div className='btn-div'>
                      <div>
                        <button className='btn btn-primary mx-1' onClick={()=>handleEdit(elem.id)}>Edit</button>
                        <button className='btn btn-primary mx-1' onClick={()=>handleDelete(elem.id)} >Delete</button>
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

export default Products