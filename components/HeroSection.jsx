"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";

const HeroSection = () => {
    const imageRef = useRef(null)
    useEffect(() => {
        const imageElement = imageRef.current;
        if (!imageElement) return;
    
        const handleScroll = () => {
          const scrollPosition = window.scrollY;
          const scrollThreshold = 100;
    
          if (scrollPosition > scrollThreshold) {
            imageElement.classList.add("scrolled");
          } else {
            imageElement.classList.remove("scrolled");
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () =>window.removeEventListener("scroll", handleScroll)

    }, [])
    return (
        <section className=" w-full pt-36 md:pt-40 pb-10">
            <div className="space-y-6 text-center">

                <div className="space-y-6 mx-auto">
                    <h1 className=" text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title gradient">Your  AI Career Coach for <br />
                        Personal Success </h1>
                    <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl ">Advance your career with personalized guidance  interview prepare, and  AI-Powered tools for job success.</p>
                </div>
                <div className="flex justify-center space-x-4">
                    <Link href={"/dashboard"}>
                        <Button size={"lg"} className="px-8">Get Started</Button>
                    </Link>
                    <Link href={"https://youtu.be/UbXpRv5ApKA"}>
                        <Button size={"lg"} className="px-8" variant={"outline"}>Get Started</Button>
                    </Link>
                </div>

                {/* for image */}
                <div className="hero-image-wrapper mt-5 md:mt-0">
                    <div ref={imageRef} className="hero-image">
                        <Image
                            src={"/banner.jpeg"}
                            width={1250}
                            height={700}
                            alt="hero image"
                            className="rounded-lg shadow-2xl border mx-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection