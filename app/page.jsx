import HeroSection from "@/components/HeroSection";
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/data/features";

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
    </div>
  );
}
