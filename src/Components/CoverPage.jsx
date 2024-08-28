const CoverPage = () => {
    return <div className="relative grow border hidden lg:flex flex-col justify-center">
        <img className="w-full h-[650px] bg-cover" src="/images/background1.png" alt="" />
        <div className="absolute p-2 bg-ground">
            <h1 className="text-2xl font-extrabold text-white text-center mb-3">Achieve Your Dreams</h1>
            <p className="text-center text-xl font-normal text-white">Every job is a step toward your dreams, a chance to grow, and an opportunity to showcase your talents. Embrace each challenge as a learning experience, and remember that your perseverance and passion will lead you to success.</p>
        </div>
    </div>
}

export default CoverPage;