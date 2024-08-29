import './style.css'

const Loader = () => {
    return (
    <div className='fixed top-0 left-0 w-screen z-10 bg-black bg-opacity-70 h-screen flex justify-center items-center'>
        <div className="loader ">
        <div className="box1"></div>
        <div className="box2"></div>
        <div className="box3"></div>
        </div>
    </div>)
}

export default Loader;