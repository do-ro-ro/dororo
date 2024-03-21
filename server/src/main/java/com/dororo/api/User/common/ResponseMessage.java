package com.dororo.api.User.common;

public interface ResponseMessage {
	String SUCCESS = "Success.";
	String VALIDATION_FAIL = "Validation failed.";
	String DUPLICATED_ID = "Duplicate Id.";
	String SIGN_IN_FAIL = "Login information mismatch.";
	String SIGN_UP_FAIL = "Already exists user.";
	String CERTIFICATION_FAIL = "Certification failed.";
	String DATABASE_ERROR = "Database error.";
}
