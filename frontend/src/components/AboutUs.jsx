import React from 'react';
import '../styles/AboutUs.css';
import Header from '../components/Header'; // Import your existing Header component
import JohnImage from '../assets/jl.jpg'; // Import your image assets
import ArvsImage from '../assets/arvs.jpeg';
import LlagaImage from '../assets/llaga.jpg'; // Assuming you have an image for Hannah

function AboutUs() {
  const teamMembers = [
    {
      id: 1,
      name: "John Lawrence L. Dioquino",
      title: "Team Lead",
      image: JohnImage
    },
    {
      id: 2,
      name: "Patrick John Pepito",
      title: "Project Manager",
      image: "/api/placeholder/300/300"
    },
    {
      id: 3,
      name: "Harvey Ortega",
      title: "Backend Developer",
      image: ArvsImage
    },
    {
      id: 4,
      name: "Hannah Illaga",
      title: "Frontend Developer",
      image: LlagaImage
    }
  ];

  return (
    <>
      <Header />
      <div className="about-container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-content">
            <h1>About Us</h1>
            <p>Building the Lifeline of the Nation</p>
          </div>
        </section>

        {/* Company Mission */}
        <section className="about-mission">
          <div className="about-section-container">
            <h2>Our Mission</h2>
            <div className="mission-content">
              <div className="mission-text">
                <p>
                Our mission is to provide a reliable, accessible, and compassionate blood donation
                platform that serves as a vital lifeline for underprivileged Filipino communities.
                We aim to ensure that during times of medical crisis,  individuals in urgent need of 
                blood can quickly and easily find compatible donors through our system—offering a faster, safer,
                and more convenient way to access life-saving support.
                </p>
                <p>
                Beyond simply connecting donors and recipients, we strive to promote a culture of unity,
                generosity, and shared responsibility across the nation. By empowering Filipinos to help 
                one another through the spirit of bayanihan, we envision a community where no life is lost
                due to the lack of available blood—because everyone deserves a chance to live, regardless 
                of their status or circumstance.
                </p>
              </div>
              <div className="mission-stats">
                <div className="stat-item">
                  <span className="stat-number">10,000+</span>
                  <span className="stat-label">Lives Impacted</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Active Blood Donors</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Partner Hospitals & Clinics</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="about-team">
          <div className="about-section-container">
            <h2>Meet Our Team</h2>
            
            <div className="team-grid">
              {teamMembers.map(member => (
                <div key={member.id} className="team-member">
                  <div className="member-image-wrapper">
                    <img src={member.image} alt={member.name} className="member-image" />
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-title">{member.title}</p>
                    <p className="member-bio">{member.bio}</p>
                    <div className="member-social">
                      <a href="#" aria-label="Facebook"><i className="social-icon facebook"></i></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-values">
          <div className="about-section-container">
            <h2>Our Core Values</h2>
            
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon innovation"></div>
                <h3>Compassion</h3>
                <p>We care deeply about the well-being of others and strive to alleviate suffering by ensuring timely access to life-saving blood.</p>
              </div>
              
              <div className="value-item">
                <div className="value-icon security"></div>
                <h3>Accessibility</h3>
                <p>We believe everyone—regardless of status or location—deserves a fair chance at survival. Our platform is built to be inclusive and easy to use.</p>
              </div>
              
              <div className="value-item">
                <div className="value-icon transparency"></div>
                <h3>Integrity</h3>
                <p>We uphold honesty, transparency, and accountability in all aspects of our system to build trust with our donors and recipients.</p>
              </div>
              
              <div className="value-item">
                <div className="value-icon community"></div>
                <h3>Community Empowerment</h3>
                <p>We foster a spirit of bayanihan by encouraging individuals to become heroes through voluntary blood donation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="about-contact">
          <div className="about-section-container">
            <h2>Get In Touch</h2>
            <p>Have questions or want to learn more about our services?</p>
            <button className="contact-button">Contact Us</button>
          </div>
        </section>
      </div>
    </>
  );
}

export default AboutUs;