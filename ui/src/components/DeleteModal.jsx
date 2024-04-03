/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
const DeleteModal = (props) => {

    const {deleteComment, setOpenDeleteModal} = props;


  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50">
        <div className="absolute top-1/2 bg-white rounded-xl text-black z-50 p-5 w-80 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <h1 className="mb-5 text-2xl font-bold">Delete comment</h1>
        <p className="mb-5">are you sure you want to delete this comment? this will remove the comment and can't be undone.</p>
        <div className="mb-5 flex justify-between text-white font-bold">
            <button onClick={() => setOpenDeleteModal(false)} className="p-3 bg-gray-600 rounded">NO, CANCEL</button>
            <button onClick={() => deleteComment()} className="p-3 bg-red-600 rounded">YES, DELETE</button>
        </div>
    </div>
    </div>
  )
}

export default DeleteModal