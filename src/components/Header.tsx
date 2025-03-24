import { SignInButton, UserButton, useUser } from "@clerk/clerk-react"
import { Button } from "./ui/button";
import { Link } from "react-router";


const Header: React.FC = () => {
    const { isSignedIn } = useUser();
    return (
        <div className="flex justify-between items-center shadow-sm p-5">
            <Link to={"/"}>
                <img src="/logo.svg" width={150} height={100} />
            </Link>
            <ul className="hidden md:flex gap-16">
                <Link to={"/"}>
                <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">Home</li>
                </Link>
               <Link to={"/search"}>
                <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">Search</li>
               </Link>
                <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">New</li>
                <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">Preowned</li>
            </ul>

            {
                isSignedIn ? (
                    <div className="flex items-center gap-5">
                        <UserButton />
                        <Link to={"/profile"}>
                            <Button>Submit Listing</Button>
                        </Link>
                    </div>) : <Button><SignInButton /></Button>
            }

        </div>
    )
}

export default Header