import { Button } from "./ui/button"


const InfoSection = () => {
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-6 py-8  lg:px-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center md:gap-8">
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1599912027765-a69c78bfa3aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1lcmNlZGVzfGVufDB8fDB8fHww"
                            className="rounded"
                            alt=""
                        />
                    </div>
                    <div>
                        <div className="max-w-lg md:max-w-none">
                            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                                Discover the Best Deals on Luxury Cars
                            </h2>

                            <p className="mt-4 text-gray-700">
                                Explore a wide selection of premium vehicles, handpicked for performance, style, and comfort. Whether you're looking to buy or rent, we have the perfect car to match your needs.

                            </p>
                            <Button className="mt-5 items-center">Get in touch</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InfoSection