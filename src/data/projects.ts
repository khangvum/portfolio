/** @brief Language-independent metadata used to render a portfolio project. */
export type ProjectMetadata = {
  id: string;
  romanNumeral: string;
  subtitle: string;
  link: string;
  tech: string[];
};

/** @brief Shared project metadata, ordered to match each locale's project list. */
export const projectMetadata: ProjectMetadata[] = [
  {
    id: "ansible-config",
    romanNumeral: "I",
    subtitle: "Ordinatio",
    link: "https://github.com/khangvum-com/ansible-config",
    tech: ["Ansible", "API", "Docker", "Jinja", "PowerShell", "YAML"],
  },
  {
    id: "terraform-infra",
    romanNumeral: "II",
    subtitle: "Infrastructura",
    link: "https://github.com/khangvum-com/terraform-infra",
    tech: ["Terraform", "HCL", "API", "Docker"],
  },
  {
    id: "khangvum.hyperv",
    romanNumeral: "III",
    subtitle: "Collectio",
    link: "https://github.com/khangvum-com/khangvum.hyperv",
    tech: ["Ansible", "Hyper-V", "PowerShell", "Python", "YAML"],
  },
  {
    id: "answer-files",
    romanNumeral: "IV",
    subtitle: "Dictum",
    link: "https://github.com/khangvum/answer-files",
    tech: ["Batchfile", "PowerShell", "XML", "YAML", "Windows", "Linux"],
  },
  {
    id: "nixos-wsl",
    romanNumeral: "V",
    subtitle: "Systema",
    link: "https://github.com/khangvum/nixos-wsl",
    tech: ["Nix", "Bash", "WSL", "Linux"],
  },
  {
    id: "exprevaluator",
    romanNumeral: "VI",
    subtitle: "Calculus",
    link: "https://github.com/khangvum/exprevaluator",
    tech: ["C++", "C"],
  },
  {
    id: "portfolio",
    romanNumeral: "VII",
    subtitle: "Speculum",
    link: "https://github.com/khangvum/portfolio",
    tech: ["TypeScript", "React", "Vite", "HTML", "CSS"],
  },
  {
    id: "reqnroll-automation",
    romanNumeral: "VIII",
    subtitle: "Automata",
    link: "https://github.com/khangvum/reqnroll-automation",
    tech: ["C#", ".NET", "Gherkin", "MSTest", "Selenium", "GitHub Actions"],
  },
  {
    id: "chemicalbalancer",
    romanNumeral: "IX",
    subtitle: "Elementa",
    link: "https://github.com/khangvum/chemicalbalancer",
    tech: ["Python", "Jupyter Notebook", "NumPy"],
  },
];
