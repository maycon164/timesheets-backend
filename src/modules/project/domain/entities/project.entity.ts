import { ProjectEntry } from './project-entry.entity';
import { User } from '../../../auth/domain/user.entity';

export class Project {
  id: number;
  name: string;
  description: string;
  pricePerHour: number;
  owner: User;
  entries: ProjectEntry[] = [];

  constructor(
    id: number,
    name: string,
    description: string,
    pricePerHour: number,
    owner: User,
    entries: ProjectEntry[],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.pricePerHour = pricePerHour;
    this.owner = owner;
    this.entries = entries;
  }

  public getTotalWorked() {
    return this.entries.reduce(
      (initialValue, currentValue) =>
        initialValue + currentValue.getTimestampWorked(),
      0,
    );
  }

  public getTotalPrice() {
    return this.getTotalWorked() * this.pricePerHour;
  }
}
