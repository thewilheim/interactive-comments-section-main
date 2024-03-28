import {useState} from 'react'
import plusIcon from '../assets/icon-plus.svg'
import minusIcon from '../assets/icon-minus.svg'

const UserRating = (props) => {
    const { defaultRating } = props
    const [rating, setRating] = useState(defaultRating ||  0)
  return (
    <div className='flex flex-row justify-between items-center rounded-xl bg-Light-gray p-2 md:px-0 md:flex-col md:min-w-12 md:max-w-12 min-w-32 max-w-32'>
      <div onClick={() => setRating(rating + 1)} className='flex justify-center align-middle cursor-pointer h-8 w-1/3 mx-2'>
      <img src={plusIcon} alt="" className='w-4 h-4 my-auto'/>
      </div>
      <p className='text-lg max-w-1/3 px-4 font-bold text-Dark-blue'>{rating}</p>
      <div onClick={() => setRating(rating - 1)} className='flex justify-center align-middle cursor-pointer h-8 w-1/3 mx-2 '>
        <img src={minusIcon} alt="" className='w-4 h-1 my-auto'/>
      </div>
    </div>
  )
}

export default UserRating