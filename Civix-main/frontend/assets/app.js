const api = "/api";
const issueForm = document.querySelector("#issue-form");
const imageInput = document.querySelector("#image");
const preview = document.querySelector("#preview");
const analysisStatus = document.querySelector("#analysis-status");
const adminStatus = document.querySelector("#admin-status");
const issueTable = document.querySelector("#issues-table");

function showStatus(element, message, error = false) { element.textContent = message; element.className = `status${error ? " error" : ""}`; }
function escapeHtml(value = "") { const node = document.createElement("div"); node.textContent = value; return node.innerHTML; }
function formatCategory(category = "") { return category.replaceAll("_", " "); }
function alternativePredictions(issue) {
  if (!Array.isArray(issue.aiPredictions) || issue.aiPredictions.length < 2) return "";
  return issue.aiPredictions.slice(1, 3).map(({ category, confidence }) => `${formatCategory(category)} ${Math.round(confidence * 100)}%`).join(" · ");
}
function adminHeaders() { const token = document.querySelector("#admin-token").value.trim(); return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" }; }
let csrfToken;
async function getCsrfToken() { if (csrfToken) return csrfToken; const response = await fetch(`${api}/csrf-token`, { credentials: "same-origin" }); const data = await response.json(); csrfToken = data.csrfToken; return csrfToken; }

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0]; preview.classList.add("hidden"); if (!file) return;
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > 10 * 1024 * 1024) { imageInput.value = ""; showStatus(analysisStatus, "Choose a JPEG, PNG, or WebP image no larger than 10 MB.", true); return; }
  preview.src = URL.createObjectURL(file); preview.classList.remove("hidden"); showStatus(analysisStatus, "Image ready for AI analysis.");
});
document.querySelector("#location-button").addEventListener("click", () => {
  if (!navigator.geolocation) return showStatus(analysisStatus, "Geolocation is not supported by this browser.", true);
  showStatus(analysisStatus, "Getting your location…");
  navigator.geolocation.getCurrentPosition(({ coords }) => { document.querySelector("#latitude").value = coords.latitude; document.querySelector("#longitude").value = coords.longitude; document.querySelector("#location").value = `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`; showStatus(analysisStatus, "Location attached to the report."); }, () => showStatus(analysisStatus, "Location permission was unavailable. Enter a location manually.", true), { enableHighAccuracy: true, timeout: 10000 });
});
issueForm.addEventListener("submit", async (event) => {
  event.preventDefault(); if (!issueForm.reportValidity()) return;
  const submit = document.querySelector("#submit-button"); submit.disabled = true; showStatus(analysisStatus, "Uploading image and waiting for Python ML analysis…");
  try { const response = await fetch(`${api}/issues`, { method: "POST", credentials: "same-origin", headers: { "x-csrf-token": await getCsrfToken() }, body: new FormData(issueForm) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || result.message || "Unable to submit report."); const { issue } = result; const alternatives = alternativePredictions(issue); showStatus(analysisStatus, `Report ${issue._id} submitted. AI detected: ${formatCategory(issue.aiPredictedCategory)} (${Math.round(issue.aiConfidence * 100)}% confidence).${alternatives ? ` Other possibilities: ${alternatives}.` : ""}`); issueForm.reset(); preview.classList.add("hidden"); }
  catch (error) { showStatus(analysisStatus, error.message, true); } finally { submit.disabled = false; }
});
async function loadIssues() {
  showStatus(adminStatus, "Loading reports…");
  try { const response = await fetch(`${api}/issues`); const issues = await response.json(); if (!response.ok) throw new Error(issues.error || "Unable to load reports."); renderIssues(issues); showStatus(adminStatus, `${issues.length} report(s) loaded.`); }
  catch (error) { showStatus(adminStatus, error.message, true); }
}
function renderIssues(issues) { issueTable.innerHTML = issues.length ? issues.map(issue => { const alternatives = alternativePredictions(issue); return `<tr><td><strong>${escapeHtml(issue.title)}</strong><br><span class="small">${escapeHtml(issue.email || "")}</span></td><td>${issue.fileUrl ? `<a href="${escapeHtml(issue.fileUrl)}" target="_blank" rel="noopener"><img class="thumb" src="${escapeHtml(issue.fileUrl)}" alt="Issue image"></a>` : "—"}</td><td>${escapeHtml(formatCategory(issue.aiPredictedCategory || "Not analysed"))}<br><span class="small">${issue.aiConfidence == null ? "—" : `${Math.round(issue.aiConfidence * 100)}%`} · ${issue.aiValidated ? "Verified" : "Pending review"}${alternatives ? `<br>Alternatives: ${escapeHtml(alternatives)}` : ""}</span></td><td>${escapeHtml(issue.location || "—")}<br><span class="small">${issue.latitude ?? ""} ${issue.longitude ?? ""}</span></td><td>${escapeHtml(issue.status)}</td><td>${new Date(issue.createdAt).toLocaleString()}</td><td><select class="inline-select" data-review-id="${issue._id}"><option value="">Correct category…</option>${["pothole","garbage","waterlogging","damaged_road","broken_streetlight","other"].map(category => `<option value="${category}">${formatCategory(category)}</option>`).join("")}</select><button data-verify-id="${issue._id}" type="button">Verify</button></td></tr>`; }).join("") : "<tr><td colspan=\"7\">No reports submitted yet.</td></tr>"; }
issueTable.addEventListener("click", async event => { const id = event.target.dataset.verifyId; if (!id) return; const category = issueTable.querySelector(`[data-review-id="${id}"]`).value || undefined; try { const response = await fetch(`${api}/issues/${id}/ai-review`, { method: "PATCH", credentials: "same-origin", headers: { ...adminHeaders(), "x-csrf-token": await getCsrfToken() }, body: JSON.stringify({ correctedCategory: category }) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || "Review failed."); showStatus(adminStatus, "AI prediction reviewed."); loadIssues(); } catch (error) { showStatus(adminStatus, error.message, true); } });
document.querySelector("#refresh-button").addEventListener("click", loadIssues);
