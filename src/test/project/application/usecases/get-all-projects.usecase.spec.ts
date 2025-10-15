import { GetAllProjectUseCase } from '../../../../modules/project/application/usecases/get-all-project.usecase';
import { ProjectRepositoryInterface } from '../../../../modules/project/domain/repositories/project.repository';
import { Project } from '../../../../modules/project/domain/entities/project.entity';
import { User } from '../../../../modules/auth/domain/user.entity';

describe('GetAllProjectsUseCase', () => {
  let getAllProjectUseCase: GetAllProjectUseCase;
  let projectRepository: Partial<ProjectRepositoryInterface>;

  beforeEach(() => {
    projectRepository = {
      findAll: jest.fn(),
    };

    getAllProjectUseCase = new GetAllProjectUseCase(
      projectRepository as ProjectRepositoryInterface,
    );
  });

  test('should get all project by user id', async () => {
    const userId = 1;
    projectRepository.findAll = jest.fn().mockResolvedValue(getProjects());

    const projects = await getAllProjectUseCase.execute(userId);
    expect(projectRepository.findAll).toHaveBeenCalled();
    expect(projects.length).toBe(2);
  });
});

function getUser() {
  return new User(1, 'test', 'test@email.com');
}

function getProjects() {
  return [
    new Project(1, 'example', 'just example', 10, getUser(), []),
    new Project(2, 'example', 'just example', 10, getUser(), []),
    new Project(
      3,
      'example',
      'just example',
      10,
      new User(2, 'other', 'other@email.com'),
      [],
    ),
  ];
}
