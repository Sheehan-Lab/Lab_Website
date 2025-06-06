#!/usr/bin/env node

/**
 * Content Migration Script for Sheehan Lab Website
 * 
 * This script helps migrate existing content from static pages to Sanity CMS format.
 * Run with: node migrate-content.mjs
 */

import { writeFileSync } from 'fs';

// Team Members Data (extracted from team.astro)
const teamMembers = [
  {
    name: "Dr. Vivien A. Sheehan",
    role: "Principal Investigator",
    group: "pi",
    bio: "Dr. Vivien Sheehan is a physician scientist dedicated to improving the lives of individuals with sickle cell disease of all ages. Vivien earned a PhD in Biochemistry from Texas A&M before entering medical school at Emory University School of Medicine. At Emory, Dr. Sheehan was inspired by her patients with sickle cell disease, and decided to devote her career to sickle cell research and patient care.\n\nShe then went on to complete a med-peds residency and two fellowships, pediatric Heme Onc at St Jude Children's Research Hospital and Internal Medicine Hematology at the University of Tennessee. Dr. Sheehan spent 8 years at Baylor College of Medicine, developing her research program, which includes omics, transition from acute to chronic pain, fetal hemoglobin regulation, gene therapy and red cell rheology research.\n\nVivien moved to Atlanta in 2020 and is now an Associate Professor of Pediatrics at Emory University School of Medicine, where she directs their translational sickle cell disease research program.",
    email: "vivien.sheehan@emory.edu",
    image: "/images/headshots/vivien.png",
    order: 1,
    active: true
  },
  {
    name: "Britney Hernandez",
    role: "Lab Manager",
    group: "lab_manager",
    bio: "Lab manager overseeing daily operations and project management.",
    email: "britney.hernandez@emory.edu",
    image: "/images/headshots/britney.png",
    order: 2,
    active: true
  },
  {
    name: "Dr. Justin J. Yoo",
    role: "Junior Faculty",
    group: "faculty",
    bio: "Junior faculty member leading multiple research initiatives.",
    email: "justin.yoo@emory.edu",
    image: "/images/headshots/justin.jpg",
    order: 3,
    active: true
  },
  {
    name: "Dr. Ashwin P. Patel",
    role: "Research Assistant Professor",
    group: "faculty",
    bio: "Research Assistant Professor focusing on statistical analysis and clinical study design.",
    email: "ashwin.patel@emory.edu",
    image: "/images/headshots/ashwin.png",
    order: 4,
    active: true
  },
  {
    name: "Dr. Ugochukwu Agbakwuru, MD, MPH",
    role: "Pediatric Hematology/Oncology Fellow",
    group: "faculty",
    bio: "Clinical fellow focusing on sickle cell disease research.",
    email: "ugo.agbakwuru@emory.edu",
    image: "/images/headshots/agbakwuru-ugochukwu.png",
    order: 5,
    active: true
  },
  {
    name: "Dr. Kennedy N. Goldsborough",
    role: "Post-doctoral Fellow",
    group: "faculty",
    bio: "Kennedy Goldsborough, Ph.D. is a postdoctoral researcher in the FIRST Program at Emory University School of Medicine's Department of Pediatrics. She conducts translational research on acute and chronic pain in sickle cell disease (SCD) using humanized mouse models and investigates therapeutic strategies that improve red blood cell health and function and/or reduce neuroinflammation. Her work focuses on developing non-opioid disease-modifying therapies to address pain in SCD. Dr. Goldsborough is also working to identify biomarkers that distinguish acute pain from baseline and disease severity and evaluate treatment efficacy. As a FIRST Program scholar, she is part of a NIH-funded initiative dedicated to fostering inclusive excellence in biomedical research through structured mentorship, professional development, and leadership training. Kennedy, known by her students as Dr. G, is also a biochemistry instructor at Spelman College, where she is committed to mentorship and continues to guide undergraduate researchers in experimental design, data analysis, and scientific communication. Through her work, she aims to advance novel pain management strategies for SCD while fostering the next generation of scientists.",
    email: "kennedy.goldsborough@emory.edu",
    image: "/images/headshots/kennedy.png",
    order: 6,
    active: true
  },
  {
    name: "Dr. Anupama Priyadarshini",
    role: "Staff Scientist",
    group: "research_staff",
    bio: "Dr. Anupama Priyadarshini, Ph.D. is a Research Scientist interested in finding the novel mechanism and pathways involved in HbF induction in SCD patients. She is studying the role of IGFBP3 in HbF induction in HSPCs from SCD patients and HbF induction in vivo using NBSGW mice xenograft models. She is also involved in other ongoing clinical research projects in the lab.\n\nBefore joining Dr. Sheehan, she has worked as a Postdoctoral associate at the School of Medicine, Nephrology, Yale University, New Haven, CT, USA. and as a Research Scholar and Postdoctoral Fellow at the Department of Inflammation and Immunity, Cleveland Clinic, Cleveland, Ohio.\n\nShe would like to advance her career in SCD Research and through her expertise in molecular and cellular biology research will work on identifying novel HbF inducing strategies by improving the understanding of gamma-globin regulation that can lead to improvement in the life of SCD Patients.",
    email: "anupama.priyadarshini@emory.edu",
    image: "/images/headshots/anupama.png",
    order: 7,
    active: true
  },
  {
    name: "Erica E. Evans",
    role: "Research Assistant",
    group: "research_staff",
    bio: "Erica Evans, MBA is a research specialist specializing in microfluidic technology and red blood cell (RBC) biomarker development for sickle cell disease (SCD) and other hematological disorders. She leads the microfluidic projects with efforts to optimize, validate, and implement novel microfluidic assays designed to assess RBC adhesion to physiologically relevant proteins. Her work focuses on translating these technologies into clinically meaningful tools, improving treatment monitoring, and clinical trial design. She currently oversees the rheology assessments in Afimmune's clinical trial of their novel therapeutic agent for SCD. She has presented her research at the American Society of Hematology (ASH) conference among others and has contributed to multiple peer-reviewed publications.",
    email: "erica.evans@emory.edu",
    image: "/images/headshots/erica.png",
    order: 8,
    active: true
  },
  {
    name: "Michael 'Alex' Pendergast",
    role: "MSP Graduate Student",
    group: "research_staff",
    bio: "Molecular & Systems Pharmacology doctoral student at Emory University focusing on work improving safety and efficacy of gene therapies in hematological disorders.",
    email: "alex.pendergast@emory.edu",
    image: "/images/headshots/alex.png",
    order: 9,
    active: true
  },
  {
    name: "Zak Kostamo",
    role: "Research Specialist",
    group: "research_staff",
    bio: "Hello, my name is Zak Kostamo, and I have been with the lab since 7/2022. I am a Research Specialist mainly interested in novel drug and gene therapy development for SCD. I have published with Nature Communications evaluating Hb-Makassar in a mouse model as a potential gene therapy in collaboration with Beam Therapeutics. In addition to mouse work, I work to extract CD34+ cells from non-mobilized patients with sickle cell for use in erythroid cultures, gene therapy experiments, and xenografts.",
    email: "zak.kostamo@emory.edu",
    image: "/images/headshots/zak.png",
    order: 10,
    active: true
  },
  {
    name: "Jonathan Wade",
    role: "Research Specialist",
    group: "research_staff",
    bio: "Jonathan is a Research Specialist in the Sheehan Lab. His bench work includes LoRRca ektacytometry, flow cytometry, and mouse bone marrow engraftment studies evaluating novel therapeutics. Additionally, Jonathan has developed tools in R to streamline data preprocessing and quality control and contributes to database integration and design for the lab's growing OMICs database. He earned his B.S. in Neuroscience from Furman University and will be enrolling in medical school this fall.",
    email: "jwwade@emory.edu",
    image: "/images/headshots/jonathanwade.jpeg",
    order: 11,
    active: true
  },
  {
    name: "Kathleen Romero",
    role: "Research Specialist",
    group: "research_staff",
    bio: "Research specialist supporting lab projects.",
    email: "kathleen.romero@emory.edu",
    image: null,
    order: 12,
    active: true
  },
  {
    name: "Mary C. Aliche",
    role: "Research Specialist",
    group: "research_staff",
    bio: "Mary is a Research Specialist in the Sheehan Lab. Her work involves functional viscosity assays assessing red blood cell polymerization, supporting gene therapy research focused on novel treatments. Additionally, she performs flow cytometry to aid in Afimmune's clinical trial of their novel therapeutic agent for SCD, as well as assisting in mice bone marrow engraftment studies. Mary earned her B.S in Cell and Developmental Biology from the University of California, Santa Barabara. She is particularly interested in genetic approaches to therapeutic development and plans to pursue an MD/PhD in genetics or a related field",
    email: "mary.aliche@emory.edu",
    image: "/images/headshots/mary.jpg",
    order: 13,
    active: true
  },
  {
    name: "Jedidah G. Titus",
    role: "Research Specialist",
    group: "research_staff",
    bio: "Jedidah is a research specialist who works in red cell function testing. She also assists with the mobilization project as needed. She graduated from Georgia Institute of Technology in Spring 2024 with a Bachelor of Science degree in Biomedical Engineering. In the future, Jedidah plans to pursue a PhD. In her free time, she enjoys writing, reading books and comics, drawing, and listening to music.",
    email: "jedidah.titus@emory.edu",
    image: "/images/headshots/jedidah.jpg",
    order: 14,
    active: true
  },
  {
    name: "Srija Ponna",
    role: "Research Specialist",
    group: "research_staff",
    bio: "Research specialist working on microfluidics projects.",
    email: "srija.ponna@emory.edu",
    image: "/images/headshots/srija.png",
    order: 15,
    active: true
  },
  {
    name: "Akshay Patwardhan",
    role: "Research Specialist (Part-Time)",
    group: "research_staff",
    bio: "Part-time research specialist.",
    email: "akshay.patwardhan@emory.edu",
    image: "/images/headshots/akshay.png",
    order: 16,
    active: true
  },
  {
    name: "Nav Pasupuleti",
    role: "Undergraduate Research Assistant",
    group: "research_staff",
    bio: "Part-time undergraduate research assistant supporting lab projects.",
    email: "nav.bharucha@emory.edu",
    image: "/images/headshots/nav.jpg",
    order: 17,
    active: true
  },
  {
    name: "Monica Rivera, BS",
    role: "MPH Student",
    group: "research_staff",
    bio: "Monica Rivera, BS, is a first-year Master of Public Health student at the Rollins School of Public Health at Emory University, graduating in May 2026. Her public health interests include biostatistics, epidemiology, bioinformatics, healthcare administration, data analytics, and health policy to improve all dimensions of health and outcomes for patients with Sickle Cell Disease and Anemia. Her tasks in the Sheehan lab include data cleaning, entry, management, and analysis using data collection software and statistical programs like REDCap, R, SAS, GraphPad PRISM, Excel, PowerBI, and similar research tools.",
    email: "monica.rivera@emory.edu",
    image: "/images/headshots/monica.jpg",
    order: 18,
    active: true
  }
];

