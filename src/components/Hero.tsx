import Search from "./Search"



const Hero = () => {
  return (
    <div>
        <div className="flex flex-col items-center p-10 py-20 gap-6 h-[650px] w-full bg-[#eef0fc]">
            <h2 className="text-md md:text-lg">Explore the best cars for sale and rent near you.</h2>
            <h2 className="text-[30px] font-bold  md:text-[60px] md:font-bold">Your Perfect Ride Awaits</h2>
            <Search/>
            <img src="/tesla.png" className="mt-10"/>
        </div>
    </div>
  )
}

export default Hero