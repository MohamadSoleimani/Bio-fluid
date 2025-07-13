export interface Project {
  id: string
  title: string
  slug: string
  description: string
  longDescription: string
  technologies: string[]
  mainImage: string
  images: string[]
  category: string
  status: "completed" | "in-progress" | "planned"
  startDate: string
  endDate?: string
  collaborators?: string[]
  publications?: string[]
  github?: string
  demo?: string
  keyAchievements?: string[]
  futureApplications?: string[]
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Multi-Channel Real-Time PCR System",
    slug: "multi-channel-real-time-pcr-system",
    description:
      "The first effort in Iran to develop a multi-channel real-time PCR system with optimized temperature control.",
    longDescription:
      "This groundbreaking project represents the first comprehensive effort in Iran to develop a sophisticated multi-channel real-time PCR system. The system features advanced temperature control algorithms, multi-channel fluorescence detection, and real-time data processing capabilities. Our innovative approach to thermal cycling optimization has resulted in faster amplification times and improved specificity. The system incorporates state-of-the-art Peltier elements for precise temperature control, custom-designed optical systems for multi-wavelength detection, and advanced signal processing algorithms for real-time analysis.",
    technologies: [
      "Raspberry pi",
      "Arduino",
      "PCR Technology",
      "OpenCv",
      "PyQt",
      "Comsol",
    ],
    mainImage: "/images/pcr_2.jpg",
    images: [
      "/images/pcr_1.jpg",
      "/images/pcr_2.jpg",
      "/images/pcr_4.jpg",
    ],
    category: "Biomedical Instrumentation",
    status: "completed",
    startDate: "",
    endDate: "",
    collaborators: ["Prof. Amir Shamloo", "Dr.Manouchehr Vossoughi", "Erfan Hamdi", "MohamadAli Hosseinian", "Arman Hajizadeh"],
    keyAchievements: [
      "First multi-channel real-time PCR system developed in Iran",
      "95% thermal efficiency achieved through optimized design",
      "40% faster amplification compared to existing systems",
      "Patent filed for novel temperature control algorithm",
      "Distinguished Researcher Award from Sharif University",
    ],
    futureApplications: [
      "COVID-19 and infectious disease diagnostics",
      "Genetic testing and personalized medicine",
      "Food safety and quality control testing",
      "Environmental monitoring and pathogen detection",
      "Veterinary diagnostics and animal health",
    ],
  },
  {
    id: "2",
    title: "Passive particle separation using an omega-shaped serpentine channel",
    slug: "microfluidic-cell-sorting-device",
    description: "Advanced microfluidic platform for high-throughput cell sorting and analysis.",
    longDescription:
      "In this research, we present a novel omega-shaped microfluidic device designed for the passive separation of circulating tumor cells (CTCs) from blood samples. The separation of CTCs is critical for understanding cancer progression and enhancing early diagnosis, as these cells play a pivotal role in metastasis and disease spread. Traditional methods for CTC separation can be categorized into active and passive techniques. Active methods employ external forces such as electrical, magnetic, acoustic, and optical forces, while passive methods rely on channel geometry and fluid dynamics to achieve separation. Passive separation is particularly appealing for its simplicity and potential for miniaturization, making it suitable for lab-on-a-chip applications.",
    technologies: [
      "Microfluidics",
      "surrogate model optimization",
      "Lab-on-Chip",
      "Cell Biology",
      "COMSOL",
      "Microfabrication",
    ],
    mainImage: "/images/micro_9.jpg",
    images: ["/images/micro_3.jpg", "/images/micro_4.jpg", "/images/micro_5.jpg"],
    category: "Microfluidics",
    status: "completed",
    startDate: "",
    collaborators: ["Prof. Amir Shamloo", "Mahdi heidari"],
    publications:["Passive particle separation using an omega-shaped serpentine channel: Numerical study and surrogate model optimization with experimental validation"],
    keyAchievements:[
      "Novel Omega-Shaped Device Design",
      "Combined Numerical and Experimental Methods",
      "Surrogate Model-Based Optimization",
      "Inertial and Dean Force Analysis"
    ],
    futureApplications:[
      "Early Cancer Detection",
      "Rare Cell Separation in Clinics",
      "Support for Personalized Medicine",
      "Versatility for Broader Biomedical Use"
    ] 
  },
  {
    id: "3",
    title: "Design and Optimization of Cooling Channel using PINN and Deep Gaussian",
    slug: "ai-powered-diagnostic-imaging-system",
    description: "Physics-informed neural networks for modeling heat transfer in laminar fluid flow.",
    longDescription:"In this study, the PINN (Physics-Informed Neural Network) methodology is used to create steady-state surrogate models for incompressible laminar flow with heat transfer in a 2D internal domain that includes obstructions. These obstructions, which are circular cylinders, are used to enhance heat transfer in the channel. Automatic spatial and temporal differentiation is applied to the partial differential equations governing mass momentum and energy conservation, with the residuals included in the loss function along with the boundary and initial conditions. The results show a good match between the PINN and CFD (Computational Fluid Dynamics) simulations for both steady-state and transient scenarios, but normalizing the PDEs is essential.",
    technologies: [
      "Deep Learning",
      "Deep Gaussian Process",
      "PyTorch",
      "Machine Learning",
    ],
    mainImage: "/images/pinn_2.jpg",
    images: [ "/images/pinn_5.png","/images/pinn_3.png","/images/pinn_5.png","/images/pinn_4.png"],
    category: "AI & Machine Learning",
    status: "completed",
    startDate: "",
    endDate: "",
    keyAchievements:[
      "PINN-Based Heat Transfer Modeling",
      "Efficient Optimization Using Deep Gaussian Processes",
      "Validation Across Multiple Geometries",
      "Combined Use of Adam and L-BFGS Optimizers"
    ],
    futureApplications:[
      "Complex Geometry Heat Transfer Systems",
      "Transient and Unsteady Flow Problems",
      "Multiphysics System Optimization",
      "Smart Cooling Design in Engineering"
    ]
  },
  {
    id: "4",
    title: "Evaluation of Particle Lift Forces in Microchannel Flows via DNS",
    slug: "DNS",
    description: "Direct numerical simulation of lift forces on particles in microchannels.",
    longDescription:
      "Evaluation of Lift Force Acting on Particles in Microchannels Using the DNS Method In microfluidic systems, accurate prediction of particle behavior is essential for designing efficient inertial focusing and separation devices. This study employs the Direct Numerical Simulation (DNS) method to evaluate the inertial lift force acting on particles suspended in fluid flow within serpentine microchannels mounted on a centrifugal platform.",
    technologies: [
      "Direct Numerical Simulation",
      "Computational Fluid Dynamics",
      "MATLAB",
      "Comsol",
    ],
    mainImage: "/images/dns_3.jpg",
    images: ["/placeholder.svg?height=600&width=1200"],
    category: "Direct Numerical Simulation",
    status: "completed",
    startDate: "",
    keyAchievements:[
      "Accurate Lift Force Calculation Using DNS",
      "Development of an Iterative DNS Algorithm",
      "Validation of Size-Based Particle Separation",
      "Application to Curved and Rotating Microchannels"
    ],
    futureApplications:[
      "Design of Advanced Inertial Microfluidic Devices",
      "Enhancement of Lab-on-Disk Diagnostic Platforms",
      "Integration into Multiphysics Simulation Tools",
      "Training Data for AI-Based Surrogate Models"
    ]
  },
  {
    id: "5",
    title: "Estimation of Biomechanical Properties of Tissues Using PINNs",
    slug: "pinn-soft-tissue-mechanics",
    description: "A project to estimate the biomechanical properties of tissues using Physics-Informed Neural Networks",
    longDescription:"An innovative drug delivery system that automatically adjusts medication dosage based on patient response and vital signs. The system includes real-time monitoring and feedback mechanisms for optimal therapeutic outcomes.",
    technologies: ["Physics informed neural networks", "Computational Mechanics", "Hyperelastic material"],
    mainImage: "/images/soft_7.jpg",
    images: ["/placeholder.svg?height=600&width=1200"],
    category: "AI & Machine Learning",
    status: "in-progress",
    startDate: "",
    keyAchievements:[
      "PINN-based displacement prediction validated against FEA",
      "Accurate inverse estimation of shear modulus in 2D synthetic models",
      "Low error even with material discontinuities",
      "Training loss convergence confirms model stability"
    ],
    futureApplications:[
      "3D tissue modeling with patient-specific geometry",
      "Estimation of brain tissue mechanics for diagnostics",
      "Integration of Fourier feature mappings to improve learning of high-gradient regions",
      "Foundation for PINN-based surrogate models in medical simulations"
    ]
  },
  {
    id: "6",
    title: "Bi-layered Vascular Graft",
    slug: "bi-layered-vascular-graft",
    description: "A project to fabricate and characterize a bi-layered vascular graft with enhanced mechanical properties and biocompatibility.",
    longDescription:"In this project, we aimed to fabricate and characterize a bi‑layered vascular graft with enhanced mechanical properties and biocompatibility. This project involved a combination of advanced techniques including electrospinning, cell culturing, and mechanical testing to ensure the graft's performance in clinical applications. Through this work, I developed and honed essential laboratory skills such as cell culturing, electrospinning, silk fibroin extraction, and in vitro graft fabrication.",
    technologies: ["cell culture", "Electrospining", "Silk fibroin extraction"],
    mainImage: "/images/vasc_2.jpg",
    images: ["/placeholder.svg?height=600&width=1200"],
    category: "Medical Devices",
    status: "completed",
    startDate: "",
    keyAchievements:[
      "Successful Fabrication of a Bi-Layered Vascular Graft",
      "Enhanced Mechanical Performance",
      "Demonstrated Biocompatibility and Endothelization",
      "Mastery of Advanced Biofabrication Techniques"
    ],
    futureApplications:[
      "In Vivo Testing and Long-Term Evaluation",
      "Optimization of Drug Release Profiles",
      "Scalability and Manufacturing Process Development",
      "Integration with Smart or Responsive Materials"
    ]
  },
  {
    id: "7",
    title: "3d-mof-cartilage-scaffold",
    slug: "3d-mof-cartilage-scaffold",
    description: "Design and fabricate a hybrid 3D-bioprinted scaffold for cartilage tissue engineering",
    longDescription:"In this project, we aimed to design and fabricate a hybrid 3D-bioprinted scaffold for cartilage tissue engineering by integrating alginate, gelatin, polycaprolactone (PCL), and hyaluronic acid with drug-loaded metal-organic frameworks (MOFs). These scaffolds were developed to enhance mechanical strength, support chondrocyte viability, and enable controlled release of quercetin for anti-inflammatory therapeutic effect. Throughout the project, I developed advanced skills in 3D bioprinting, hydrogel formulation, mechanical testing, and cell viability analysis.",
    technologies: ["3D bioprinting", "hydrogel formulation", "cell viability analysis", "mechanical testing"],
    mainImage: "/images/scaflod_1.jpg",
    images: ["/placeholder.svg?height=600&width=1200"],
    category: "3D Bioprinting",
    status: "in-progress",
    startDate: "",
    keyAchievements:[
      "Hybrid Scaffold with High Mechanical Strength",
      "Sustained Quercetin Release via MOFs",
      "Excellent Chondrocyte Viability and Proliferation",
      "Antibacterial Activity Without Antibiotics"
    ],
    futureApplications:[
      "In Vivo Cartilage Repair Studies",
      "Long-Term Release Profiling of Therapeutic Agents",
      "Scaffold Personalization via Bioprinting",
      "Integration with Bioactive or Smart Materials"
    ]
  }
]
