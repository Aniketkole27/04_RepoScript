import puppeteer from "puppeteer";

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf_DSfxFRKnJUUuDjuFsrNLe5FyrwKDE94heY21A_VfZx1qfw/viewform";

// 🧠 Your answers (edit this easily)
const answers = {
    "Name of the respondent": "Aniket Kole",
    "Gender of the respondent": "Male",
    "Department you belong to": "Computer Science",
    "Year of study": "Second Year",
    "Have you used any online exam system": "Yes",
    "Which platform have you used for online exams": [
        "Google Forms/Quizzes",
        "Moodle"
    ],
    "The AI-based evaluation system is easy to use": "4",
    "The system interface is user-friendly and intuitive": "5",
    "Navigation within the system is simple and straightforward": "Yes",
    "Instructions provided in the system": "Yes",
    "Overall, you are satisfied with the AI-based evaluation system": "4",
    "The system saves time compared to traditional, manual exams": "Yes",
    "Results (grades, feedback) are generated quickly after the exams": "Yes",
    "How reliable is the system during exams": "High",
    "Would you recommend this AI-based evaluation system": "Yes",
    "What technical or usability problems have you faced": [
        "Slow performance/Lag"
    ],
    "Which feature do you like the most": "Fast generation of results/grades",
    "Which area NEEDS the most significant improvement": "System speed and responsiveness",
    "Which overall improvement would you prefer the most": "All of the above"
};

async function fillForm(page, answers) {
    const questions = await page.$$('div[role="listitem"]');

    for (const q of questions) {
        const text = await q.evaluate(el => el.innerText);

        for (const key in answers) {
            if (text.includes(key)) {
                const value = answers[key];

                // 📝 Text input / textarea
                const inputTypes = ['input[type="text"]', 'input[type="email"]', 'textarea'];
                let inputEl = null;
                for (const selector of inputTypes) {
                    inputEl = await q.$(selector);
                    if (inputEl) break;
                }

                if (inputEl && typeof value === "string") {
                    await inputEl.focus();
                    await inputEl.click({ clickCount: 3 }); // Select all text
                    await page.keyboard.press('Backspace'); // Clear it
                    await inputEl.type(value);
                    await new Promise(r => setTimeout(r, 100));
                }

                // 🔘 Radio buttons (includes linear scale)
                const radios = await q.$$('[role="radio"]');
                if (radios.length > 0 && typeof value === "string") {
                    for (const r of radios) {
                        const rText = await r.evaluate(el => el.innerText);
                        const rDataValue = await r.evaluate(el => el.getAttribute('data-value'));
                        const rAriaLabel = await r.evaluate(el => el.getAttribute('aria-label'));

                        const normVal = value.toLowerCase().trim();
                        if (
                            (rText && rText.toLowerCase().includes(normVal)) ||
                            (rDataValue && rDataValue.toLowerCase().includes(normVal)) ||
                            (rAriaLabel && rAriaLabel.toLowerCase().includes(normVal))
                        ) {
                            await r.evaluate(el => el.click());
                            await new Promise(res => setTimeout(res, 100));
                            break;
                        }
                    }
                }

                // ☑️ Checkboxes
                const checkboxes = await q.$$('[role="checkbox"]');
                if (checkboxes.length > 0 && Array.isArray(value)) {
                    for (const c of checkboxes) {
                        const cText = await c.evaluate(el => el.innerText);
                        const cDataValue = await c.evaluate(el => el.getAttribute('data-value'));
                        const cAriaLabel = await c.evaluate(el => el.getAttribute('aria-label'));

                        for (const val of value) {
                            const normVal = val.toLowerCase().trim();
                            if (
                                (cText && cText.toLowerCase().includes(normVal)) ||
                                (cDataValue && cDataValue.toLowerCase().includes(normVal)) ||
                                (cAriaLabel && cAriaLabel.toLowerCase().includes(normVal))
                            ) {
                                // Only click if not already checked
                                const isChecked = await c.evaluate(el => el.getAttribute('aria-checked'));
                                if (isChecked !== 'true') {
                                    await c.evaluate(el => el.click());
                                    await new Promise(res => setTimeout(res, 100));
                                }
                            }
                        }
                    }
                }

                // 🔽 Dropdowns (Listbox)
                const listbox = await q.$('[role="listbox"]');
                if (listbox && typeof value === "string") {
                    await listbox.click();
                    await new Promise(res => setTimeout(res, 1500)); // wait for dropdown animation

                    const options = await page.$$('[role="option"]');
                    for (const o of options) {
                        const isVisible = await o.evaluate(el => {
                            const rect = el.getBoundingClientRect();
                            return rect.width > 0 && rect.height > 0 && el.offsetParent !== null;
                        });

                        if (isVisible) {
                            const oText = await o.evaluate(el => el.innerText);
                            const oDataValue = await o.evaluate(el => el.getAttribute('data-value'));

                            if (oText.includes(value) || (oDataValue && oDataValue === value)) {
                                await o.click();
                                await new Promise(res => setTimeout(res, 1500)); // Wait for dropdown to close completely
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
}

async function submitForm(page) {
    const btns = await page.$$('div[role="button"]');
    for (const b of btns) {
        const text = await b.evaluate(el => el.innerText);
        if (text.includes("Submit")) {
            await b.evaluate(el => el.click());
            break;
        }
    }
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--start-maximized"]
    });

    const page = await browser.newPage();
    await page.setViewport(null);

    await page.goto(FORM_URL, {
        waitUntil: "networkidle2"
    });

    await page.waitForSelector('div[role="listitem"]');

    // 🚀 Fill form
    await fillForm(page, answers);

    // ⏳ small delay to observe
    await new Promise(r => setTimeout(r, 2000));

    // 🚀 Submit
    await submitForm(page);

    await new Promise(r => setTimeout(r, 5000));

    // await browser.close();
})();
