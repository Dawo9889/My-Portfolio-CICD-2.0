"use client";

import React from "react";
import Image from "next/image";
import { Typography, Card, CardBody, Avatar } from "@material-tailwind/react";


export function HobbyRower() {
  const [active, setActive] = React.useState(3);

  return (
    <section className="py-2 px-8 lg:py-12">
      <div className="container max-w-screen-lg mx-auto">

        <Card color="transparent" shadow={false} className="py-8 lg:flex-row">
          <CardBody className="w-full lg:gap-10 h-full lg:!flex justify-between ">
            <div className="w-full mb-10 lg:mb-0">
              <Typography
                variant="h3"
                color="blue-gray"
                className="mb-4 font-bold lg:max-w-xs">
                1. I ride a bike
              </Typography>
              <Typography className="mb-3 w-full lg:w-8/12 font-normal !text-gray-500">
              I recently bought a bike and I'm already considering upgrading to a full-suspension model. Riding in the mountains is a lot of fun for me (even if climbs aren't as exciting...). The descents are what I enjoy the most!
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-0.5">
                A few photos
              </Typography>
              <div className="flex items-center gap-4">
                <Avatar
                  variant="rounded"
                  src="image/rower/rower1.jpg"
                  alt="Avatar roweru"
                  size="xl"
                  className={`cursor-pointer ${active === 1 ? "opacity-100" : "opacity-50"}`}
                  onClick={() => setActive(1)}                
                  />
                <div className="w-[1px] h-[36px] bg-blue-gray-100 "></div>
                <Avatar
                  variant="rounded"
                  src="image/rower/rower2.jpg"
                  alt="Avatar roweru"
                  size="xl"
                  className={`cursor-pointer ${active === 2 ? "opacity-100" : "opacity-50"}`}
                  onClick={() => setActive(2)}                
                  />
                <div className="w-[1px] h-[36px] bg-blue-gray-100" />
                <Avatar
                  variant="rounded"
                  src="image/rower/rower3.jpg"
                  alt="Avatar roweru"
                  size="xl"
                  className={`cursor-pointer ${active === 3 ? "opacity-100" : "opacity-50"}`}
                  onClick={() => setActive(3)}                
                  />
                  <div className="w-[1px] h-[36px] bg-blue-gray-100" />
                <Avatar
                  variant="rounded"
                  src="image/rower/rower4.jpg"
                  alt="Avatar roweru"
                  size="xl"
                  className={`cursor-pointer ${active === 3 ? "opacity-100" : "opacity-50"}`}
                  onClick={() => setActive(4)}                
                />
              </div>
            </div>
            <div className="h-full sm:w-[18rem] w-full shrink-0">
              <div className="aspect-w-3 aspect-h-4 w-full">
                <Image
                  width={576}  // 3:4 ratio (width:height = 3:4)
                  height={768}
                  src={`/image/rower/rower${active}.jpg`}
                  alt="rower zdjęcie"
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
</div>
          </CardBody>
        </Card>
      </div>
    </section>

  );
}

export default HobbyRower;
