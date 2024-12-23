import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const SIGN_UP = gql`
	mutation Signup($input: MemberInput!) {
		signup(input: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberResume
			memberSkills
			memberJobs
			memberCompany
			memberFollowers
			memberFollowings
			memberJobListings
			memberApplications
			memberArticles
			memberDesc
			memberPoints
			memberLikes
			memberViews
			memberComments
			memberRank
			memberWarnings
			memberBlocks
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

export const LOGIN = gql`
	mutation Login($input: LoginInput!) {
		login(input: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberResume
			memberSkills
			memberJobs
			memberCompany
			memberFollowers
			memberFollowings
			memberJobListings
			memberApplications
			memberArticles
			memberDesc
			memberPoints
			memberLikes
			memberViews
			memberComments
			memberRank
			memberWarnings
			memberBlocks
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

export const UPDATE_MEMBER = gql`
	mutation UpdateMember($input: MemberUpdate!) {
		updateMember(input: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberResume
			memberSkills
			memberJobs
			memberCompany
			memberFollowers
			memberFollowings
			memberJobListings
			memberApplications
			memberArticles
			memberDesc
			memberPoints
			memberLikes
			memberViews
			memberComments
			memberRank
			memberWarnings
			memberBlocks
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

export const LIKE_TARGET_MEMBER = gql`
	mutation LikeTargetMember($input: String!) {
		likeTargetMember(memberId: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberResume
			memberSkills
			memberJobs
			memberCompany
			memberFollowers
			memberFollowings
			memberJobListings
			memberApplications
			memberArticles
			memberDesc
			memberPoints
			memberLikes
			memberViews
			memberComments
			memberRank
			memberWarnings
			memberBlocks
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

/**************************
 *        JOB        *
 *************************/

export const CREATE_JOB = gql`
	mutation CreateJob($input: JobInput!) {
		createJob(input: $input) {
			_id
			jobEmploymentMode
			jobIndustry
			jobLocation
			jobStatus
			jobAddress
			jobTitle
			jobSalary
			jobDescription
			jobExperienceRequired
			jobPositionsAvailable
			jobRemoteAvailable
			jobNegotiableSalary
			jobImages
			jobViews
			jobLikes
			jobComments
			jobRank
			memberId
			closedAt
			deletedAt
			postedAt
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_JOB = gql`
	mutation UpdateJob($input: JobUpdate!) {
		updateJob(input: $input) {
			_id
			jobEmploymentMode
			jobIndustry
			jobLocation
			jobStatus
			jobAddress
			jobTitle
			jobSalary
			jobDescription
			jobExperienceRequired
			jobPositionsAvailable
			jobRemoteAvailable
			jobNegotiableSalary
			jobImages
			jobViews
			jobLikes
			jobComments
			jobRank
			memberId
			closedAt
			deletedAt
			postedAt
			createdAt
			updatedAt
		}
	}
`;

export const LIKE_TARGET_JOB = gql`
	mutation LikeTargetJob($input: String!) {
		likeTargetJob(jobId: $input) {
			_id
			jobEmploymentMode
			jobIndustry
			jobLocation
			jobStatus
			jobAddress
			jobTitle
			jobSalary
			jobDescription
			jobExperienceRequired
			jobPositionsAvailable
			jobRemoteAvailable
			jobNegotiableSalary
			jobImages
			jobViews
			jobLikes
			jobComments
			jobRank
			memberId
			closedAt
			deletedAt
			postedAt
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const CREATE_BOARD_ARTICLE = gql`
	mutation CreateBoardArticle($input: BoardArticleInput!) {
		createBoardArticle(input: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_BOARD_ARTICLE = gql`
	mutation UpdateBoardArticle($input: BoardArticleUpdate!) {
		updateBoardArticle(input: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const LIKE_TARGET_BOARD_ARTICLE = gql`
	mutation LikeTargetBoardArticle($input: String!) {
		likeTargetBoardArticle(articleId: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         COMMENT        *
 *************************/

export const CREATE_COMMENT = gql`
	mutation CreateComment($input: CommentInput!) {
		createComment(input: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_COMMENT = gql`
	mutation UpdateComment($input: CommentUpdate!) {
		updateComment(input: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         FOLLOW        *
 *************************/

export const SUBSCRIBE = gql`
	mutation Subscribe($input: String!) {
		subscribe(input: $input) {
			_id
			followingId
			followerId
			createdAt
			updatedAt
		}
	}
`;

export const UNSUBSCRIBE = gql`
	mutation Unsubscribe($input: String!) {
		unsubscribe(input: $input) {
			_id
			followingId
			followerId
			createdAt
			updatedAt
		}
	}
`;
