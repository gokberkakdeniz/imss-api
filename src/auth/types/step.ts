export const steps = ["THESIS_TOPIC_PROPOSAL", "FORM_TD", "FORM_TJA", "FORM_TT", "FORM_TJD"] as const;

export type Step = typeof steps[number];
