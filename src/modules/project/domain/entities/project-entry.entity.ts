export class ProjectEntry {
  id: number;
  description: string;
  startTimestamp: number;
  endTimestamp: number;
  date: Date;

  constructor(
    id: number,
    description: string,
    startTimestamp: number,
    endTimestamp: number,
    date: Date,
  ) {
    this.id = id;
    this.description = description;
    this.startTimestamp = startTimestamp;
    this.endTimestamp = endTimestamp;
    this.date = date;
  }

  public getTimestampWorked() {
    return this.endTimestamp - this.startTimestamp;
  }

  public isValid() {
    if (this.endTimestamp < this.startTimestamp) {
      console.log('endTimestamp should be greater than startTimestamp');
      return false;
    }

    if (this.startTimestamp == null || this.endTimestamp == null) {
      console.log(
        'startTimestamp and endTimestamp should be different from null',
      );
      return false;
    }
  }
}