// Research Areas Data (extracted from research.astro)
const researchAreas = [
  {
    title: "IGFBP3 Research",
    slug: "igfbp3",
    summary: "Our lab is investigating the crucial role of Insulin-like Growth Factor Binding Protein 3 (IGFBP3) in fetal hemoglobin (HbF) induction as a therapeutic approach for sickle cell disease.",
    description: "This research stems from whole genome sequencing studies that revealed individuals with higher IGFBP3 levels naturally produce more fetal hemoglobin.\n\nThis research provides a promising new therapeutic avenue for sickle cell disease treatment by leveraging the body's natural mechanisms for producing healthier hemoglobin.",
    highlights: [
      "Whole genome sequencing identified IGFBP3 as a regulator of HbF production",
      "Plasma levels of IGFBP3 correlate with HbF production in patient samples",
      "Adding IGFBP3 to erythroid precursors increases HbF production, as verified in vitro",
      "IGFBP3 can be targeted therapeutically for SCD treatment",
      "Vitamin D increases IGFBP3 levels, offering a potential intervention strategy",
      "IGFBP3 deficiency is common in SCD patients",
      "IGFBP3-based therapies can be administered in combination with hydroxyurea"
    ],
    primaryImage: "/images/research/igfbp3.png",
    secondaryImage: "/images/research/igf2.png",
    order: 1,
    published: true
  },
  {
    title: "NBSGW Xenograft Model",
    slug: "xenograft",
    summary: "We are studying HbF induction in vivo using the NBSGW xenograft mouse model to improve engraftment and measure HbF induction with various therapeutic compounds.",
    description: "Our methodology includes engrafting human CD34+ cells from SCD patients into NBSGW mice following busulfan conditioning, with engraftment verified via flow cytometry. Mice with >50% human CD45 cells are treated with either pomalidomide (positive control), vehicle, or Metformin for 12 weeks, after which HbF levels are measured by HPLC and F-cells by flow cytometry.",
    highlights: [
      "Optimizing engraftment percentages of human CD34+ cells in the NBSGW mouse model",
      "Determining HbF induction after administration of drugs like Metformin and Vitamin D",
      "Developing alternative strategies to induce HbF either in combination with hydroxyurea or as standalone treatments",
      "Supporting our in vitro work with Metformin through parallel in vivo studies",
      "Enhancing understanding of pathways involved in fetal hemoglobin induction to identify potential targets for drug development"
    ],
    primaryImage: "/images/research/mobilization.png",
    secondaryImage: null,
    order: 2,
    published: true
  },
  {
    title: "CRISPR/Cas Gene Editing",
    slug: "crispr",
    summary: "Gene therapy holds transformative potential for treating sickle cell disease (SCD) by leveraging CRISPR-based methods to induce fetal hemoglobin (HbF) or correct the HBB sickle mutation.",
    description: "Our project focuses on two promising approaches for treating SCD through genetic modification.\n\nThrough this work, we aim to refine gene-editing strategies and enhance understanding of their therapeutic potential for sickle cell disease patients.",
    highlights: [
      "An FDA-approved approach that disrupts the BCL11A gene to elevate HbF levels, a method already utilized in ex vivo gene therapy therapies",
      "The use of R-66S RNP with ssODN for guided HBB gene correction, for which an IND application has been submitted for clinical trial",
      "Comparative analysis of SpCas9 and AsCas12a (Cpf1) orthologs with their unique PAM recognition motifs and editing mechanisms",
      "Investigation of the persistence of large INDELs (insertions/deletions) in CRISPR/Cas gene editing of BCL11A and HBB in in-vivo models",
      "Assessment of how these gene modifications impact red blood cell physiology and therapeutic outcomes"
    ],
    primaryImage: "/images/genomics-research-lab.jpg",
    secondaryImage: null,
    order: 3,
    published: true
  },
  {
    title: "Alloimmunization & OMICs",
    slug: "alloimmunization-omics",
    summary: "Alloimmunization to transfused red blood cells (RBCs) remains a major challenge for the approximately 5 million patients who require transfusions annually in the USA.",
    description: "This issue is particularly critical for sickle cell disease (SCD) patients who experience increased rates of alloimmunization (up to 30%), require chronic transfusion, and face risks of potentially catastrophic hyperhemolysis.\n\nThis program combines novel translational murine models with clinical samples, creating synergy between approaches that can translate murine findings to humans and model human findings in mice. The research aims to provide near-term benefits by identifying predictors of responder/non-responder patients and long-term benefits by discovering mechanisms that could lead to rational therapy development.",
    highlights: [
      "Collection of longitudinal samples from a 2,000-patient SCD cohort, tracking key timepoints including steady state, transfusion, and one-month post-transfusion",
      "Investigation of TLR7, TLR9, and anti-nucleic acid antibodies in RBC alloimmunization using a novel SLE mouse model",
      "Exploration of purinergic signaling pathways (CD73, AMP, Adora1, adenosine, Adora2b) that regulate RBC alloimmunization",
      "Study of reticulocytes in donor RBC units and transfusion recipients as risk factors for alloimmunization",
      "Analysis of genetic risk factors through whole genome sequencing and identification of molecular drivers via single-cell RNASeq"
    ],
    primaryImage: "/images/alloimmunization-research.jpg",
    secondaryImage: null,
    order: 4,
    published: true
  },
  {
    title: "Microfluidics & Functional RBC Assays",
    slug: "microfluidics",
    summary: "The microfluidics projects focus on developing functional red blood cell (RBC) biomarker assays for sickle cell disease (SCD).",
    description: "These projects involve the optimization, analytical validation, and clinical implementation of microfluidic deformability and adhesion assays, which assess RBC mechanical properties and vascular interactions under physiologically relevant conditions.",
    highlights: [
      "Whole blood adhesion microfluidics evaluating RBC interactions with endothelial proteins such as VCAM-1, P-selectin, and laminin, providing insights into vaso-occlusion and disease severity",
      "Next-generation RBC deformability assay development, designed as a more accessible and scalable alternative to ektacytometry",
      "Addressing key limitations in clinical feasibility and real-world implementation of RBC biomarker assays",
      "Establishing quantitative, clinically relevant biomarkers that can be integrated into biomarker-driven clinical trials and advance precision medicine in SCD"
    ],
    primaryImage: "/images/research/microfluidics.png",
    secondaryImage: null,
    order: 5,
    published: true
  }
];

