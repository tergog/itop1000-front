export interface ActiveProject {
  _id?: string;
  title: string;
  employerId: string;
  developerId: string;
  screenshotsPerHour: number;
  workTime: WorkTimeModel;
  dayWorkTime: number;
  hoursPerWeek: number;
  screenshots: Array<ScreenshotModel>;
}

export interface ScreenshotModel {
  link: string;
  dateCreated: number;
}

export interface WorkTimeModel {
  [key: string]: WeekWorkTimeModel;
}

export interface WeekWorkTimeModel {
  [key: string]: number;
}

