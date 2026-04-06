const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const scrollTopBtn = document.getElementById("scrollTopBtn");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isActive = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isActive));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const accordionButtons = document.querySelectorAll(".accordion-btn");
accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    const isVisible = content.style.display === "block";

    document.querySelectorAll(".accordion-content").forEach((item) => {
      item.style.display = "none";
    });

    content.style.display = isVisible ? "none" : "block";
  });
});

const portfolioForm = document.getElementById("portfolioForm");
const portfolioMessage = document.getElementById("portfolioMessage");
const downloadPortfolioBtn = document.getElementById("downloadPortfolioBtn");

const previewFields = {
  name: document.getElementById("previewName"),
  role: document.getElementById("previewRole"),
  summary: document.getElementById("previewSummary"),
  skills: document.getElementById("previewSkills"),
  projects: document.getElementById("previewProjects"),
  tools: document.getElementById("previewTools"),
  contact: document.getElementById("previewContact"),
};

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function getPortfolioData() {
  return {
    name: document.getElementById("portfolioName").value.trim(),
    role: document.getElementById("portfolioRole").value.trim(),
    summary: document.getElementById("portfolioSummary").value.trim(),
    skills: document.getElementById("portfolioSkills").value.trim(),
    projects: document.getElementById("portfolioProjects").value.trim(),
    tools: document.getElementById("portfolioTools").value.trim(),
    contact: document.getElementById("portfolioContact").value.trim(),
  };
}

function updatePortfolioPreview(data) {
  previewFields.name.textContent = data.name || "Your Name";
  previewFields.role.textContent = data.role || "Your Role";
  previewFields.summary.textContent = data.summary || "Your professional summary will appear here.";
  previewFields.skills.textContent = data.skills || "Your skills will appear here.";
  previewFields.projects.textContent = data.projects || "Your projects will appear here.";
  previewFields.tools.textContent = data.tools || "Your tools will appear here.";
  previewFields.contact.textContent = data.contact || "Your contact details will appear here.";
}

if (portfolioForm) {
  portfolioForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = getPortfolioData();
    updatePortfolioPreview(data);
    if (portfolioMessage) {
      portfolioMessage.textContent = "Portfolio preview generated successfully.";
    }
  });
}

if (downloadPortfolioBtn) {
  downloadPortfolioBtn.addEventListener("click", () => {
    const data = getPortfolioData();
    const content = `Portfolio Draft

Name: ${data.name}
Role: ${data.role}

Summary:
${data.summary}

Skills:
${data.skills}

Projects:
${data.projects}

Tools:
${data.tools}

Contact:
${data.contact}
`;
    downloadTextFile("student-portfolio-draft.txt", content);
    if (portfolioMessage) {
      portfolioMessage.textContent = "Portfolio text file downloaded successfully.";
    }
  });
}

const proposalForm = document.getElementById("proposalForm");
const proposalOutput = document.getElementById("proposalOutput");
const copyProposalBtn = document.getElementById("copyProposalBtn");
const proposalMessage = document.getElementById("proposalMessage");

if (proposalForm) {
  proposalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const clientName = document.getElementById("clientName").value.trim();
    const serviceType = document.getElementById("serviceType").value.trim();
    const studentStrength = document.getElementById("studentStrength").value.trim();
    const deliveryTime = document.getElementById("deliveryTime").value.trim();

    proposalOutput.value = `Hello ${clientName},

I hope you are well. I am interested in supporting your ${serviceType} project.

I believe I can add value because I have strengths in ${studentStrength}. I would focus on clear communication, careful attention to your requirements, and professional delivery.

If selected, I would aim to complete the work within ${deliveryTime}, while maintaining quality and responsiveness throughout the project.

Thank you for your time and consideration.

Kind regards,
Student Freelancer`;

    if (proposalMessage) {
      proposalMessage.textContent = "Proposal generated successfully.";
    }
  });
}

if (copyProposalBtn) {
  copyProposalBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(proposalOutput.value);
      if (proposalMessage) {
        proposalMessage.textContent = "Proposal copied to clipboard.";
      }
    } catch (error) {
      if (proposalMessage) {
        proposalMessage.textContent = "Copy failed. Please copy the text manually.";
      }
    }
  });
}

window.addEventListener("scroll", () => {
  if (!scrollTopBtn) return;

  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
}