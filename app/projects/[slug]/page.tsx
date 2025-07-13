import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Users, ExternalLink, Github, FileText, Award, Target, Cog } from "lucide-react"
import { projects } from "@/lib/projects-data"
import { SectionObserver } from "@/components/section-observer"
import MathFormula from "@/components/math-formula"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Project Header */}
        <SectionObserver>
          <div className="space-y-6 mb-12">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                  {project.category}
                </Badge>
                <Badge
                  variant={
                    project.status === "completed"
                      ? "default"
                      : project.status === "in-progress"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace("-", " ")}
                </Badge>
              </div>

              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{project.title}</h1>

              <p className="text-xl text-muted-foreground leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {project.startDate} {project.endDate && `- ${project.endDate}`}
                  </span>
                </div>
                {project.collaborators && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{project.collaborators.length} Collaborators</span>
                  </div>
                )}
              </div>
            </div>

            {/* Main Project Image */}
            <div className="relative aspect-video rounded-lg overflow-hidden border">
              <Image
                src={project.mainImage || "/placeholder.svg?height=600&width=1200"}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </SectionObserver>

        {/* Project Content */}
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            {/* Overview */}
            <SectionObserver>
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-teal-500" />
                  <h2 className="text-2xl font-semibold">Project Overview</h2>
                </div>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed">{project.longDescription}</p>
                </div>
              </section>
            </SectionObserver>

            {/* Technical Details with Formulas */}
            <SectionObserver>
              <section className="space-y-6">
                <div className="flex items-center gap-2">
                  <Cog className="h-5 w-5 text-teal-500" />
                  <h2 className="text-2xl font-semibold">Technical Implementation</h2>
                </div>

                {project.slug === "multi-channel-real-time-pcr-system" && (
                  <div className="space-y-6">
                    {/* Project Overview
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h2>Multi-Channel Real‑Time PCR System</h2>
                      <p>
                        This project represents the first effort in Iran to develop a multi‑channel real‑time PCR system,
                        as part of a master's thesis titled “Optimizing the Temperature Changes of the Heating Cycle in Real‑Time PCR.” 
                        The system cycles between 65 °C and 95 °C and includes a custom-built device shown below.
                      </p>
                      <img src="/multi-channel-device.jpg" alt="Multi‑Channel PCR Device" className="rounded-lg" />
                      <figcaption className="text-sm text-center">Figure 1: Multi‑Channel Real‑Time PCR Device</figcaption>
                    </div> */}

                    {/* GUI Section */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3>Graphical User Interface (GUI)</h3>
                      <p>
                        We built the GUI using <strong>PyQt5</strong> on a Raspberry Pi. The interface lets users start runs, monitor
                        progress, and review results. Here's a short demonstration video of the GUI in action.
                      </p>
                      <video controls className="w-full rounded-lg">
                        <source src="/images/pcr_3.mp4" />
                        Your browser does not support HTML5 video.
                      </video>
                    </div>

                    {/* Image Processing & Thermal Control */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3>Image Processing & Thermal Cycle Control</h3>
                      <p>
                        We used an Arduino Uno with a Raspberry Pi to control thermal cycling, capturing chamber images via the Pi camera.
                        These images are processed with OpenCV to ensure consistent thermal behavior across channels:
                      </p>
                      <img src="/images/pcr_4.jpg" alt="Processed PCR Image with OpenCV" className="rounded-lg" />
                      <figcaption className="text-sm text-center">Figure 1: Processed PCR Image using OpenCV</figcaption>
                    </div>

                    {/* Fluorescent Detection */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3>Real‑Time Fluorescent Detection</h3>
                      <p>
                        DNA amplification is monitored in real time using fluorescent dyes. Our system captures fluorescence using a
                        Raspberry Pi camera and appropriate filters, allowing us to track reactions over ~30 cycles. Here’s a GIF
                        showing HPV amplification under a green filter:
                      </p>
                      <img src="/images/pcr_5.gif" alt="HPV duplication across 30 thermal cycles" className="rounded-lg" />
                      <figcaption className="text-sm text-center">Figure 2: HPV Amplification in Real‑Time</figcaption>
                    </div>
                  </div>
                )}
                {project.slug === "microfluidic-cell-sorting-device" && (
                  <div className="space-y-6">
                    {/* Title */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h1>Omega-Shaped Microfluidic Device for CTC Separation</h1>
                    </div>

                    {/* Introduction */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h2>Introduction</h2>
                      <p>
                        This study introduces a novel omega-shaped microfluidic device designed for label-free, passive separation of circulating tumor cells (CTCs) from blood. By utilizing inertial forces and Dean vortices within a seven-stage omega-channel, the system enables efficient, high-throughput separation. Both numerical simulations and experimental validation demonstrate excellent agreement, supporting its practical application in cancer diagnostics.
                      </p>
                    </div>

                    {/* Device Design */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h2>Device Configuration</h2>
                      <p>
                        The fabricated device consists of seven omega-shaped loops in a microfluidic channel bonded to glass using PDMS. A sheath flow focuses the sample stream near the wall, enabling controlled lateral migration of cells. Target cells (e.g., CTCs) exit through the lower outlet, while non-target cells are directed to the upper outlet.
                      </p>
                      <div className="flex flex-col items-center space-y-2">
                        <img
                          src="/images/micro_5.jpg"
                          alt="Figure 1. Schematic of the principle of target cell separation"
                          className="rounded border max-w-full"
                        />
                        <figcaption className="text-sm text-center text-muted-foreground">
                          Figure 1. Schematic of the principle of target cell separation: a) particle trajectory in the inlet, b) outlet of the microchannel, c) inertial separation phenomenon, d–e) experimental microscopy at inlet and outlet.
                        </figcaption>
                      </div>
                      <p>
                        Figure 1 illustrates the working principle of the device. As cells enter the omega-shaped channel, Dean vortices generated by channel curvature and inertial forces drive larger cells like CTCs toward distinct equilibrium positions. These cells exit through a designated outlet, while smaller cells such as RBCs and WBCs follow separate streamlines to a different outlet. Experimental microscopy images confirm the successful separation of cell types.
                      </p>
                    </div>

                    {/* Experimental Method */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h2>Experimental Method</h2>
                      <p>
                        MCF-7 cells and blood cells were prepared and diluted in PBS. The device was tested at 0.5 m/s flow rate using a syringe pump, and the separated cells were collected and analyzed via microscopy and ImageJ quantification.
                      </p>
                    </div>

                    {/* Simulation and Validation */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h2>Numerical Simulation and Validation</h2>
                      <p>
                        A 3D finite element method was used to simulate laminar flow and particle trajectories. The model accounts for inertial lift and Dean forces.
                      </p>
                      <div className="flex flex-col items-center space-y-2">
                        <img
                          src="/images/micro_4.jpg"
                          alt="Figure 2. Influence of forces and Dean vortices on particle position"
                          className="rounded border max-w-full"
                        />
                        <figcaption className="text-sm text-center text-muted-foreground">
                          Figure 2. Influence of forces and Dean vortices on particle position.
                        </figcaption>
                      </div>
                      <p>
                        Figure 2 demonstrates the force balance acting on cells within the omega-shaped microchannel. Wall-induced lift, shear-gradient lift, and Dean drag act together to position cells at equilibrium paths. This balance enables reliable size-based cell sorting across the flow field.
                      </p>
                    </div>

                    {/* Optimization */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h2>Surrogate Model Optimization</h2>
                      <p>
                        Gaussian process regression (GPR) was used to optimize cell separation based on particle diameter and aspect ratio. The optimal CTC size for recovery was above 20 µm, achieving 100% recovery and 97% purity. The ideal aspect ratio for effective separation was found to be 0.2.
                      </p>
                    </div>
                  </div>
                )}
                {project.slug === "ai-powered-diagnostic-imaging-system" && (
                  <div className="space-y-6">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h1>Design and Optimization of Cooling Channel using PINN and Deep Gaussian</h1>
                      <p>
                        In this study, the PINN (Physics-Informed Neural Network) methodology is used to create steady-state surrogate models
                        for incompressible laminar flow with heat transfer in a 2D internal domain that includes obstructions. These
                        obstructions, which are circular cylinders, are used to enhance heat transfer in the channel...
                      </p>
                    </div>

                    <div className="bg-muted/50 p-6 rounded-lg border hover:scale-105 transition-transform duration-300 ease-in-out">
                      <h3 className="text-lg font-semibold mb-4">Governing Equations</h3>
                      <p className="mb-4">First, nondimensionalized variables are introduced:</p>
                      <div className="hover:scale-105 transition-transform duration-300 ease-in-out inline-block">
                        <MathFormula formula="X^* = \frac{X}{L}, \quad Y^* = \frac{Y}{L}, \quad u^* = \frac{u}{u_\infty}, \quad V^* = \frac{V}{u_\infty}, p^* = \frac{p}{\rho u_\infty^2}, \quad T^* = \frac{T}{T_\infty}, \quad t^* = \frac{t}{\tau}" />
                      </div>

                      <p className="mt-4">The nondimensionalized momentum equations:</p>
                      {[
                        "\\frac{\\partial u^*}{\\partial t^*} + u^*\\frac{\\partial u^*}{\\partial X^*} + V^*\\frac{\\partial u^*}{\\partial Y^*} = \\frac{\\partial \\sigma_{11}^*}{\\partial X^*} + \\frac{\\partial \\sigma_{12}^*}{\\partial Y^*}",
                        "\\frac{\\partial V^*}{\\partial t^*} + u^*\\frac{\\partial V^*}{\\partial X^*} + V^*\\frac{\\partial V^*}{\\partial Y^*} = \\frac{\\partial \\sigma_{12}^*}{\\partial X^*} + \\frac{\\partial \\sigma_{22}^*}{\\partial Y^*}",
                        "\\sigma_{11}^* = - p^* + \\frac{2}{Re}\\frac{\\partial u^*}{\\partial X^*}",
                        "\\sigma_{22}^* = - p^* + \\frac{2}{Re}\\frac{\\partial V^*}{\\partial Y^*}",
                        "\\sigma_{12}^* = \\frac{1}{Re}\\left(\\frac{\\partial u^*}{\\partial X^*} + \\frac{\\partial V^*}{\\partial Y^*}\\right)",
                        "p^* = -\\frac{\\sigma_{11}^* + \\sigma_{22}^*}{2}",
                      ].map((formula, index) => (
                        <div key={index} className="hover:scale-105 transition-transform duration-300 ease-in-out inline-block">
                          <MathFormula formula={formula} />
                        </div>
                      ))}

                      <p className="mt-4">The nondimensionalized energy equation:</p>
                      {[
                        "\\frac{\\partial T^*}{\\partial t^*} + u^*\\frac{\\partial T^*}{\\partial X^*} + V^*\\frac{\\partial T^*}{\\partial Y^*} = \\frac{1}{RePr}\\left(\\frac{\\partial q_X^*}{\\partial X^*} + \\frac{\\partial q_Y^*}{\\partial Y^*}\\right)",
                        "q_X^* = \\frac{\\partial T^*}{\\partial X^*}",
                        "q_Y^* = \\frac{\\partial T^*}{\\partial Y^*}",
                      ].map((formula, index) => (
                        <div key={index} className="hover:scale-105 transition-transform duration-300 ease-in-out inline-block">
                          <MathFormula formula={formula} />
                        </div>
                      ))}
                    </div>

                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p>
                        We implemented these equations in a multilayer perceptron (MLP) structure using loss functions. By defining the problem's domain,
                        we trained the network applying boundary conditions to guide the training process. This approach yielded excellent results.
                      </p>
                      <p>For example, the following figures show a comparison between the PINN and CFD results for one section.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          src: "/images/pinn_3.png",
                          alt: "Comparison of Velocity in X direction in one cross section",
                          caption: "Figure 1: Velocity in X direction",
                        },
                        {
                          src: "/images/pinn_4.png",
                          alt: "Comparison of Temperature in one cross section",
                          caption: "Figure 2: Temperature",
                        },
                        {
                          src: "/images/pinn_5.png",
                          alt: "Comparison of Pressure in one cross section",
                          caption: "Figure 3: Pressure",
                        },
                      ].map(({ src, alt, caption }, index) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-lg overflow-hidden border hover:scale-105 transition-transform duration-300 ease-in-out"
                        >
                          <Image src={src} alt={alt} fill className="object-cover" />
                          <p className="text-sm text-center mt-2">{caption}</p>
                        </div>
                      ))}
                    </div>

                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p>
                        As we are preparing this research for publication, if you require more information or have specific questions,
                        please feel free to contact me via email. I would be happy to provide further insights or details regarding our
                        findings and methodology.
                      </p>
                    </div>
                  </div>
                )}
                {project.slug === "DNS" && (
                  <div className="space-y-6">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h1>Evaluation of Lift Force Acting on Particles in Microchannels Using the DNS Method</h1>
                      {/* <p>
                        In microfluidic systems, accurate prediction of particle behavior is essential for designing efficient inertial focusing
                        and separation devices. This study employs the Direct Numerical Simulation (DNS) method to evaluate the inertial lift force
                        acting on particles suspended in fluid flow within serpentine microchannels mounted on a centrifugal platform.
                      </p> */}
                      <p>
                        To understand how particles migrate and focus, we consider the combined effects of inertial lift, Dean drag, centrifugal,
                        and Coriolis forces. The lift force is particularly crucial, as it determines the equilibrium positions particles settle into
                        during flow. It is calculated using the following relation:
                      </p>
                    </div>
                    <div className="bg-muted/50 p-6 rounded-lg border hover:scale-105 transition-transform duration-300 ease-in-out">
                      <h3 className="text-lg font-semibold mb-4">Lift Force Formula</h3>
                      <p className="mb-4">The inertial lift force acting on particles is given by:</p>
                      <div className="hover:scale-105 transition-transform duration-300 ease-in-out inline-block">
                        <MathFormula formula="F_L = C_L \frac{\rho U_{max} ^2 a^4}{D_h^2}" />
                      </div>
                      <p className="mt-4">
                        where <strong>C<sub>L</sub></strong> is the lift coefficient dependent on particle position and channel geometry,
                        <strong> ρ </strong> is fluid density,
                        <strong> U<sub>max</sub> </strong> is the maximum velocity,
                        <strong> a </strong> is the particle diameter, and
                        <strong> D<sub>h</sub> </strong> is the hydraulic diameter.
                      </p>
                    </div>
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p>
                        To simulate and quantify this force field, a DNS-based iterative algorithm was developed. The flowchart below illustrates the
                        computational steps used to calculate the lift force at various particle positions in the channel cross-section.
                      </p>
                    </div>

                    {/* <div className="relative aspect-video rounded-lg overflow-hidden border hover:scale-105 transition-transform duration-300 ease-in-out">
                      <Image
                        src="/images/dns_flowchart.png"
                        alt="Flowchart of DNS Lift Force Calculation Algorithm"
                        fill
                        className="object-contain"
                      />
                      <p className="text-sm text-center mt-2">Figure 1: DNS Lift Force Calculation Algorithm</p>
                    </div> */}
                      <div className="flex flex-col items-center space-y-2">
                        <img
                          src="/images/dns_1.jpg"
                          alt="Figure 1: DNS Lift Force Calculation Algorithm"
                          className="rounded border max-w-full"
                        />
                        <figcaption className="text-sm text-center text-muted-foreground">
                          Figure 1: DNS Lift Force Calculation Algorithm
                        </figcaption>
                      </div>
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p>
                        Each iteration begins by setting the particle’s position and initializing linear and angular velocities. 
                      </p>
                    </div>
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p>
                        These equations govern momentum transfer and fluid–particle interaction. After solving the flow field, the net force and torque
                        on the particle are calculated. If convergence criteria are not met—specifically, when the force in the flow direction
                        <strong> F<sub>x</sub> </strong> and torques <strong> M<sub>y</sub> </strong>, <strong> M<sub>z</sub> </strong> exceed
                        tolerance thresholds—the velocities are updated, and the solution is iterated.
                      </p>
                      <p>
                        Once convergence is achieved, the lateral components of the lift force,
                        <strong> F<sub>y</sub> </strong> and <strong> F<sub>z</sub> </strong>, are recorded for that position. This process is repeated
                        across a grid of positions to map the lift force distribution in the cross-section.
                      </p>
                      <p>
                        This accurate force field is then used to simulate particle trajectories and equilibrium behavior. The results demonstrate that
                        particles with different sizes and densities migrate to distinct positions due to the varying magnitudes of the lift force.
                        Heavier or larger particles focus faster and closer to the channel centerline.
                      </p>
                    </div>
                    <div className="relative aspect-video rounded-lg overflow-hidden border hover:scale-105 transition-transform duration-300 ease-in-out">
                      <Image
                        src="/images/dns_2.png"
                        alt="Separated particle streams at the channel outlet"
                        fill
                        className="object-contain"
                      />
                      <p className="text-sm text-center mt-2">Figure 2: Separated particle streams at the channel outlet</p>
                    </div>

                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p>
                        The final outcome shows effective size-based separation, validating the use of DNS for force estimation and trajectory prediction
                        in inertial microfluidic systems. These insights are particularly valuable for the design of passive, pump-free lab-on-disk
                        platforms used in biomedical diagnostics.
                      </p>
                    </div>
                  </div>
                )}
                {project.slug === "pinn-soft-tissue-mechanics" && (
                  <div className="space-y-6">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h1>Technical Implementation</h1>
                      <h2>PINN Framework for Soft Tissue Mechanics</h2>
                      <p>
                        The study considers a 2D plane-strain geometry with Neo-Hookean material properties. Displacement data from Abaqus FEA
                        simulations were used to train neural networks under physical constraints. Two cases were considered: homogeneous and
                        heterogeneous (two-material) distributions.
                      </p>
                    </div>

                    <div className="bg-muted/50 p-6 rounded-lg border hover:scale-105 transition-transform duration-300 ease-in-out">
                      <h3 className="text-lg font-semibold mb-4">Governing Equation</h3>
                      {/* <p className="mb-4">The core mechanical equilibrium enforced in the PINN loss function is:</p>
                      <p className="mt-4">
                        where <strong>P</strong> is the first Piola-Kirchhoff stress tensor derived from the strain energy function:
                      </p> */}
                      <div className="hover:scale-105 transition-transform duration-300 ease-in-out inline-block">
                        <MathFormula formula="W = \frac{\mu}{2}(I_1 - 3) + \frac{k}{2}(J - 1)^2" />
                      </div>
                      <p className="mt-4">Boundary conditions and data consistency are also incorporated into the loss function.</p>
                    </div>

                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h2>Forward PINN Algorithm</h2>
                      <p>The forward PINN predicts displacement fields from spatial coordinates. It uses:</p>
                      <ul>
                        <li><strong>Input:</strong> x, y</li>
                        <li><strong>Output:</strong> u<sub>x</sub>, u<sub>y</sub></li>
                        <li><strong>Loss Components:</strong> PDE residual + boundary + data loss</li>
                        <li><strong>Training Strategy:</strong> Adam optimizer followed by LBFGS for fine-tuning</li>
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          src: "/images/soft_1.jpg",
                          alt: "PINN Forward Model Loss Convergence",
                          caption: "Figure 1: PINN Forward Model Loss Convergence",
                          fullWidth: 800,
                          fullHeight: 600,
                        },
                        {
                          src: "/images/soft_2.jpg",
                          alt: "Displacement Field Comparison - FEM vs. PINN",
                          caption: "Figure 2: Displacement Field Comparison - FEM vs. PINN",
                          fullWidth: 800,
                          fullHeight: 600,
                        },
                        {
                          src: "/images/soft_3.jpg",
                          alt: "Absolute Displacement Error Map",
                          caption: "Figure 3: Absolute Displacement Error Map",
                          fullWidth: 800,
                          fullHeight: 600,
                        },
                      ].map(({ src, alt, caption, fullWidth, fullHeight }, index) => (
                        <div key={index} className="relative group overflow-visible">
                          <div className="rounded-lg border overflow-hidden transition-transform duration-300 ease-in-out transform group-hover:scale-[2] group-hover:z-10">
                            <Image
                              src={src}
                              alt={alt}
                              width={fullWidth / 3}
                              height={fullHeight / 3}
                            />
                          </div>
                          <p className="text-sm text-center mt-2">{caption}</p>
                        </div>
                      ))}
                    </div>

                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h2>Inverse PINN for Property Estimation</h2>
                      <p>
                        Inverse PINN adds the shear modulus μ(x, y) as a learnable output, allowing for:
                      </p>
                      <ul>
                        <li>Spatially resolved material property estimation</li>
                        <li>Direct inference from displacement data</li>
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          src: "/images/soft_4.jpg",
                          alt: "Predicted vs. Ground Truth μ(x,y)",
                          caption: "Figure 4: Predicted vs. Ground Truth μ(x,y)",
                          fullWidth: 800,
                          fullHeight: 600,
                        },
                        {
                          src: "/images/soft_5.jpg",
                          alt: "Absolute Error in Inverse Displacement Field",
                          caption: "Figure 5: Absolute Error in Inverse Displacement Field",
                          fullWidth: 800,
                          fullHeight: 600,
                        },
                      ].map(({ src, alt, caption, fullWidth, fullHeight }, index) => (
                        <div key={index} className="relative group overflow-visible">
                          <div className="rounded-lg border overflow-hidden transition-transform duration-300 ease-in-out transform group-hover:scale-[2] group-hover:z-10">
                            <Image
                              src={src}
                              alt={alt}
                              width={fullWidth / 2}
                              height={fullHeight / 2}
                            />
                          </div>
                          <p className="text-sm text-center mt-2">{caption}</p>
                        </div>
                      ))}
                    </div>

                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p>
                        This method shows promise for mapping heterogeneous stiffness in tissues where direct measurements are not feasible.
                      </p>
                    </div>
                  </div>
                )}
                {project.slug === "3d-mof-cartilage-scaffold" && (
                  <div className="space-y-6">
                    {/* Project Overview */}
                    {/* <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h2>3D‑Bioprinted Cartilage Scaffold with MOF-Based Therapeutics</h2>
                      <p>
                        This project involved the design and fabrication of a bioactive scaffold for cartilage regeneration, combining 
                        <strong> 3D bioprinting techniques</strong> with <strong>drug-loaded metal-organic frameworks (MOFs)</strong>. 
                        The work explored the integration of natural hydrogels and polymer supports to mimic the structure and mechanical 
                        behavior of native cartilage tissue. It also introduced a controlled release mechanism for therapeutic agents.
                      </p>
                      <img src="/images/cartilage_scaffold_overview.jpg" alt="3D-Bioprinted MOF Scaffold" className="rounded-lg" />
                      <figcaption className="text-sm text-center">Figure 1: Schematic of Scaffold Composition and Concept</figcaption>
                    </div> */}

                    {/* Fabrication & Design Approach */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3>Fabrication Strategy</h3>
                      <p>
                        Using an extrusion-based bioprinting platform, we developed a composite scaffold featuring both hydrogel and thermoplastic components. 
                        A porous architecture was achieved to encourage cellular interaction and nutrient exchange. The scaffold was further functionalized by coating it 
                        with MOF nanoparticles loaded with a model anti-inflammatory compound.
                      </p>
                      {/* <img src="/images/cartilage_fabrication.jpg" alt="Fabrication Setup" className="rounded-lg" />
                      <figcaption className="text-sm text-center">Figure 2: Scaffold Fabrication via Dual-Printing Process</figcaption> */}
                    </div>

                    {/* Material Functionality */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3>Material Functionality</h3>
                      <p>
                        The scaffold was engineered to balance mechanical integrity with biological compatibility. Finite element modeling 
                        and preliminary mechanical analysis informed the structural design. The integration of MOFs allowed for targeted 
                        drug release in response to environmental cues, a feature relevant to the inflammatory microenvironment of injured cartilage.
                      </p>
                      {/* <img src="/images/cartilage_mechanics.jpg" alt="Mechanical Design" className="rounded-lg" />
                      <figcaption className="text-sm text-center">Figure 3: Conceptual Illustration of Mechanical Load Distribution</figcaption> */}
                    </div>

                    {/* Preliminary Biological Interface */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3>Biointerface & Preliminary Evaluation</h3>
                      <p>
                        Early-stage in vitro experiments were conducted to assess cytocompatibility and scaffold–cell interactions. 
                        Confocal microscopy and qualitative assays suggested promising cellular responses, including adhesion and viability. 
                        Additional data regarding therapeutic impact and biological performance is under review and will be available upon publication.
                      </p>
                      {/* <img src="/images/cartilage_cell_viability.jpg" alt="Confocal Results" className="rounded-lg" />
                      <figcaption className="text-sm text-center">Figure 4: Representative Biointerface Assessment</figcaption> */}
                    </div>

                    {/* Additional Notes */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3>Current Status</h3>
                      <p>
                        The project is currently under peer review in a scientific journal. It reflects ongoing interdisciplinary collaboration 
                        in the areas of biomaterials, tissue engineering, and nanomedicine. I contributed to both the experimental design and 
                        technical implementation, including scaffold development, MOF synthesis, and biological assays.
                      </p>
                    </div>
                  </div>
                )}
                {project.slug === "bi-layered-vascular-graft" && (
                  <div className="space-y-6">
                    {/* Project Overview */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h2>Bi‑Layered Vascular Graft Project</h2>
                      {/* <p>
                        In this project, we aimed to fabricate and characterize a bi‑layered vascular graft with enhanced mechanical properties and biocompatibility. 
                        This project involved a combination of advanced techniques including electrospinning, cell culturing, and mechanical testing to ensure the graft's performance in clinical applications. 
                        Through this work, I developed and honed essential laboratory skills such as cell culturing, electrospinning, silk fibroin extraction, and in vitro graft fabrication.
                      </p> */}
                    </div>

                    {/* Fabrication Section */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3>Fabrication</h3>
                      <p>
                        The inner layer of the graft was created using the electrospinning method, where nanofibers were developed by encapsulating heparin sodium within a TPU/silk fibroin matrix. 
                        The outer layer, made of polydimethylsiloxane (PDMS), was designed to enhance the graft's mechanical properties. This multi‑layered structure was critical for achieving the desired balance between strength, flexibility, and biocompatibility.
                      </p>
                      <img src="/images/vasc_1.jpg" alt="Electrospun layer of TPU/silk fibroin" className="rounded-lg" />
                      <figcaption className="text-sm text-center">Figure 1: Electrospun layer comprised of TPU/silk fibroin</figcaption>
                      <img src="/images/vasc_2.jpg" alt="Cross-section showing PDMS outer layer" className="rounded-lg" />
                      <figcaption className="text-sm text-center">Figure 2: Cross-section illustrating PDMS outer layer</figcaption>
                    </div>

                    {/* Mechanical and Morphological Analysis */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3>Mechanical and Morphological Analysis</h3>
                      <p>
                        The project involved extensive mechanical testing, including suture retention, tensile strength, and burst pressure tests to evaluate the graft’s durability. 
                        Additionally, the morphology of the graft was analyzed using Scanning Electron Microscopy (SEM) to assess fiber diameter and adhesion between layers. 
                        These analyses confirmed that the graft had a suitable microstructure and mechanical integrity to function effectively as a vascular graft.
                      </p>
                    </div>

                    {/* Biocompatibility and In Vitro Testing */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3>Biocompatibility and In Vitro Testing</h3>
                      <p>
                        The biocompatibility of the graft was evaluated through cell culture experiments using Human Umbilical Vein Endothelial Cells (HUVECs). 
                        The cells were cultured on the graft and monitored through MTT assays and SEM imaging, demonstrating the graft's ability to support cell viability and proliferation. 
                        The project also involved assessing the graft's anti‑thrombogenic properties, with platelet adhesion tests showing promising results in preventing blood clot formation.
                      </p>
                      <img src="/images/vasc_3.jpg" alt="Endothelization progress" className="rounded-lg" />
                      <figcaption className="text-sm text-center">Figure 3: Nearly completed endothelization</figcaption>
                      <img src="/images/vasc_4.jpg" alt="Quantitative cell viability results" className="rounded-lg" />
                      <figcaption className="text-sm text-center">Figure 4: Quantitative cell viability results</figcaption>
                    </div>

                    {/* Conclusion */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <h3>Conclusion</h3>
                      <p>
                        Overall, this project successfully developed a bi‑layered vascular graft with excellent mechanical and biocompatibility characteristics. 
                        The skills I acquired, including cell culturing, electrospinning, and mechanical testing, were crucial in conducting the comprehensive analysis required to validate the graft's potential for clinical applications.
                      </p>
                    </div>
                  </div>
                )}
              </section>
            </SectionObserver>
            {/* Results & Impact - Now using project-specific data */}
            <SectionObserver>
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-teal-500" />
                  <h2 className="text-2xl font-semibold">Results & Impact</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">Key Achievements</h3>
                      <ul className="space-y-2 text-sm">
                        {project.keyAchievements ? (
                          project.keyAchievements.map((achievement, index) => <li key={index}>• {achievement}</li>)
                        ) : (
                          <>
                            <li>• Project achievements to be updated</li>
                            <li>• Results pending completion</li>
                            <li>• Impact assessment in progress</li>
                          </>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">Future Applications</h3>
                      <ul className="space-y-2 text-sm">
                        {project.futureApplications ? (
                          project.futureApplications.map((application, index) => <li key={index}>• {application}</li>)
                        ) : (
                          <>
                            <li>• Applications to be determined</li>
                            <li>• Market analysis in progress</li>
                            <li>• Potential use cases under evaluation</li>
                          </>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </SectionObserver>

            {/* Additional Images */}
            {project.images && project.images.length > 1 && (
              <SectionObserver>
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold">Project Gallery</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.images.slice(1).map((image, index) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden border">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.title} - Image ${index + 2}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              </SectionObserver>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technologies */}
            <SectionObserver>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SectionObserver>

            {/* Collaborators */}
            {project.collaborators && (
              <SectionObserver>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Collaborators</h3>
                    <div className="space-y-2">
                      {project.collaborators.map((collaborator, index) => (
                        <div key={index} className="text-sm">
                          {collaborator}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </SectionObserver>
            )}

            {/* Publications */}
            {project.publications && (
              <SectionObserver>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Publications</h3>
                    <div className="space-y-3">
                      {project.publications.map((publication, index) => (
                        <div key={index} className="text-sm">
                          <FileText className="h-4 w-4 inline mr-2" />
                          {publication}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </SectionObserver>
            )}

            {/* Links */}
            <SectionObserver>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Project Links</h3>
                  <div className="space-y-2">
                    {project.github && (
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Github className="h-4 w-4 mr-2" />
                        View Code
                      </Button>
                    )}
                    {project.demo && (
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </SectionObserver>
          </div>
        </div>

        {/* Navigation */}
        <SectionObserver>
          <div className="mt-12 pt-8 border-t">
            <div className="flex justify-between items-center">
              <Link href="/#projects">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Projects
                </Button>
              </Link>
              <Link href="/#contact">
                <Button className="bg-teal-600 hover:bg-teal-700">Discuss This Project</Button>
              </Link>
            </div>
          </div>
        </SectionObserver>
      </main>
    </div>
  )
}
