// Shared password validation utility — single source of truth for frontend
// Rules mirror the backend passwordValidator.js and Admin Profile.jsx reference implementation

/**
 * Password validation rules matching the backend's validatePasswordComplexity.
 * Returns an array of { label, met } objects for real-time UI feedback.
 *
 * @param {string} password - The password to validate
 * @param {string} email - The user's email (for email-in-password check)
 * @returns {{ label: string, met: boolean }[]}
 */
export function getPasswordRules(password = "", email = "") {
  const pw = password || ""
  const emailLocal = email ? email.split("@")[0]?.toLowerCase() : ""

  return [
    { label: "At least 8 characters", met: pw.length >= 8 },
    { label: "1 uppercase letter", met: /[A-Z]/.test(pw) },
    { label: "1 lowercase letter", met: /[a-z]/.test(pw) },
    { label: "1 number", met: /[0-9]/.test(pw) },
    { label: "1 special character", met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(pw) },
    {
      label: "Does not contain email",
      met: !emailLocal || !pw.toLowerCase().includes(emailLocal) || pw.length === 0,
    },
  ]
}

/**
 * Returns true only if the password is non-empty AND all rules are satisfied.
 *
 * @param {string} password
 * @param {string} email
 * @returns {boolean}
 */
export function areAllPasswordRulesMet(password = "", email = "") {
  return password.length > 0 && getPasswordRules(password, email).every((r) => r.met)
}
