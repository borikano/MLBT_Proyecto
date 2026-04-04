const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRONG_PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const DIGITS_ONLY_PATTERN = /^\d+$/;

const SANITIZE_MAP = Object.freeze({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
	"`": "&#96;"
});

function sanitizeInput(value) {
	return String(value || "")
		.trim()
		.replace(/[&<>"'`]/g, function (character) {
			return SANITIZE_MAP[character];
		});
}

function validateEmail(email) {
	var normalizedEmail = String(email || "").trim().toLowerCase();
	return EMAIL_PATTERN.test(normalizedEmail);
}

function validateStrongPassword(password) {
	var normalizedPassword = String(password || "").trim();
	return STRONG_PASSWORD_PATTERN.test(normalizedPassword);
}

function validateRequired(value) {
	return String(value || "").trim().length > 0;
}

function validateDigitsOnly(value, minLength, maxLength) {
	var normalizedValue = String(value || "").trim();
	var validMinLength = Number.isFinite(minLength) ? minLength : 1;
	var validMaxLength = Number.isFinite(maxLength) ? maxLength : Number.MAX_SAFE_INTEGER;

	return DIGITS_ONLY_PATTERN.test(normalizedValue) && normalizedValue.length >= validMinLength && normalizedValue.length <= validMaxLength;
}

export {
	sanitizeInput,
	validateDigitsOnly,
	validateEmail,
	validateRequired,
	validateStrongPassword
};
