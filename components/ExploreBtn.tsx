'use client'

const ExploreBtn = () => {
  return (
    <div>
        <button
         className='bg-indigo-500 font-bold text-xl p-4 rounded-xl w-full cursor-pointer mx-auto mt-7'
        onClick={()=> console.log('CLICK')}
        type="button"
        id="explore-btn">
          <a href="#events" className="text-white">
             Explore Events
          </a>          
        </button>
       
    </div>
  )
}

export default ExploreBtn