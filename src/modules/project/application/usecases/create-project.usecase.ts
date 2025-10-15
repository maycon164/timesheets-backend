import { CreateProjectDto } from '../../dto/create-project.dto';
import { Project } from '../../domain/entities/project.entity';
import { ProjectRepositoryInterface } from '../../domain/repositories/project.repository';
import { User } from '../../../auth/domain/user.entity';

export class CreateProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepositoryInterface) {}

  public async execute(createProjectDto: CreateProjectDto, user: User) {
    const project = new Project(
      0,
      createProjectDto.name,
      createProjectDto.description,
      createProjectDto.pricePerHour,
      user,
      [],
    );

    return await this.projectRepository.saveProject(project);
  }
}
