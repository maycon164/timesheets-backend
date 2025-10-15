import { AddEntryProjectUseCase } from '../../../../modules/project/application/usecases/add-entry-project.usecase';
import { ProjectRepositoryInterface } from '../../../../modules/project/domain/repositories/project.repository';
import { ProjectEntryRepository } from '../../../../modules/project/domain/repositories/project-entry.repository';
import { Project } from '../../../../modules/project/domain/entities/project.entity';
import { AddProjectEntryDto } from '../../../../modules/project/dto/add-project-entry.dto';
import { User } from '../../../../modules/auth/domain/user.entity';

describe('AddEntryProjectUseCase', () => {
  let addEntryProjectUseCase: AddEntryProjectUseCase;
  let projectRepository: Partial<ProjectRepositoryInterface>;
  let entryProjectRepository: Partial<ProjectEntryRepository>;

  beforeEach(() => {
    projectRepository = {
      findById: jest.fn(),
    };

    entryProjectRepository = {
      save: jest.fn().mockImplementation((entry) => Promise.resolve(entry)),
    };

    addEntryProjectUseCase = new AddEntryProjectUseCase(
      projectRepository as ProjectRepositoryInterface,
      entryProjectRepository as ProjectEntryRepository,
    );
  });

  test('save entry in a project', async () => {
    const user = new User(1, 'john', 'john@email.com');
    const projectSaved = new Project(
      1,
      'Example',
      'simple example',
      10,
      user,
      [],
    );

    projectRepository.findById = jest.fn().mockResolvedValue(projectSaved);

    const entryDto: AddProjectEntryDto = {
      description: 'working in a feature:abc',
      start: new Date(),
      end: new Date(),
    };

    const entry = await addEntryProjectUseCase.execute(entryDto, 1);

    expect(projectRepository.findById).toHaveBeenCalled();
    expect(entryProjectRepository.save).toHaveBeenCalled();
    expect(entry.description).toEqual(entryDto.description);
  });

  test('should throw project not find error', async () => {
    projectRepository.findById = jest.fn().mockResolvedValue(null);
    const entryDto: AddProjectEntryDto = {
      description: 'working in a feature:abc',
      start: new Date(),
      end: new Date(),
    };

    await expect(addEntryProjectUseCase.execute(entryDto, 1)).rejects.toThrow(
      Error,
    );
  });
});
