'use client'

const ExploreBtn = () => {
  return (
    <div>
        <button className='bg-indigo-500 font-bold text-xl mt-5 p-4 rounded-xl w-full cursor-pointer'
        onClick={()=> console.log('CLICK')}>

            Explore Events
        </button>
       
    </div>
  )
}

export default ExploreBtn