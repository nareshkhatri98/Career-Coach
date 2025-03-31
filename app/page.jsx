import HeroSection from "@/components/HeroSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { faqs } from "@/data/faqs";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="grid-background"> </div>
      <HeroSection />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container  mx-auto px-4 md:px-48">
          <h1 className="text-3xl font-bold tracking-tighter text-center mb-12">Powerful Feature for Your
            Career Growth
          </h1>
          {/* for features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl max-auto">
            {features.map((feature, index) => {
              return (
                <Card key={index} className={"border-2 hover:border-primary transition-colors duration-300"}>
                  <CardContent className={"pt-6 text-center  flex flex-col items-center"}>
                    <div className="flex flex-col items-center justify-center">{feature.icon}
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Support section */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container  mx-auto px-4 md:px-48">
          {/* for features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl max-auto">
            <div className="flex flex-col justify-center items-center space-x-4">
              <h3 className="text-4xl font-bold">50+</h3>
              <p className=" text-muted-foreground ">Industries Covered</p>
            </div>
            <div className="flex flex-col justify-center items-center space-x-4">
              <h3 className="text-4xl font-bold">1000+</h3>
              <p className=" text-muted-foreground ">Interview Questions</p>
            </div>
            <div className="flex flex-col justify-center items-center space-x-4">
              <h3 className="text-4xl font-bold">95%  </h3>
              <p className=" text-muted-foreground ">Success Rate</p>
            </div>
            <div className="flex flex-col justify-center items-center space-x-4">
              <h3 className="text-4xl font-bold">24/7 </h3>
              <p className=" text-muted-foreground ">AI Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container  mx-auto px-4 md:px-48">
          <div className="max-w-3xl text-center mb-12 mx-auto">

            <h1 className="text-3xl font-bold ">
              How It Works
            </h1>
            <p className="text-muted-foreground">Four steps to accelerate your career growth</p>
          </div>
          {/* for features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl max-auto">
            {howItWorks.map((items, index) => {
              return (
                <div key={index}>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    {items.icon}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* testiomonial */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container  mx-auto px-4 md:px-48">
          <h1 className="text-3xl font-bold tracking-tighter text-center mb-12"> What our Users
            Say
          </h1>
          {/* for features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl max-auto">
            {testimonial.map((testimonial, index) => {
              return (
                <Card key={index} className={"bg-background"}>
                  <CardContent className={"pt-6 "}>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <Image src={testimonial.image} width={40} height={40} alt={testimonial.author} className="object-cover border border-primary/20 rounded-full" />
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          <p className="text-primary text-sm">{testimonial.company}</p>
                        </div>
                      </div>
                      <blockquote>
                        <p className="text-muted-foreground italic relative ">
                          <span className="text-3xl text-primary absolute -top-4 -left-2">&quot;</span>
                          {testimonial.quote}
                          <span className="text-3xl text-primary absolute -bottom-4">&quot;</span>
                        </p>
                      </blockquote>
                    </div>

                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* fa-questions */}

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container  mx-auto px-4 md:px-48">
          <div className="max-w-3xl text-center mb-12 mx-auto">

            <h1 className="text-3xl font-bold ">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground">Find answer to common questions about our platforms</p>
          </div>
          <div className=" max-w-6xl max-auto">
            <Accordion type="single" collapsible>
              {faqs.map((items, index) => {
                return (
                  <AccordionItem key={index} value={`items-${index}`}>
                    <AccordionTrigger>{items.question}</AccordionTrigger>
                    <AccordionContent>
                      {items.answer}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </div>
      </section>

      {/* last banner section */}
      <section className="w-full ">
        <div className=" mx-auto py-24 gradient rounded-lg">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl  mx-auto">

            <h1 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl ">
              Ready to accelerate Your Career?
            </h1>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">Join Thousands of professionals who are advancing their career with AI-powered guidance. </p>
           <Link href={"/dashboard"}>
           <Button size={"lg"} variant={"secondary"} className={"h-11 mt-5 animate-bounce"}> Start Your Journey Today
            <ArrowRight className="ml-2 h-4 w-4"/>
           </Button>
           </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
