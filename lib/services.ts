export const SERVICES = [
  {
    name: "Psychotherapy",
    description:
      "Individual therapy sessions grounded in evidence-based techniques to address anxiety, depression, trauma, and more.",
  },
  {
    name: "Medication Management",
    description:
      "Comprehensive psychiatric evaluation and ongoing medication oversight tailored to your needs.",
  },
  {
    name: "Talk Therapy",
    description:
      "A supportive, conversational space to process emotions, build coping strategies, and foster growth.",
  },
  {
    name: "Integrative Care",
    description:
      "Holistic treatment combining traditional psychiatry with complementary approaches, including faith-based prayer therapy.",
  },
] as const;

export type ServiceName = (typeof SERVICES)[number]["name"];

export const SERVICE_NAMES: readonly string[] = SERVICES.map((s) => s.name);
