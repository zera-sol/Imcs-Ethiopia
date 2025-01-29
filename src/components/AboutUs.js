import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import "./aboutUs.css";

const AboutUs = ({ className }) => {
  const tasks = [
    {
      title: "Climate Justice",
      description:
        "Pursuit of fair and equitable solutions to the environmental crisis.",
    },
    {
      title: "Leadership Development",
      description:
        "Equipping individuals with the skills and values to lead with integrity, vision, and service.",
    },
    {
      title: "Human Rights & Peacebuilding",
      description:
        "To protect dignity, promote justice, and foster peace by respecting all individuals' rights.",
    },
    {
      title: "Advocacy & Lobbying",
      description:
        "Supporting and promoting policies or actions that drive positive social change and justice.",
    },
    {
      title: "Global Representation",
      description:
        "Ensures diverse voices and perspectives are included in decision-making processes.",
    },
    {
      title: "Formation & Capacity Building",
      description:
        "Strengthening skills, resources, and abilities for sustainable growth and impact.",
    },
  ];

  return (
    <div
      className={`bg-[#3992CE] text-white p-6 md:p-12 flex flex-col gap-8 min-h-screen ${className}`}
    >
      {/* Content Wrapper */}
      <h1 className="about-title">What <span>We Do</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* First Column: First 3 Tasks */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ul className="space-y-15">
            {tasks.slice(0, 3).map((task, index) => (
              <li key={index} className="flex items-start gap-4">
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                <div>
                  <h3 className="about-list-title">{task.title}</h3>
                  <p className="about-list-description">{task.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Second Column: Remaining 3 Tasks */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ul className="space-y-15">
            {tasks.slice(3).map((task, index) => (
              <li key={index} className="flex items-start gap-4">
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                <div>
                  <h3 className="about-list-title">{task.title}</h3>
                  <p className="about-list-description">{task.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Third Column: Image (Hidden on Tablets and Mobile) */}
        <motion.div
          className="hidden lg:block mt-8 lg:mt-0"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full h-full bg-gray-300 rounded-lg overflow-hidden shadow-lg">
            <img
              src={require("../images/ecusta.jpg")}
              alt="About Us"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
