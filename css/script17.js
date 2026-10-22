const form = document.getElementById("signup-form");
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const formStatus = document.getElementById("form-status");

const fields = [
  {
    input: fullName,
    feedback: document.getElementById("full-name-feedback"),
    validate: () =>
      fullName.value.trim()
        ? ""
        : "Họ tên không được để trống",
  },
  {
    input: email,
    feedback: document.getElementById("email-feedback"),
    validate: () =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
        ? ""
        : "Email không hợp lệ (thiếu tên miền)",
  },
  {
    input: password,
    feedback: document.getElementById("password-feedback"),
    validate: () =>
      password.value.length >= 6 ? "" : "Mật khẩu phải có ít nhất 6 ký tự",
  },
  {
    input: confirmPassword,
    feedback: document.getElementById("confirm-password-feedback"),
    validate: () =>
      confirmPassword.value && confirmPassword.value === password.value
        ? ""
        : "Mật khẩu xác nhận không khớp",
  },
];

function validateField(field) {
  const error = field.validate();
  field.input.classList.toggle("is-invalid", Boolean(error));
  field.input.classList.toggle("is-valid", !error);
  field.input.setAttribute("aria-invalid", String(Boolean(error)));
  field.feedback.textContent = error || "✓ Hợp lệ";
  field.feedback.classList.toggle("is-invalid", Boolean(error));
  field.feedback.classList.toggle("is-valid", !error);
  return !error;
}

fields.forEach((field) => {
  field.input.addEventListener("input", () => {
    formStatus.textContent = "";
    if (field.input.value || field.input.classList.contains("is-invalid")) {
      validateField(field);
    }

    if (field.input === password && confirmPassword.value) {
      validateField(fields[3]);
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const isValid = fields.map(validateField).every(Boolean);

  if (!isValid) {
    formStatus.textContent = "";
    const firstInvalidField = fields.find((field) =>
      field.input.classList.contains("is-invalid"),
    );
    firstInvalidField.input.focus();
    return;
  }

  formStatus.textContent = "Đăng ký thành công!";
});
