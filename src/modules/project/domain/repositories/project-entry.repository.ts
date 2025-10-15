import { ProjectEntry } from '../entities/project-entry.entity';

export interface ProjectEntryRepository {
  save(entryDto: ProjectEntry, projectId: number): Promise<ProjectEntry>;
  findAllByProjectId(projectId: number): Promise<ProjectEntry[]>;
}
