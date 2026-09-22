"use client"
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer(){
    let date = new Date().getFullYear().toString();
    if(date > '2017'){
        date = ` 2021 - `+ date;
    }else{
        date =  ` 2024`;
    }
    return(
        <footer className="footer flex justify-around items-center py-4">
             
            <div className="footer-content">
                Copyright &copy; 
                 {date}
            </div>
            <div className="footer-social flex gap-3">
                <Link href={"https://www.facebook.com/tnjensen09"}>
                    <FaFacebook />
                </Link>
                <Link href={"https://www.instagram.com/tnjensen09/"}>
                    <FaInstagram />
                </Link>
                <Link href={"https://linkedin.com/in/tnjensen09"}>
                    <FaLinkedin />
                </Link>
            </div>
        </footer>
    )
}
export default Footer;