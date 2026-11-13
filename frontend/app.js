
const form = document.getElementById("leadForm");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");


const WEBHOOK_URL = "https://mishra0510.app.n8n.cloud/webhook-test/coaching-lead";


let currentIdempotencyKey = null;
let isSubmitting = false;

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    message.textContent = "";

    try {
        if (!currentIdempotencyKey) {
            currentIdempotencyKey = crypto.randomUUID();
        }

        const formData = new FormData(form);

        const lead = {
            name: formData.get("name").trim(),
            email: formData.get("email").trim(),
            phone: formData.get("phone").trim(),
            course: formData.get("course"),
            idempotencyKey: currentIdempotencyKey
        };

        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(lead)
        });

        let result;

        try {
            result = await response.json();
        } catch {
            throw new Error("Server returned an invalid response.");
        }

        if (!response.ok || !result.success) {
            throw new Error(
                result.message || `Request failed: ${response.status}`
            );
        }

        if (result.duplicate) {
            message.textContent = "This enquiry was already processed.";
        } else if (result.notificationStatus === "failed") {
            message.textContent =
                "Your enquiry was saved, but the institute notification failed.";
        } else {
            message.textContent =
                "Your enquiry was submitted successfully!";
        }

        message.style.color = "green";

        currentIdempotencyKey = null;
        form.reset();

    } catch (error) {
        console.error("Submission error:", error);

        message.textContent = error.message ||
            "Network error. Please try again.";

        message.style.color = "red";

        // Retain the key for a retry of the same submission.

    } finally {
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Enquiry";
    }
});