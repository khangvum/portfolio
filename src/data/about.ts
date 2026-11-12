/** @brief Locale-independent numeric formatting metadata for an about statistic. */
export type AboutStatMetadata = {
  value: number;
  minimumFractionDigits: number;
  maximumFractionDigits: number;
};

/** @brief Shared numeric values for the about-section statistics. */
export const aboutStatMetadata: AboutStatMetadata[] = [
  { value: 4.2, minimumFractionDigits: 2, maximumFractionDigits: 2 },
  { value: 3, minimumFractionDigits: 0, maximumFractionDigits: 0 },
  { value: 3, minimumFractionDigits: 0, maximumFractionDigits: 0 },
  { value: 2, minimumFractionDigits: 0, maximumFractionDigits: 0 },
];
