'use client'

import { useState } from "react";
import { Badge } from "@/components/tailgrids/core/badge";
import { Button } from "@/components/tailgrids/core/button";
import LoginModal from "@/components/LoginModal";
import { useGlobalData } from "@/app/context/GlobalData";



export default function Header() {
    const { user, setUser } = useGlobalData();
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        // header container
        <div className='mt-4 text-center'>
            {/* {code} */}
            <div className='flex justify-center gap-4'>
                <Badge className='text-3xl rounded-lg px-3 rotate-20 bg-red-600 text-gray-200'>C</Badge>

                <Badge className='text-3xl rounded-lg px-3 -rotate-20 bg-green-600 text-gray-200'>S</Badge>

                <Badge className='text-3xl rounded-lg px-3 rotate-20 bg-blue-600 text-gray-200'>I</Badge>

                <Badge className='text-3xl rounded-lg px-3 -rotate-20 bg-purple-600 text-gray-200'>2</Badge>

                <Badge className='text-3xl rounded-lg px-3 rotate-20 bg-pink-600 text-gray-200'>0</Badge>

                <Badge className='text-3xl rounded-lg px-3 -rotate-20 bg-yellow-600 text-gray-200'>5</Badge>
            </div>

            {/* {name} */}
            <div className='mt-4'>
                 <Badge className='text-2xl rounded-lg px-3 bg-black text-white'>FRONT END SOFTWARE 
                    DEVELOPER</Badge>
            </div>

            <div className="mt-4 flex justify-center gap-3">
                {user ? (
                    <>
                        <Badge className="rounded-lg bg-green-100 px-3 text-green-800">
                            {user.name}
                        </Badge>
                        <Button
                            type="button"
                            variant="danger"
                            appearance="outline"
                            size="sm"
                            onPress={() => setUser(null)}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <Button
                        type="button"
                        variant="primary"
                        appearance="fill"
                        size="sm"
                        onPress={() => setIsLoginOpen(true)}
                    >
                        Login
                    </Button>
                )}
            </div>

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLogin={(loggedInUser) => {
                    setUser(loggedInUser);
                    setIsLoginOpen(false);
                }}
            />
        </div>
    );
}