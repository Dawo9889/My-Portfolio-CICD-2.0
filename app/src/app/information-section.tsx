"use client";
import { Typography } from "@material-tailwind/react";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  FireIcon,
  CommandLineIcon,
} from "@heroicons/react/24/solid";

import InfoCard from "@/components/info-card";
import { title } from "process";


const POJECTS= [
  {
    icon: CommandLineIcon,
    title: "Cupid App – an application for taking and managing wedding photos.",
    githubLink: "https://github.com/Dawo9889/cupid-app",
    date: "10.2024 - 02.2025",
    children: (
      <>
        A collaborative project with three friends to create a wedding app available on both web and mobile.
        The app allows photographers to access photos from a different perspective — wedding guests can take and share photos in real time,
        showcasing the event from their point of view.
        <br></br>
        <br></br>
        My main responsibilities included: <br></br>

          - Backend application development,<br></br>
          - Securing the application,<br></br>
          - Containerizing the application with Docker,<br></br>
          - Deploying the application to a production server.<br></br>

      </>
    ),
  },
  {
    icon: CommandLineIcon,
    title: "My Portfolio CI/CD Project Development",
    githubLink: "https://github.com/Dawo9889/My-Portfolio-CICD",
    date: "01.2025",
    children: "No need for a long explanation — this is the project I built and proudly present!"
  },
  {
    icon: CommandLineIcon,
  title: "Documentation from the early stages of building my HomeLab",
    githubLink: "https://github.com/Dawo9889/HomeLab",
    date: "2024",
  children: "This documentation contains all stages of creating a personal, low-cost HomeLab. Initially intended for learning, it became a practical tool for everyday use, running multiple services 24/7."
  },
  {
    icon: CommandLineIcon,
    title: "App In AKS",
    githubLink: "https://github.com/Dawo9889/AppInAKS",
    date: "2024",
    children: "A web application built with Node.js where each component is containerized using Docker, providing modularity and efficiency. Credentials are securely stored in MongoDB. The system is deployed on Microsoft Azure using Kubernetes for scalability and reliability.",
  },
  {
    icon: CommandLineIcon,
  title: "Web app for dormitory management",
    githubLink: "https://github.com/Dawo9889/AkademikMVC",
    date: "2024",
    children: "A web application designed to simplify dormitory management. Built with ASP.NET, applying clean architecture and the MVC pattern, it enables modular growth. The system supports resident registration, room assignments, and tracking availability and housing history."
  },
  {
    icon: CommandLineIcon,
  title: "Article comparing the performance of Naive Bayes and K-Nearest Neighbors",
    githubLink: "https://ceur-ws.org/Vol-3885/paper37.pdf",
    date: "2024",
    children:
    "The article aimed to compare the performance of Naive Bayes and K-Nearest Neighbors classifiers."
  },

];

const EXPERIENCE = [
  {
    icon: BriefcaseIcon,
  title: "DevOps Intern | COIG S.A.",
    date: "07.2024 - 10.2024",
    children: "My main task was to get familiar with working in an IT environment within a large company. I focused on understanding workflows, cross-team collaboration, and practical DevOps practices.",
  },
  {
    icon: BriefcaseIcon,
  title: "DevOps Engineer | COIG S.A.",
    date: "10.2024 - 05.2025",
    children: "I worked with the deployment team on tasks related to the development and maintenance of IT infrastructure. Key parts of my role included container management and orchestration. I regularly used tools like Prometheus and Grafana for monitoring and performance analysis.",
  },
  {
    icon: BriefcaseIcon,
    title: "Cloud DevOps Engineer | SAP Poland",
    date: "07.2025 - NOW",
    children: "I work on the Kyma open-source project as part of the DevOps team. My responsibilities include designing, implementing, and maintaining CI/CD pipelines and supporting services for development teams. I focus on automation, reliability, and improving delivery performance.",

  }
];


const CERTIFICATES = [
  {
    icon: AcademicCapIcon,
    title: "Program Corporate Readiness Certificate, ING Hubs - Cybersecurity",
    date: "Technical Skills",
    githubLink: "https://www.linkedin.com/in/galadawid/overlay/1717882932032/single-media-viewer/?type=DOCUMENT&profileId=ACoAAEX78IcBnWMfZ3oQfHKNwbBbkLLHPEDBZj8",
    children:
      "Covers approaches to corporate and commercial security. The ~40-hour course taught practical measures for protecting organizations from cyber threats.",
  },
    {
    icon: AcademicCapIcon,
    title: "Program Corporate Readiness Certificate, ING Hubs - Administrator IT",
    date: "Technical Skills",
    githubLink: "https://credsverse.com/credentials/78bd82ff-2a51-426b-8a2e-9cd202a82cfd",
    children: "During the training I learned how to administer IT systems in a corporate environment."   
  }
];

