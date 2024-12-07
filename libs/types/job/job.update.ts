import { JobEmploymentMode, JobIndustry, JobLocation, JobStatus, } from '../../enums/job.enum';

export interface JobUpdate {
	_id: string;
	jobEmploymentMode: JobEmploymentMode;
	jobIndustry: JobIndustry
	jobStatus: JobStatus;
	jobLocation: JobLocation;
	jobAddress: string;
	jobTitle: string;
	jobSalary: number;
	jobDescription: string
	jobExperienceRequired: number;
	jobPositionsAvailable: number;
	jobRemoteAvailable: boolean; 
	jobNegotiableSalary: boolean; 
	jobImages: string[];
	memberId: string;
	updatedAt: Date;
	closedAt?: Date;
	deletedAt: Date;
}
