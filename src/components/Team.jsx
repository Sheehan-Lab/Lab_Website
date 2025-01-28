import React, { useState } from 'react';

const teamMembers = [
  { 
    name: "Dr. Vivien Sheehan", 
    role: "Principal Investigator", 
    bio: "Dr. Sheehan's research focuses on developing new therapies for individuals living with sickle cell disease, combining genomics, clinical research, and innovative biomarker development.",
    email: "vivien.sheehan@emory.edu"
  },
  { name: "Ugochukwu Agbakwuru", role: "Pediatric Hematology/Oncology Fellow" },
  { name: "Britney Hernandez", role: "Lab Manager" },
  // Add more team members here
];

function Team() {
  const [activeIndex, setActiveIndex] = useState(null);

  function toggleDropdown(index) {
    setActiveIndex(activeIndex === index ? null : index);
  }

  return (
    <div className="team-grid">
      <div className="container">
        {teamMembers.map((member, index) => (
          <div className="team-member" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => toggleDropdown(index)} key={index}>
            <div className="member-info">
              <h2>{member.name}</h2>
              <h3>{member.role}</h3>
            </div>
            {(member.bio || member.email) && (
              <div className={`member-details ${activeIndex === index ? 'active' : ''}`}>
                {member.bio && <p>{member.bio}</p>}
                {member.email && <p>Email: <a href={`mailto:${member.email}`}>{member.email}</a></p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;