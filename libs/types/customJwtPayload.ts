import { JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
	_id: string;
	memberType: string;
	memberStatus: string;
	memberAuthType: string;
	memberPhone: string;
	memberNick: string;
	memberFullName?: string;
	memberImage?: string;
	memberAddress?: string;
	memberResume?: string;
	memberJobs: number;
	memberCompany?: string;
	memberJoblistings: number;
	memberApplications: number;
	memberArticles: number;
	memberDesc?: string;
	memberPoints: number;
	memberLikes: number;
	memberViews: number;
	memberComments: number;
	memberRank: number;
	memberWarnings: number;
	memberBlocks: number;
}
