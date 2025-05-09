import { useState } from 'react';
import '../styles/Details.css'; // Import the CSS file
import Header from './Header'; // Adjust path as needed


export default function BloodDonationPage() {
  const [selectedBloodType, setSelectedBloodType] = useState(null);
  
  const bloodTypes = [
    {
      type: 'A+',
      canDonateTo: ['A+', 'AB+'],
      canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
      percentage: '35.7%',
      description: 'Type A+ blood is the second most common blood type. A+ individuals can donate to A+ and AB+ recipients. As an A+ donor, your blood is always in demand.',
      donorInfo: 'A+ donors are encouraged to donate both whole blood and platelets, which are vital for cancer treatments, surgeries, and trauma care.'
    },
    {
      type: 'A-',
      canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
      canReceiveFrom: ['A-', 'O-'],
      percentage: '6.3%',
      description: 'Type A- blood is relatively rare. A- individuals can donate to all A and AB recipients, making your blood highly valuable for hospitals.',
      donorInfo: 'A- donors are particularly valuable as your red blood cells can be used for trauma situations when there is no time to test a patient\'s blood type.'
    },
    {
      type: 'B+',
      canDonateTo: ['B+', 'AB+'],
      canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
      percentage: '8.5%',
      description: 'Type B+ is found in about 8.5% of the population. B+ individuals can donate to B+ and AB+ recipients.',
      donorInfo: 'B+ donors are specially needed for platelets and plasma donations which can help many patients including those with immune deficiencies.'
    },
    {
      type: 'B-',
      canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
      canReceiveFrom: ['B-', 'O-'],
      percentage: '1.5%',
      description: 'Type B- blood is very rare, found in only 1.5% of the population. B- individuals can donate to all B and AB recipients.',
      donorInfo: 'As a B- donor, your blood is critically important due to its rarity. Your donations can make a life-saving difference in emergency situations.'
    },
    {
      type: 'AB+',
      canDonateTo: ['AB+'],
      canReceiveFrom: ['All Blood Types'],
      percentage: '3.4%',
      description: 'Type AB+ is rare and found in only 3.4% of people. AB+ individuals are universal plasma donors but can only donate red blood cells to other AB+ recipients.',
      donorInfo: 'AB+ donors are especially valued for plasma and platelet donations. Your plasma can be given to patients of all blood types, making you a universal plasma donor.'
    },
    {
      type: 'AB-',
      canDonateTo: ['AB+', 'AB-'],
      canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'],
      percentage: '0.6%',
      description: 'Type AB- is the rarest blood type, found in only 0.6% of people. AB- individuals can donate to both AB+ and AB- recipients.',
      donorInfo: 'As an AB- donor, your plasma is universal and can be used for any patient regardless of blood type. Your donations are extremely valuable due to the rarity of your blood type.'
    },
    {
      type: 'O+',
      canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
      canReceiveFrom: ['O+', 'O-'],
      percentage: '37.4%',
      description: 'Type O+ is the most common blood type. O+ individuals can donate to all positive blood types, which represents about 80% of the population.',
      donorInfo: 'O+ donors are always in high demand. Your blood can help the majority of patients, making your regular donations critically important to maintain blood supplies.'
    },
    {
      type: 'O-',
      canDonateTo: ['All Blood Types'],
      canReceiveFrom: ['O-'],
      percentage: '6.6%',
      description: 'Type O- blood is the universal donor type for red blood cells. O- individuals can donate to people of all blood types, making this blood type extremely valuable in emergency situations.',
      donorInfo: 'As an O- donor, you are particularly valuable in emergency situations when there is no time to determine a patient\'s blood type. Your blood is always in critically high demand.'
    }
  ];

  const eligibilityInfo = {
    requirements: [
      'Be at least 17 years old in most states (16 years old with parental consent in some states)',
      'Weigh at least 110 pounds',
      'Be in good general health and feeling well on donation day',
      'Have not donated whole blood in the last 56 days'
    ],
    restrictions: [
      'Recent illness or fever',
      'Certain medications or medical conditions',
      'Low hemoglobin levels',
      'Recent travel to certain countries',
      'Certain lifestyle factors that may increase risk for transmissible diseases'
    ]
  };
  
  const donationProcessInfo = [
    'Registration: Complete donor registration with valid ID',
    'Health History: Answer questions about health history and travel',
    'Mini Physical: Quick check of temperature, pulse, blood pressure, and hemoglobin levels',
    'Donation: The actual blood donation takes about 8-10 minutes',
    'Refreshments: Enjoy snacks and drinks to replenish fluids and energy',
    'Rest: The entire process takes about an hour, with the actual donation only taking about 10 minutes'
  ];

  const [showEligibility, setShowEligibility] = useState(false);
  const [showProcess, setShowProcess] = useState(false);

  return (
    <>
    <Header />
    <div className="blood-donation-container">
      <h1 className="page-title">Blood Donation Information Center</h1>
      
      <div className="section-container">
        <h2 className="section-title">Select Your Blood Type</h2>
        <div className="blood-type-grid">
          {bloodTypes.map((blood) => (
            <button
              key={blood.type}
              onClick={() => setSelectedBloodType(blood)}
              className={`blood-type-button ${
                selectedBloodType?.type === blood.type
                  ? 'active'
                  : 'inactive'
              }`}
            >
              {blood.type}
            </button>
          ))}
        </div>
      </div>

      {selectedBloodType && (
        <div className="info-card">
          <h2 className="info-card-title">
            Blood Type {selectedBloodType.type}
          </h2>
          
          <div className="info-grid">
            <div className="info-section">
              <h3>Overview</h3>
              <p>{selectedBloodType.description}</p>
              
              <div className="info-block">
                <h4>Population:</h4>
                <p>{selectedBloodType.percentage} of the population has this blood type</p>
              </div>

              <div className="info-block">
                <h4>Can donate to:</h4>
                <div className="compatibility-container">
                  {selectedBloodType.canDonateTo.map((type) => (
                    <span key={type} className="compatibility-tag">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="info-block">
                <h4>Can receive from:</h4>
                <div className="compatibility-container">
                  {Array.isArray(selectedBloodType.canReceiveFrom) ? 
                    selectedBloodType.canReceiveFrom.map((type) => (
                      <span key={type} className="receive-tag">
                        {type}
                      </span>
                    )) : 
                    <span className="receive-tag">
                      {selectedBloodType.canReceiveFrom}
                    </span>
                  }
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Donor Information</h3>
              <p>{selectedBloodType.donorInfo}</p>
              
              <div className="fun-facts">
                <h4>Did you know?</h4>
                <ul>
                  <li>One donation can save up to three lives</li>
                  <li>Blood cannot be manufactured; it can only come from generous donors</li>
                  <li>Someone needs blood every two seconds</li>
                  <li>A single car accident victim can require as many as 100 units of blood</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="section-container">
        <button 
          onClick={() => setShowEligibility(!showEligibility)}
          className="accordion-button"
        >
          <span>Donation Eligibility Requirements</span>
          <span>{showEligibility ? '−' : '+'}</span>
        </button>
        
        {showEligibility && (
          <div className="accordion-content">
            <h3 className="info-section-title">Basic Eligibility Requirements</h3>
            <div className="info-grid">
              <div>
                <h4>Requirements:</h4>
                <ul>
                  {eligibilityInfo.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Temporary Restrictions:</h4>
                <ul>
                  {eligibilityInfo.restrictions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="italic-text small-text">For specific questions about your eligibility, contact your local blood donation center.</p>
          </div>
        )}

        <button 
          onClick={() => setShowProcess(!showProcess)}
          className="accordion-button"
        >
          <span>Donation Process</span>
          <span>{showProcess ? '−' : '+'}</span>
        </button>
        
        {showProcess && (
          <div className="accordion-content">
            <h3 className="info-section-title">The Donation Process</h3>
            <div>
              {donationProcessInfo.map((step, index) => (
                <div key={index} className="process-step">
                  <div className="step-number">
                    {index + 1}
                  </div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
            <div className="after-donation">
              <h4>After Donation Care</h4>
              <ul>
                <li>Drink extra fluids for the next 48 hours</li>
                <li>Avoid strenuous physical activity for 24 hours</li>
                <li>Keep the bandage on for several hours</li>
                <li>Eat iron-rich foods to help replenish iron stores</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="cta-container">
        <h3 className="cta-title">Ready to Donate?</h3>
        <div className="cta-button-container">
          <button className="cta-button">
            Find a Donation Center Near You
          </button>
        </div>
      </div>
    </div>
    </>
  );
}