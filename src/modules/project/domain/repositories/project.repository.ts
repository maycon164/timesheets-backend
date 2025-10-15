import { Project } from '../entities/project.entity';

export interface ProjectRepositoryInterface {
  findById(id: number): Promise<Project>;
  findAll(): Promise<Project[]>;
  saveProject(project: Project): Promise<Project>;
  getProject(projectId: string): Promise<Project>;
}