const SKILLS = [
  {
    icon: FireIcon,
    title: "C#, ASP.NET, MVC Architecture",
    date: "Technical Skills",
    children:
      "Technologies I used during my studies for building backend applications. They helped me gain solid foundations in object-oriented programming, data handling, and API design.",
  },
  {
    icon: FireIcon,
    title: "Git, Github, Github Actions",
    date: "Technical Skills",
    children:
      "Tools essential to modern software development. I rely heavily on version control, primarily using GitHub for online repositories.",
  },
  {
    icon: FireIcon,
    title: "Docker & Kubernetes",
    date: "Technical Skills",
    children:
      "I use Docker frequently to run many of my home services (e.g., Immich, Nextcloud). I have experience with Kubernetes and plan to base my engineering project on it.",
  },
  {
    icon: CommandLineIcon,
    title: "Linux & Windows",
    date: "Technical Skills",
    children:
      "Familiarity with Linux and Windows is essential in DevOps. Understanding these operating systems is critical for a career in infrastructure and operations.",
  },
  {
    icon: CommandLineIcon,
    title: "Vagrant & Ansible",
    date: "Technical Skills",
    children:
      "Tools that help automate provisioning and configuration. Vagrant simplifies creating VMs, and Ansible automates their configuration.",
  },
  {
    icon: CommandLineIcon,
    title: "Jenkins",
    date: "Technical Skills",
    children:
      "Jenkins enables building, testing, and deploying applications in a consistent and automated way. It helps run scripts on code changes, catch issues early, and speed up delivery.",
  },
  {
    icon: FireIcon,
    title: "Prometheus, Grafana, Grafana Loki",
    date: "Technical Skills",
    children:
      "Prometheus, Grafana, and Grafana Loki are tools I use for monitoring and analysis. Prometheus collects metrics, Grafana visualizes dashboards, and Loki aggregates logs for easier troubleshooting.",
  },
  {
  icon: FireIcon,
  title: "Terraform",
  date: "Technical Skills",
  children:
    "I used Terraform to provision cloud infrastructure, writing modules for EC2 instances and VPC configuration. This reinforced the Infrastructure as Code approach.",
  },
  {
    icon: FireIcon,
    title: "Apache HTTP Server",
    date: "Technical Skills",
    children:
      "I used Apache for configuring web servers in test environments: virtual hosts, redirects, and HTTPS with SSL certificates. It helped me understand server-side web integration.",
  },
  {
    icon: FireIcon,
    title: "Nginx",
    date: "Technical Skills",
    children:
      "I used Nginx as a static file server and reverse proxy, configuring load balancing and routing to apps on different ports. Working with Nginx improved my understanding of request routing and performance optimization.",
  },
  {
    icon: FireIcon,
    title: "SSL & PKI",
    date: "Technical Skills",
    children:
      "Working with SSL certificates and PKI taught me how to generate and manage X.509 certs, create CSRs, and configure HTTPS on Nginx and Apache. This improved my understanding of authentication and encryption.",
  },

  {
    icon: FireIcon,
    title: "Azure Cloud",
    date: "Technical Skills",
    children:
      "I used Azure to create VMs with public IPs for deploying publicly accessible applications. AKS with a built-in load balancer was particularly useful.",
  },
  {
    icon: FireIcon,
    title: "AWS Cloud",
    date: "Technical Skills",
    children:
      "While learning AWS, I worked with services like EC2 and S3. I focused on Amazon EKS for deploying containerized applications and managing Kubernetes clusters.",
  },

  {
    icon: AcademicCapIcon,
    title: "English, level B2/C1",
    date: "Soft Skills",
    children: "My English helps me at work. Reading technical documentation is comfortable; conversational skills are improving toward advanced levels.",
  }
];

export function InformationSection() {
  return (
    <section className="pb-6 px-8">
      <div className="container mx-auto">

        {/* Projects section*/}
        <div className="mb-16">
          <Typography
            color="blue-gray"
            className="mb-2 text-3xl font-bold"
          >
            Projects
          </Typography>

          <Typography
            variant="lead"
            className="!text-gray-500"
          >
            A selection of projects I'm proud of.
          </Typography>

          <div className="mt-12 grid grid-cols-1 gap-16 gap-y-12">
            {POJECTS.map((props, idx) => (
              <InfoCard key={idx} {...props} />
            ))}
          </div>
        </div>

        {/* EXPERIENCE Section */}
        <div className="mb-16">
          <Typography
            color="blue-gray"
            className="mb-2 text-3xl font-bold"
          >
            Experience
          </Typography>

          <Typography
            variant="lead"
            className="!text-gray-500"
          >
            My experience in IT and DevOps
          </Typography>

          <div className="mt-12 grid grid-cols-1 gap-16 gap-y-12">
            {EXPERIENCE.map((props, idx) => (
              <InfoCard key={idx} {...props} />
            ))}
          </div>
        </div>

      {/* Certificates section*/}
      <div className="mb-16">
          <Typography
            color="blue-gray"
            className="mb-2 text-3xl font-bold"
          >
            Certificates
          </Typography>

          <Typography
            variant="lead"
            className="!text-gray-500"
          >
            Some notable certificates and training.
          </Typography>

          <div className="mt-12 grid grid-cols-1 gap-16 gap-y-12">
            {CERTIFICATES.map((props, idx) => (
              <InfoCard key={idx} {...props} />
            ))}
          </div>
        </div>
        {/* SKILLS Section */}
        <div>
          <Typography
            color="blue-gray"
            className="mb-2 text-3xl font-bold"
          >
            Skills
          </Typography>

          <Typography
            variant="lead"
            className="!text-gray-500"
          >
            Technologies and tools I've learned so far
          </Typography>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 gap-y-12">
            {SKILLS.map((props, idx) => (
              <InfoCard key={idx} {...props} />
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-20 text-center">
          <Typography variant="h2" color="blue-gray" className="mb-4">
            What I do in my free time
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto w-full px-4 font-normal !text-gray-500 lg:w-8/12"
          >
            I try to spend my free time actively. I spend a lot of time at the computer for studies and work, so physical activity is important to me.
          </Typography>
        </div>
    </section>
  );
}

export default InformationSection;
