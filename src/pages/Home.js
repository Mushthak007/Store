import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../Api/GeneralApi'
import { useDispatch } from 'react-redux'
import { setItem } from '../Redux/List'
import { SearchComponent ,Filter} from '../components'

const Home = () => {

  const dispatch = useDispatch()
    const [products,setProducts]=useState([])
    const [productLists,setProductList]=useState([])

    useEffect(()=>{
        productList()
    },[])

    const productList=()=>{
        api.getProductList().then((result)=>{
           console.log("Products==>",result.data)
            setProducts(result.data)
            setProductList(result.data)
        })
        .catch((err) => {
            console.log("api error  response", err)
        });
    }

  return (
    <>
<div className='md:container md:mx-auto md:p-10'>
  <SearchComponent product={products} setProduct={setProductList}/>
  <Filter product={products} setProduct={setProductList}/>
<div className='max-w-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
{
        productLists.map((item,key)=>{
            return (
                <div className="flex justify-center max-w-[550px] max-h-[300px]" key={item.id}>
                     <Link  to='View'  onClick={()=>dispatch(setItem(item))}>
                <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                  <img className=" w-[200px] h-[100px] md:h-auto object-fill hover:object-cover hover:rotate-2 hover:duration-500  md:w-44 rounded-t-lg md:rounded-none md:rounded-l-lg" src={item.image} alt="" />
                  <div className="p-6 md:flex flex-col justify-start">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">{item.title.slice(0,20)+"..."}</h5>
                    <p className="text-gray-700 text-base mb-4 hidden lg:flex">
                     {item.description.slice(0,30)+"..."}
                    </p>
                    <h1 className='text-md font-semibold '>{item.price +"₹"}</h1>
                   <div className='lg:mt-8 transform hover:translate-x-2 duration-500 flex justify-center'>
                
                  <button className='bg-gray-700 px-2 lg:px-8 py-2  text-center font-mono font-bold text-md rounded-md shadow-lg text-white'
                 >  Quik View</button>
    
                   </div>
                  </div>
                </div>
                </Link>
              </div>
            )
        })

    }
</div>
</div>
    
    </>
  )
}

export default Home