// Home Page Content
const homePageContent = {
  pageId: "home",
  title: "Sheehan Lab",
  subtitle: "Advancing Sickle Cell Disease Research",
  content: "Welcome to the Sheehan Lab at Emory University School of Medicine. We are dedicated to improving the lives of individuals with sickle cell disease through innovative research and therapeutic development.\n\nOur research spans multiple areas including HbF induction, xenograft models, gene editing, alloimmunization, and microfluidics, all aimed at improving patient outcomes for sickle cell disease patients worldwide.",
  heroImage: null, // You can add a hero image path here if you have one
  metaDescription: "The Sheehan Lab at Emory University is dedicated to advancing sickle cell disease research through innovative therapeutic approaches and collaborative science."
};

function convertToSanityFormat() {
  console.log('🚀 Converting content to Sanity format...\n');

  // Convert team members to Sanity documents
  const sanityTeamMembers = teamMembers.map((member, index) => ({
    _type: 'teamMember',
    _id: `team-member-${index + 1}`,
    name: member.name,
    role: member.role,
    group: member.group,
    bio: member.bio,
    email: member.email,
    // Note: Images will need to be uploaded manually to Sanity
    image: member.image ? {
      _type: 'image',
      // This would be filled after uploading to Sanity
      // For now, we'll provide the local path as reference
      localPath: member.image
    } : null,
    displayOrder: member.order,
    active: member.active
  }));

  // Convert research areas to Sanity documents
  const sanityResearchAreas = researchAreas.map((area, index) => ({
    _type: 'researchArea',
    _id: `research-area-${index + 1}`,
    title: area.title,
    slug: {
      _type: 'slug',
      current: area.slug
    },
    summary: area.summary,
    description: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: area.description
          }
        ]
      }
    ],
    highlights: area.highlights,
    primaryImage: area.primaryImage ? {
      _type: 'image',
      localPath: area.primaryImage
    } : null,
    secondaryImage: area.secondaryImage ? {
      _type: 'image',
      localPath: area.secondaryImage
    } : null,
    order: area.order,
    published: area.published
  }));

  // Convert home page content to Sanity document
  const sanityHomeContent = {
    _type: 'pageContent',
    _id: 'home-page-content',
    pageId: homePageContent.pageId,
    title: homePageContent.title,
    subtitle: homePageContent.subtitle,
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: homePageContent.content
          }
        ]
      }
    ],
    heroImage: homePageContent.heroImage ? {
      _type: 'image',
      localPath: homePageContent.heroImage
    } : null,
    metaDescription: homePageContent.metaDescription
  };

  // Save converted data to JSON files
  writeFileSync('sanity-team-members.json', JSON.stringify(sanityTeamMembers, null, 2));
  writeFileSync('sanity-research-areas.json', JSON.stringify(sanityResearchAreas, null, 2));
  writeFileSync('sanity-home-content.json', JSON.stringify(sanityHomeContent, null, 2));

  console.log('✅ Content converted to Sanity format!');
  console.log('📁 Files created:');
  console.log('   - sanity-team-members.json');
  console.log('   - sanity-research-areas.json');
  console.log('   - sanity-home-content.json');
  console.log('\n📋 Summary:');
  console.log(`   - ${teamMembers.length} team members`);
  console.log(`   - ${researchAreas.length} research areas`);
  console.log(`   - 1 home page content`);
  console.log('\n🔄 Next steps:');
  console.log('   1. Start Sanity Studio: npm run sanity:dev');
  console.log('   2. Use the JSON files as reference to manually enter content');
  console.log('   3. Upload images through the Sanity Studio interface');
  console.log('   4. See MIGRATION_GUIDE.md for detailed instructions');
}

// Run the conversion
convertToSanityFormat(); 