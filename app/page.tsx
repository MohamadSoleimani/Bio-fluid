import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Microscope, Droplets, GraduationCap, Mail, Github, Linkedin, ChevronRight, Brain, Trophy } from "lucide-react"
import BiofluidAnimation from "@/components/biofluid-animation"
import { ThemeToggle } from "@/components/theme-toggle"
import ContactForm from "@/components/contact-form"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { SectionObserver } from "@/components/section-observer"
import ProjectsSection from "@/components/projects-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <SmoothScrollLink href="#" className="flex items-center space-x-2">
              <Droplets className="h-6 w-6 text-teal-500" />
              <span className="inline-block font-bold">BioFluid Engineering</span>
            </SmoothScrollLink>
            <nav className="hidden gap-6 md:flex">
              <SmoothScrollLink
                href="#projects"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Projects
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#about"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#contact"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </SmoothScrollLink>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/MohamadSoleimani" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://www.linkedin.com/in/mohamad-soleimani-076462288/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:Soleimani.mohammad97@outlook.com">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <BiofluidAnimation />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center text-center space-y-8">
              <div className="space-y-4 max-w-4xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Exploring the <span className="text-teal-500">Synergy</span> between AI, Mechanical Design, and
                  Biomedical Systems
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                  Integrating <span className="text-teal-500">AI</span> with Mechanical and Biomedical Systems
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <SmoothScrollLink href="#projects">
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    View Projects
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </SmoothScrollLink>
                <SmoothScrollLink href="#contact">
                  <Button variant="outline">Contact Me</Button>
                </SmoothScrollLink>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section - Now using the new component */}
        <ProjectsSection />

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background/5">
          <SectionObserver>
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-8">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-teal-900/20 px-3 py-1 text-sm text-teal-500">
                      About Me
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      Mechanical Engineer with a Focus on Biomedical Applications & AI
                    </h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      I’m a passionate computational and biomedical engineering enthusiast dedicated to integrating
                      advanced computational tools with innovative biomedical solutions. My research focuses on developing
                      novel technologies to address pressing healthcare challenges.
                    </p>
                  </div>

                  {/* Professional Background
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Professional Background</h3>
                    <ul className="grid gap-4">
                      <li className="flex items-start gap-2">
                        <GraduationCap className="mt-1 h-5 w-5 text-teal-500" />
                        <div>
                          <h4 className="font-medium">Education</h4>
                          <p className="text-sm text-muted-foreground">
                            M.S. in Mechanical Engineering, Specialization in Biomedical Engineering
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Microscope className="mt-1 h-5 w-5 text-teal-500" />
                        <div>
                          <h4 className="font-medium">Research Focus</h4>
                          <p className="text-sm text-muted-foreground">
                            Microfluidic devices, lab-on-a-chip technologies, and biomedical implants
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Droplets className="mt-1 h-5 w-5 text-teal-500" />
                        <div>
                          <h4 className="font-medium">Technical Skills</h4>
                          <p className="text-sm text-muted-foreground">
                            CAD design, CFD simulation, microfabrication, prototyping, and testing
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Brain className="mt-1 h-5 w-5 text-teal-500" />
                        <div>
                          <h4 className="font-medium">Computational Expertise</h4>
                          <p className="text-sm text-muted-foreground">
                            Machine Learning, Deep Learning, Neural Networks, Computer Vision, Data Analysis, and
                            Predictive Modeling
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div> */}
                  {/* Professional Background */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Professional Background</h3>
                    <ul className="grid gap-4">
                      <li className="flex items-start gap-2">
                        <GraduationCap className="mt-1 h-5 w-5 text-teal-500" />
                        <div>
                          <h4 className="font-medium">Education</h4>
                          <p className="text-sm text-muted-foreground">
                            M.S. in Mechanical Engineering, Specialization in Biomedical Engineering
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Microscope className="mt-1 h-5 w-5 text-teal-500" />
                        <div>
                          <h4 className="font-medium">Research Focus</h4>
                          <p className="text-sm text-muted-foreground">
                            Microfluidic devices, lab-on-a-chip technologies, Physics Informed Machine Learning, and Tissue Engineering
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Droplets className="mt-1 h-5 w-5 text-teal-500" />
                        <div>
                          <h4 className="font-medium">Technical Skills</h4>
                          <p className="text-sm text-muted-foreground">
                            microfabrication, 3D bioprinting, CAD design, CFD simulation, prototyping, and testing
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Brain className="mt-1 h-5 w-5 text-teal-500" />
                        <div>
                          <h4 className="font-medium">Computational Expertise</h4>
                          <p className="text-sm text-muted-foreground">
                            Machine Learning, Deep Learning, Computer Vision, Data Analysis, and
                            Predictive Modeling
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Achievements Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Honors and Awards</h3>
                    <div className="bg-card border rounded-lg p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <Trophy className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">2024</span>
                            </div>
                            <p className="text-sm leading-relaxed">
                              <span className="font-bold">Distinguished Researcher of the ME Department</span> at Sharif
                              University of Technology for contributions to the design and manufacturing of Iran's first
                              multi-channel real-time PCR.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">2022</span>
                            </div>
                            <p className="text-sm leading-relaxed">
                              <span className="font-bold">Ranked 21st out of over 8,000 participants</span> in the
                              highly competitive graduate-level university entrance exam.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional Memberships
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Professional Memberships</h3>
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-card border rounded-lg px-4 py-2 text-sm">
                        <span className="font-medium">IEEE</span> - Institute of Electrical and Electronics Engineers
                      </div>
                      <div className="bg-card border rounded-lg px-4 py-2 text-sm">
                        <span className="font-medium">ASME</span> - American Society of Mechanical Engineers
                      </div>
                      <div className="bg-card border rounded-lg px-4 py-2 text-sm">
                        <span className="font-medium">BMES</span> - Biomedical Engineering Society
                      </div>
                      <div className="bg-card border rounded-lg px-4 py-2 text-sm">
                        <span className="font-medium">MRS</span> - Materials Research Society
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-blue-900/20 rounded-full blur-3xl opacity-20"></div>
                  <Image
                    src="/images/profile.jpg"
                    width={600}
                    height={600}
                    alt="Professional photo showcasing the multi-channel real-time PCR system"
                    className="relative z-10 mx-auto aspect-square rounded-xl object-cover shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </SectionObserver>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <SectionObserver>
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get in Touch</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Interested in collaborating or learning more about my research? Feel free to reach out.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <ContactForm />
                <p className="text-xs text-muted-foreground">I'll respond to your message as soon as possible.</p>
              </div>
            </div>
          </SectionObserver>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} BioFluid Engineering. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/MohamadSoleimani" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/mohamad-soleimani-076462288/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:Soleimani.mohammad97@outlook.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}










