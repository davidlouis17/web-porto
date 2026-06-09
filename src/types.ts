/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SkillItem {
  name: string;
  level: number; // 0-100 indicating familiarity
  iconName: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  items: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  thumbnailUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  category: "mobile" | "infra";
}

export type SectionType = "beranda" | "keahlian" | "proyek" | "pengalaman" | "kontak";
