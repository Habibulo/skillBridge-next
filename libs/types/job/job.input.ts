import { JobLocation, JobStatus, JobEmploymentMode, JobIndustry } from '../../enums/job.enum';
import { Direction } from '../../enums/common.enum';

export interface jobInput {
	jobEmploymentMode: JobEmploymentMode;
	jobIndustry: JobIndustry
	jobLocation: JobLocation;
	jobAddress: string;
	jobTitle: string;
	jobSalary: number;
	jobDescription: string;
	jobExperienceRequired: number;
	jobPositionsAvailable: number;
	jobRemoteAvailable: boolean;
	jobNegotiableSalary: boolean;
	jobImages: string[];
	memberId?: string;
	postedAt?: Date;
}

interface JobSearch {
	memberId?: string;
	locationList?: JobLocation[];
	typeList?: JobEmploymentMode[];
	typeIndustry?: JobIndustry[]
	positionsAvailableList?: Number[];
	options?: string[];
	salaryRange?: SalaryRange;
	periodsRange?: PeriodsRange;
	experienceRange?: ExperienceRange;
	text?: string;
}

export interface JobsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: JobSearch;
}

interface AJSearch {
	jobStatus?: JobStatus;
}

export interface AgentJobsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: AJSearch;
}

interface ALJSearch {
	jobStatus?: JobStatus;
	jobLocationList?: JobLocation[];
	jobIndustry?: JobIndustry[]
}

export interface AllJobsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALJSearch;
}

interface SalaryRange {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}

interface ExperienceRange {
	start: number;
	end: number;
}

interface OrdinaryInquiry {
	page: number,
	limit: number,
}