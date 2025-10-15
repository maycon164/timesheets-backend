import { CreateProjectUseCase } from '../../../../modules/project/application/usecases/create-project.usecase';
import { ProjectRepositoryInterface } from '../../../../modules/project/domain/repositories/project.repository';
import { CreateProjectDto } from '../../../../modules/project/dto/create-project.dto';
import { User } from '../../../../modules/auth/domain/user.entity';

describe('CreateProjectUseCase', () => {
  let createProjectUseCase: CreateProjectUseCase;
  let projectRepository: Partial<ProjectRepositoryInterface>;

  beforeEach(() => {
    projectRepository = {
      saveProject: jest
        .fn()
        .mockImplementation((project) => Promise.resolve(project)),
    };

    createProjectUseCase = new CreateProjectUseCase(
      projectRepository as ProjectRepositoryInterface,
    );
  });

  test('should create a new project', async () => {
    const projectDto: CreateProjectDto = {
      name: 'Example',
      description: 'just a simple description',
      pricePerHour: 10,
    };
    const user = new User(1, 'John', 'john@email.com');

    const savedProject = await createProjectUseCase.execute(projectDto, user);
    expect(projectRepository.saveProject).toHaveBeenCalled();
    expect(savedProject.name).toEqual('Example');
  });
});
