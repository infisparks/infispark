// Install React Router if not already installed
// Run the following command in your project directory:
// npm install react-router-dom

// src/pages/RegisterTeam.jsx
import { Element } from "react-scroll";
import Button from "../components/Button.jsx";

const RegisterTeam = () => {
  return (
    <section>
      <Element name="register" className="relative py-24 md:py-28 lg:py-40">
        <div className="container">
          <div className="max-w-640 mx-auto">
            <h2 className="h3 mb-7 text-p4">Join Our Team</h2>
            <p className="body-1 mb-14">
              We're always looking for talented individuals to join our team. Fill out the form below to apply.
            </p>
            <form className="space-y-6">
              <div>
                <label className="block mb-2 body-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border-2 border-s3 rounded-lg px-4 py-3 focus:border-p4 outline-none"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 body-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border-2 border-s3 rounded-lg px-4 py-3 focus:border-p4 outline-none"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 body-2" htmlFor="position">
                  Position Applied For
                </label>
                <input
                  type="text"
                  id="position"
                  className="w-full border-2 border-s3 rounded-lg px-4 py-3 focus:border-p4 outline-none"
                  placeholder="Enter the position you're applying for"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 body-2" htmlFor="resume">
                  Upload Resume
                </label>
                <input
                  type="file"
                  id="resume"
                  className="w-full border-2 border-s3 rounded-lg px-4 py-3 focus:border-p4 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 body-2" htmlFor="coverLetter">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  className="w-full border-2 border-s3 rounded-lg px-4 py-3 focus:border-p4 outline-none"
                  rows="5"
                  placeholder="Tell us why you'd be a great fit"
                ></textarea>
              </div>
              <Button type="submit">Submit Application</Button>
            </form>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default RegisterTeam;
