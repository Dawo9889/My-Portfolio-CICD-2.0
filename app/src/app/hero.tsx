"use client";

import { IconButton, Typography } from "@material-tailwind/react";

function Hero() {
  return (
    <div className="relative w-full">
      <div className="grid place-items-center min-h-[92vh] px-8">
        <div className="container mx-auto grid place-items-center h-max text-center">

          <Typography variant="h1" color="blue-gray">
            My Profile
          </Typography>
          <Typography
            variant="lead"
            color="gray"
            className="mt-4 mb-12 w-full md:max-w-full lg:max-w-4xl"
          >
            Welcome to my website! Here you'll find a detailed overview of my professional experience, skills,
            and information about my interests outside of work. I focus particularly on my career path in DevOps,
            which I have chosen to pursue and develop.
          </Typography>

          {/* Add profile image under the description */}
          <img
            src="image/my-image.jpg" 
            alt="Dawid Gala"
            className="rounded-full w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 mx-auto mb-6 object-cover"
            style={{ objectPosition: "top center" }}

          />

          {/* DevOps project section */}
          <Typography variant="h3" color="blue-gray" className="mt-4 mb-6 w-full md:max-w-full lg:max-w-4xl">
            DevOps Project
          </Typography>
          <Typography variant="lead" color="gray" className="mb-6">
            This site is part of my DevOps project, where I use various technologies to automate and deploy applications to production.
            You can view the source code for this project on
            <a href="https://github.com/Dawo9889/My-Portfolio-CICD-2.0" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800"> GitHub</a>.
          </Typography>

          <Typography className="mt-12 mb-4 text-blue-gray-900 font-medium uppercase">
            Find me on:
          </Typography>
          <div className="gap-2 lg:flex mb-20" >
            <IconButton variant="text" size = "lg" color="gray">
              <a href="https://www.linkedin.com/in/galadawid/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin text-4xl" />
              </a>
            </IconButton>

            <IconButton variant="text" size = "lg" color="gray">
              <a href="https://github.com/Dawo9889/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-github text-4xl" />
              </a>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
