import { ProjectRepositoryInterface } from '../../domain/repositories/project.repository';
import { AddProjectEntryDto } from '../../dto/add-project-entry.dto';
import { ProjectEntryRepository } from '../../domain/repositories/project-entry.repository';
import { ProjectEntry } from '../../domain/entities/project-entry.entity';

export class AddEntryProjectUseCase {
  constructor(
    private readonly projectRepository: ProjectRepositoryInterface,
    private readonly entryProjectRepository: ProjectEntryRepository,
  ) {}

  public async execute(
    addProjectEntryDto: AddProjectEntryDto,
    projectId: number,
  ) {
    const project = await this.projectRepository.findById(projectId);

    if (!project) {
      throw new Error(`Project with id ${projectId} not found`);
    }

    const entryProject = new ProjectEntry(
      0,
      addProjectEntryDto.description,
      addProjectEntryDto.start.getTime(),
      addProjectEntryDto.end.getTime(),
      addProjectEntryDto.start,
    );

    return await this.entryProjectRepository.save(entryProject, projectId);
  }
}
