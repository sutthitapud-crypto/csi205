'use client';

import Link from "next/link";

import { Badge } from "@/components/tailgrids/core/badge";
import { Facebook, Instagram, Twitter } from "@tailgrids/icons";


export default function Footer() {
    return (
        // footer container
        <div className='mt-4 text-center'>
        {/* student */}
            <div>
                <Badge className='text-2xl text-black rounded-lg'>68000324สุทธิตา ปู่ดี</Badge>
            </div>
            {/* contact */}
            <div className='mt-4 flex justify-center gap-4'>
                <Link href='https://www.facebook.com/sutthita.pudee' target='_blank'>
                <Facebook className='text-blue-700' />
                </Link>
                <div className='border-l-1'></div>
                <Link href='https://www.instagram.com/sutthita.pudee' target='_blank'>
                    <Instagram className='text-pink-500' />
                </Link>
                 <div className='border-l-1'></div>
                 {/* (เปิดไม่ได้เพราะไม่มีทวิตเตอร์) */}
                 <Link href='https://twitter.com/sutthita_pudee' target='_blank'>  
                     <Twitter className='' />
                 </Link>
            </div>
        </div>
    );
}