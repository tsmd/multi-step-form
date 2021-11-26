import { MyFormData } from "./types";

export const escapeHtml = (str = "") => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

export function renderHidden(
  body: MyFormData,
  except: (keyof MyFormData)[] = []
) {
  const keys: (keyof MyFormData)[] = ["given_name", "family_name"];
  return keys
    .filter((key) => !except.includes(key))
    .map((key) => {
      return `<input type="hidden" name="${key}" value="${escapeHtml(
        body[key]
      )}"/>`;
    })
    .join("\n");
}
