import { GetProjectEntriesBy } from '../../../../modules/project/application/usecases/get-entries-by.usecase';
import { ProjectRepositoryInterface } from '../../../../modules/project/domain/repositories/project.repository';
import { ProjectEntryRepository } from '../../../../modules/project/domain/repositories/project-entry.repository';
import { ProjectEntry } from '../../../../modules/project/domain/entities/project-entry.entity';
import { Project } from '../../../../modules/project/domain/entities/project.entity';
import { User } from '../../../../modules/auth/domain/user.entity';
import { ProjectEntryFilterDto } from '../../../../modules/project/dto/project-entry-filter.dto';

describe('GetProjectsEntriesBy', () => {
  let getProjectEntryBy: GetProjectEntriesBy;
  let projectRepository: Partial<ProjectRepositoryInterface>;
  let projectEntryRepository: Partial<ProjectEntryRepository>;

  beforeEach(() => {
    projectRepository = {
      findById: jest.fn().mockResolvedValue(getProject()),
    };
    projectEntryRepository = {
      findAllByProjectId: jest.fn().mockResolvedValue(getEntries()),
    };

    getProjectEntryBy = new GetProjectEntriesBy(
      projectRepository as ProjectRepositoryInterface,
      projectEntryRepository as ProjectEntryRepository,
    );
  });

  test('should return entries by project id', async () => {
    const projectId = 1;
    const userId = 1;

    const entries = await getProjectEntryBy.execute(
      getFilters(),
      projectId,
      userId,
    );
    expect(projectRepository.findById).toHaveBeenCalled();
    expect(projectEntryRepository.findAllByProjectId).toHaveBeenCalled();
    expect(entries.length).toBe(3);
  });

  test('should return entries by project id filtered by', async () => {
    const filters: ProjectEntryFilterDto = {
      start: new Date(2025, 9, 10),
      end: new Date(2025, 9, 30),
    };

    const entries = await getProjectEntryBy.execute(filters, 1, 1);
    expect(entries.length).toBe(2);
  });

  test('should throw an error when user is not the owner of the project', async () => {
    await expect(
      getProjectEntryBy.execute(getFilters(), 1, 10),
    ).rejects.toThrow('Project doest not belong to user');
  });

  test('should throw and error when project does not exist', async () => {
    projectRepository.findById = jest.fn().mockResolvedValue(null);

    await expect(getProjectEntryBy.execute(getFilters(), 1, 1)).rejects.toThrow(
      'Project not found',
    );
  });
});

function getFilters(): ProjectEntryFilterDto {
  return {
    start: null,
    end: null,
  };
}

function getProject() {
  return new Project(
    1,
    'example',
    'desc',
    10,
    new User(1, 'test', 'test@email.com'),
    [],
  );
}

function getEntries() {
  return [
    new ProjectEntry(
      1,
      'fix bug abc',
      12803431,
      712139023,
      new Date(2025, 9, 10),
    ),
    new ProjectEntry(
      2,
      'working on a new feature',
      12803431,
      712139023,
      new Date(2025, 9, 25),
    ),
    new ProjectEntry(
      3,
      'Meeting with client',
      12803431,
      712139023,
      new Date(2025, 10, 10),
    ),
  ];
}
