import { ProjectRepositoryInterface } from '../../domain/repositories/project.repository';
import { ProjectEntryRepository } from '../../domain/repositories/project-entry.repository';
import { Project } from '../../domain/entities/project.entity';
import { ProjectEntryFilterDto } from '../../dto/project-entry-filter.dto';
import { ProjectEntry } from '../../domain/entities/project-entry.entity';

export class GetProjectEntriesBy {
  constructor(
    private readonly projectRepository: ProjectRepositoryInterface,
    private readonly projectEntryRepository: ProjectEntryRepository,
  ) {}

  public async execute(
    filters: ProjectEntryFilterDto,
    projectId: number,
    userId: number,
  ) {
    const project = await this.projectRepository.findById(projectId);
    this.validateProject(project, userId);

    const entries =
      await this.projectEntryRepository.findAllByProjectId(projectId);

    if (!filters) {
      return entries;
    }

    return entries.filter((entry) => this.applyFilters(entry, filters));
  }

  private applyFilters(entry: ProjectEntry, filters: ProjectEntryFilterDto) {
    if (filters.start && filters.end) {
      return entry.date >= filters.start && entry.date <= filters.end;
    }
    if (filters.start && !filters.end) {
      return entry.date >= filters.start;
    }
    if (filters.end && !filters.start) {
      return entry.date <= filters.end;
    }

    return true;
  }

  private validateProject(project: Project, userId: number) {
    if (!project) {
      throw new Error('Project not found');
    }

    if (project.owner.id !== userId) {
      throw new Error('Project doest not belong to user');
    }
  }
}
