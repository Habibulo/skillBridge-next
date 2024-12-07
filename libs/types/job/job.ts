import { JobEmploymentMode, JobIndustry, JobLocation, JobStatus,} from '../../enums/job.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Job {
	_id: string;
	jobEmploymentMode: JobEmploymentMode;
	jobIndustry: JobIndustry
	jobLocation: JobLocation;
	jobStatus: JobStatus;
	jobAddress: string;
	jobTitle: string;
	jobSalary: number;
	jobDescription: string
	jobExperienceRequired: number;
	jobPositionsAvailable: number;
	jobRemoteAvailable: boolean; 
	jobNegotiableSalary: boolean; 
	jobImages: string[];
	jobViews: number;
	jobLikes: number;
	jobComments: number;
	jobRank: number;
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	postedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Jobs {
	list: Job[];
	metaCounter: TotalCounter[];
}
