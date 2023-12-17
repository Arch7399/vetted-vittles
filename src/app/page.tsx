import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, Cat, CheckCircle, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const perks = [
    {
      name: "Instant Quality Check",
      icon: ArrowDownToLine,
      description: "Check our curated collection of healthy pet products",
    },
    {
      name: "Check pet clinic ratings",
      icon: PlusCircle,
      description:
        "Check our curated community rated list of best pet clinics.",
    },
    {
      name: "For the cause",
      icon: Cat,
      description: "We've pledged 10% of our earnings to foster care centres.",
    },
  ];

  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your marketplace for high-quality{" "}
            <span className="text-blue-600">pet products</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            {" "}
            Welcome to Vetted-Vittles. Every asset on our website are pet
            products verified safe by vets and consumers alike.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Trending products
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>
        {/* TODO: List Products */}
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper classname="py-20">
          <div className="grid grid-cols gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
