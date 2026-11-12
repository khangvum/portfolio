/** @brief Shared repository metadata attached to an experience point. */
export type ExperiencePointMetadata = {
  linkText: string;
  linkUrl: string;
};

/** @brief Shared metadata for one localized experience entry. */
export type ExperienceMetadata = {
  pointLinks: (ExperiencePointMetadata | null)[];
};

/** @brief Shared experience metadata, ordered to match each locale's job list. */
export const experienceMetadata: ExperienceMetadata[] = [
  {
    pointLinks: [
      {
        linkText: "khangvum/reqnroll-automation",
        linkUrl: "https://github.com/khangvum/reqnroll-automation",
      },
      null,
      null,
    ],
  },
  {
    pointLinks: [
      null,
      {
        linkText: "khangvum/answer-files",
        linkUrl: "https://github.com/khangvum/answer-files",
      },
      null,
    ],
  },
  {
    pointLinks: [
      {
        linkText: "khangvum/nixos-wsl",
        linkUrl: "https://github.com/khangvum/nixos-wsl",
      },
      {
        linkText: "khangvum/homelab-ansible-config",
        linkUrl: "https://github.com/khangvum/homelab-ansible-config",
      },
      null,
    ],
  },
];
