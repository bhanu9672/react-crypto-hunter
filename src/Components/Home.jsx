import React from "react";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../Context/UserAuthContext";

const Home = () => {

    const { user,logOut } = useUserAuth();

    console.log(user);

    const handleLogOut = async () => {

        try {
            await logOut();
        } catch( err ) {
            console.log( err.massage );
        }

    }

    return (
        <>
            <div className="p-4 box mt-3 text-center">
                Hello Welcome
                <br />
                { user && user.email }
            </div>
            <div className="d-grid gap-2">
                <Button variant="primary" onClick={ handleLogOut }>
                    LogOut
                </Button>
            </div>
        </>
    )
}

export default Home
