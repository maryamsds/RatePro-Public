// Reusable password requirements checklist component for Public site
// Uses Bootstrap-compatible classes to match the Public site's existing design
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { getPasswordRules } from "../utilities/passwordValidator"

/**
 * Renders a live password requirements checklist.
 * Only visible when the password field has content.
 *
 * @param {{ password: string, email?: string }} props
 */
const PasswordRequirements = ({ password = "", email = "" }) => {
  if (!password || password.length === 0) return null

  const rules = getPasswordRules(password, email)

  return (
    <div className="mt-2 p-3 rounded border bg-light" style={{ fontSize: "0.82rem" }}>
      <p className="fw-semibold text-muted mb-2" style={{ fontSize: "0.78rem" }}>Password Requirements:</p>
      <ul className="list-unstyled mb-0">
        {rules.map((rule, i) => (
          <li
            key={i}
            className={`d-flex align-items-center gap-2 mb-1 ${rule.met ? "text-success" : "text-danger"}`}
          >
            {rule.met ? <FaCheckCircle className="flex-shrink-0" /> : <FaTimesCircle className="flex-shrink-0" />}
            {rule.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PasswordRequirements
