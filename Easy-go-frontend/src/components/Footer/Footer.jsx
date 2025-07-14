/* eslint-disable no-unused-vars */
import React from "react";
import "./Footer.css";
import logoBGOp from "../../assets/Logo/logoBGOp.png";
import logo from "../../assets/Logo/esayGologo.png";
const Footer = () => {
  return (
    <div className="bg-[#E2FBE6] overflow-hidden  pb-[99px] lg:pb-0">
      <footer className="footer px-10 md:px-20 pt-10">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold ">
            Largest and reliable
            <br /> daily service
          </h1>
          <p className="mb-5 text-[#777E90]">
            Empowering Convenience, Connecting Communities:
            <br />
            Explore Our Diverse E-Commerce Specialties Today!
          </p>
        </div>
        <nav>
          <header className="footer-title text-[#204944]">Quick Link</header>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Services</a>
          <a className="link link-hover">Blog</a>
          <a className="link link-hover">Support</a>
          <a className="link link-hover">Contact</a>
        </nav>
        <nav>
          <header className="footer-title text-[#204944]">Contact Us</header>
          <div className="flex justify-start items-center">
            {" "}
            <i className="fa-solid fa-phone mr-[13px]"></i>
            <a href="tel:+8801883765008" className="link link-hover">
              +8801883765008
            </a>
          </div>
          <div className="flex justify-start items-center">
            {" "}
            <i className="fa-brands fa-telegram mr-[13px]"></i>
            <a href="mailto:easygocht@gmail.com" className="link link-hover">
              easygocht@gmail.com
            </a>
          </div>
          <div className="flex justify-start items-center">
            {" "}
            <i className="fa-solid fa-location-dot mr-[13px]"></i>
            <span className="link link-hover">
              05 No. Ward, Ujani Para, 5<sup>th</sup> floor of Nirvana Bhavan,
              <br />
              Bandarban Sadar, Bandarban
            </span>
          </div>
        </nav>
        <nav>
          <header className="footer-title text-[#204944]">Subscribe</header>
          <div className="input-field my-3">
            <input type="text" id="nameInput" />
            <label htmlFor="nameInput">Name</label>
          </div>

          <div className="input-field my-3">
            <input type="text" id="emailInput" />
            <label htmlFor="emailInput">Email</label>
          </div>

          <button className="px-3 py-2 bg-[#3CBD96] rounded-md text-[#fff] font-semibold uppercase shadow-md border-none my-4">
            Subscribe
          </button>
        </nav>
      </footer>
      <div className="flex md:justify-between justify-center">
        <div className="hidden md:block w-1/2">
          <div className="relative">
            <img src={logoBGOp} alt="" className="ml-0 mb-0 w-[500px]" />
            <div className="absolute top-0 left-0 mt-[-0.75rem] px-10 md:px-20">
              <img src={logo} alt="" className="w-28" />
              <h1 className="text-3xl font-[600]">Easy Go</h1>
              <p className="mt-[36px] text-[#777E90] hidden md:block">
                Copyright 2023 | Easy Go -All rights Reserved
              </p>
            </div>
          </div>
        </div>
        <ul className="w-1/2 flex justify-center gap-10 px-10 md:px-20 my-6">
          <li>
            <a href="#">
              <i className="fa-brands fa-facebook text-xl"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-twitter text-xl"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-instagram text-xl"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-dribbble text-xl"></i>
            </a>
          </li>
        </ul>
      </div>
      <p className="text-[#777E90] block md:hidden text-center">
        Copyright 2023 | Easy Go -All rights Reserved
      </p>
    </div>
  );
};

export default Footer;
