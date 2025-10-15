import { ProjectRepositoryInterface } from '../../domain/repositories/project.repository';

export class GetAllProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepositoryInterface) {}

  async execute(userId: number) {
    const projects = await this.projectRepository.findAll();
    return projects.filter((p) => p.owner.id === userId);
  }
}
