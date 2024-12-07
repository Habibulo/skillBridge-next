export enum MemberType {
	USER = "USER",
	RECRUITER = "RECRUITER",
	ADMIN = "ADMIN",
	MODERATOR = "MODERATOR",  // optional
	GUEST = "GUEST"           // optional
}

export enum MemberStatus {
	ACTIVE = "ACTIVE",
	BLOCK = "BLOCK",
	DELETE = "DELETE",
	SUSPENDED = "SUSPENDED",  // optional
	PENDING = "PENDING",      // optional
	INACTIVE = "INACTIVE"     // optional
}

export enum MemberAuthType {
	PHONE = "PHONE",
	EMAIL = "EMAIL",
	TELEGRAM = "TELEGRAM",
	GOOGLE = "GOOGLE",       // optional
	FACEBOOK = "FACEBOOK",   // optional
	APPLE = "APPLE"          // optional
}

export enum MemberNotificationPreference {
	EMAIL = "EMAIL",
	SMS = "SMS",
	PUSH_NOTIFICATION = "PUSH_NOTIFICATION",
	NONE = "NONE"
}